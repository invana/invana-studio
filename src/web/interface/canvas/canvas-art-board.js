import React from "react";
import "./canvas.scss";
import VisNetworkReactComponent from "vis-network-react";
import PropTypes from "prop-types";
import {getNetworkOptions} from "../../viewlets/canvas/canvas-utils";

// import {STUDIO_SETTINGS} from "../../../settings";


class CanvasArtBoard extends React.Component {

    static propTypes = {
        resetVisualizer: PropTypes.bool,
        setSelectedElementData: PropTypes.func,
        setNodeMenuPosition: PropTypes.func,
        setNetwork: PropTypes.func,
        nodes: PropTypes.array,
        edges: PropTypes.array,
        stopRenderingGraph: PropTypes.func,
        hiddenNodeLabels: PropTypes.array,
        hiddenEdgeLabels: PropTypes.array
    }

    shouldComponentUpdate() {
        return this.props.resetVisualizer;
        // return nextProps.value !== this.props.value;
    }

    getEvents() {

        let _this = this;
        return {
            click: function (params) {
                params.event = "[original event]";
                // console.log(
                //     "click event, getNodeAt returns: ", params, this.getNodeAt(params.pointer.DOM)
                // );
                if (params.edges.length === 0 && params.nodes.length === 0) {
                    _this.props.setSelectedElementData(null);
                }
            },
            doubleClick: function (params) {
                // console.log("doubleClick Event:", params);
                params.event = "[original event]";
                if (params.edges.length === 0 && params.nodes.length === 0) {
                    _this.props.setSelectedElementData(null);
                }
            },
            oncontext: function (params) {
                console.log("oncontext Event:", params);

                params.event = "[original event]";
            },
            dragStart: function (params) {
                // There's no point in displaying this event on screen, it gets immediately overwritten
                params.event = "[original event]";
                console.log("dragStart Event:", params);
                console.log(
                    "dragStart event, getNodeAt returns: " +
                    this.getNodeAt(params.pointer.DOM)
                );
                _this.props.setNodeMenuPosition(null, null);
                _this.props.setSelectedElementData(null);

            },
            dragging: function (params) {
                params.event = "[original event]";
            },
            dragEnd: function (params) {
                params.event = "[original event]";
                console.log("dragEnd Event:", params);
                console.log(
                    "dragEnd event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM)
                );
            },
            controlNodeDragging: function (params) {
                params.event = "[original event]";
            },
            controlNodeDragEnd: function (params) {
                params.event = "[original event]";
                console.log("controlNodeDragEnd Event:", params);
            },
            zoom: function (params) {
                console.log("params", params);

            },
            showPopup: function (params) {
                console.log("params", params);
            },
            hidePopup: function () {
                console.log("hidePopup Event");
            },
            select: function (params) {
                console.log("select Event:", params);
            },
            selectNode: function (params) {
                console.log("selectNode Event:", params);
                // const selectedNode = this.props.getNetwork().get(params.nodes[0])
                // console.log("selectedNode", selectedNode)
            },
            selectEdge: function (params) {
                console.log("selectEdge Event:", params);

            },
            deselectNode: function (params) {
                console.log("deselectNode Event:", params);
            },
            deselectEdge: function (params) {
                console.log("deselectEdge Event:", params);
            },
            hoverNode: function (params) {
                // console.log("hoverNode Event:", params);
                if (params.event) {
                    _this.props.setSelectedElementData(params.node, "g:Vertex");
                    _this.props.setNodeMenuPosition(params.event.pageX, params.event.pageY);
                }
            },
            hoverEdge: function (params) {
                // console.log("hoverEdge Event:", params);
                if (params.event) {
                    _this.props.setSelectedElementData(params.edge, "g:Edge");
                    _this.props.setNodeMenuPosition(params.event.pageX, params.event.pageY);
                }
            },
            blurNode: function (params) {
                console.log("blurNode Event:", params);
            },
            blurEdge: function (params) {
                console.log("blurEdge Event:", params);
            },
            stabilized: function (params) {
                console.log("stabilized Event:", params);

                // _this.props.setRenderingStatusEnded();
                if (params.iterations > 1) {
                    _this.props.stopRenderingGraph();
                }
            },
            // stabilizationIterationsDone: function () {
            //     console.log("stabilizationIterationsDone Event:");
            //     _this.props.stopRenderingGraph();
            //
            // },
            stabilizationProgress: function (params) {
                console.log("stabilizationProgress Event:", params);

                // _this.props.setRenderingStatusEnded();
            }
        }
    }

    setNetwork(network) {
        this.props.setNetwork(network)
        this.network = network;
    }

    render() {
        const events = this.getEvents();
        console.log("=====getNetworkOptions", getNetworkOptions);
        return (
            <div className={"canvasContainer w-100 h-100"}>

                {/*<VisNetworkReactComponent*/}
                {/*    data={{nodes: this.props.nodes, edges: this.props.edges}}*/}
                {/*    options={defaultNetworkOptions}*/}
                {/*    events={events}*/}
                {/*    getNetwork={this.props.getNetwork}*/}
                {/*    getNodes={this.props.getNodes}*/}
                {/*    getEdges={this.props.getEdges}*/}
                {/*    // getNodes={getNodes}*/}
                {/*/>*/}


                <VisNetworkReactComponent
                    data={{nodes: this.props.nodes, edges: this.props.edges}}
                    options={getNetworkOptions}
                    events={events}
                    getNetwork={this.setNetwork.bind(this)}
                    // getNodes={this.props.getNodes}
                    // getEdges={this.props.getEdges}
                    // getNodes={getNodes}
                />
            </div>
        )
    }
}

export default CanvasArtBoard;
