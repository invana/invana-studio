/*


 */

class ProtocolBase {


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

    gatherDataFromStream(statusCode, response) {
        console.log("onmessage received", response);
        if (statusCode >= 200 && statusCode < 300) {
            // this.setErrorMessage(null)
            if (statusCode === 206) {
                // this.setIsStreaming(true);
                // this.setStatusMessage("Gathering data from the stream");
                this.responseEventsCallback("Gathering data from the stream",
                    statusCode,
                    true
                )
                this.streamResponses.push(response);
            } else {
                this.streamResponses.push(response);
                // this.setIsStreaming(false);
                // this.setStatusMessage("Responded to the Query Successfully");
                this.responseEventsCallback("Responded to the Query Successfully",
                    statusCode,
                    false
                )
                const responses = Object.assign(this.streamResponses);
                this.flushStreamResponsesData();
                // this._processResponse(responses);
                this.responseCallback(responses);
            }
            // this.setIsConnected2Gremlin(true);
        } else {
            // this.setIsStreaming(false);
            console.log("response===========", response);
            // this.setIsConnected2Gremlin(false);
            // this.setErrorMessage(response.status)
            // this.setStatusMessage("Query Failed with " + statusCode + " error.");
            this.streamResponses.push(response);
            const responses = Object.assign(this.streamResponses);
            // this._processResponse(responses);
            this.responseEventsCallback("Query Failed with " + statusCode + " error.",
                statusCode,
                false
            )
            this.responseCallback(responses);
        }
    }


}

export default ProtocolBase
