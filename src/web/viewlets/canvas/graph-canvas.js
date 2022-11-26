import React from "react";
import CanvasConsoleOptions from "./canvas-console-options";
import QueryConsole from "./query-console";
import Welcome from "../welcome/welcome";
import DefaultRemoteComponent from "../../layouts/default-remote";
import RequestHistoryView from "./query-history";
import VisJsGraphCanvasUtils from "./canvas-utils";
import {getAllNodeShapes, invertColor} from "../../interface/utils";
import {GRAPH_CANVAS_SETTINGS} from "../../../settings/canvas";
import CanvasController from "../../interface/canvas/canvas-ctrl";
import FocusedNodesList from "../../interface/focused-nodes-list";
import NodeMenu from "../../interface/node-menu";
import CanvasArtBoard from "../../interface/canvas/canvas-art-board";
import "./canvas.scss";
import DataSidebarViewlet from "../data-management/data-sidebar";
import ElementOptions from "../../interface/element-options";
import {Button, ListGroup, Modal} from "react-bootstrap";
import CanvasDisplaySettings from "./canvas-display-settings";
import LoadingDiv from "./loading";
import LambdaSettingsView from "./lambda-settings";
import ResponseViewer from "./response-viewer";
import PropTypes from "prop-types";


export default class GraphCanvas extends DefaultRemoteComponent {


    static propTypes = {
        showWelcome: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,

            canvasQueryString: null,
            showWelcome: true,

            lastResponseStatusCode: null,

            nodes: [],
            edges: [],
            nodeGroups: {},
            edgeGroups: {},
            resetVisualizer: false,
            selectedElementData: null,
            focusedNodes: [],

            menuPositionX: null,
            menuPositionY: null,


            isRenderingCanvas: null,
            hiddenNodeLabels: [],
            hiddenEdgeLabels: [],
            nodeLabelsInCanvas: [], // unique labels of all the currently loaded data in canvas (may be hidden too)
            edgeLabelsInCanvas: [],

            lastResponse: null,

            elementOptionsToShow: {
                label: null,
                elementType: null
            },

            leftContentName: false, // query-console, query-history, canvas-display-settings, graph-management
        }
        this.canvasUtils = new VisJsGraphCanvasUtils();
        this.canvasCtrl = null;
        this.network = null;
        this.child = React.createRef();
    }

    setModalContentName(contentName) {
        this.setState({modalContentName: contentName});
    }

    setElementOptionsToShow(options) {
        this.setState({elementOptionsToShow: options});
    }

    startNewQueryInConsole(queryString) {
        this.setState({canvasQueryString: queryString, leftContentName: "query-console"});
    }

    setLeftContentName(contentName) {
        this.setState({leftContentName: contentName})
    }

    setWelcome(welcomeStatus) {
        this.setState({showWelcome: welcomeStatus});
    }

    removeItemArray(arr, value) {
        let i = 0;
        while (i < arr.length) {
            if (arr[i] === value) {
                arr.splice(i, 1);
            } else {
                ++i;
            }
        }
        return arr;
    }

    addToHiddenLabels(labelName, labelType) {
        if (labelType === "vertex") {
            let hiddenNodeLabels = this.state.hiddenNodeLabels;
            hiddenNodeLabels.push(labelName)
            this.setState({hiddenNodeLabels})
        } else if (labelType === "edge") {
            let hiddenEdgeLabels = this.state.hiddenEdgeLabels;
            hiddenEdgeLabels.push(labelName);
            this.setState({hiddenEdgeLabels})
        }
    }


    removeFromHiddenLabels(labelName, labelType) {
        if (labelType === "vertex") {
            let hiddenNodeLabels = this.removeItemArray(this.state.hiddenNodeLabels, labelName);
            this.setState({hiddenNodeLabels})
        } else if (labelType === "edge") {
            let hiddenEdgeLabels = this.removeItemArray(this.state.hiddenEdgeLabels, labelName);
            this.setState({hiddenEdgeLabels})
        }
    }

    getNodeColor(node) {
        const allNodeShapes = getAllNodeShapes();

        if (allNodeShapes['inLabelShapes'].includes(node.shape)) {
            console.log("finding ", node._label, this.canvasUtils.getNodeColorObject(node._label));
            return invertColor(this.canvasUtils.getNodeColorObject(node._label).background,
                true);
        }
        return GRAPH_CANVAS_SETTINGS.DefaultElementTextColor

    }

    selectNodesInNetwork(selectedNodes) {

        console.log("===selectedNodes", selectedNodes);
        const allNodes = this.network.body.data.nodes;
        const allEdges = this.network.body.data.edges;
        let _this = this;
        if (selectedNodes.length === 0) {
            const allNodesOptions = allNodes.map(node => ({
                id: node.id,
                opacity: 1,
                color: _this.canvasUtils.getNodeColorObject(
                    node._label
                ),
                borderWidth: 2,
                font: {
                    color: _this.getNodeColor(node)
                }
            }));
            const allEdgesOptions = allEdges.map(edge => ({
                id: edge.id,
                opacity: 1,
                font: {color: GRAPH_CANVAS_SETTINGS.DefaultElementTextColor},
                color: _this.canvasUtils.getEdgeColorObject(edge._label)

            }));

            this.network.body.data.nodes.update(allNodesOptions)
            this.network.body.data.edges.update(allEdgesOptions)

        } else {

            // set all the nodes and edges opacity to 0.2
            // set selected nodes and edges opacity to 1.0
            const allNodesOptions = allNodes.map(node => ({
                id: node.id,
                // opacity: 0.3,
                borderWidth: 2,
                color: _this.canvasUtils.getNodeColorUnHighlightObject(
                    node._label
                ),
                font: {
                    color: invertColor(_this.canvasUtils.getNodeColorUnHighlightObject(node._label).background, true)
                }
            }));

            let selectedNodeIds = [];
            selectedNodes.forEach((node) => {
                selectedNodeIds.push(..._this.network.getConnectedNodes(node.id));
                selectedNodeIds.push(node.id);
            })

            selectedNodeIds = [...new Set(selectedNodeIds)];
            const selectedNodesOptions = selectedNodeIds.map(nodeId => ({
                id: nodeId,
                // opacity: 1,
                borderWidth: 4,
                color: _this.canvasUtils.getNodeColorObject(
                    _this.network.body.data.nodes.get(nodeId)._label
                ),
                font: {
                    color: _this.getNodeColor(_this.network.body.data.nodes.get(nodeId))
                }
            }));

            console.log("allNodesOptions", allNodesOptions);
            this.network.body.data.nodes.update(allNodesOptions)
            this.network.body.data.nodes.update(selectedNodesOptions)

            // set all the nodes and edges opacity to 0.2
            // set selected nodes and edges opacity to 1.0
            // Note: opacity doesnt work on edges.
            console.log("=====allEdges", allEdges);
            const allEdgesOptions = allEdges.map(edge => ({
                id: edge.id,
                opacity: 0.4,
                font: {color: GRAPH_CANVAS_SETTINGS.DefaultElementUnHighlightColor},
                color: _this.canvasUtils.getEdgeColorUnHighlightObject(edge._label)
            }));
            console.log("===allEdgesOptions", allEdgesOptions);
            let selectedEdgeIds = [];
            selectedNodes.forEach((node) => {
                selectedEdgeIds.push(..._this.network.getConnectedEdges(node.id));
            })
            console.log("==selectedEdgeIds", selectedEdgeIds);
            selectedEdgeIds = [...new Set(selectedEdgeIds)];

            let selectedEdgesOptions = [];
            selectedEdgeIds.forEach((edgeId) => {
                    const edge = this.network.body.data.edges.get(edgeId);
                    selectedEdgesOptions.push({
                        id: edgeId,
                        opacity: 1,
                        font: {color: GRAPH_CANVAS_SETTINGS.DefaultElementTextColor},
                        color: _this.canvasUtils.getEdgeColorObject(edge._label)
                    })
                }
            );
            // this.network.setOptions({nodes: {opacity: 0.1}});
            console.log("selectedEdgesOptions", selectedEdgesOptions)
            this.network.body.data.edges.update(allEdgesOptions)
            this.network.body.data.edges.update(selectedEdgesOptions)
            this.network.selectNodes(selectedNodeIds);
        }
    }

    addNodeToFocusedNodes(node) {
        console.log("addNodeToFocusedNodes", node);

        let existingFocusedNodes = this.state.focusedNodes;

        if (existingFocusedNodes.length > 0) {
            // TODO - redo this block ; may need performance improvements !
            existingFocusedNodes.push(node);

            const focusedNodes = [];
            const map = new Map();
            for (const item of existingFocusedNodes) {
                if (!map.has(item.id)) {
                    map.set(item.id, true);    // set any value to Map
                    focusedNodes.push(item);
                }
            }


            this.setState({focusedNodes: focusedNodes});
            this.selectNodesInNetwork(focusedNodes);
        } else {
            this.setState({focusedNodes: [node]});
            this.selectNodesInNetwork([node]);
        }
    }

    getFocusedNodes() {
        return this.state.focusedNodes;
    }

    makeQuery(queryObj, queryOptions) {
        this.setState({selectedElementData: null});
        return super.makeQuery(queryObj, queryOptions)
    }

    setSelectedElementData(selectedDataId, selectedElementType) {
        console.log("setSelectedElementData", selectedDataId, selectedElementType);
        let selectedElementData = null;
        if (selectedElementType === "g:Vertex") {
            selectedElementData = this.network.body.data.nodes.get(selectedDataId)
        } else if (selectedElementType === "g:Edge") {
            selectedElementData = this.network.body.data.edges.get(selectedDataId)
        }
        this.setState({selectedElementData: selectedElementData});
    }

    reRenderVisualizer() {
        console.log("reRenderVisualizer")

        const nodesPrepared = this.canvasUtils.prepareNodes(this.network.body.data.nodes);
        const edgesPrepared = this.canvasUtils.prepareEdges(this.network.body.data.edges);

        this.network.body.data.nodes.update(nodesPrepared)
        this.network.body.data.edges.update(edgesPrepared)


        this.setState({
            nodes: nodesPrepared, edges: edgesPrepared
        });
    }

    flushDataState() {
        this.setState({nodes: [], edges: [], selectedElementData: null, focusedNodes: []});
        this.network.setData({nodes: [], edges: []});
    }

    setNetwork(network) {
        network.on("stabilizationIterationsDone", function () {
            console.log("stabilizationIterationsDone");
            network.setOptions({physics: false});
        });

        this.network = network;

        this.canvasCtrl = new CanvasController(
            this.network,
            this.setStatusMessage.bind(this),
            this.flushDataState.bind(this),
            this.reRenderVisualizer.bind(this),
            this.setRenderingStatusEnded.bind(this),
            this.startRenderingStatus.bind(this)
        );
    }

    getNetwork() {
        return this.network;
    }

    separateNodesAndEdges(data) {
        console.log("====separateNodesAndEdges", data)
        let nodes = [];
        let edges = [];
        if (data) {
            data.forEach((datum) => {
                if (datum.type === "edge") {
                    edges.push(datum);
                } else if (datum.type === "vertex") {
                    nodes.push(datum);
                }
            })
        }
        return {nodes, edges};
    }

    processResponse(response) {
        console.log("processResponse", response, this.state.queryObject);
        const lastResponse = response.getResponseResult();
        console.log("lastResponse", lastResponse);
        let data = response.getResponseResult(this.state.queryObject.queryKey);
        // separate nodes and edges
        if (this.state.queryObject.queryKey === "executeQuery"){
            data = data.data
        }
        if (lastResponse) {
            const {nodes, edges} = this.separateNodesAndEdges(data);
            this.addNewData(nodes, edges);
            this.setState({lastResponseStatusCode: response.transporterStatusCode});
            if (response.transporterStatusCode !== 200) {
                this.setState({rightContentName: "response-viewer"})
            }
            this.setState({lastResponse: response.response});
        }
    }

    //
    // saveGroupsConfigToStorage(groups) {
    //     for (let group in groups) {
    //         setElementColorOptionsToStorage(groups[group]);
    //     }
    // }

    addNewData(newNodes, newEdges) {
        // const id = data.nodes.length + 1;
        console.log("addNewData", newNodes);
        if (newNodes.length === 0 && newEdges.length === 0) {
            return
        }

        const {newNodesToAdd, newEdgesToAdd} = this.canvasCtrl.getNewDataToAdd(
            newNodes, newEdges
        );

        const nodes = this.canvasUtils.prepareNodes(newNodesToAdd);
        const edges = this.canvasUtils.prepareEdges(newEdgesToAdd);

        // const nodeGroups = this.canvasUtils.nodeGroups;
        // const edgeGroups = this.canvasUtils.edgeGroups;

        // add the groups to localStorage
        // this.saveGroupsConfigToStorage(this.canvasUtils.nodeGroups);
        // this.saveGroupsConfigToStorage(this.canvasUtils.edgeGroups);

        this.network.setOptions({
            groups: {
                useDefaultGroups: false,
                // ...nodeGroups,
                // ...edgeGroups
            }
        });
        this.canvasCtrl.startRenderingGraph();
        console.log("======, nodes", nodes);
        console.log("======, edges", edges);
        console.log(" ...this.canvasUtils.edgeGroups", this.canvasUtils.edgeGroups);
        // this.network.body.data.nodes.clear();
        // this.network.body.data.edges.clear();
        this.network.body.data.nodes.add(nodes);
        this.network.body.data.edges.add(edges);

        console.log("this.this.network", this.network);

        const updatedNodes = [...nodes, ...this.state.nodes];
        const updatedEdges = [...edges, ...this.state.edges];

        function getUniqueValues(elements) {
            let unique = {};
            for (let i = 0; i < elements.length; i++) {
                if (!unique[elements[i]._label]) {
                    unique[elements[i]._label] = 1;
                }
            }
            return Object.keys(unique);
        }

        console.log("getUniqueValues(updatedNodes)", getUniqueValues(updatedNodes))
        this.setState({
            nodes: updatedNodes,
            edges: updatedEdges,
            nodeLabelsInCanvas: getUniqueValues(updatedNodes),
            edgeLabelsInCanvas: getUniqueValues(updatedEdges),
        });

        this.startRenderingStatus();

    }


    onItemClick(labelName, labelType) {
        let queryPayload = {};
        if (labelType === "vertex") {
            queryPayload = this.connector.requestBuilder.filterVertexAndNeighborEdgesAndVertices(null, labelName, 10, 0);
        } else {
            queryPayload = this.connector.requestBuilder.filterEdgeAndGetNeighborVertices(labelName, 10, 0);
        }

        const queryPayloadCleaned = this.connector.requestBuilder.combineQueries(queryPayload, null);
        this.makeQuery(queryPayloadCleaned);
        // this.makeQuery()
    }


    loadElementData(labelName, labelType) {
        let queryPayload = {};
        if (labelType === "vertex") {
            queryPayload = this.connector.requestBuilder.filterVertices(labelName, 10, 0);
        } else {
            queryPayload = this.connector.requestBuilder.filterEdgeAndGetNeighborVertices(labelName, 10, 0);
        }

        const queryPayloadCleaned = this.connector.requestBuilder.combineQueries(queryPayload, null);
        this.makeQuery(queryPayloadCleaned);
        // this.makeQuery()
    }


    removeFocusedNode(nodeId) {
        //

        let focusedNodes = this.state.focusedNodes
        let indexId = null
        focusedNodes.forEach((focusedNode, index) => {
            if (focusedNode.id === nodeId) {
                indexId = index
                return index;
            }
        });
        focusedNodes.splice(indexId, 1);
        console.log("===indexId", indexId);
        console.log("focusedNodes removed", focusedNodes);
        this.selectNodesInNetwork(focusedNodes);
        this.setState({focusedNodes: focusedNodes});

    }

    startRenderingStatus() {
        this.setState({isRenderingCanvas: true});
        this.setStatusMessage("Rendering the Graph.");
    }

    setRenderingStatusEnded() {
        this.setState({isRenderingCanvas: false});
        this.setStatusMessage("Rendered the Graph.");
        this.canvasCtrl.centerGraph();
        // this.network.redraw();
        // this.canvasCtrl.stopRenderingGraph();
        // this.network.setOptions({physics: {enabled:false}});
    }


    setNodeMenuPosition(x, y) {
        this.setState({
            menuPositionX: x,
            menuPositionY: y
        })
    }

    componentDidMount() {
        super.componentDidMount();
        this.setStatusMessage("Hello world! Welcome to Invana Studio.");

    }

    componentDidUpdate() {
        this.canvasCtrl.hideData(this.state.hiddenNodeLabels, this.state.hiddenEdgeLabels);
    }

    getSelectedElementDetails() {
        return {
            label: this.props.selectedElementData.group,
            labelType: this.props.selectedElementData.type
        }
    }

    showElementSettings(label, elementType) {
        this.setElementOptionsToShow({
            label: label,
            elementType: elementType
        });
        this.setModalContentName("element-options");
    }

    render() {
        const _this = this;
        return (
            <div className="d-flex  flex-column" style={{"height": "100%"}}>
                <div className={"canvasBoard   "}>
                    <div className="w-100" style={{"height": "calc(100% - 24px)"}}>
                        {
                            this.state.focusedNodes.length > 0
                                ? <FocusedNodesList
                                    canvasUtils={this.canvasUtils}
                                    focusedNodes={this.state.focusedNodes}
                                    removeFocusedNode={this.removeFocusedNode.bind(this)}/>
                                : <React.Fragment/>
                        }
                        {
                            this.state.selectedElementData
                                ? <NodeMenu
                                    menuPositionX={this.state.menuPositionX}
                                    menuPositionY={this.state.menuPositionY}

                                    showElementSettings={this.showElementSettings.bind(this)}
                                    // setNodeMenuPosition={this.setNodeMenuPosition.bind(this)}

                                    selectedElementData={this.state.selectedElementData}
                                    setSelectedElementData={this.setSelectedElementData.bind(this)}
                                    getFocusedNodes={this.getFocusedNodes.bind(this)}
                                    addNodeToFocusedNodes={this.addNodeToFocusedNodes.bind(this)}

                                    connector={this.connector}
                                    makeQuery={this.makeQuery.bind(this)}

                                    getNetwork={this.getNetwork.bind(this)}

                                    startNewQueryInConsole={this.startNewQueryInConsole.bind(this)}
                                    canvasUtils={this.canvasUtils}
                                />
                                : <React.Fragment/>
                        }

                        <CanvasArtBoard
                            // queryObject={this.state.queryObject}
                            nodes={this.state.nodes}
                            edges={this.state.edges}
                            resetVisualizer={this.state.resetVisualizer}
                            setNetwork={this.setNetwork.bind(this)}
                            setSelectedElementData={this.setSelectedElementData.bind(this)}
                            setNodeMenuPosition={this.setNodeMenuPosition.bind(this)}
                            stopRenderingGraph={() => {
                                if (this.canvasCtrl) {
                                    this.canvasCtrl.stopRenderingGraph();
                                }
                            }}

                            hiddenNodeLabels={this.state.hiddenNodeLabels}
                            hiddenEdgeLabels={this.state.hiddenEdgeLabels}

                        />
                    </div>
                    <div style={{"height": "24px"}} className={"pl-2 pr-2 border-top W-100"}>


                        <ListGroup className={"border-0"} horizontal>
                            <ListGroup.Item
                                className={"pt-0 pb-0 border-0 pl-3 pr-2"}>{this.state.statusMessage}</ListGroup.Item>
                            {
                                this.state.lastResponseStatusCode
                                    ? <ListGroup.Item className={"pt-0 pb-0 border-0 pl-2 pr-2"}>

                                        <Button variant={"link"} className={"p-0"}
                                                onClick={() => this.setModalContentName("last-response")}
                                                style={{"fontSize": "inherit", "marginTop": "-4px"}}>
                                                <span style={{
                                                    'color': ` ${this.state.lastResponseStatusCode === 200 ? 'green' : 'red'}`,
                                                    "fontWeight": "bold"
                                                }}>

                                                {this.state.lastResponseStatusCode}</span> <span
                                            className={"text-muted"}>response</span>
                                        </Button>
                                    </ListGroup.Item>
                                    : <span></span>
                            }
                            {/*<ListGroup.Item className={"pt-0 pb-0 border-0"}>|</ListGroup.Item>*/}
                            <ListGroup.Item
                                className={"pt-0 pb-0 border-0 pl-2 pr-2"}>
                                {this.state.nodes.length} nodes, {this.state.edges.length} edges
                                in the canvas
                            </ListGroup.Item>
                        </ListGroup>

                    </div>
                </div>
                {
                    this.state.showWelcome
                        ? <Welcome setWelcome={this.setWelcome.bind(this)}
                                   startNewQueryInConsole={this.startNewQueryInConsole.bind(this)}/>
                        : <CanvasConsoleOptions canvasCtrl={this.canvasCtrl} isQuerying={this.state.isQuerying}
                                                isRenderingCanvas={this.state.isRenderingCanvas}
                                                leftContentName={this.state.leftContentName || ""}
                                                canvasQueryString={this.state.canvasQueryString}
                                                setLeftContentName={this.setLeftContentName.bind(this)}/>
                }

                {
                    this.state.leftContentName === "query-console"
                        ? <QueryConsole
                            canvasQueryString={this.state.canvasQueryString}
                            makeQuery={this.makeQuery.bind(this)}
                            startNewQueryInConsole={this.startNewQueryInConsole.bind(this)}
                            connector={this.connector}
                            setLeftContentName={this.setLeftContentName.bind(this)}
                            style={{
                                "width": "420px", "top": "90px", "zIndex": 1001,
                                "maxHeight": "calc(100vh - 250px)"
                            }}
                        />
                        : <React.Fragment/>
                }

                {
                    this.state.leftContentName === "query-history"
                        ?
                        <div className={" position-absolute "}
                             style={{
                                 "width": "420px", "top": "90px", "zIndex": 1001,
                                 // "maxHeight": "calc(100vh - 140px)",
                                 // "overflow": "scroll"
                             }}>
                            <div className={"ml-3 border border-top-0 bg-white"}>

                                <RequestHistoryView


                                    onClose={() => {
                                        _this.setLeftContentName(null)
                                    }}
                                    makeQuery={this.makeQuery.bind(this)}
                                    startNewQueryInConsole={this.startNewQueryInConsole.bind(this)}
                                    cardBodyStyle={{
                                        "overflow": "scroll",
                                        "maxHeight": "calc(100vh - 215px)"
                                    }}
                                />
                            </div>
                        </div>

                        : <React.Fragment/>
                }

                {
                    this.state.leftContentName === "graph-management"
                        ? <DataSidebarViewlet
                            style={{
                                "width": "420px", "top": "90px", "zIndex": 1001,
                            }}
                            cardBodyStyle={{
                                "maxHeight": "calc(100vh - 265px)"
                            }}
                            onClose={() => this.setLeftContentName(null)}

                            {...this.props}
                            onItemClick={this.onItemClick.bind(this)}
                            loadElementData={this.loadElementData.bind(this)}
                            showLabelMenu={true}
                            dataStore={this.dataStore}
                            addToHiddenLabels={this.addToHiddenLabels.bind(this)}
                            removeFromHiddenLabels={this.removeFromHiddenLabels.bind(this)}
                            startNewQueryInConsole={this.startNewQueryInConsole.bind(this)}
                            hiddenNodeLabels={this.state.hiddenNodeLabels}
                            hiddenEdgeLabels={this.state.hiddenEdgeLabels}
                            canvasCtrl={this.canvasCtrl}
                            nodeLabelsInCanvas={this.state.nodeLabelsInCanvas}
                            edgeLabelsInCanvas={this.state.edgeLabelsInCanvas}
                            showElementSettings={this.showElementSettings.bind(this)}


                        />

                        : <React.Fragment/>
                }
                {
                    this.state.leftContentName === "canvas-display-settings"
                        ?
                        <CanvasDisplaySettings
                            style={{
                                "width": "420px", "top": "90px", "zIndex": 1001,
                                "maxHeight": "calc(100vh - 250px)"
                            }}
                            onClose={() => {
                                _this.setLeftContentName(null)
                            }}
                            startRenderingGraph={this.canvasCtrl.startRenderingGraph.bind(this)}
                        />


                        : <React.Fragment/>
                }
                {
                    this.state.leftContentName === "lambda-settings"
                        ?
                        <LambdaSettingsView
                            style={{
                                "width": "420px", "top": "90px", "zIndex": 1001,
                                "maxHeight": "calc(100vh - 250px)"
                            }}
                            cardBodyStyle={{
                                "overflow": "scroll",
                                "maxHeight": "calc(100vh - 215px)"
                            }}
                            onClose={() => {
                                _this.setLeftContentName(null)
                            }}
                            startRenderingGraph={this.canvasCtrl.startRenderingGraph.bind(this)}
                            startNewQueryInConsole={this.startNewQueryInConsole.bind(this)}
                        />


                        : <React.Fragment/>
                }
                {
                    this.state.modalContentName === "element-options"
                    && this.state.elementOptionsToShow
                    && this.state.elementOptionsToShow.label
                        ? <Modal
                            className={"border-0 "}
                            size="lg"
                            show={true}
                            dialogClassName="modal-90w"
                            backdrop={true}
                            // aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >

                            <Modal.Body style={{"width": "600px"}}>
                                <ElementOptions
                                    // selectedElementData={this.state.selectedElementData}
                                    elementOptionsToShow={this.state.elementOptionsToShow}
                                    setModalContentName={this.setModalContentName.bind(this)}
                                    // selectedLabelType={this.state.selectedLabelType}
                                    setStatusMessage={this.setStatusMessage.bind(this)}
                                    setErrorMessage={this.setErrorMessage.bind(this)}
                                    // setHideVertexOptions={this.setHideVertexOptions.bind(this)}
                                    onClose={() => {
                                        _this.setElementOptionsToShow(null);
                                        _this.setModalContentName(null);
                                    }}
                                    reRenderVisualizer={this.reRenderVisualizer.bind(this)}
                                    // reRenderCanvas={this.reRenderCanvas.bind(this)}
                                    // setShallReRenderD3Canvas={this.setShallReRenderD3Canvas.bind(this)}
                                />
                            </Modal.Body>
                        </Modal>
                        : <React.Fragment/>
                }
                {
                    this.state.modalContentName === "last-response"
                        ? <Modal
                            className={"border-0"}
                            size="lg"
                            show={true}
                            dialogClassName="modal-90w"
                            backdrop={true}
                            centered>
                            <Modal.Header className={"pt-1 pb-1 small"}>
                                <Modal.Title className={"h5"}>
                                    Response Viewer
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={"overflow-auto "}>
                                <ResponseViewer
                                    lastResponse={this.state.lastResponse}
                                    lastResponseElapsedTime={this.state.lastResponseElapsedTime}
                                    lastResponseStatusCode={this.state.lastResponseStatusCode}
                                    onClose={() => this.setModalContentName(null)}
                                />
                            </Modal.Body>
                        </Modal>
                        : <React.Fragment/>
                }
                {
                    this.state.modalContentName === "last-response"
                        ? <Modal
                            className={"border-0"}
                            size="lg"
                            show={true}
                            dialogClassName="modal-90w"
                            backdrop={true}
                            centered>
                            <Modal.Header className={"pt-1 pb-1 small"}>
                                <Modal.Title className={"h5"}>
                                    Response Viewer
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={"overflow-auto "}>
                                <ResponseViewer
                                    lastResponse={this.state.lastResponse}
                                    lastResponseElapsedTime={this.state.lastResponseElapsedTime}
                                    lastResponseStatusCode={this.state.lastResponseStatusCode}
                                    onClose={() => this.setModalContentName(null)}
                                />
                            </Modal.Body>
                        </Modal>
                        : <React.Fragment/>
                }
                {
                    this.state.isQuerying === true || this.state.isRenderingCanvas === true
                        ? <LoadingDiv statusMessage={this.state.statusMessage}
                                      stopRenderingGraph={this.canvasCtrl.stopRenderingGraph.bind(this)}
                        />
                        : <React.Fragment/>
                }

                {/*<div className="p-2 bd-highlight">Flex item</div>*/}
            </div>
        );
    }

}
