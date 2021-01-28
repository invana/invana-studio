import React from 'react';
import DefaultLayout from "../../layout/default";
import {Row, Nav} from "react-bootstrap";
import MenuComponent from "../../ui-components/menu";
import CanvasComponent from "../../ui-components/canvas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCode, faCog, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../ui-components/sidebar";
import MainContent from "../../ui-components/main-content";
import ForceDirectedGraphCanvas from "../../interface/canvas/canvas";
import RemoteEngine from "../../layout/remote";
import DataSidebarViewlet from "../../viewlets/data-management/data-sidebar";
import VisJsGraphCanvasUtils from "./canvas-utils";

export default class ExplorerView extends RemoteEngine {

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            edges: [],
            nodeGroups: {},
            edgeGroups: {}

        }
        this.canvasUtils = new VisJsGraphCanvasUtils();
        this.network = null;
    }

    // componentDidMount() {
    //     super.componentDidMount();
    //     const verticesFilterQuery = this.connector.requestBuilder.filterVertices("Drug", 10, 0);
    //     const queryPayload = this.connector.requestBuilder.combineQueries(verticesFilterQuery, null);
    //     this.makeQuery(queryPayload);
    // }

    getNetwork(network) {
        this.network = network;
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
        }
    }

    addNewData(newNodes, newEdges) {
        // const id = data.nodes.length + 1;
        console.log("addNewData", newNodes);


        const nodes = this.canvasUtils.prepareNodes(newNodes);
        const edges = this.canvasUtils.prepareEdges(newEdges);
        this.network.setOptions({groups: {useDefaultGroups: false, ...this.canvasUtils.nodeGroups}});

        this.setState({
            nodes: nodes,
            edges: edges,
            nodeGroups: this.canvasUtils.nodeGroups,
            // edgeGroups: this.canvasUtils.edgeGroups,
        })
        console.log("this.this.network", this.network);
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
                    <MenuComponent>
                        <Nav className="mr-auto">
                            <Nav.Item>
                                <Nav.Link>
                                    Graph Canvas
                                </Nav.Link>
                            </Nav.Item>
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
                                <Nav.Link href="/connect">
                                    <FontAwesomeIcon icon={faUserAstronaut}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/graph">
                                    <FontAwesomeIcon icon={faCode}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/table">
                                    <FontAwesomeIcon icon={faCog}/>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </MenuComponent>
                    <CanvasComponent>
                        <ForceDirectedGraphCanvas
                            // queryObject={this.state.queryObject}
                            nodes={this.state.nodes}
                            edges={this.state.edges}
                            // nodeGroups={this.state.nodeGroups}
                            // edgeGroups={this.state.edgeGroups}
                            getNetwork={this.getNetwork.bind(this)}
                            // makeQuery={this.makeQuery.bind(this)}
                        />
                    </CanvasComponent>
                    <MenuComponent className={"sm"}>
                        <Nav className="mr-auto">
                            <Nav.Item className={"mr-3 ml-2"}>
                                {this.state.statusMessage}
                            </Nav.Item>
                            <Nav.Item>
                                200 response
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
