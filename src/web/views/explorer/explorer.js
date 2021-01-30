import React from 'react';
import DefaultLayout from "../../layout/default";
import {Row, Nav} from "react-bootstrap";
import MenuComponent from "../../ui-components/menu";
import CanvasComponent from "../../ui-components/canvas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCamera,
    faCode,
    faCog,
    faFilter,
    faSearch, faStickyNote,
    faSync,
    faTrashAlt,
    faUserAstronaut
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../ui-components/sidebar";
import MainContent from "../../ui-components/main-content";
import ForceDirectedGraphCanvas from "../../interface/canvas/canvas";
import RemoteEngine from "../../layout/remote";
import DataSidebarViewlet from "../../viewlets/data-management/data-sidebar";
import VisJsGraphCanvasUtils from "./canvas-utils";
import Button from "react-bootstrap/Button";
import CanvasController from "../../interface/canvas/canvas-ctrl";
import VisNetworkReactComponent from "vis-network-react";
import defaultOptions from "../../interface/canvas/options";
import events from "../../interface/canvas/events";
import NodeMenu from "../../interface/node-menu";
import FocusedNodesList from "../../interface/focused-nodes-list";

export default class ExplorerView extends RemoteEngine {

    constructor(props) {
        super(props);
        this.state = {
            statusCode: null,
            nodes: [],
            edges: [],
            nodeGroups: {},
            edgeGroups: {},
            resetVisualizer: false,
            selectedElementData: null,
            focusedNodes: []

        }
        this.canvasUtils = new VisJsGraphCanvasUtils();
        this.canvasCtrl = null;
        this.network = null;
    }


    addNodeToFocusedNodes(node) {
        console.log("addNodeToFocusedNodes", node);

        let existingFocusedNodes = this.state.focusedNodes;

        if (existingFocusedNodes.length > 0) {
            existingFocusedNodes.forEach((focusedNode) => {
                if (focusedNode.id !== node.id) {
                    existingFocusedNodes.push(node);
                }
            });
            console.log("======existingFocusedNodes", existingFocusedNodes)
            this.setState({focusedNodes: existingFocusedNodes});
        } else {
            this.setState({focusedNodes: [node]});
        }
    }

    getFocusedNodes() {
        console.log("getFocusedNodes", this.state.focusedNodes);
        return this.state.focusedNodes;
    }


    // componentDidMount() {
    //     super.componentDidMount();
    //     const verticesFilterQuery = this.connector.requestBuilder.filterVertices("Drug", 10, 0);
    //     const queryPayload = this.connector.requestBuilder.combineQueries(verticesFilterQuery, null);
    //     this.makeQuery(queryPayload);
    // }
    setSelectedElementData(selectedDataId, selectedElementType) {
        console.log("=======-=-=-=this.network", this.network);
        let selectedElementData = null;
        if (selectedElementType === "g:Vertex") {
            selectedElementData = this.network.body.data.nodes.get(selectedDataId)
        } else if (selectedElementType === "g:Edge") {
            selectedElementData = this.network.body.data.edges.get(selectedDataId)
        } else {

        }
        this.setState({selectedElementData: selectedElementData});
    }

    setResetVisualizer() {
        this.setState({resetVisualizer: true});
    }

    flushDataState() {
        this.setState({nodes: [], edges: []});
        this.network.setData({nodes: [], edges: []});
    }

    setNetwork(network) {
        this.network = network;
        let _this = this;
        this.network.on("stabilizationIterationsDone", function () {
            _this.network.setOptions({physics: false});
        });

        this.canvasCtrl = new CanvasController(
            this.network,
            this.setStatusMessage.bind(this),
            this.flushDataState.bind(this),
            this.setResetVisualizer.bind(this)
        );
    }

    getNetwork() {
        return this.network;
    }

    getEdges(edges) {
        this.edges = edges;
    }

    getNodes(nodes) {
        this.nodes = nodes;
    }

    separateNodesAndEdges(data) {
        let nodes = [];
        let edges = [];
        data.forEach((datum) => {
            if (datum.type === "g:Edge") {
                edges.push(datum);
            } else if (datum.type === "g:Vertex") {
                nodes.push(datum);
            }
        })
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
            this.setState({statusCode: response.transporterStatusCode})
        }

    }


    addNewData(newNodes, newEdges) {
        // const id = data.nodes.length + 1;
        console.log("addNewData", newNodes);

        const {newNodesToAdd, newEdgesToAdd} = this.canvasCtrl.getNewDataToAdd(
            newNodes, newEdges
        );

        const nodes = this.canvasUtils.prepareNodes(newNodesToAdd);
        const edges = this.canvasUtils.prepareEdges(newEdgesToAdd);
        this.network.setOptions({
            groups: {
                useDefaultGroups: false,
                ...this.canvasUtils.nodeGroups,
                ...this.canvasUtils.edgeGroups
            }
        });
        console.log(" ...this.canvasUtils.edgeGroups", this.canvasUtils.edgeGroups);
        // this.network.body.data.nodes.clear();
        // this.network.body.data.edges.clear();
        this.network.body.data.nodes.add(nodes);
        this.network.body.data.edges.add(edges);

        console.log("this.this.network", this.network);

        this.setState({
            nodes: [...nodes, ...this.state.nodes],
            edges: [...edges, ...this.state.edges]
        })

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
        this.setState({focusedNodes: focusedNodes});

    }

    render() {
        console.log("this.props", this.props.location);
        return (<DefaultLayout {...this.props}>
            <Row>
                <Sidebar>
                    <DataSidebarViewlet
                        onItemClick={this.onItemClick.bind(this)}
                        dataStore={this.dataStore}/>
                </Sidebar>
                <MainContent className={"main-content"}>
                    <MenuComponent className={" bg-light border-bottom"}>
                        <Nav className="mr-auto">
                            {/*<Nav.Item>*/}
                            {/*    <Nav.Link>*/}
                            {/*        Graph Canvas*/}
                            {/*    </Nav.Link>*/}
                            {/*</Nav.Item>*/}
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Item>
                                {/*<button className={"nav-link"}*/}
                                {/*        onClick={() => {*/}
                                {/*            const verticesFilterQuery = this.connector.requestBuilder.filterVertices("Drug", 10, 0);*/}
                                {/*            const queryPayload = this.connector.requestBuilder.combineQueries(verticesFilterQuery, null);*/}
                                {/*            this.setState({queryObject: queryPayload});*/}
                                {/*        }}>*/}
                                {/*    <FontAwesomeIcon icon={faUserAstronaut}/>*/}
                                {/*</button>*/}
                            </Nav.Item>
                            <Nav.Item>
                                <Button size={"sm"} variant={"link"}>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button size={"sm"} variant={"link"}>
                                    <FontAwesomeIcon icon={faFilter}/>
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button size={"sm"} variant={"link"}
                                        onClick={() => this.canvasCtrl.confirmRedrawCanvas()}
                                >
                                    <FontAwesomeIcon icon={faSync}/>
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button size={"sm"} variant={"link"}
                                        onClick={() => this.canvasCtrl.downloadCanvasImage()}
                                >
                                    <FontAwesomeIcon icon={faCamera}/>
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button size={"sm"} variant={"link"}
                                        onClick={() => this.canvasCtrl.confirmFlushCanvas()}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                </Button>
                            </Nav.Item>
                            <Nav.Item className={"mr-2"}>
                                |
                            </Nav.Item>
                            <Nav.Item>
                                <Button size={"sm"} variant={"link"}>
                                    <FontAwesomeIcon icon={faStickyNote}/>
                                </Button>
                            </Nav.Item>
                            <Nav.Item className={"mr-1"}>
                                <Button size={"sm"} variant={"link"}>
                                    <FontAwesomeIcon icon={faCog}/>
                                </Button>
                            </Nav.Item>
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
                                    selectedElementData={this.state.selectedElementData}
                                    setSelectedElementData={this.setSelectedElementData.bind(this)}
                                    getFocusedNodes={this.getFocusedNodes.bind(this)}
                                    addNodeToFocusedNodes={this.addNodeToFocusedNodes.bind(this)}

                                    connector={this.connector}
                                    makeQuery={this.makeQuery.bind(this)}

                                    setQueryObject={this.setQueryObject.bind(this)}
                                    canvasUtils={this.canvasUtils}
                                />
                                : <React.Fragment/>
                        }

                        <ForceDirectedGraphCanvas
                            // queryObject={this.state.queryObject}
                            nodes={this.state.nodes}
                            edges={this.state.edges}
                            resetVisualizer={this.state.resetVisualizer}
                            // nodeGroups={this.state.nodeGroups}
                            // edgeGroups={this.state.edgeGroups}
                            setNetwork={this.setNetwork.bind(this)}
                            // getNetwork={this.getNetwork.bind(this)}
                            setSelectedElementData={this.setSelectedElementData.bind(this)}
                            // makeQuery={this.makeQuery.bind(this)}
                        />

                    </CanvasComponent>
                    <MenuComponent className={"sm footer"}>
                        <Nav className="mr-auto">
                            <Nav.Item className={"mr-3 ml-2"}>
                                {this.state.statusMessage}
                            </Nav.Item>
                            <Nav.Item>
                                {
                                    this.state.statusCode
                                        ? <span>{this.state.statusCode} response</span>
                                        : <span></span>
                                }

                            </Nav.Item>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Item className={"mr-2"}>
                                {this.state.nodes.length} nodes, {this.state.edges.length} edges
                            </Nav.Item>
                        </Nav>
                    </MenuComponent>
                </MainContent>
            </Row>
        </DefaultLayout>)
    }

}
