/*


 */


class ConnectorBase {

    /*

        Connector is supposed to take care of requests and responses example-data.
        It is supplied with requestBuilder too, so that developers
        can build and query at convenience.




     */

    responseCls = null;
    responsesList = [];
    requestsList = [];

    constructor(serverUrl, responseEventsCallback, responseCallback, requestBuilder) {
        /*
        responseEventsCallback is to send the update events during fetching the example-data.
        responseCallback is for the final example-data.


         */
        console.log("connector constructor");
        this.serverUrl = serverUrl;
        this.responseEventsCallback = responseEventsCallback;
        this.responseCallback = responseCallback;
        this.requestBuilder = requestBuilder;
    }


    flushResponses() {
        this.responsesList = [];
    }

    addResponse2List(response) {
        const existingResponses = this.responsesList;
        existingResponses.push(response);
        this.requestsList = existingResponses;

    }

    getLastResponse() {
        return this.responsesList[this.responsesList.length - 1];
    }

    getResponses() {
        return this.responsesList;
    }

    flushResponseList() {
        this.responsesList = [];
    }

    gatherDataFromStream(response, transportStatusCode, transportTime) {
        console.log("onmessage received", JSON.stringify(response));
        const responseObject = new this.responseCls(response, transportStatusCode, transportTime);
        if (transportStatusCode >= 200 && transportStatusCode < 300) {
            if (transportStatusCode === 206) {
                this.responseEventsCallback({
                    statusMessage: "Gathering example-data from the stream",
                    lastResponseStatusCode: transportStatusCode,
                    lastResponseElapsedTime: responseObject.transportTime,

                    isStreaming: true
                })
                this.addResponse2List(responseObject);
            } else {
                this.responseEventsCallback({
                    statusMessage: "Responded to the Query Successfully",
                    lastResponseStatusCode: transportStatusCode,
                    lastResponseElapsedTime: responseObject.transportTime,

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
                lastResponseStatusCode: transportStatusCode,
                lastResponseElapsedTime: responseObject.transportTime,

                isStreaming: false
            })
            this.responseCallback(responseObject);
        }
    }


}

export default ConnectorBase
