/*


 */


class ConnectorBase {

    responseObjectCls = null;
    streamResponses = [];

    constructor(serverUrl, responseEventsCallback, responseCallback) {
        /*
        responseEventsCallback is to send the update events during fetching the data.
        responseCallback is for the final data.


         */
        this.serverUrl = serverUrl;
        this.responseEventsCallback = responseEventsCallback;
        this.responseCallback = responseCallback;
    }


    flushStreamResponsesData() {
        this.streamResponses = [];
    }

    gatherDataFromStream(response, transportStatusCode) {
        console.log("onmessage received", response);
        const responseObject = new this.responseObjectCls(response, transportStatusCode);
        if (transportStatusCode >= 200 && transportStatusCode < 300) {
            if (transportStatusCode === 206) {
                this.responseEventsCallback({
                    statusMessage: "Gathering data from the stream",
                    statusCode: transportStatusCode,
                    isStreaming: true
                })
                this.streamResponses.push(responseObject);
            } else {
                this.responseEventsCallback({
                    statusMessage: "Responded to the Query Successfully",
                    statusCode: transportStatusCode,
                    isStreaming: false
                })
                this.streamResponses.push(responseObject);
                const responses = Object.assign(this.streamResponses);
                this.flushStreamResponsesData();
                this.responseCallback(responses);
            }
        } else {
            console.log("response===========", response);
            this.streamResponses.push(responseObject);
            const responses = Object.assign(this.streamResponses);
            this.responseEventsCallback({
                statusMessage: "Query Failed with " + transportStatusCode + " error.",
                statusCode: transportStatusCode,
                isStreaming: false
            })
            this.responseCallback(responses);
        }
    }


}

export default ConnectorBase
