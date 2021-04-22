import React from 'react';
import DefaultLayout from "../../layout/default";
import {Row, Nav} from "react-bootstrap";
import MenuComponent from "../../ui-components/menu";
import CanvasComponent from "../../ui-components/canvas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCamera, faDesktop, faExpand,
    faQuestionCircle, faStopCircle,
    faSync,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../ui-components/sidebar";
import MainContent from "../../ui-components/main-content";
import ForceDirectedGraphCanvas from "../../interface/canvas/canvas";
import DataSidebarViewlet from "../../viewlets/data-management/data-sidebar";
import VisJsGraphCanvasUtils from "./canvas-utils";
import Button from "react-bootstrap/Button";
import CanvasController from "../../interface/canvas/canvas-ctrl";
import NodeMenu from "../../interface/node-menu";
import FocusedNodesList from "../../interface/focused-nodes-list";
// import LeftContainer from "../../viewlets/left-container";
import QueryConsole from "../../viewlets/query-console";
import ElementOptions from "../../viewlets/element-options";
import LoadingDiv from "../../viewlets/loading";
import {GRAPH_CANVAS_SETTINGS} from "../../../settings";
import RoutableRemoteEngine from "../../layout/routable-remote";
import ModalContainer from "../../ui-components/modal-container";
import Learn from "../../viewlets/support/Learn";
import RightContainer from "../../ui-components/right-container";
import {getAllNodeShapes, invertColor} from "../../interface/utils";
import CanvasDisplay from "../../viewlets/canvas-display";
import ResponseViewer from "../../viewlets/response-viewer";


export default class ExplorerView extends RoutableRemoteEngine {

    constructor(props) {
        // super(props);
        super(props);
        // super.constructor(props);
        this.state = {
            ...this.state,
            statusCode: null,
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

            lastResponse: null
        }
        this.canvasUtils = new VisJsGraphCanvasUtils();
        this.canvasCtrl = null;
        this.network = null;
        this.child = React.createRef();
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
        let nodes = [];
        let edges = [];
        if (data) {
            data.forEach((datum) => {
                if (datum.type === "g:Edge") {
                    edges.push(datum);
                } else if (datum.type === "g:Vertex") {
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
        const data = response.getResponseResult(this.state.queryObject.queryKey);
        // separate nodes and edges
        if (lastResponse) {
            const {nodes, edges} = this.separateNodesAndEdges(data);
            this.addNewData(nodes, edges);
            this.setState({statusCode: response.transporterStatusCode});
            if(response.transporterStatusCode !== 200){
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
        if (newNodes.length === 0 && newEdges.length === 0 ){
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
        this.setStatusMessage("Hello World!");

    }

    // allDeepEqual(things) {
    //     // works with nested arrays
    //     if (things.every(isArray)) {
    //         return allCompareEqual(things.map(getLength))     // all arrays of same length
    //             && allTrue(zip(things).map(allDeepEqual)); // elements recursively equal
    //
    //         //else if( this.every(isObject) )
    //         //  return {all have exactly same keys, and for
    //         //          each key k, allDeepEqual([o1[k],o2[k],...])}
    //         //  e.g. ... && allTrue(objectZip(objects).map(allDeepEqual))
    //
    //         //else if( ... )
    //         //  extend some more
    //
    //
    //     } else {
    //         return allCompareEqual(things);
    //     }
    // }

    componentDidUpdate() {
        this.canvasCtrl.hideData(this.state.hiddenNodeLabels, this.state.hiddenEdgeLabels);
    }

    render() {
        let _this = this;
        return (
            <DefaultLayout {...this.props} ref={this.child}
                           setModalContentName={this.setModalContentName.bind(this)}
                           setShowQueryConsole={this.setShowQueryConsole.bind(this)}>
                {super.render()}
                <Row>
                    <Sidebar>
                        <DataSidebarViewlet  {...this.props}
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
                        />
                    </Sidebar>
                    <MainContent className={"main-content"}>
                        <MenuComponent className={" bg-light border-bottom"}>
                            <Nav className="mr-auto">

                                <Nav.Item>
                                    <Button size={"sm"} variant={"link"}
                                            onClick={() => this.canvasCtrl.centerGraph()}
                                    >
                                        <FontAwesomeIcon icon={faExpand}/>
                                    </Button>
                                </Nav.Item>
                                <Nav.Item>

                                    {this.state.isQuerying === true || this.state.isRenderingCanvas === true
                                        ?
                                        <Button size={"sm"} variant={"link"}
                                                onClick={() => this.canvasCtrl.stopRenderingGraph()}>
                                            <FontAwesomeIcon icon={faStopCircle}/>
                                        </Button>
                                        : <Button size={"sm"} variant={"link"}
                                                  onClick={() => this.canvasCtrl.confirmRedrawCanvas()}>
                                            <FontAwesomeIcon icon={faSync}/>
                                        </Button>
                                    }
                                </Nav.Item>
                                <Nav.Item>
                                    <Button size={"sm"} variant={"link"}
                                            onClick={() => this.canvasCtrl.downloadCanvasImageAsPNG()}
                                    >
                                        <FontAwesomeIcon icon={faCamera}/>
                                    </Button>
                                    {/*<Dropdown>*/}
                                    {/*    <Dropdown.Toggle variant="link" size={"sm"}>*/}
                                    {/*        <FontAwesomeIcon icon={faCamera}/>*/}
                                    {/*    </Dropdown.Toggle>*/}
                                    {/*    <Dropdown.Menu>*/}
                                    {/*        <Dropdown.Item onClick={() => this.canvasCtrl.downloadCanvasImageAsPNG()} size={"sm"}>Save as PNG</Dropdown.Item>*/}
                                    {/*        <Dropdown.Item onClick={() => this.canvasCtrl.downloadCanvasImageAsJPEG()}  size={"sm"}>Save as JPEG</Dropdown.Item>*/}
                                    {/*        <Dropdown.Item onClick={() => this.canvasCtrl.downloadCanvasImageAsSVG()}  size={"sm"}>Save as SVG</Dropdown.Item>*/}
                                    {/*    </Dropdown.Menu>*/}
                                    {/*</Dropdown>*/}
                                </Nav.Item>
                            </Nav>
                            <Nav className="ml-auto">
                                <Nav.Item>
                                    <Button size={"sm"} variant={"link"}
                                            onClick={() => this.setRightContentName("graph-display-settings")}
                                    >
                                        <FontAwesomeIcon icon={faDesktop}/>
                                    </Button>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button size={"sm"} variant={"link"}
                                            onClick={() => this.canvasCtrl.confirmFlushCanvas()}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                    </Button>
                                </Nav.Item>
                                <Nav.Item className={"ml-3 mr-3"}>
                                    |
                                </Nav.Item>
                                <Nav.Item>
                                    <Button size={"sm"} variant={"link"} onClick={
                                        () => this.setRightContentName("learn")
                                    }>
                                        <FontAwesomeIcon icon={faQuestionCircle}/>
                                    </Button>
                                </Nav.Item>


                                {/*<Nav.Item className={"mr-1"}>*/}
                                {/*    <Button size={"sm"} variant={"link"}>*/}
                                {/*        <FontAwesomeIcon icon={faCog}/>*/}
                                {/*    </Button>*/}
                                {/*</Nav.Item>*/}
                            </Nav>
                        </MenuComponent>
                        <CanvasComponent>

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

                                        setModalContentName={this.setModalContentName.bind(this)}
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

                            <ForceDirectedGraphCanvas
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

                        </CanvasComponent>
                        <MenuComponent className={"sm footer"}>
                            <Nav className="mr-auto">
                                <Nav.Item className={"mr-2 ml-2"}>
                                    {this.state.nodes.length} nodes, {this.state.edges.length} edges
                                </Nav.Item>
                                <Nav.Item className={"mr-2 text-muted"}>
                                    |
                                </Nav.Item>
                                <Nav.Item className={"mr-3"}>
                                    {this.state.statusMessage}
                                </Nav.Item>

                            </Nav>
                            <Nav className="ml-auto">
                                <Nav.Item className={"mr-3"}>
                                    {
                                        this.state.statusCode
                                            ? <span>
                                                <span style={{
                                                    'background': ` ${this.state.statusCode === 200 ? 'green' : 'red'}`,
                                                    "color": "white",
                                                    "paddingLeft": "3px",
                                                    "paddingRight": "3px"
                                                }}>
                                                {this.state.statusCode}</span> response</span>
                                            : <span></span>
                                    }

                                </Nav.Item>
                            </Nav>
                        </MenuComponent>
                    </MainContent>
                </Row>

                {
                    this.state.showQueryConsole === true
                        ? <QueryConsole
                            makeQuery={this.makeQuery.bind(this)}
                            connector={this.connector}
                            query={this.state.query}
                            // value={this.state.defaultQuery}
                            onClose={() => {
                                console.log("hide query console");
                                _this.setShowQueryConsole(false);
                            }}
                        />
                        : <React.Fragment/>
                }

                {
                    this.state.modalContentName === "element-options" && this.state.selectedElementData
                        ? <ModalContainer>
                            <ElementOptions
                                selectedElementData={this.state.selectedElementData}
                                setModalContentName={this.setModalContentName.bind(this)}
                                // selectedLabelType={this.state.selectedLabelType}
                                setStatusMessage={this.setStatusMessage.bind(this)}
                                setErrorMessage={this.setErrorMessage.bind(this)}
                                // setHideVertexOptions={this.setHideVertexOptions.bind(this)}
                                onClose={() => {
                                    _this.setModalContentName(null)
                                }}
                                reRenderVisualizer={this.reRenderVisualizer.bind(this)}
                                // reRenderCanvas={this.reRenderCanvas.bind(this)}
                                // setShallReRenderD3Canvas={this.setShallReRenderD3Canvas.bind(this)}
                            />
                        </ModalContainer>

                        : <React.Fragment></React.Fragment>
                }

                {
                    this.state.rightContentName === "learn"
                        ? <RightContainer>
                            <Learn
                                onClose={() => {
                                    _this.setRightContentName(null)
                                }}
                                startNewQueryInConsole={this.startNewQueryInConsole.bind(this)}
                            />
                        </RightContainer>

                        : <React.Fragment></React.Fragment>
                }
                {
                    this.state.rightContentName === "graph-display-settings"
                        ? <RightContainer>
                            <CanvasDisplay
                                onClose={() => {
                                    _this.setRightContentName(null)
                                }}
                                startRenderingGraph={this.canvasCtrl.startRenderingGraph.bind(this)}

                                // startNewQueryInConsole={this.startNewQueryInConsole.bind(this)}
                            />
                        </RightContainer>

                        : <React.Fragment></React.Fragment>
                }
                {
                    this.state.rightContentName === "response-viewer"
                        ? <RightContainer>
                            <ResponseViewer
                                onClose={() => {
                                    _this.setRightContentName(null)
                                }}
                                responseData={this.state.lastResponse}

                                // startNewQueryInConsole={this.startNewQueryInConsole.bind(this)}
                            />
                        </RightContainer>

                        : <React.Fragment></React.Fragment>
                }
                {
                    this.state.isQuerying === true || this.state.isRenderingCanvas === true
                        ? <LoadingDiv statusMessage={this.state.statusMessage}
                                      stopRenderingGraph={this.canvasCtrl.stopRenderingGraph.bind(this)}
                        />
                        : <React.Fragment/>
                }
                {/*<ModalContainer />*/}
                {/*<LoadingDiv statusMessage={this.state.statusMessage}/>*/}
                {/*<LoadingDiv/>*/}

            </DefaultLayout>)
    }

}
