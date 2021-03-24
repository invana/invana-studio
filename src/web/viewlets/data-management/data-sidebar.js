import React from "react";
import {Alert, Form, FormControl, InputGroup, Nav} from "react-bootstrap";
import MenuComponent from "../../ui-components/menu";
import PropTypes from "prop-types";
import {DataEdgeManagement, DataVertexManagement} from "./sidebar-list";
import RemoteEngine from "../../layout/remote";


export default class DataSidebarViewlet extends RemoteEngine {

    static propTypes = {
        parentRemoteComponent: PropTypes.object,
        onItemClick: PropTypes.func,
        loadElementData: PropTypes.func,
        onSideBarLoadedCallBack: PropTypes.func,
        startNewQueryInConsole: PropTypes.func,
        addToHiddenLabels: PropTypes.func,
        removeFromHiddenLabels: PropTypes.func,
        showLabelMenu: PropTypes.bool,
        canvasCtrl: PropTypes.object,
        edgeLabelsInCanvas: PropTypes.array,
        nodeLabelsInCanvas: PropTypes.array,

    }

    state = {
        verticesStats: [],
        edgeStats: [],
        queryFailure: false,
        hoveredLabelName: null,
        filteredNodeStats: [],
        filteredEdgeStats: [],

    }

    processResponse(response) {
        const lastResponse = response.getResponseResult();
        console.log("lastResponse===", lastResponse === undefined, lastResponse);
        if (lastResponse === undefined) {
            console.log("failed to fetch data");
            this.setState({queryFailure: true});
        } else {
            console.log("this.connector.requestBuilder", this.connector.requestBuilder.getVerticesLabelStats());
            const verticesStats = response.getResponseResult(this.connector.requestBuilder.getVerticesLabelStats().queryKey) || [];
            if (this.props.onSideBarLoadedCallBack) {
                this.props.onSideBarLoadedCallBack(verticesStats);
            }

            this.setState({
                verticesStats: verticesStats,
                edgeStats: response.getResponseResult(this.connector.requestBuilder.getEdgesLabelStats().queryKey) || [],
                queryFailure: false,
            });
        }
    }


    componentDidMount() {
        super.componentDidMount();
        if (this.connector) {
            const verticesStateQuery = this.connector.requestBuilder.getVerticesLabelStats();
            const edgesStatsQuery = this.connector.requestBuilder.getEdgesLabelStats();
            const queryPayload = this.connector.requestBuilder.combineQueries(verticesStateQuery, edgesStatsQuery);
            console.log("queryPayload", queryPayload);
            this.makeQuery(queryPayload);
        }
    }

    searchLabels(event) {
        const label = event.target.value;
        let reg = new RegExp(label.split('').join('\\w*').replace(/\W/, ""), 'i');
        const _this = this;

        const vertexLabels = this.state.verticesStats.map(a => a.label);
        const filteredNodeLabels = vertexLabels.filter(function (labelData) {
            if (labelData.match(reg)) {
                return labelData
            }
        });
        const edgeLabels = this.state.edgeStats.map(a => a.label);

        const filteredEdgeLabels = edgeLabels.filter(function (labelData) {
            if (labelData.match(reg)) {
                return labelData;
            }
        });

        const filteredNodeStats = _this.state.verticesStats.filter(function (a) {
            return filteredNodeLabels.includes(a.label)
        });
        const filteredEdgeStats = _this.state.edgeStats.filter(function (a) {
            return filteredEdgeLabels.includes(a.label)
        });
        console.log("searchLabels", filteredNodeStats, this.state.verticesStats, vertexLabels)
        this.setState({
            filteredNodeStats,
            filteredEdgeStats
        })
    }

    render() {
        return (
            <div>
                <Form className={"mb-1 mt-2"}>
                    <InputGroup>
                        <FormControl onChange={this.searchLabels.bind(this)}
                                     className={"mt-0 ml-3 mr-3"} size={"sm"}
                                     name={"labelsFilterKey"}
                                     autoComplete={"off"}
                                     placeholder={"Search nodes and edges labels ..."}/>
                    </InputGroup>
                </Form>
                {
                    this.state.queryFailure === true ?
                        <Alert variant={"danger"} className={"m-3 p-2"}>
                            Failed to fetch the data. Check
                            if you are able to query <a href={this.connector.serverUrl}
                                                        className={"text-dark"}
                                                        target={"_new"}>Invana Engine
                            API</a> fine.
                        </Alert>
                        : <React.Fragment/>
                }
                {
                    this.state.isQuerying === true
                        ? <React.Fragment><Alert variant={"info"} className={"m-3 p-2"}>
                            Connecting to Invana Engine; Querying..
                        </Alert>
                            <p className={"text-muted small m-3"}><strong>Note</strong>: If this takes
                                more than 180 seconds, check <a href={this.connector.serverUrl}
                                                                className={"text-dark"}
                                                                target={"_new"}>Invana Engine API</a> if it is functional.
                            </p>
                        </React.Fragment>
                        : <React.Fragment>
                            <MenuComponent className={"pb-2 mt-2"}>
                                <Nav className="mr-auto">
                                    <Nav.Item className={"ml-3 align-middle"}>
                            <span>
                                <strong>{this.state.verticesStats.length}</strong> Vertices
                            </span>
                                    </Nav.Item>
                                    <Nav.Item className={"ml-3 align-middle"}>
                            <span>
                                <strong>{this.state.edgeStats.length}</strong> Edges
                            </span>
                                    </Nav.Item>
                                </Nav>
                                <Nav className="ml-auto">
                                </Nav>
                            </MenuComponent>


                            {

                                this.state.filteredNodeStats.length > 0 || this.state.filteredEdgeStats.length > 0
                                    ? <div className={"border-bottom mb-3 pb-3"}>
                                        <h6 className={"ml-3 mb-0  text-uppercase font-weight-bold small bg-light p-1"}>Filtered
                                            Labels</h6>
                                        <DataVertexManagement
                                            onItemClick={this.props.onItemClick} {...this.props}
                                            loadElementData={this.props.loadElementData}
                                            canvasCtrl={this.props.canvasCtrl}
                                            showLabelMenu={this.props.showLabelMenu}
                                            statsData={this.state.filteredNodeStats}
                                            nodeLabelsInCanvas={this.props.nodeLabelsInCanvas}
                                            edgeLabelsInCanvas={this.props.edgeLabelsInCanvas}

                                        />
                                        <DataEdgeManagement onItemClick={this.props.onItemClick} {...this.props}
                                                            canvasCtrl={this.props.canvasCtrl}
                                                            loadElementData={this.props.loadElementData}
                                                            showLabelMenu={this.props.showLabelMenu}
                                                            statsData={this.state.filteredEdgeStats}
                                                            nodeLabelsInCanvas={this.props.nodeLabelsInCanvas}
                                                            edgeLabelsInCanvas={this.props.edgeLabelsInCanvas}
                                        />
                                    </div>
                                    : <React.Fragment/>
                            }


                            <DataVertexManagement onItemClick={this.props.onItemClick} {...this.props}
                                                  loadElementData={this.props.loadElementData}
                                                  canvasCtrl={this.props.canvasCtrl}
                                                  showLabelMenu={this.props.showLabelMenu}
                                                  statsData={this.state.verticesStats}
                                                  nodeLabelsInCanvas={this.props.nodeLabelsInCanvas}
                                                  edgeLabelsInCanvas={this.props.edgeLabelsInCanvas}
                            />
                            <DataEdgeManagement onItemClick={this.props.onItemClick} {...this.props}
                                                loadElementData={this.props.loadElementData}
                                                canvasCtrl={this.props.canvasCtrl}
                                                showLabelMenu={this.props.showLabelMenu}
                                                statsData={this.state.edgeStats}
                                                nodeLabelsInCanvas={this.props.nodeLabelsInCanvas}
                                                edgeLabelsInCanvas={this.props.edgeLabelsInCanvas}
                            />

                        </React.Fragment>
                }

            </div>
        )
    }

}

