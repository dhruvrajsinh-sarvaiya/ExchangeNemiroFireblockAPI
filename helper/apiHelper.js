const pool = require("../config/keys").pool;
const parser = require("ua-parser-js"),
      mysqlErrorLog = require('./logHelper').mysqlErrorLog;
let dot = require('dot-object');
query = function (statement, callback) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) {
                // release the conncetion if has
                if (typeof connection !== 'undefined' && connection) {
                    connection.release();
                }
                // write the error log
                mysqlErrorLog({code: err.code, name: err.toString(), message: err.message}, 'Mysql Exception');
                callback(err, null);
            } else {
                connection.on('error', function (err) {
                    // write the error log
                    mysqlErrorLog({code: err.code, name: err.toString(), message: err.message}, 'Mysql Exception');
                    return err;
                });

                connection.query(statement, function (err, rows) {

                    if (!err) {
                        connection.release();
                        callback(null, rows);
                    } else {

                        if (typeof connection !== 'undefined' && connection) {
                            connection.release();
                        }
                        // write the error log
                        mysqlErrorLog({code: err.code, name: err.toString(), message: err.message}, 'Mysql Exception');
                        callback(err, null);
                    }
                });
            }
        });
    } catch (e) {
        mysqlErrorLog({},e.stack);
        callback(e.toString(), null);        
    }
};
getDeviceInfo = function (UserAgent) {
    let deviceID = '';
    try {
        let parsing = parser(UserAgent);
        deviceID = parsing.browser.name + '_' + parsing.browser.version + '|' + parsing.os.name + '_' + parsing.os.version + '|' + parsing.cpu.architecture;
        return deviceID;
    } catch (e) {
        return deviceID;
    }
};

MakeRequest = async function (RequestParam, requestKey, requestBody, PerentRequestObject) {
    try {
        console.log(requestKey)
        if (RequestParam.value == '' && RequestParam.defaultValue !== "") {
            dot.str(requestKey, RequestParam.defaultValue, PerentRequestObject);
        } else {
            console.log("Value : ", RequestParam.value);
            console.log("PerentRequestObject : ", PerentRequestObject);
            let pick = dot.pick(RequestParam.value, requestBody);
            if ((typeof pick === "undefined" || pick === "") && typeof RequestParam.defaultValue !== "undefined" && RequestParam.defaultValue === "null") {
                dot.str(requestKey, "", PerentRequestObject);
            } else if (typeof pick !== "undefined" && pick !== "") {
                dot.str(requestKey, pick, PerentRequestObject);
            }
        }
    } catch (e) {

    }

}

async function getMapping(mappingDetails, callback) {
    try {
        if (typeof mappingDetails != 'undefined' && mappingDetails != '') {
            let mapping = {};

            function mappingFun(mapArray) {
                let tObj = {};
                mapArray.forEach(function (obj) {
                    let name = obj.name;
                    obj.name = undefined;
                    tObj[name] = obj;
                })

                return tObj;
            }

            if (mappingDetails.requestParams.length > 0) {
                mapping.requestParams = mappingFun(mappingDetails.requestParams);
            }

            if (mappingDetails.headersParam.length > 0) {
                mapping.headersParam = mappingFun(mappingDetails.headersParam)
            }

            if (mappingDetails.responseParameter.length > 0) {
                mapping.responseParameter = mappingFun(mappingDetails.responseParameter);
            }

            /*if (mappingDetails.responseHeader.length > 0) {
                mapping.response_header = mappingFun(mappingDetails.responseHeader);
            }

            if (mappingDetails.qrCodeData.length > 0) {
                mapping.qr_code_data = mappingFun(mappingDetails.qrCodeData);
            }*/

            callback(null, mapping);
        } else {
            callback('process inturupted')
        }
    } catch (e) {
        // return error if any exception generate
        callback(e.toString())
    }
}

module.exports = {
    query: query,
    getDeviceInfo: getDeviceInfo,
    MakeRequest: MakeRequest,
    getMapping: getMapping,
}