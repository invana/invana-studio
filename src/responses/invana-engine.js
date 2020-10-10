import ResponseBase from "./base";

export default class InvanaEngineResponse extends ResponseBase {


    getResponseData() {
        return this.getResponseResult();
    }

    getResponseResult() {
        console.log("getResponseResult", this.response, Object.keys(this.response.data)[0],  this.response.data[Object.keys(this.response.data)[0]]);
        if (this.response.data) {
            return this.response.data[Object.keys(this.response.data)[0]];
        } else {
            return [];
        }
    }

    getStatusCode() {
        return this.transporterStatusCode;
    }

    getError() {
        if (this.response.errors && this.response.errors.length > 0) {
            return this.response.errors[0].message;
        } else {
            return null;
        }

    }
}

