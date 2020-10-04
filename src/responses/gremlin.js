/*

*/


export default class GremlinResponse {

    constructor(gremlinResponse, transporterStatusCode) {
        this.gremlinResponse = gremlinResponse;
        this.transporterStatusCode = transporterStatusCode;
    }

    getResponseData() {
        return this.getResponseResult().data;
    }

    getResponseResult() {
        return this.gremlinResponse.result;
    }

    getGremlinStatusCode() {
        return this.gremlinResponse.status.code || this.transporterStatusCode;
    }

    getError() {
        return this.gremlinResponse.status;
    }


}
