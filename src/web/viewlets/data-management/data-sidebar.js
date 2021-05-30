import React from "react";
import {Alert, Card, Form, FormControl, InputGroup, Nav} from "react-bootstrap";
import PropTypes from "prop-types";
import {DataEdgeManagement, DataVertexManagement} from "./sidebar-list";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDatabase, faSync, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import DefaultRemoteComponent from "../../layouts/default-remote";


export default class DataSidebarViewlet extends DefaultRemoteComponent {

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
        style: PropTypes.object,
        onClose: PropTypes.func,
        cardBodyStyle: PropTypes.object

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

    refreshData() {
        if (this.connector) {
            const verticesStateQuery = this.connector.requestBuilder.getVerticesLabelStats();
            const edgesStatsQuery = this.connector.requestBuilder.getEdgesLabelStats();
            const queryPayload = this.connector.requestBuilder.combineQueries(verticesStateQuery, edgesStatsQuery);
            console.log("queryPayload", queryPayload);
            this.makeQuery(queryPayload);
        }

    }

    componentDidMount() {
        super.componentDidMount();
        this.refreshData();
    }

    searchLabels(event) {
        const label = event.target.value;
        if (!label) {
            this.setState({
                filteredNodeStats: [],
                filteredEdgeStats: []
            })
            return;
        }
        let reg = new RegExp(label.split('').join('\\w*').replace(/\W/, ""), 'i');
        const _this = this;

        const vertexLabels = this.state.verticesStats.map(a => a.label);
        // TODO
        // eslint-disable-next-line array-callback-return
        const filteredNodeLabels = vertexLabels.filter(function (labelData) {
            if (labelData.match(reg)) {
                return labelData
            }
        });
        const edgeLabels = this.state.edgeStats.map(a => a.label);
        // TODO
        // eslint-disable-next-line array-callback-return
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
            <div className={" position-absolute  d-flex"} style={this.props.style}>
                <div className={" flex-fill ml-3  border-top-0 bg-white"}>

                    <Card className={"border-top-0 rounded-0"}>
                        {/*<Card.Header>*/}
                        {/*    <FontAwesomeIcon icon={faHistory}/> Data Management (*/}
                        {/*</Card.Header>*/}
                        <Card.Header className={"bg-secondary text-white pt-2 pb-2 rounded-0"}>
                            <FontAwesomeIcon icon={faDatabase}/> Graph Overview
                        </Card.Header>
                        <Card.Body className={"p-0"}>


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
                                    ? <React.Fragment>

                                        <div className="row">
                                            <div className="col col-12">
                                                <Alert variant={"info"} className={"m-3 p-2"}>
                                                    Connecting to Invana Engine; Querying..
                                                </Alert>
                                                <p className={"text-muted small m-3"}><strong>Note</strong>: If this takes
                                                    more than 180 seconds, check
                                                    <a href={this.connector.serverUrl}
                                                       className={"text-dark"}
                                                       target={"_new"}>Invana Engine API</a> if it is functional.
                                                </p>
                                            </div>
                                        </div>

                                    </React.Fragment>
                                    : <React.Fragment>

                                        <div className="display-block ">
                                            <div className="row">
                                                <div className="col col-9">
                                                    <Nav className=" mt-2 mb-1">
                                                        <Nav.Item className={"ml-3 "}>
                                                    <span>
                                                        <strong>{this.state.verticesStats.length}</strong> Node Labels
                                                    </span>
                                                        </Nav.Item>
                                                        <Nav.Item className={"ml-3"}>
                                                    <span>
                                                        <strong>{this.state.edgeStats.length}</strong> Relationship Labels
                                                    </span>
                                                        </Nav.Item>

                                                    </Nav>
                                                </div>
                                                <div className="col col-3">
                                                    <Nav className=" mt-2 mb-1 ">

                                                        <Nav.Item className={"mr-0 "}>
                                                    <span>
                                                          <button className={"btn btn-link text-muted p-0 ml-3 small"}
                                                                  onClick={() => this.refreshData()}>
                                                    <FontAwesomeIcon icon={faSync}/></button>
                                                    </span>
                                                        </Nav.Item>
                                                        <Nav.Item className={"mr-3 "}>
                                                    <span>
                                                          <button className={"btn btn-link text-muted p-0 ml-3 small"}
                                                                  onClick={() => this.props.onClose()}>
                                                    <FontAwesomeIcon icon={faWindowClose}/></button>
                                                    </span>
                                                        </Nav.Item>

                                                    </Nav>
                                                </div>
                                            </div>

                                            {/*<Nav className="ml-auto">*/}

                                            {/*</Nav>*/}
                                            <div className={" border-bottom ml-3 mr-3"}/>
                                        </div>

                                        <div className="mb-3" style={this.props.cardBodyStyle}>
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
                                        </div>
                                    </React.Fragment>
                            }


                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }

}

