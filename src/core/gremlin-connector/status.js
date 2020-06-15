import React from "react";
import ConnectionIndicatorComponent from "./indicator";



export default class ConnectionStatusComponent extends React.Component {
    /*
    This component will show the status of the gremlin connection. ie, shows

    statusMessage
    Connection status Indicator

     */
    render() {
        return (
            <div className={"statusMessage"}>
                <ConnectionIndicatorComponent isConnected2Gremlin={this.props.isConnected2Gremlin} />
                {this.props.statusMessage || ""}
            </div>
        );
    }
}