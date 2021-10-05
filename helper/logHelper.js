const common = require("../config/common"),
    fs = require('fs'),
    dateFormat = require("dateformat"),
    mkdirp = require("mkdirp");

//Request logs
exports.requestLog = function (request) {
    let LogFile = '';
    let LogDir = common.ProjectRoot + 'logs/RequestLog/'+request.providerName+'/'+ dateFormat(new Date(), "dd-mm-yyyy") + '/';
    let LogString = '';
    LogFile = common.ProjectRoot + 'logs/RequestLog/'+request.providerName+'/'+ dateFormat(new Date(), "dd-mm-yyyy") + '/' + request.method + '_' + dateFormat(new Date(), "dd-mm-yyyy_H") + '.log';
    
    LogString += 'DateTime : ' + dateFormat(new Date(), "dd-mm-yyyy H:MM:ss") + ' \r\n';
    LogString += 'Method : ' + request.method + ' \r\n';
    LogString += 'Provider : ' + request.providerName + ' \r\n';
    LogString += 'Request : ';
    LogString += JSON.stringify(request.body) + '\r\n\r\n';

    // check if DIR exist or not, else create it
    if (!fs.existsSync(LogDir)) {
        mkdirp(LogDir).then(made => {
            fs.appendFile(LogFile, LogString, "utf8", function (err) {
                if (err) {
                }
            });
        }).catch(error => { 
        })
    } else {
        fs.appendFile(LogFile, LogString, "utf8", function (err) {
            if (err) { 
            }
        });
    }
}

//Provider Request logs
exports.providerRequestLog = function (providername,method,request) {
    let LogFile = '';
    let LogDir = common.ProjectRoot + 'logs/ProviderRequestLog/'+providername+'/'+ dateFormat(new Date(), "dd-mm-yyyy") + '/';
    let LogString = '';
    LogFile = common.ProjectRoot + 'logs/ProviderRequestLog/'+providername+'/'+ dateFormat(new Date(), "dd-mm-yyyy") + '/' + method + '_' + dateFormat(new Date(), "dd-mm-yyyy_H") + '.log';
    
    LogString += 'DateTime : ' + dateFormat(new Date(), "dd-mm-yyyy H:MM:ss") + ' \r\n';
    LogString += 'Method : ' + method + ' \r\n';
    LogString += 'Provider : ' + providername + ' \r\n';
    LogString += 'Request : ';
    LogString += JSON.stringify(request) + '\r\n\r\n';

    // check if DIR exist or not, else create it
    if (!fs.existsSync(LogDir)) {
        mkdirp(LogDir).then(made => {
            fs.appendFile(LogFile, LogString, "utf8", function (err) {
                if (err) {
                }
            });
        }).catch(error => { 
        })
    } else {
        fs.appendFile(LogFile, LogString, "utf8", function (err) {
            if (err) { 
            }
        });
    }
}

//Response logs
exports.responseLog = function (request,response) {
    let LogFile = '';
    let LogDir = common.ProjectRoot + 'logs/ResponseLog/'+request.providerName+'/'+ dateFormat(new Date(), "dd-mm-yyyy") + '/';
    let LogString = '';
    LogFile = common.ProjectRoot + 'logs/ResponseLog/'+request.providerName+'/'+ dateFormat(new Date(), "dd-mm-yyyy") + '/' + request.method + '_' + dateFormat(new Date(), "dd-mm-yyyy_H") + '.log';
    
    LogString += 'DateTime : ' + dateFormat(new Date(), "dd-mm-yyyy H:MM:ss") + ' \r\n';
    LogString += 'Method : ' + request.method + ' \r\n';
    LogString += 'Provider : ' + request.providerName + ' \r\n';
    LogString += 'Request : ';
    LogString += JSON.stringify(request.body) + '\r\n\r\n';
    LogString += 'Response : ';
    LogString += JSON.stringify(response) + '\r\n\r\n';

    // check if DIR exist or not, else create it
    if (!fs.existsSync(LogDir)) {
        mkdirp(LogDir).then(made => {
            fs.appendFile(LogFile, LogString, "utf8", function (err) {
                if (err) {
                }
            });
        }).catch(error => { 
        })
    } else {
        fs.appendFile(LogFile, LogString, "utf8", function (err) {
            if (err) { 
            }
        });
    }
}

//Error Logs
exports.errorLog = function (request, error) {

    //To-DO : conditional implement for api method, provider folder creates
    let LogFile = '';
    let LogDir = '';
    let LogString = '';
    if(typeof request.providerName != "undefined" && typeof request.method != "undefined" && request.providerName != '' && request.method != '')
    {
        LogDir =  common.ProjectRoot + 'logs/ErrorLog/'+request.providerName+'/'+ dateFormat(new Date(), "dd-mm-yyyy") + '/';
        LogFile = common.ProjectRoot + 'logs/ErrorLog/'+request.providerName+'/'+ dateFormat(new Date(), "dd-mm-yyyy") + '/'+request.method+'_'+ dateFormat(new Date(), "dd-mm-yyyy_H") + '.log';
    } else {
        LogDir =  common.ProjectRoot + 'logs/ErrorLog/' + dateFormat(new Date(), "dd-mm-yyyy") + '/';
        LogFile = common.ProjectRoot + 'logs/ErrorLog/' + dateFormat(new Date(), "dd-mm-yyyy") + '/errorLog_' + dateFormat(new Date(), "dd-mm-yyyy_H") + '.log';
    }    
    LogString += 'DateTime : ' + dateFormat(new Date(), "dd-mm-yyyy H:MM:ss") + ' \r\n';
    LogString += 'Request : ' + JSON.stringify(request) + ' \r\n';
    LogString += 'Error : ';
    LogString += error + '\r\n\r\n';

    // check if DIR exist or not, else create it
    if (!fs.existsSync(LogDir)) {
        mkdirp(LogDir).then(made => {
            fs.appendFile(LogFile, LogString, "utf8", function (err) {
                if (err) {

                }
            });
        }).catch(error => {
        })
    } else {
        fs.appendFile(LogFile, LogString, "utf8", function (err) {
            if (err) {

            }
        });
    }                  
}

//ProviderErrorLog
exports.providerErrorLog = function (provider,method,request, error) {
    let LogFile = '';
    let LogDir = common.ProjectRoot + 'logs/ErrorLog/'+provider+'/'+method+'/'+ dateFormat(new Date(), "dd-mm-yyyy") + '/';
    let LogString = '';
    
    LogFile = common.ProjectRoot + 'logs/ErrorLog/'+provider+'/'+method+'/'+ dateFormat(new Date(), "dd-mm-yyyy") + '/errorLog_' + dateFormat(new Date(), "dd-mm-yyyy_H") + '.log';
    
    LogString += 'DateTime : ' + dateFormat(new Date(), "dd-mm-yyyy H:MM:ss") + ' \r\n';
    LogString += 'Request : ' + JSON.stringify(request) + ' \r\n';
    LogString += 'Error : ';
    LogString += error + '\r\n\r\n';

    // check if DIR exist or not, else create it
    if (!fs.existsSync(LogDir)) {
        mkdirp(LogDir).then(made => {
            fs.appendFile(LogFile, LogString, "utf8", function (err) {
                if (err) {

                }
            });
        }).catch(error => {
        })
    } else {
        fs.appendFile(LogFile, LogString, "utf8", function (err) {
            if (err) {

            }
        });
    }                  
}

//Mysql errorlogs
exports.mysqlErrorLog = function (request, error) {
    let LogDir = common.ProjectRoot + 'logs/';
    let LogFile = common.ProjectRoot + 'logs/mysql_' + dateFormat(new Date(), "dd-mm-yyyy_H") + '.log';
    let LogString = '===================== Mysql Exception Error ======================\n';
    LogString += 'DateTime : ' + new Date() + '\n\n\r';
    LogString += 'ErrorDetail : ' + JSON.stringify(request) + '\n\n\r';
    LogString += 'Exception : ' + error + '\n\n\r';

    if (!fs.existsSync(LogDir)) {
        mkdirp(LogDir).then(made => {
            fs.appendFile(LogFile, LogString, "utf8", function (err) {
                if (err) {

                }
            });
        }).catch(error => {
        })
    } else {
        fs.appendFile(LogFile, LogString, "utf8", function (err) {
            if (err) {

            }
        });
    }
}

// Reload and Reset log cache
exports.reloadLogCache = function() {  
    logMemoryCache = {}; //reset global log cache
}
