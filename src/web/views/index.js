import React from "react";
import {
    STUDIO_SETTINGS
} from "../../settings";
import RemoteEngine from "../layout/remote";


export default class IndexView extends RemoteEngine {


    componentDidMount() {
        super.componentDidMount();
        let _this = this;
        console.log("=_this.connector.requestBuilder.initQuery()", _this.connector.requestBuilder.initQuery())
        const showVerticesQuery = _this.connector.requestBuilder.filterVertices(
            STUDIO_SETTINGS.managementVertexLabel, 1
        );
        const queryPayload = this.connector.requestBuilder.combineQueries(showVerticesQuery, null)
        _this.makeQuery(queryPayload, {source: "internal"});
    }

    processResponse(response) {
        let _this = this;
        console.log("processResponse received", response);
        const transporterStatusCode = response.transporterStatusCode;
        if (transporterStatusCode >= 200 && transporterStatusCode < 300) {
            // setElementColorOptionsToStorageUsingResponse(response);
            window.location.href = "/explorer";
        } else {
            window.location.href = "/connect?error=Failed to connect&transporterStatus=" + transporterStatusCode;
            _this.setState({
                "errorMessage": JSON.stringify(response,),
                "showErrorMessage": true,
                "statusMessage": "Query Successfully Responded." +
                    " But returned non 200 status[" + response.status.code + "]"
            })
        }
    }

    render() {
        return (<div></div>)
    }

}
