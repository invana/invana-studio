import ResponseBase from "./base";

export default class InvanaEngineResponse extends ResponseBase {


    getResponseData() {
        return this.getResponseResult();
    }

    getResponseResult(queryKey) {
        console.log("getResponseResult", queryKey, this.response.data);
        // console.log("getResponseResult", this.response, Object.keys(this.response.example-data)[0],  this.response.example-data[Object.keys(this.response.example-data)[0]]);
        if (queryKey) {
            return this.response.data[queryKey];
        } else {
            return this.response.data;
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

