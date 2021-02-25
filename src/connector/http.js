import ConnectorBase from "./base";
import {postData} from "./utils";
import {STUDIO_CONNECT_CONSTANTS} from "../settings";
import GremlinResponse from "./responses/gremlin";
import {getDataFromLocalStorage} from "../web/utils";

export default class DefaultHTTPConnector extends ConnectorBase {

    responseCls = GremlinResponse;

    query(query_string) {
        const payload = {"gremlin": query_string};
        const extraHeaders = getDataFromLocalStorage(STUDIO_CONNECT_CONSTANTS.HTTP_HEADERS, true) || {};
        const _this = this;
        postData(this.serverUrl, extraHeaders, payload).then((data) => {
            // check the status and response type and change isConnected
            _this.gatherDataFromStream(data.response, data.transporterStatusCode);
        });

    }
}
