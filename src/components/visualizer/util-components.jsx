import React from 'react';


export default function CanvasStatsCanvas(props) {
    return <div id={"canvas-stats"}>{props.nodes_count} nodes; {props.links_count} edges;</div>;
}


export function NotificationDiv(props) {
    return <div id="notifications-div"></div>;
}


export class ConnectionStatus extends React.Component {

    startRenderingConnectionStatus() {
        console.log("======isConnected2Server, ", this.props);
        let connectionElement = document.querySelector("#connection-status span");

        if (connectionElement) {
            if (this.props.isConnected2Server === true) {
                connectionElement.className = "server-connected";
                // connectionElement.innerHTML = this.state.statusMessage;
                connectionElement.title = "Connected";
            } else if (this.props.isConnected2Server === false) {
                connectionElement.className = "server-not-connected";
                // connectionElement.innerHTML = this.state.statusMessage;
                connectionElement.title = "Unable to Connect";
            } else {
                connectionElement.className = "";
                // connectionElement.innerHTML = this.state.statusMessage;
                connectionElement.title = "";
            }
        }

    }

    render() {
        this.startRenderingConnectionStatus();

        console.log("=================== Rendering the Viewer ===================");


        return (
            <div id="connection-status">
                <span>{this.props.statusMessage}</span>
                { this.props.showErrorMessage && this.props.errorMessage ?
                    (
                        <div id={"errorMessage"}>
                            <button onClick={this.props.closeErrorMessage} className={"errorHideBtn"}>dismiss message</button>
                            <div style={{"marginTop":"15px"}}>{this.props.errorMessage}</div>
                        </div>
                    ) : ( <span></span>)
                }



            </div>
        )
    }
}


export function CopyRightInfo(props) {
    return <div id="copy-right-info-div">Invana Graph</div>;
}


