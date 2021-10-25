const pool = require("../config/keys").pool;
const parser = require("ua-parser-js"),
      mysqlErrorLog = require('./logHelper').mysqlErrorLog,
      errorLog = require('./logHelper').errorLog;
let dot = require('dot-object');
var query = function (statement, callback) {
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
        if (RequestParam.value == '' && RequestParam.defaultValue !== "") {
            dot.str(requestKey, RequestParam.defaultValue, PerentRequestObject);
        } else {
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

storeVaultData = function (data, callback) {
    try {
        if(data && typeof data.id != "undefined" && typeof data.name != "undefined" && data.id && data.name)
        {
            let queryString = "insert into vaultdetail set vault_id="+data.id+",name='"+data.name+"',data='"+JSON.stringify(data)+"'";
            
            query(queryString, async function (err, result) {
                
                if (!err && result) {
                    callback(null,result);
                } else {
                    errorLog({"query":query},err.stack);
                    callback(err.toString());
                }
            });
        } else {            
            callback("Invalid data");
        }
    } catch(err) {
        errorLog({"Exception":"SQL"},err.stack);
        callback(err.toString());
    }    
};

storeVaultToAssetMap = function (data, callback) {
    try { 
        if(data && typeof data.vaultID != "undefined" && typeof data.assetId != "undefined" && data.vaultID && data.assetId)
        {
            let selectStatement = "select count(id) As id from vaultdetail where vault_id="+data.vaultID;
            query(selectStatement, async function (err, result) {
                
                if (!err && result && result[0].id > 0) {
                    let queryString = "insert into vaulttoasset set vault_id="+data.vaultID+",assetId='"+data.assetId+"',data='"+JSON.stringify(data.assetDetails)+"'"
                    
                    query(queryString, async function (err, result) {
                        
                        if (!err && result) {
                            callback(null,result);
                        } else {
                            errorLog({"query":query},err.stack);
                            callback(err.toString());
                        }
                    });
                } else if (!err && result && result[0].id == 0) {
                    callback("Provide valid vault "+data.vaultID);                         
                } else {
                    errorLog({"query":query},err.stack);
                    callback(err.toString());
                }
            });
        } else {            
            callback("Invalid data");
        }
    } catch(err) {
        errorLog({"Exception":"SQL"},err.stack);
        callback(err.toString());
    }    
};

storeInternalWalletData = function (data, callback) {
    try {
        if(data && typeof data.id != "undefined" && typeof data.name != "undefined" && data.id && data.name)
        {
            let queryString = "insert into internalwallet set wallet_id='"+data.id+"',name='"+data.name+"',data='"+JSON.stringify(data)+"'";
            
            query(queryString, async function (err, result) {
                
                if (!err && result) {
                    callback(null,result);
                } else {
                    errorLog({"query":query},err.stack);
                    callback(err.toString());
                }
            });
        } else {            
            callback("Invalid data");
        }
    } catch(err) {
        errorLog({"Exception":"SQL"},err.stack);
        callback(err.toString());
    }    
};

storeExternalWalletData = function (data, callback) {
    try {
        if(data && typeof data.id != "undefined" && typeof data.name != "undefined" && data.id && data.name)
        {
            let queryString = "insert into externalwallet set wallet_id='"+data.id+"',name='"+data.name+"',data='"+JSON.stringify(data)+"'";
            
            query(queryString, async function (err, result) {
                
                if (!err && result) {
                    callback(null,result);
                } else {
                    errorLog({"query":query},err.stack);
                    callback(err.toString());
                }
            });
        } else {            
            callback("Invalid data");
        }
    } catch(err) {
        errorLog({"Exception":"SQL"},err.stack);
        callback(err.toString());
    }    
};

storeWithdrawTransactionData = function (request,response, callback) {
    try {     
        let queryString = "insert into transaction_log set assetId='"+request.assetId+"',sourceId='"+request.source.id+"',sourceType='"+request.source.type+"',amount='"+request.amount+"',txn_id='"+response.id+"',request='"+JSON.stringify(request)+"',response='"+JSON.stringify(response)+"'";
        
        query(queryString, async function (err, result) {
            
            if (!err && result) {
                callback(null,result);
            } else {
                errorLog({"query":query},err.stack);
                callback(err.toString());
            }
        });        
    } catch(err) {
        errorLog({"Exception":"SQL"},err.stack);
        callback(err.toString());
    }    
};

module.exports = {
    query: query,
    getDeviceInfo: getDeviceInfo,
    MakeRequest: MakeRequest,
    getMapping: getMapping,
    storeVaultData: storeVaultData,
    storeVaultToAssetMap: storeVaultToAssetMap,
    storeInternalWalletData: storeInternalWalletData,
    storeExternalWalletData: storeExternalWalletData,
    storeWithdrawTransactionData: storeWithdrawTransactionData
}