import React from "react";
import {GREMLIN_SERVER_URL, uuidv4} from "../config";

export class GremlinConnector extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            statusMessage: "",
            isConnected2Server: ""
        }

    }


    render() {
        // this.sendQuery();

        this.startRenderingConnectionStatus();

        return <div id="connection-status"><span>{this.state.statusMessage}</span></div>;
    }

}
