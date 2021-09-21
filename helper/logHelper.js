const common = require("../config/common"),
    fs = require('fs'),
    dateFormat = require("dateformat"),
    mkdirp = require("mkdirp");


exports.socketErrorLog = function (request, error) {
    let ErrorLogFile = common.ProjectRoot + 'logs/mysql_' + dateFormat(new Date(), "dd-mm-yyyy") + '.log';
    let LogString = '===================== Uncaught Exception Error ======================\n';
    LogString += 'DateTime : ' + new Date() + '\n\n\r';
    LogString += 'Exception : ' + error.toString() + '\n\n\r';
    fs.appendFile(ErrorLogFile, LogString, "utf8", function (err) {
        if (err) {
        }
    });
}

// Reload and Reset log cache
exports.reloadLogCache = function() {  
    logMemoryCache = {}; //reset global log cache
}
