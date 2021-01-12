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
        setTimeout(function () {
            _this.makeQuery(_this.connector.requestBuilder.filterVertices(
                STUDIO_SETTINGS.managementVertexLabel, 1
            ), {source: "internal"});
        }, 500)
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
