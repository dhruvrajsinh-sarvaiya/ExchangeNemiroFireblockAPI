module.exports = class ResponseCodes {
    constructor() {
        this.codes = {
            AUTHENTICATION: {
                INVALID_TOKEN: {message: "Invalid token",responseCode:1, code: 6000},
            },
            FAILED: {
                INTERNAL_ERROR: {message: "Internal Error. Please try after sometime",responseCode:1, code: 7000},
                TOKEN_GENERATION_FAILED : {message: "Token generation failed. Please try after sometime",responseCode:1, code: 7001},
                SITE_DETAIL_NOT_FOUND : {message: "Site details not found",responseCode:1, code: 7002},
                IP_ADDRESS_NOT_WHITELISTED : {message: "IP Address not whitelisted for this site",responseCode:1, code: 7003},
                PROVIDER_NOT_FOUND : {message: "Provider details not found",responseCode:1, code: 7004},
                METHOD_NOT_FOUND : {message: "Method Details not found",responseCode:1, code: 7005},
                PROVIDER_SDK_ERROR : {message: "Method Details not found",responseCode:1, code: 7006},
            },
                SUCCESS: {
                SUCESS: {message: "Success",responseCode:0, code: 5001}
            },
            VALIDATION: {}
        }
    }
    getSucessResponseCode(variableName){
        try {
            return typeof this.codes.SUCCESS[variableName] !== "undefined" ?  this.codes.SUCCESS[variableName] : {}
        } catch (e) {
            return {}
        }
    }

    getFailedResponseCode(variableName){
        try {
            return typeof this.codes.FAILED[variableName] !== "undefined" ?  this.codes.FAILED[variableName] : {}
        } catch (e) {
            return {}
        }
    }

    getAuthenticationResponseCode(variableName){
        try {
            return typeof this.codes.AUTHENTICATION[variableName] !== "undefined" ?  this.codes.AUTHENTICATION[variableName] : {}
        } catch (e) {
            return {}
        }
    }

    getValidationResponseCode(variableName){
        try {
            return typeof this.codes.VALIDATION[variableName] !== "undefined" ?  this.codes.VALIDATION[variableName] : {}
        } catch (e) {
            return {}
        }
    }
}