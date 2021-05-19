import React from "react";
import DefaultLayout from "../layouts/default";
import {STUDIO_SETTINGS} from "../../settings";
import {setElementColorOptionsToStorageUsingResponse} from "../../utils/localStorage";
import DefaultRemoteRoutableComponent from "../layouts/default-remote-routable";

export default class IndexView extends DefaultRemoteRoutableComponent {




    componentDidMount() {
        super.componentDidMount();

        console.log("this.connector", this.connector);
        if (this.connector) {
            console.log("=_this.connector.requestBuilder.initQuery()", this.connector.requestBuilder.initQuery());
            const showVerticesQuery = this.connector.requestBuilder.filterVertices(
                STUDIO_SETTINGS.MANAGEMENT_VERTEX_LABEL, 100
            );
            const queryPayload = this.connector.requestBuilder.combineQueries(showVerticesQuery, null);
            this.makeQuery(queryPayload, {source: "internal"});
        }
    }


    processResponse(response) {
        console.log("processResponse received", response);
        const transporterStatusCode = response.transporterStatusCode;
        if (transporterStatusCode >= 200 && transporterStatusCode < 300) {
            setElementColorOptionsToStorageUsingResponse(response);
            this.routeToExplorer();
        } else {
            console.log("response.status", response.status, response.status !== undefined);
            this.routeToConnect(transporterStatusCode);
        }
    }

    render() {

        return (
            <DefaultLayout {...this.props} ref={this.child}>
            </DefaultLayout>
        );
    }
}
