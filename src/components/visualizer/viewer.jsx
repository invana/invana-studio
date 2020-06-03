import React from 'react';
import '../viewer.css';

import GremlinResponseSerializers from './gremlin-serializer';
import GraphCanvas from './canvas';
import CanvasStatsCanvas, {CopyRightInfo, NotificationDiv, ConnectionStatus} from "./util-components";
import {SelectedDataCanvas} from "./selected-data";
import {LegendCanvas} from "./legend";
import ErrorBoundary from "./error-boundary";
import GremlinConnectorViewBase from "../core/gremlin-connector";
import LoadingDiv from "../core/loading";

export default class GraphViewer extends GremlinConnectorViewBase {

    gremlin_serializer = new GremlinResponseSerializers();
    isDataChanged = true;

    getDataFromLocalStorage(itemKey) {
        try {
            return JSON.parse(localStorage.getItem(itemKey))
        } catch (e) {
            return null;
        }
    }

    constructor() {
        // This component can load
        super();
        this.state = {
            "nodes": [],
            "links": [],
            "showProperties": false,
            "selectedData": {},
            "labelsConfig": null,
            "nodeLabels": this.getDataFromLocalStorage("nodeLabels"),
            "linkLabels": this.getDataFromLocalStorage("linkLabels"),
        };
    }


    get_LINK_ID_TO_LINK(edges) {
        // TODO - revist the name
        let data = {};
        edges.forEach(edge => {
            data[edge.id] = edge;
        });
        return data;
    }

    get_NODE_ID_TO_LINK_IDS(edges) {
        // TODO - revist the name
        let data = {};
        edges.forEach(edge => {
            data[edge.source.id || edge.source] = data[edge.source.id || edge.source] || new Set();
            data[edge.target.id || edge.target] = data[edge.target.id || edge.target] || new Set();
            data[edge.source.id || edge.source].add(edge.id);
            data[edge.target.id || edge.target].add(edge.id);
        });
        return data;
    }

    processGremlinResponseEvent(event) {
        let _this = this;
        let response = JSON.parse(event.data);
        console.log("onmessage received", response);
        if (response.status.code === 206) {
            //
            _this.updateStatusMessage("Listing to data streaming");
            const result = _this.gremlin_serializer.process(response);
            const _ = _this.gremlin_serializer.seperate_vertices_and_edges(result);
            this.nodes = this.nodes.concat(_.nodes);
            this.links = this.links.concat(_.links);

        } else if (response.status.code >= 200 && response.status.code <= 300) {
            let timeString = (this.state.loadTimeCounter === 0) ? "approximately a second" : " approximately " + this.state.loadTimeCounter + "s.";
            _this.updateStatusMessage("Query Successfully Responded;" + " Took " + timeString);
            let result = _this.gremlin_serializer.process(response);
            let _ = _this.gremlin_serializer.seperate_vertices_and_edges(result);
            _this.isDataChanged = true;
            if (this.state.freshQuery === false) {
                // extend the graph if this is not fresh query.

                // if
                let existingNodes = [];
                let existingLinks = [];
                if (this.nodes.length > 0) {
                    // check for
                    existingNodes = _this.nodes;
                    existingLinks = _this.nodes;
                } else {
                    existingNodes = _this.state.nodes;
                    existingLinks = _this.state.links;
                }

                let overallNodes = _.nodes.concat(existingNodes);
                let overallLinks = _.links.concat(existingLinks);
                console.log("this.nodes length", this.nodes.length);
                overallNodes = overallNodes.concat(this.nodes);
                overallLinks = overallLinks.concat(this.links);
                const uniqueNodes = [...new Map(overallNodes.map(item => [item.id, item])).values()];
                const uniqueLinks = [...new Map(overallLinks.map(item => [item.id, item])).values()];
                _this.setState({
                    nodes: uniqueNodes,
                    links: uniqueLinks,
                    NODE_ID_TO_LINK_IDS: this.get_NODE_ID_TO_LINK_IDS(uniqueLinks),
                    LINK_ID_TO_LINK: this.get_LINK_ID_TO_LINK(uniqueLinks),
                    errorMessage: null
                });
            } else {
                // use the data from current query only as this is a fresh query.
                let existingNodes = _.nodes;
                let existingLinks = _.links;
                _this.setState({
                    nodes: existingNodes,
                    links: existingLinks,
                    NODE_ID_TO_LINK_IDS: this.get_NODE_ID_TO_LINK_IDS(existingLinks),
                    LINK_ID_TO_LINK: this.get_LINK_ID_TO_LINK(existingLinks),
                    errorMessage: null
                });
            }
        } else {
            _this.setState({
                "errorMessage": JSON.stringify(response,),
                "showErrorMessage": true,
                "statusMessage": "Query Successfully Responded." +
                    " But returned non 200 status[" + response.status.code + "]"
            })
        }
    }

    componentDidUpdate(prevProps) {
        this.isDataChanged = false;
    }

    updateQueryInput(query) {
        document.querySelector('input').value = query;
    }

    componentDidMount() {
        super.componentDidMount();
        // this.setupGremlinServer()
        // this.onPageLoadInitQuery()
        // this.getLabelsConfigFromStorage();
    }

    onFormSubmit(e) {
        e.preventDefault();
        let query = e.target.query.value;
        if (query && this.ws) {
            this.queryGremlinServer(query, true);
        }
    }

    setSelectedData(data) {
        this.setState({...data})
    }

    render() {
        console.log("=================== Rendering the Viewer ===================");
        console.log("======= viewer this.state", this.state.nodes.length, this.state.links.length);

        return (
            <div>


                <div className="search-div">
                    <form className={"viewer-form "} action="" onSubmit={this.onFormSubmit.bind(this)}>
                        <input type="text" name="query" placeholder="g.V().limit(5)"/>
                    </form>
                </div>
                <ErrorBoundary>
                    <GraphCanvas
                        nodes={this.state.nodes}
                        links={this.state.links}
                        NODE_ID_TO_LINK_IDS={this.state.NODE_ID_TO_LINK_IDS}
                        LINK_ID_TO_LINK={this.state.LINK_ID_TO_LINK}
                        queryGremlinServer={this.queryGremlinServer.bind(this)}
                        setSelectedData={this.setSelectedData.bind(this)}
                        isDataChanged={this.isDataChanged}
                        nodeLabels={this.state.nodeLabels}
                        linkLabels={this.state.linkLabels}
                    />
                </ErrorBoundary>
                <CanvasStatsCanvas nodes_count={this.state.nodes.length} links_count={this.state.links.length}/>
                <SelectedDataCanvas selectedData={this.state.selectedData} showProperties={this.state.showProperties}/>
                <LegendCanvas
                    nodes={this.state.nodes}
                    links={this.state.links}
                    nodeLabels={this.state.nodeLabels}
                    linkLabels={this.state.linkLabels}
                />
                <NotificationDiv/>
                <ConnectionStatus
                    statusMessage={this.state.statusMessage}
                    isConnected2Server={this.state.isConnected2Server}
                    showErrorMessage={this.state.showErrorMessage}
                    errorMessage={this.state.errorMessage}
                    closeErrorMessage={this.closeErrorMessage.bind(this)}
                />
                <CopyRightInfo/>
                <LoadingDiv loadingMessage={"Querying"} loadTimeCounter={this.state.loadTimeCounter}
                            statusMessage={this.state.statusMessage}/>
            </div>
        )
    }
};
