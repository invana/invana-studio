/*

*/


export default class ResponseBase {

    constructor(response, transporterStatusCode) {
        this.response = response;
        this.transporterStatusCode = transporterStatusCode;
    }

    getResponseData() {
        throw new TypeError("Please implement abstract method getResponseData.");

    }

    getResponseResult() {
        throw new TypeError("Please implement abstract method getResponseResult.");
    }

    getStatusCode() {
        throw new TypeError("Please implement abstract method getStatusCode.");
    }

    getError() {
        throw new TypeError("Please implement abstract method getStatusCode.");
    }
}
