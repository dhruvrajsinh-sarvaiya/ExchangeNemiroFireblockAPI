const path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    logger = require('morgan'),
    commonConfig = require('./config/common'),
    dateFormat = require('dateFormat'),
    fs = require('fs'),
    helmet = require('helmet');

const app = express();
//app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('hello, world!')
});

app.post("/check",function(req,res){
    res.status(200).json({msg:"Server running"}).end()
});

require("./helper/route")(app);

// Raising SecondEvent

process.on('uncaughtException', function (err) {
    
    let LogDir = commonConfig.ProjectRoot + 'logs/';
    let LogFile = commonConfig.projectRoot + 'logs/UncaughtException' + dateFormat(new Date(), "dd-mm-yyyy") + '.log';
    let LogString = '===================== Uncaught Exception Error ======================\n';
    LogString += 'DateTime : ' + new Date() + '\n\n\r';
    LogString += 'Exception : ' + err.stack + '\n\n\r';

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
}).on('unhandledRejection', function (err) {
    
    let LogDir = commonConfig.ProjectRoot + 'logs/';
    let LogFile = commonConfig.projectRoot + 'logs/unhandledRejection' + dateFormat(new Date(), "dd-mm-yyyy") + '.log';
    let LogString = '===================== Unhandled Rejection Warning ======================\n';
    LogString += 'DateTime : ' + new Date() + '\n\n\r';
    LogString += 'Exception : ' + err.stack + '\n\n\r';
    
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
});

module.exports = app;