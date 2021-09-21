module.exports = class ResponseCodes {
    constructor() {
        this.codes = {
            AUTHENTICATION: {
                INVALID_TOKEN: {message: "Invalid token",responseCode:0, code: 3000},
            },
            FAILED: {
                INTERNAL_ERROR: {message: "Internal Error. Please try after sometime",responseCode:0, code: 2000},
                TOKEN_GENERATION_FAILED : {message: "Token generation failed. Please try after sometime",responseCode:0, code: 2001},
                SITE_DETAIL_NOT_FOUND : {message: "Site details not found",responseCode:0, code: 2002},
                IP_ADDRESS_NOT_WHITELISTED : {message: "IP Address not whitelisted for this site",responseCode:0, code: 2003},
                PROVIDER_NOT_FOUND : {message: "Provider details not found",responseCode:0, code: 2004},
                METHOD_NOT_FOUND : {message: "Method Details not found",responseCode:0, code: 2005},
            },
                SUCCESS: {
                SUCESS: {message: "Success",responseCode:1, code: 1000}
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