const path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    logger = require('morgan'),
    commonConfig = require('./config/common'),
    dateFormat = require('dateFormat'),
    fs = require('fs'),
    helmet = require('helmet');


const app = express();
app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

require("./helper/route")(app);
app.get("/check",function(req,res){
    res.status(200).json({msg:"Server running"}).end()
})

// Raising SecondEvent

process.on('uncaughtException', function (err) {
    console.log(err)
    let ErrorLogFile = commonConfig.projectRoot + 'logs/UncaughtException' + dateFormat(new Date(), "dd-mm-yyyy") + '.log';
    let LogString = '===================== Uncaught Exception Error ======================\n';
    LogString += 'DateTime : ' + new Date() + '\n\n\r';
    LogString += 'Exception : ' + err.toString() + '\n\n\r';
    fs.appendFile(ErrorLogFile, LogString, "utf8", function (err) {
        if (err) {
        }
    });
}).on('unhandledRejection', function (err) {
    console.log(err)
    let ErrorLogFile = commonConfig.projectRoot + 'logs/unhandledRejection' + dateFormat(new Date(), "dd-mm-yyyy") + '.log';
    let LogString = '===================== Unhandled Rejection Warning ======================\n';
    LogString += 'DateTime : ' + new Date() + '\n\n\r';
    LogString += 'Exception : ' + err.toString() + '\n\n\r';
    fs.appendFile(ErrorLogFile, LogString, "utf8", function (err) {
        if (err) {
        }
    });
});

module.exports = app;