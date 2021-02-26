import ResponseBase from "./base";

export default class GremlinResponse extends ResponseBase{


    getResponseData() {
        return this.getResponseResult().data;
    }

    getResponseResult() {
        return this.response.result;
    }

    getStatusCode() {
        return this.response.status.code || this.transporterStatusCode;
    }

    getError() {
        return this.response.status;
    }
}
