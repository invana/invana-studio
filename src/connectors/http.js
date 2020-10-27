import ConnectorBase from "./base";
import {getDataFromLocalStorage, postData} from "../core/utils";
import {GE_CONSTANTS} from "../config";
import GremlinResponse from "../responses/gremlin";

export default class DefaultHTTPConnector extends ConnectorBase {

    responseCls = GremlinResponse;

    query(query_string) {
        const payload = {"gremlin": query_string};
        const extraHeaders = getDataFromLocalStorage(GE_CONSTANTS.httpHeadersKey, true) || {};
        const _this = this;
        postData(this.serverUrl, extraHeaders, payload).then((data) => {
            // check the status and response type and change isConnected
            _this.gatherDataFromStream(data.response, data.transporterStatusCode);
        });

    }
}
