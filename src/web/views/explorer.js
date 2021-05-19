import React from "react";
import DefaultLayout from "../layouts/default";
import GraphCanvas from "../viewlets/canvas/graph-canvas";
import DefaultRemoteRoutableComponent from "../layouts/default-remote-routable";
import {STUDIO_SETTINGS} from "../../settings";


export default class Explorer extends DefaultRemoteRoutableComponent {

    static defaultProps = {
        connectionUrl: STUDIO_SETTINGS.CONNECTION_URL,
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
        }
    }


    render() {
        return (
            <DefaultLayout {...this.props}>
                <GraphCanvas/>
            </DefaultLayout>
        );
    }
}
