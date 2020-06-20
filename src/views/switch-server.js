import React from "react";
import {removeGremlinFromStorage, redirectToConnectIfNeeded} from "../core/utils";

export default class SwitchServerView extends React.Component {


    render() {
        redirectToConnectIfNeeded();
        removeGremlinFromStorage();
        window.location.href = "/";
        return (
            <span>switching server...</span>
        )

    }
}
