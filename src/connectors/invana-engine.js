import ConnectorBase from "./base";
import {getDataFromLocalStorage, postData} from "../core/utils";
import {GE_CONSTANTS} from "../config";
import InvanaEngineResponse from "../responses/invana-engine";

export default class InvanaEngineHTTPConnector extends ConnectorBase {

    responseObjectCls = InvanaEngineResponse

    query(query_string) {

        const payload = {"query": "{rawQuery(gremlin:" + JSON.stringify(query_string) + "){id,type,label,properties}}"};
        const extraHeaders = getDataFromLocalStorage(GE_CONSTANTS.httpHeadersKey, true) || {};
        const _this = this;
        postData(this.serverUrl, extraHeaders, payload).then((data) => {
            // check the status and response type and change isConnected
            console.log("InvanaEngineHTTPConnector", data);
            _this.gatherDataFromStream(data.response, data.transporterStatusCode);
        });
    }
}
