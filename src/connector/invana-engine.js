import ConnectorBase from "./base";
import {STUDIO_CONNECT_CONSTANTS} from "../settings";
import InvanaEngineResponse from "./responses/invana-engine";
import {getDataFromLocalStorage} from "../web/utils";
import {postData} from "./utils";

export default class InvanaEngineHTTPConnector extends ConnectorBase {

    responseCls = InvanaEngineResponse

    query(queryPayload) {
        // queryPayload = JSON.stringify(queryPayload);
        // const payload = {"query": "{rawQuery(gremlin:" + JSON.stringify(queryPayload) + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}}"};
        const extraHeaders = getDataFromLocalStorage(STUDIO_CONNECT_CONSTANTS.HTTP_HEADERS, true) || {};
        const _this = this;
        postData(this.serverUrl, extraHeaders, queryPayload).then((data) => {
            // check the status and response type and change isConnected
            console.log("InvanaEngineHTTPConnector", data);
            _this.gatherDataFromStream(data.response, data.transporterStatusCode);
        });
    }
}
