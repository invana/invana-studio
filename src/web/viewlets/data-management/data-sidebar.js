import React from "react";
import {Alert, Nav} from "react-bootstrap";
import MenuComponent from "../../ui-components/menu";
import PropTypes from "prop-types";
import {DataEdgeManagement, DataVertexManagement} from "./sidebar-list";
import RemoteEngine from "../../layout/remote";


export default class DataSidebarViewlet extends RemoteEngine {

    static propTypes = {
        parentRemoteComponent: PropTypes.object,
        onItemClick: PropTypes.func,
        onSideBarLoadedCallBack: PropTypes.func,
        startNewQueryInConsole: PropTypes.func,
        addToHiddenLabels: PropTypes.func,
        removeFromHiddenLabels: PropTypes.func,
        showLabelMenu: PropTypes.bool,
        canvasCtrl: PropTypes.object,
        reRenderVisualizer: PropTypes.object
    }

    state = {
        verticesStats: [],
        edgeStats: [],
        queryFailure: false,
        hoveredLabelName: null
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


    render() {
        return (
            <div>
                {/*<Form className={"mb-1 mt-2"}>*/}
                {/*    <InputGroup>*/}
                {/*        <FormControl*/}
                {/*            className={"mt-0 ml-3 mr-3"} size={"sm"}*/}
                {/*            placeholder="Search nodes and edges ..."/>*/}
                {/*    </InputGroup>*/}
                {/*</Form>*/}
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

                            <DataVertexManagement onItemClick={this.props.onItemClick} {...this.props}
                                                  canvasCtrl={this.props.canvasCtrl}
                                                  showLabelMenu={this.props.showLabelMenu}
                                                  reRenderVisualizer={this.props.reRenderVisualizer}
                                                  statsData={this.state.verticesStats}/>
                            <DataEdgeManagement onItemClick={this.props.onItemClick} {...this.props}
                                                canvasCtrl={this.props.canvasCtrl}
                                                showLabelMenu={this.props.showLabelMenu}
                                                reRenderVisualizer={this.props.reRenderVisualizer}
                                                statsData={this.state.edgeStats}/>

                        </React.Fragment>
                }

            </div>
        )
    }

}
