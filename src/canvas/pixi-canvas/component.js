import React from "react";
import GraphCanvas from "./canvas";
import Connector from "./connector";
import "./style.css";
import PropTypes from "prop-types";
import {
    prepareLinksDataForCurves,
    prepareNodesDataWithOptions,
    removeEdgeMeta,
    removeVertexMeta
} from "../canvas-utils";
// import UpdaterCls from "./updates";

// const connector = new Connector();

export default class PIXICanvasComponent extends React.Component {

    /*


    setHideVertexOptions={this.setHideVertexOptions.bind(this)}
    setSelectedElementData={this.setSelectedElementData.bind(this)}
    setRightContentName={this.setRightContentName.bind(this)}
    setMiddleBottomContentName={this.setMiddleBottomContentName.bind(this)}
    middleBottomContentName={this.state.middleBottomContentName}

    selectedElementData={this.state.selectedElementData}

    connector={this.connector}
    resetShallReRenderD3Canvas={this.resetShallReRenderD3Canvas.bind(this)}
    shallReRenderD3Canvas={this.state.shallReRenderD3Canvas}
    makeQuery={this.makeQuery.bind(this)}

     */

    static defaultProps = {
        setHideVertexOptions: () => console.error("setHideVertexOptions not set",),
        setSelectedElementData: (selectedData) => console.error("setSelectedElementData not set", selectedData),
        setRightContentName: (contentName) => console.error("setRightContentName not set", contentName),
        setMiddleBottomContentName: (contentName) => console.error("setMiddleBottomContentName not set", contentName),
        middleBottomContentName: null,
        selectedElementData: null,

        connector: false,
        dataStore: null,
        resetShallReRenderD3Canvas: () => console.log("resetShallReRenderD3Canvas"),
        shallReRenderD3Canvas: false,
        makeQuery: () => console.error("makeQuery not set"),
    }

    static propTypes = {
        setSelectedElementData: PropTypes.func,
        setMiddleBottomContentName: PropTypes.func,
        makeQuery: PropTypes.func,
        setHideVertexOptions: PropTypes.func,
        setRightContentName: PropTypes.func,
        requestBuilder: PropTypes.object,
        dataStore: PropTypes.object,
        connector: PropTypes.object,
        middleBottomContentName: PropTypes.string,

        shallReRenderD3Canvas: PropTypes.bool,
        selectedElementData: PropTypes.object
    }


    reRender() {
        console.log("PIXICanvasComponent reRender()", this.props.dataStore.getAllData());


        const {vertices, edges} = this.props.dataStore.getAllData();
        const nodeOptions = Object.assign({}, JSON.parse(localStorage.getItem('nodeLabels')));
        const cleanedEdges = removeEdgeMeta(edges);
        const cleanedVertices = removeVertexMeta(vertices);
        let linksData = prepareLinksDataForCurves(cleanedEdges);
        let nodesData = prepareNodesDataWithOptions(cleanedVertices, nodeOptions);
        this.graphCanvas.addData(nodesData, linksData);


        //
        // const initData = {
        //     nodes: [
        //         {"id": "Myriel", "group": 1},
        //         {"id": "Napoleon", "group": 1},
        //     ], links: [
        //         {"id": "Myriel-Napoleon", "source": "Napoleon", "target": "Myriel", "value": 1},
        //         {"id": "Myriel-Napoleon-2", "source": "Napoleon", "target": "Myriel", "value": 2},
        //         {"id": "Myriel-Napoleon-3", "source": "Napoleon", "target": "Myriel", "value": 3},
        //     ]
        // };
        // setTimeout(() => {
        // this.graphCanvas.addData(initData.nodes, initData.links)
        // this.graphCanvas.addData(connector.getData().nodes, connector.getData().links);

    }

    componentDidMount() {
        const canvasElem = document.querySelector(".graphContainer");
        const nodeMenuEl = document.querySelector(".nodeMenuContainer");

        console.log("canvasElem.offsetWidth,", canvasElem.offsetWidth, canvasElem.offsetHeight)

        this.graphCanvas = new GraphCanvas(canvasElem, nodeMenuEl,
            canvasElem.offsetWidth,
            canvasElem.offsetHeight,
            this.onNodeSelected.bind(this)
        )
        this.reRender();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate",)
        // if (prevProps.dataStore.getVerticesCount() !== this.props.dataStore.getVerticesCount()
        //     || prevProps.dataStore.getEdgesCount() !== this.props.dataStore.getEdgesCount()) {
        //     this.reRender();
        //
        // }
        this.reRender();

    }

    onNodeSelected(nodeData) {
        if (this.props.middleBottomContentName !== "vertex-options") {
            this.props.setMiddleBottomContentName('selected-data-overview')
            this.props.setSelectedElementData(nodeData);
        }
    }


    onClickFocus() {
        const nodeData = this.graphCanvas.eventStore.lastSelectedNodeData;
        this.graphCanvas.dataStore.addNode2Focus(nodeData);
        this.graphCanvas.graphStore.focusOnNodes(this.graphCanvas.dataStore.focusedNodes);
        this.graphCanvas.zoom2Point(nodeData.x, nodeData.y);
        document.querySelector(".focused-nodes").append(
            "<li>" + nodeData.id + "</li>"
        )
        this.graphCanvas.eventStore.hideMenu();
    }

    onClickShowInV() {
        // alert("onClickShowInv clicked");
        const selectedNode = this.props.selectedElementData;
        const query_string = this.props.connector.requestBuilder.getInEdgeVertices(selectedNode.id);
        this.props.makeQuery(query_string);
    }

    onClickShowOutV() {
        // alert("onClickShowOutV clicked");
        const selectedNode = this.props.selectedElementData;
        console.log("expandOutLinksAndNodes", selectedNode);
        // TODO - improve performance of the query.


        const query_string = this.props.connector.requestBuilder.getOutEdgeVertices(selectedNode.id);

        this.props.makeQuery(query_string);
    }

    hideMenu() {
        this.graphCanvas.eventStore.hideMenu();
    }

    cleanGraph() {
        this.graphCanvas.forceSimulation.restart();
    }

    resetFocus() {
        this.graphCanvas.dataStore.removeAllNodes2Focus();
        this.graphCanvas.graphStore.resetFocus();
        this.graphCanvas.resetViewport();
    }


    render() {
        console.log("PIXICanvas render()", this.props.dataStore.getVerticesList())
        return (
            <div className={"graphContainer"}>
                <h3>Focused Nodes</h3>
                <ul className={"focused-nodes"}>


                </ul>


                <div className="nodeMenuContainer" style={{"display": "none"}}>
                    <h5>Vertex Label</h5>
                    <p>Id: <span id={"elementId"}></span></p>
                    <ul className={"nodeMenu"}>
                        <li onClick={() => this.onClickFocus()}>Focus</li>
                        <li onClick={() => this.resetFocus()}>Reset Focus</li>
                        <li onClick={() => this.onClickShowInV()}>Show InV</li>
                        <li onClick={() => this.onClickShowOutV()}>Show OutV</li>
                        <li onClick={() => this.cleanGraph()}>Clean Graph</li>
                        <li onClick={() => this.hideMenu()}>hide menu</li>
                    </ul>
                </div>

            </div>

        )
    }

}
