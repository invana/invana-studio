/*


 */


class ConnectorBase {

    /*

        Connector is supposed to take care of requests and responses data.
        It is supplied with requestBuilder too, so that developers
        can build and query at convenience.




     */

    responseCls = null;
    responsesList = [];
    requestsList = [];

    constructor(serverUrl, responseEventsCallback, responseCallback, requestBuilder) {
        /*
        responseEventsCallback is to send the update events during fetching the data.
        responseCallback is for the final data.


         */
        console.log("connector constructor");
        this.serverUrl = serverUrl;
        this.responseEventsCallback = responseEventsCallback;
        this.responseCallback = responseCallback;
        this.requestBuilder = requestBuilder;
    }


    flushResponses(){
        this.responsesList = [];
    }

    addResponse2List(response) {
        const existingResponses = this.responsesList;
        existingResponses.push(response);
        this.requestsList = existingResponses;

    }

    getLastResponse() {
        console.log("this.responsesList.length", this.responsesList.length)
        return this.responsesList[this.responsesList.length - 1];
    }

    getResponses() {
        return this.responsesList;
    }

    flushResponseList() {
        this.responsesList = [];
    }

    gatherDataFromStream(response, transportStatusCode) {
        console.log("onmessage received", response);
        const responseObject = new this.responseCls(response, transportStatusCode);
        if (transportStatusCode >= 200 && transportStatusCode < 300) {
            if (transportStatusCode === 206) {
                this.responseEventsCallback({
                    statusMessage: "Gathering data from the stream",
                    statusCode: transportStatusCode,
                    isStreaming: true
                })
                this.addResponse2List(responseObject);
            } else {
                this.responseEventsCallback({
                    statusMessage: "Responded to the Query Successfully",
                    statusCode: transportStatusCode,
                    isStreaming: false
                })
                this.addResponse2List(responseObject);
                // const responses = Object.assign(this.responsesList);
                // this.flushResponseList();
                this.responseCallback(responseObject);
            }
        } else {
            console.log("response===========", response);
            this.addResponse2List(responseObject);
            // const responses = Object.assign(this.responsesList);
            this.responseEventsCallback({
                statusMessage: "Query Failed with " + transportStatusCode + " error.",
                statusCode: transportStatusCode,
                isStreaming: false
            })
            this.responseCallback(responseObject);
        }
    }


}

export default ConnectorBase
