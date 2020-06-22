import React from "react";
import {askToSwitchGremlinServer, redirectToConnectIfNeeded} from "../core/utils";

export default class SwitchServerView extends React.Component {


    render() {
        redirectToConnectIfNeeded();
        askToSwitchGremlinServer();
        window.location.href = "/";
        return (
            <span>switching server...</span>
        )

    }
}
