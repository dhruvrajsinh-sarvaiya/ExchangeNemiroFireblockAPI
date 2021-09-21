const jwtHelper = require("./JWT");
let mySql = require('./apiHelper').query;
let dot = require('dot-object');
let responseCode = require('../helper/responseCodes'),
     CodeHandler = new responseCode();

validateRequest = async  function (request, callback) {
    // Check Request Is get or Post
    let response;
    if (request.method !== 'GET') {
        if (request.url.split('/')[1] === "generateAccessToken") {
            //validate Site and ip validation
            validateBasicToken(request.headers,request.body.site_id,function(error,result,data){
                callback(error,result,data);
            });
        } else {

            validateJWTToken(request.headers, function (error,result,data) {
                callback(error,result,data);
            })
        }
    } else {
        callback(null, true, {});
    }
}

validateJWTToken = async function (headers, callback) {
    let response;
    try {
        jwtHelper.verifyToken(headers, async function (verification, jwtResponse) {

            if (verification) {
                validateSiteToken(jwtResponse.data,function(error,result,data){
                    callback(error,result,data);
                })
            } else {
                response = await CodeHandler.getAuthenticationResponseCode("INVALID_TOKEN")
                callback(401, false, response);

            }
        })
    } catch (e) {
        response = await CodeHandler.getFailedResponseCode("INTERNAL_ERROR")
        callback(500, false, response);
    }
}

validateBasicToken = async function (headers,siteID,callback){
    try{
        mySql("SELECT sitename,id FROM sitemaster WHERE Btoken = '"+ headers.authorization.split(' ')[1] +"' AND id = "+siteID,async function(err,result){

            if(!err && result.length > 0){
                dot.str("sitename",result[0].sitename,headers);
                dot.str("id",result[0].id,headers);
                validateWhiteListedIPAddress(headers,function(error,result,data){
                    callback(error,result,data);
                })

            }else{
                response = await CodeHandler.getAuthenticationResponseCode("INVALID_TOKEN")
                callback(401, false, response);
            }

        });
    }catch(e){
        response = await CodeHandler.getFailedResponseCode("INTERNAL_ERROR")
        callback(500, false, response);
    }
}

validateSiteToken = async function (siteData,callback) {
    try {
        mySql("SELECT id from siteMaster where id = " + siteData.id + " AND sitename = '" + siteData.sitename + "' AND status = 1;", async function (err, result) {
            if(!err && result.length > 0){
                validateWhiteListedIPAddress(siteData,function(error,result,data){
                    callback(error,result,data);
                })
            }else{
                response = await CodeHandler.getFailedResponseCode("SITE_DETAIL_NOT_FOUND")
                callback(200, false, response);
            }
        })
    } catch (e) {
        response = await CodeHandler.getFailedResponseCode("INTERNAL_ERROR")
        callback(500, false, response);
    }
}

validateWhiteListedIPAddress = async function (siteData,callback) {
    try {
        mySql("SELECT allow_ip from whitelist_access_ip where siteId = " + siteData.id + " AND allow_ip = '" + siteData.ip + "' AND status = 1;",async function (err, result) {
            if(!err && result.length > 0){
                callback(null, true, siteData);
            }else{
                response = await CodeHandler.getFailedResponseCode("IP_ADDRESS_NOT_WHITELISTED")
                callback(200, false, response);
            }
        })
    } catch (e) {
        response = await CodeHandler.getFailedResponseCode("INTERNAL_ERROR")
        callback(500, false, response);
    }
}

findProvider = async function(providerId,siteId,callback){
    try{
        let response;
        mySql("SELECT p.id,p.providerName,pa.ENCPubKey,pa.EncPvtKey FROM providers p INNER JOIN providerAuthDetails pa ON p.id = pa.providerid WHERE pa.siteId = "+parseInt(siteId)+" AND p.id = "+parseInt(providerId)+" AND p.STATUS = 1 AND pa.status = 1",async function(err,providerList){
            if(!err && providerList.length > 0){
                callback(null,true,providerList[0])
            }else {
                response = await CodeHandler.getFailedResponseCode("PROVIDER_NOT_FOUND");
                callback(200,false,response)
            }
        })
    }catch (e) {
        response = await CodeHandler.getFailedResponseCode("INTERNAL_ERROR");
        callback(500,false,response)
    }
};


validateNewRequest = function (request, paramDetails, requiredParams, callback) {

    try{
        (async function recursive(i) {
            let error = {},
                isError = false;

            if ((!checkRequestData(request)) || requiredParams.length == 0) {
                paramDetails[i] = typeof paramDetails[i] === "object" ? paramDetails[i] : paramDetails[i].toObject();
                getObjectValue(paramDetails[i].value, false, request, function (value) {

                    if (!checkRequestData(paramDetails[i].required) && !checkRequestData(paramDetails[i].required.value) && checkRequestData(value) && paramDetails[i].required.value) {

                        error.message = paramDetails[i].required.message;
                        error.errorCode = paramDetails[i].required.errCode;
                        isError = true;
                    } else if (!checkRequestData(request) && !checkRequestData(value)) {
                        let filterParamForEqual = '',
                            filterParamForNotEqual = '',
                            filterParamisBefore = '',
                            filterParamGreaterThan = '',
                            filterParamLessThan = '',
                            filterParamLessThanEqual = '',
                            filterParamGreaterThanEqual = '',
                            regexExp = '';

                        if (!checkRequestData(paramDetails[i].equal) && !checkRequestData(paramDetails[i].equal.value)) {
                            getObjectValue(paramDetails[i].equal.value, false, request, function (value) {
                                filterParamForEqual = value
                            });
                        } else if (!checkRequestData(paramDetails[i].equal) && checkRequestData(paramDetails[i].equal.value) && !checkRequestData(paramDetails[i].equal.defaultValue)) {
                            filterParamForEqual = paramDetails[i].equal.defaultValue
                        }
                        if (!checkRequestData(paramDetails[i].notEqual) && !checkRequestData(paramDetails[i].notEqual.value)) {
                            getObjectValue(paramDetails[i].notEqual.value, false, request, function (value) {
                                filterParamForNotEqual = value
                            });
                        } else if (!checkRequestData(paramDetails[i].notEqual) && checkRequestData(paramDetails[i].notEqual.value) && !checkRequestData(paramDetails[i].notEqual.defaultValue)) {
                            filterParamForNotEqual = paramDetails[i].notEqual.defaultValue
                        }

                        if (!checkRequestData(paramDetails[i].isBefore) && !checkRequestData(paramDetails[i].isBefore.value)) {
                            getObjectValue(paramDetails[i].isBefore.value, false, request, function (value) {
                                filterParamisBefore = value
                            });
                        } else if (!checkRequestData(paramDetails[i].isBefore) && checkRequestData(paramDetails[i].isBefore.value) && !checkRequestData(paramDetails[i].isBefore.defaultValue)) {
                            filterParamisBefore = paramDetails[i].isBefore.defaultValue
                        }

                        if (!checkRequestData(paramDetails[i].greaterThan) && !checkRequestData(paramDetails[i].greaterThan.value)) {
                            getObjectValue(paramDetails[i].greaterThan.value, false, request, function (value) {
                                filterParamGreaterThan = value
                            });
                        } else if (!checkRequestData(paramDetails[i].greaterThan) && checkRequestData(paramDetails[i].greaterThan.value) && !checkRequestData(paramDetails[i].greaterThan.defaultValue)) {
                            filterParamGreaterThan = paramDetails[i].greaterThan.defaultValue
                        }

                        if (!checkRequestData(paramDetails[i].lessThan) && !checkRequestData(paramDetails[i].lessThan.value)) {
                            getObjectValue(paramDetails[i].lessThan.value, false, request, function (value) {
                                filterParamLessThan = value
                            });
                        } else if (!checkRequestData(paramDetails[i].lessThan) && checkRequestData(paramDetails[i].lessThan.value) && !checkRequestData(paramDetails[i].lessThan.defaultValue)) {
                            filterParamLessThan = paramDetails[i].lessThan.defaultValue
                        }

                        if (!checkRequestData(paramDetails[i].greaterThanEqual) && !checkRequestData(paramDetails[i].greaterThanEqual.value)) {
                            getObjectValue(paramDetails[i].greaterThanEqual.value, false, request, function (value) {
                                filterParamGreaterThanEqual = value
                            });
                        } else if (!checkRequestData(paramDetails[i].greaterThanEqual) && checkRequestData(paramDetails[i].greaterThanEqual.value) && !checkRequestData(paramDetails[i].greaterThanEqual.defaultValue)) {
                            filterParamGreaterThanEqual = paramDetails[i].greaterThanEqual.defaultValue
                        }

                        if (!checkRequestData(paramDetails[i].lessThanEqual) && !checkRequestData(paramDetails[i].lessThanEqual.value)) {
                            getObjectValue(paramDetails[i].lessThanEqual.value, false, request, function (value) {
                                filterParamLessThanEqual = value
                            });
                        } else if (!checkRequestData(paramDetails[i].lessThanEqual) && checkRequestData(paramDetails[i].lessThanEqual.value) && !checkRequestData(paramDetails[i].lessThanEqual.defaultValue)) {
                            filterParamLessThanEqual = paramDetails[i].lessThanEqual.defaultValue
                        }

                        if (!checkRequestData(paramDetails[i].regex) && !checkRequestData(paramDetails[i].regex.value)) {
                            regexExp = new RegExp(paramDetails[i].regex.value);
                        }

                        if (!checkRequestData(paramDetails[i].regex) && !checkRequestData(paramDetails[i].regex.value) && !regexExp.test(value)) {
                            error.message = paramDetails[i].regex.message;
                            error.errorCode = paramDetails[i].regex.errCode;
                            isError = true;
                        } else if (!checkRequestData(paramDetails[i].minLength) && !checkRequestData(paramDetails[i].minLength.value) && !checkRequestData(value) && ((typeof value === 'number' && (value + '').length < paramDetails[i].minLength.value) || value.length < paramDetails[i].minLength.value)) {
                            error.message = paramDetails[i].minLength.message;
                            error.errorCode = paramDetails[i].minLength.errCode;
                            isError = true;
                        } else if (!checkRequestData(paramDetails[i].maxLength) && !checkRequestData(paramDetails[i].maxLength.value) && !checkRequestData(value) && ((typeof value === 'number' && (value + '').length > paramDetails[i].maxLength.value) || value.length > paramDetails[i].maxLength.value)) {
                            error.message = paramDetails[i].maxLength.message;
                            error.errorCode = paramDetails[i].maxLength.errCode;
                            isError = true;
                        } else if (!checkRequestData(paramDetails[i].notEqual) && !checkRequestData(filterParamForNotEqual) && value == filterParamForNotEqual) {
                            error.message = paramDetails[i].notEqual.message;
                            error.errorCode = paramDetails[i].notEqual.errCode;
                            isError = true;
                        } else if (!checkRequestData(paramDetails[i].equal) && !checkRequestData(filterParamForEqual) && value !== filterParamForEqual) {
                            error.message = paramDetails[i].equal.message;
                            error.errorCode = paramDetails[i].equal.errCode;
                            isError = true;
                        } else if (!checkRequestData(paramDetails[i].isBefore) && !checkRequestData(filterParamisBefore) && Validator.isBefore(value, filterParamisBefore)) {
                            error.message = paramDetails[i].isBefore.message;
                            error.errorCode = paramDetails[i].isBefore.errCode;
                            isError = true;
                        } else if (!checkRequestData(paramDetails[i].lessThan) && !checkRequestData(filterParamLessThan) && parseFloat(value) >= parseFloat(filterParamLessThan)) {
                            error.message = paramDetails[i].lessThan.message;
                            error.errorCode = paramDetails[i].lessThan.errCode;
                            isError = true;
                        } else if (!checkRequestData(paramDetails[i].lessThanEqual) && !checkRequestData(filterParamLessThanEqual) && parseFloat(value) > parseFloat(filterParamLessThanEqual)) {
                            error.message = paramDetails[i].lessThanEqual.message;
                            error.errorCode = paramDetails[i].lessThanEqual.errCode;
                            isError = true;
                        } else if (!checkRequestData(paramDetails[i].greaterThan) && !checkRequestData(filterParamGreaterThan) && parseFloat(value) <= parseFloat(filterParamGreaterThan)) {
                            error.message = paramDetails[i].greaterThan.message;
                            error.errorCode = paramDetails[i].greaterThan.errCode;
                            isError = true;
                        } else if (!checkRequestData(paramDetails[i].greaterThanEqual) && !checkRequestData(filterParamGreaterThanEqual) && parseFloat(value) < parseFloat(filterParamGreaterThanEqual)) {
                            error.message = paramDetails[i].greaterThanEqual.message;
                            error.errorCode = paramDetails[i].greaterThanEqual.errCode;
                            isError = true;
                        }
                    }
                })

            } else {
                error.message = 'Invalid request. Please Try again';
                error.errorCode = 5165;
                isError = true;
            }

            if (i + 1 !== paramDetails.length && !isError) {
                recursive(++i);
            } else {
                callback(isError, error);
            }
        }(0));
    }catch(e){
        let error = {
            message : "Internal Error. Please try after sometime",
            errorCode : 2000
        }
        let isError = true;
        callback(isError, error);
    }

}

getObjectValue = function (splits, create, context, callback) {
    let pick = dot.pick(splits, context);
    callback(pick);
};

checkRequestData = function (data) {

    if (this.checkIsUndefined(data) || this.checkIsNull(data) || this.checkBlankValue(data)) {
        return true
    } else {
        return false
    }
}

checkTypeOfData = function (data) {
    if (Array.isArray(data)) {
        return "array"
    } else {
        return typeof data;
    }

}

checkIsNull = function (Data) {

    if (typeof Data == "null" || typeof Data == null || Data == null) {
        return true;
    } else {
        return false;
    }
}

checkIsUndefined = function (data) {
    if (typeof data === undefined || typeof data === "undefined" || this.checkIsNull(data)) {
        return true
    } else {
        return false
    }
}

checkBlankValue = function (data) {

    if (data === "") {
        return true
    } else {
        return false
    }
};

findMethodDetails = function(data,callback) {
    try{
        let selectStatement = "SELECT id,methodName,requestParameters,headersParameter,responseParameter FROM providermethodlist WHERE STATUS = 1 AND methodName = '"+ data.method + "' AND providerId = "+data.providerId;
        mySql(selectStatement,function(err,methodDetails){
            if(!err && methodDetails.length > 0){
                callback(null,true,methodDetails[0]);
            }else{
                if(err){
                    callback (err.toString(),false,{})
                }  else{
                    callback (null,false,{})
                }

            }
        })
    }catch(e){

    }
};

findRequestValidationDetails = function(data,callback) {
    let selectStatement = "SELECT requestParam FROM requestvalidation WHERE STATUS = 1 AND providerId = "+data.providerId+" AND routeid = "+data.routeId;

    mySql(selectStatement,function(err,validateParams){
        if(!err && validateParams.length > 0){
            callback (null,true,validateParams[0].requestParam)
        }else {
            if(err){
                callback (err.toString(),false,{})
            }  else{
                callback (null,false,{})
            }

        }
    })
}

async function MakeRequest(RequestParam, requestKey, requestBody, PerentRequestObject) {

    if(RequestParam.value == '' && RequestParam.defaultValue !== "") {
        dot.str(requestKey, RequestParam.defaultValue, PerentRequestObject);
    } else if(typeof RequestParam.isMultiFile != 'undefined' && RequestParam.isMultiFile == 1) {
        dot.str(requestKey, requestBody, PerentRequestObject);
    } else if(typeof RequestParam.isDownload != 'undefined' && RequestParam.isDownload == 1) {
        dot.str(requestKey, requestBody, PerentRequestObject);
    } else {
        let pick = dot.pick(RequestParam.value, requestBody);
        if ((typeof pick === "undefined" || pick === "") && typeof RequestParam.defaultValue !== "undefined" && RequestParam.defaultValue === "null") {
            dot.str(requestKey, "", PerentRequestObject);
        } else if (typeof pick !== "undefined" && pick !== "") {
            dot.str(requestKey, pick, PerentRequestObject);
        }
    }
}
module.exports = {
    validateRequest: validateRequest,
    findProvider: findProvider,
    validateNewRequest:validateNewRequest
}