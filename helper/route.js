const jwtHelper = require('../helper/JWT'),
    validator = require('../helper/validateHelper'),
    getDeviceInfo = require('../helper/apiHelper').getDeviceInfo,
    MakeRequest = require('../helper/apiHelper').MakeRequest,
    getMapping = require('../helper/apiHelper').getMapping,
    responseCode = require('../helper/responseCodes'),
    dot = require("dot-object"),
    mySql = require('../helper/apiHelper').query,
    path = require('path'),
    fs = require('fs');

let CodeHandler = new responseCode();
let provider = [];

provider.push({
    fireblocks: require('../controller/fireblocks')
});

module.exports = function (app) {
    app.all('/*', async function (request, response, next) {
        try {
            if (request.headers['x-forwarded-for']) {
                request.headers.ip = request.headers['x-forwarded-for'].split(":")[0];
            } else if (request.connection && request.connection.remoteAddress) {
                request.headers.ip = request.connection.remoteAddress;
            }
            if (typeof request.headers.deviceinfo !== 'undefined' && request.headers.deviceinfo !== '') {
                request.headers.deviceInfo = request.headers.deviceinfo;
            } else {
                request.headers.deviceInfo = getDeviceInfo(request.headers['user-agent']);
            }
            validator.validateRequest(request, function (statusCode, result, data) {
                if (result) {
                    if (request.url.split('/')[1] === "generateAccessToken") {
                        next();
                    } else {
                        validator.findProvider(data.providerId, data.id, function (providerStatusCode, providerResult, providerData) {

                            if (providerResult) {

                                dot.str("providerId", providerData.id, request.body);
                                dot.str("providerName", providerData.providerName, request.body);
                                dot.str("ENCPUBKey", Buffer.from(providerData.ENCPubKey, 'base64').toString('ascii'), request.body)
                                dot.str("ENCPVTKey", providerData.EncPvtKey, request.body);
                                next();
                            } else {
                                response.status(providerStatusCode).json(providerData).end();
                            }
                        })
                    }


                } else {
                    response.status(statusCode).json(data).end();
                }

            })
        } catch (e) {
            console.log(e)
            let response = await CodeHandler.getFailedResponseCode("INTERNAL_ERROR");
            response.status(500).json(response).end();
        }

    });

    app.post("/api/:methodName", function (request, response) {
        var requestData = {},
            method;
        requestData.body = request.body;
        requestData.method = request.params.methodName;
        requestData.providerName = request.body.providerName;
        requestData.providerId = request.body.providerId;

        const apiSecret = fs.readFileSync(path.resolve(requestData.body.ENCPVTKey), "utf8");
        let userProvider = new provider[0][requestData.body.providerName](apiSecret, requestData.body.ENCPUBKey);

        findMethodDetails(requestData, async function (err, result, methodDetails) {

            if (!err && result) {
                let mappingDetails = {
                    requestParams : methodDetails.requestParameters === null ? [] : JSON.parse(methodDetails.requestParameters),
                    headersParam : methodDetails.headersParameter === null ? [] : JSON.parse(methodDetails.headersParameter),
                    responseParameter : methodDetails.responseParameter === null ? [] : JSON.parse(methodDetails.responseParameter),
                }
                let methodName = methodDetails.methodName;
                requestData.routeId = methodDetails.id;


                let methodRequest = {},
                    methodHeaders = {};

                findRequestValidationDetails(requestData,async function(err,validateResult,validateParams){

                    if (!err && validateResult) {
                        requestData.validateParams = JSON.parse(validateParams)
                        validateNewRequest(requestData.body,requestData.validateParams,[],async function(isError,validateResultDetails){
                            if (!isError) {
                                getMapping(mappingDetails,async function(err,requestMapping){
                                    if(!err){
                                        if (typeof requestMapping.requestParams != 'undefined' && Object.keys(requestMapping.requestParams).length > 0) {
                                            await Object.keys(requestMapping.requestParams).forEach(function (key) {
                                                MakeRequest(requestMapping.requestParams[key], key, requestData.body, methodRequest)
                                            });
                                        }

                                        if (typeof requestMapping.headersParam != 'undefined' && Object.keys(requestMapping.headersParam).length > 0) {
                                            await Object.keys(requestMapping.headersParam).forEach(function (key) {
                                                MakeRequest(requestMapping.headersParam[key], key, data, options.headers)
                                            });
                                        }

                                        userProvider[methodName](methodRequest,function (err, res) {
                                            if (!err) {
                                                userProvider = null;
                                                return response.status(200).json(res).end();
                                            } else {
                                                userProvider = null;
                                                return response.status(200).json({msg: err.toString()}).end();
                                            }
                                        })
                                    }else{
                                        // Internal Error Return
                                        let responseData = await CodeHandler.getFailedResponseCode("INTERNAL_ERROR");
                                        response.status(200).json(responseData).end();
                                    }
                                })
                            } else {
                                let resInfo = {
                                    responseCode: 1,
                                    errCode: validateResultDetails.errorCode,
                                    message: validateResultDetails.message,
                                }
                                response.status(200).json(resInfo).end();
                            }
                        })

                    } else{
                        // Method Validation details not found
                        getMapping(mappingDetails,async function(err,requestMapping){
                            if(!err){
                                if (typeof requestMapping.requestParams != 'undefined' && Object.keys(requestMapping.requestParams).length > 0) {
                                    await Object.keys(requestMapping.requestParams).forEach(function (key) {
                                        MakeRequest(requestMapping.requestParams[key], key, requestData.body, methodRequest)
                                    });
                                }

                                if (typeof requestMapping.headersParam != 'undefined' && Object.keys(requestMapping.headersParam).length > 0) {
                                    await Object.keys(requestMapping.headersParam).forEach(function (key) {
                                        MakeRequest(requestMapping.headersParam[key], key, data, options.headers)
                                    });
                                }

                                userProvider[methodName](methodRequest,function (err, res) {
                                    if (!err) {
                                        userProvider = null;
                                        return response.status(200).json(res).end();
                                    } else {
                                        userProvider = null;
                                        return response.status(200).json({msg: err.toString()}).end();
                                    }
                                })
                            }else{
                                // Internal Error Return
                                let responseData = await CodeHandler.getFailedResponseCode("INTERNAL_ERROR");
                                response.status(200).json(responseData).end();
                            }
                        })
                    }

                })
            } else {
                // Return method not found
                let responseData = await CodeHandler.getFailedResponseCode("METHOD_NOT_FOUND");
                response.status(200).json(responseData).end();
            }
        });
    });

    app.post('/generateAccessToken', async function (req, res) {
        let response = {};
        try {

            let body = req.body;
            // find site details from site id and site name
            mySql("SELECT id,providerId,siteAccessToken,sitename from siteMaster where id = " + body.site_id + " AND sitename = '" + body.SiteName + "' AND status = 1", async function (err, result) {
                if (!err) {
                    // generate token if site found
                    let data = {
                        ip: req.headers.ip,
                        deviceInfo: req.headers.deviceInfo,
                        id: result[0].id,
                        providerId: result[0].providerId,
                        siteAccessToken: result[0].siteAccessToken,
                        sitename: result[0].sitename
                    }
                    jwtHelper.createToken(data, async function (error, token) {
                        if (!error && token.status === 0) {

                            response = await CodeHandler.getSucessResponseCode("SUCESS");
                            dot.str('data.token', token.token, response)
                            res.status(200).json(response).end();

                        } else if (!error && token.status === 0) {
                            response = await CodeHandler.getFailedResponseCode("TOKEN_GENERATION_FAILED");
                            res.status(200).json(response).end();
                        }
                    });
                } else {
                    response = await CodeHandler.getFailedResponseCode("TOKEN_GENERATION_FAILED");
                    res.status(200).json(response).end();
                }
            })
        } catch (e) {
            response = await CodeHandler.getFailedResponseCode("INTERNAL_ERROR");
            res.status(200).json(response).end();
        }
    });
};