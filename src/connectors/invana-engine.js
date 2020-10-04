import ConnectorBase from "./base";
import {getDataFromLocalStorage, postData} from "../core/utils";
import {AUTH_CONSTANTS} from "../config";

export default class InvanaEngineHTTPConnector extends ConnectorBase {


    query(query_string) {
        const payload = {"gremlin": query_string};
        const extraHeaders = getDataFromLocalStorage(AUTH_CONSTANTS.httpHeadersKey, true) || {};
        const _this = this;
        postData(this.serverUrl, extraHeaders, payload).then((data) => {
            // check the status and response type and change isConnected
            _this.gatherDataFromStream(data.response, data.transporterStatusCode);
        });
    }
}
