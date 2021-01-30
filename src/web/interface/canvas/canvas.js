import React from "react";
import "./canvas.scss";
import VisNetworkReactComponent from "vis-network-react";
import events from "./events";
import defaultOptions from "./options";
import CanvasComponent from "../../ui-components/canvas";


class ForceDirectedGraphCanvas extends React.Component {

    shouldComponentUpdate(nextProps) {
       return this.props.resetVisualizer;
        // return nextProps.value !== this.props.value;
    }

    render() {
        return (
            <div className={"canvasContainer"}>

                {/*<VisNetworkReactComponent*/}
                {/*    data={{nodes: this.props.nodes, edges: this.props.edges}}*/}
                {/*    options={defaultOptions}*/}
                {/*    events={events}*/}
                {/*    getNetwork={this.props.getNetwork}*/}
                {/*    getNodes={this.props.getNodes}*/}
                {/*    getEdges={this.props.getEdges}*/}
                {/*    // getNodes={getNodes}*/}
                {/*/>*/}


                <VisNetworkReactComponent
                    data={{nodes: this.props.nodes, edges: this.props.edges}}
                    options={defaultOptions}
                    events={events}
                    getNetwork={this.props.getNetwork}
                    // getNodes={this.props.getNodes}
                    // getEdges={this.props.getEdges}
                    // getNodes={getNodes}
                />
            </div>
        )
    }
}

export default ForceDirectedGraphCanvas;
