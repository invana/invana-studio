import React, {useCallback, useState} from "react";
import "./canvas.scss";
import VisNetworkReactComponent from "vis-network-react";
// import {DataSet, Network} from 'vis-network/standalone/esm/vis-network';
// import RemoteEngine from "../../layout/remote";

let defaultdata = {
    nodes: [
        {id: 1, label: "Node 1"},
        {id: 2, label: "Node 2"},
        {id: 3, label: "Node 3"},
        {id: 4, label: "Node 4"},
        {id: 5, label: "Node 5"}
    ],
    edges: [
        {id: "1-3", from: 1, to: 3},
        {id: "1-2", from: 1, to: 2},
        {id: "2-4", from: 2, to: 4},
        {id: "2-5", from: 2, to: 5},
        {id: "3-5", from: 3, to: 3}
    ]
};

let events = {
    click: function (params) {
        params.event = "[original event]";
        console.log(
            "click event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM)
        );
    },
    doubleClick: function (params) {
        console.log("doubleClick Event:", params);
        params.event = "[original event]";
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
    },
    showPopup: function (params) {
    },
    hidePopup: function () {
        console.log("hidePopup Event");
    },
    select: function (params) {
        console.log("select Event:", params);
    },
    selectNode: function (params) {
        console.log("selectNode Event:", params);
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
        console.log("hoverNode Event:", params);
    },
    hoverEdge: function (params) {
        console.log("hoverEdge Event:", params);
    },
    blurNode: function (params) {
        console.log("blurNode Event:", params);
    },
    blurEdge: function (params) {
        console.log("blurEdge Event:", params);
    }
};

let defaultOptions = {
    layout: {
        // hierarchical: false
    },
    interaction: {
        hideEdgesOnDrag: true,
        tooltipDelay: 200,
    },
    physics: {
        forceAtlas2Based: {
            gravitationalConstant: -26,
            centralGravity: 0.005,
            springLength: 230,
            springConstant: 0.18,
        },
        maxVelocity: 146,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: {iterations: 600},
    },
    edges: {
        color: "#999999",
        // physics: false,

        label: true,
        smooth: {
            // dynamic, continuous, discrete, diagonalCross, straightCross,
            // curvedCW, curvedCCW, cubicBezier, horizontal, vertical
            // type: "continuous",
            // vertical or horizontal
            forceDirection: "vertical",
            roundness: 1
        },
        width: 0.5,
        arrows: {
            to: {
                enabled: true,
                scaleFactor: 0.5
            }
        }
    },
    nodes: {
        // shape: "circle",
        shape: "dot",
        size: 16,
        scaling: {
            min: 10,
            max: 30,
        },
    }
}


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
                    // getNodes={getNodes}
                />
            </div>
        )
    }
}

export default ForceDirectedGraphCanvas;
