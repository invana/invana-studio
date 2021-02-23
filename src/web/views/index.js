import React from "react";
import {
    STUDIO_SETTINGS
} from "../../settings";
import DefaultLayout from "../layout/default";
import RoutableRemoteEngine from "../layout/routable-remote";


export default class IndexView extends RoutableRemoteEngine {


    componentDidMount() {
        super.componentDidMount();

        if (this.connector) {
            console.log("=_this.connector.requestBuilder.initQuery()", this.connector.requestBuilder.initQuery());
            const showVerticesQuery = this.connector.requestBuilder.filterVertices(
                STUDIO_SETTINGS.managementVertexLabel, 1
            );
            const queryPayload = this.connector.requestBuilder.combineQueries(showVerticesQuery, null);
            this.makeQuery(queryPayload, {source: "internal"});
        }
    }


    processResponse(response) {
        console.log("processResponse received", response);
        const transporterStatusCode = response.transporterStatusCode;
        if (transporterStatusCode >= 200 && transporterStatusCode < 300) {
            // setElementColorOptionsToStorageUsingResponse(response);
            this.routeToExplorer();
        } else {
            console.log("response.status", response.status, response.status !== undefined);
            // this.routeToConnect(statusCode);
            // _this.setState({
            //     "errorMessage": JSON.stringify(response,),
            //     "showErrorMessage": true,
            //     "statusMessage": "Query Successfully Responded." + " But returned non 200 status[" + statusCode + "]"
            // })

            this.routeToConnect(transporterStatusCode);
            // const statusCode = response.status !== undefined ? response.status.code : response.transporterStatusCode;
        }
    }

    render() {
        return (<DefaultLayout {...this.props} ref={this.child}> </DefaultLayout>)
    }


}
