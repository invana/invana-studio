import React from "react";
import "./canvas.scss";
import VisNetworkReactComponent from "vis-network-react";
import events from "./events";
import defaultOptions from "./options";


class ForceDirectedGraphCanvas extends React.Component {

    // shouldComponentUpdate(nextProps) {
    //    return false;
    //     // return nextProps.value !== this.props.value;
    // }

    render() {

        // defaultOptions['groups'] = {useDefaultGroups: false, ...this.props.nodeGroups};
        // defaultOptions['groups'] = this.props.nodeGroups;
        console.log("====this.data", this.props.nodes, this.props.edges);
        console.log("====defaultOptions", defaultOptions);
        return (
            <div className={"canvasContainer"}>

                <VisNetworkReactComponent
                    data={{nodes: this.props.nodes, edges: this.props.edges}}
                    options={defaultOptions}
                    events={events}
                    getNetwork={this.props.getNetwork}
                    getNodes={this.props.getNodes}
                    getEdges={this.props.getEdges}
                    // getNodes={getNodes}
                />
            </div>
        )
    }
}

export default ForceDirectedGraphCanvas;
