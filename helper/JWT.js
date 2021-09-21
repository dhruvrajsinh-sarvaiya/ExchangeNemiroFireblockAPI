/*JWT token process.*/

const jwt = require("jsonwebtoken"),
    commonParams = require("../config/common"),
    privateKey = new Buffer(commonParams.ENCSK, 'base64').toString('ascii'),
    publicKey = new Buffer(commonParams.ENCPK, 'base64').toString('ascii');
/* create token*/
exports.createToken = function (data, callback) {

    let response = {};
    try {
        var token = jwt.sign({data: data},privateKey , {algorithm: 'RS256'});
        response.status = 0;
        response.token = token;
        callback(null, response);
    } catch (e) {

        response.status = 1;
        response.err = e.toString();
        callback(response);
    }
};

/* validate token & decode it*/
exports.verifyToken = async function (data, callback) {
    let response = {};
    try {
        /* validate token*/
        jwt.verify(data.authorization.split(" ")[1], publicKey,function(err,decode){

            if(err){
                response.status = 9;
                response.message = "Invalid token";
                response.errCode = 1004;
                callback(false,response);
            }else{
                if (data.ip != decode.data.ip) {
                    response.status = 9;
                    response.message = "Invalid token";
                    response.errCode = 1004;
                    callback(false,response);
                } else if (data.deviceInfo != decode.data.deviceInfo) {
                    response.status = 9;
                    response.message = "Invalid token";
                    response.errCode = 1004;
                    callback(false,response);
                } else {
                    response.status = 0;
                    response.data = decode.data;
                    callback(true,response);
                }
            }
        });
    } catch (err) {

        response.status = 9;
        response.message = "Invalid token";
        response.errCode = 1004;
        callback(false,response);
    }
};