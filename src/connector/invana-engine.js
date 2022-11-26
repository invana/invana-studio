import ConnectorBase from "./base";
import InvanaEngineResponse from "./responses/invana-engine";
import {postData} from "./utils";
import {getDataFromLocalStorage} from "../utils/localStorage";
import {STUDIO_CONNECT_CONSTANTS} from "../settings/constants";

export default class InvanaEngineHTTPConnector extends ConnectorBase {

    /*
    USAGE:

    const connector =  new InvanaEngineHTTPConnector(
        this.props.connectionUrl,
        this.responseEventsCallback.bind(this),
        this.onResponseCallback.bind(this),
        requestBuilder
    );

    const  queryPayload = {"query": "{executeQuery(gremlin: 'g.V().limit(3).toList()'){id, type, label, properties}}"};
    connector.query(queryPayload)



     */

    responseCls = InvanaEngineResponse

    query(queryPayload) {
        /*


         */
        const extraHeaders = getDataFromLocalStorage(STUDIO_CONNECT_CONSTANTS.HTTP_HEADERS, true) || {};
        const _this = this;
        postData(this.serverUrl, extraHeaders, queryPayload).then((data) => {
            // check the status and response type and change isConnected
            console.log("InvanaEngineHTTPConnector", data);
            _this.gatherDataFromStream(
                data.response,
                data.transporterStatusCode,
                data.transportTime
            );
        });
    }
}
