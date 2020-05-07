import React from 'react';
import '../viewer.css';

import GremlinResponseSerializers from './gremlin-serializer';
import GraphCanvas from './canvas';
import CanvasStatsCanvas, {CopyRightInfo, NotificationDiv, ConnectionStatus} from "./util-components";
import {GREMLIN_SERVER_URL, uuidv4} from "../../config";
import {PropertiesCanvas} from "./properties";
import {LegendCanvas} from "./legend";
import ErrorBoundary from "./error-boundary";


export default class GraphViewer extends React.Component {

    gremlin_serializer = new GremlinResponseSerializers();
    ws = this.createNewWebsocket();
    isDataChanged = true;

    constructor() {
        // This component can load
        super();
        this.state = {
            "nodes": [],
            "links": [],
            "freshQuery": true,
            "gremlinQuery": "",

            "isConnected2Server": "",
            "statusMessage": "",
            "errorMessage": "",


            "showProperties": false,
            "selectedData": {}
        };
    }

    createNewWebsocket() {
        return new WebSocket(GREMLIN_SERVER_URL);
    }

    updateQueryInput(query) {
        document.querySelector('input[type="text"]').value = query;
    }

    queryGremlinServer(query, freshQuery) {
        let _this = this;
        if (typeof freshQuery === "undefined") {
            freshQuery = false;
        }
        console.log("queryGremlinServer ::: freshQuery, query", freshQuery, query);

        this.setState({
            "gremlinQuery": query
        })


        if (query) {

            let msg = {
                "requestId": uuidv4(),
                "op": "eval",
                "processor": "",
                "args": {
                    "gremlin": query,
                    "bindings": {},
                    "language": "gremlin-groovy"
                }
            };

            let data = JSON.stringify(msg);
            if (this.ws.readyState === 1) {
                _this.ws.send(data, {mask: true});
                _this.updateStatusMessage("Sending a Query")
            } else {
                _this.ws.onopen = function () {
                    _this.ws.send(data, {mask: true});
                    _this.updateStatusMessage("Sending a Query")
                };
            }

            if (freshQuery === true) {
                this.addQueryToUrl(query);
                this.updateQueryInput(query);
            }
            _this.setState({
                "freshQuery": freshQuery
            })
        }

    }

    checkIfNodeAlreadyExist(node, existingNodes) {
        existingNodes.forEach(function (d) {
            console.log("====checkifNode: d, node", d.id, node.id)
            if (d.id === node.id) {
                console.log("====checkifNode: TRUE")
                return true;
            }
            console.log("====checkifNode: type validation", typeof d.id, typeof node.id);

        });
        return false;
    }

    checkIfEdgeAlreadyExist(link, existing_links) {
        existing_links.forEach(function (d) {
            if (d.id === link.id) {
                return true;
            }
        });
        return false;
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

        if (response.status.code === 200 || response.status.code === 206) {
            _this.updateStatusMessage("Query Successfully Responded.");
            _this.setState({
                "errorMessage": null
            })
            let result = _this.gremlin_serializer.process(response);
            let _ = _this.gremlin_serializer.seperate_vertices_and_edges(result);

            console.log("==================query response ", _.nodes.length, _.links.length);
            _this.isDataChanged = true;

            if (this.state.freshQuery === false) {
                // extend the graph if this is not fresh query.

                const existingNodes = _this.state.nodes;
                const existingLinks = _this.state.links;

                let overallNodes = _.nodes.concat(existingNodes);
                let overallLinks = _.links.concat(existingLinks);

                const uniqueNodes = [...new Map(overallNodes.map(item => [item.id, item])).values()];
                const uniqueLinks = [...new Map(overallLinks.map(item => [item.id, item])).values()];


                _this.setState({
                    nodes: uniqueNodes,
                    links: uniqueLinks,
                    NODE_ID_TO_LINK_IDS: this.get_NODE_ID_TO_LINK_IDS(uniqueLinks),
                    LINK_ID_TO_LINK: this.get_LINK_ID_TO_LINK(uniqueLinks)
                });

            } else {
                // use the data from current query only as this is a fresh query.
                let existingNodes = _.nodes;
                let existingLinks = _.links;

                _this.setState({
                    nodes: existingNodes,
                    links: existingLinks,
                    NODE_ID_TO_LINK_IDS: this.get_NODE_ID_TO_LINK_IDS(existingLinks),
                    LINK_ID_TO_LINK: this.get_LINK_ID_TO_LINK(existingLinks)
                });

            }


        } else {

            _this.setState({
                "errorMessage": JSON.stringify(response,),
                "statusMessage": "Query Successfully Responded." +
                    " But returned non 200 status[" + response.status.code + "]"
            })
        }


    }

    componentDidUpdate(prevProps) {
        this.isDataChanged = false;
    }

    addQueryToUrl(query) {
        let u = new URL(window.location.href);
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set("query", query);
        if (window.history.replaceState) {
            //prevents browser from storing history with each change:
            // no history will be added with replaceState
            window.history.pushState({}, null, u.origin + u.pathname + "?" + searchParams.toString());
        }


    }

    onPageLoadInitQuery() {
        let query = new URLSearchParams(window.location.search).get("query");
        if (this.ws) {
            this.queryGremlinServer(query, true);
        }

    }

    componentDidMount() {

        this.setupGremlinServer()
        this.onPageLoadInitQuery()
    }

    onFormSubmit(e) {
        e.preventDefault();
        let query = e.target.query.value;
        if (query && this.ws) {
            this.queryGremlinServer(query, true);
        }
    }

    updateStatusMessage(statusMessage) {
        this.setState({
            "statusMessage": statusMessage
        })
    }

    setConnected2Gremlin() {
        this.setState({
            "isConnected2Server": true,
            "statusMessage": "Connected to Server"
        })
    }

    setDisconnectedFromGremlin() {
        this.setState({
            "isConnected2Server": false,
            "statusMessage": "Disconnected from Server"
        })
    }

    setSelectedData(data) {
        this.setState({...data})
    }

    setupGremlinServer() {
        /*
        Usage:


         */

        let _this = this;

        this.ws.onopen = function (event) {
            console.log("ws-opened");
            _this.setConnected2Gremlin()

        };

        this.ws.onmessage = function (event) {
            _this.processGremlinResponseEvent(event);
            // _this.updateStatusMessage("Query Successfully Responded.");

        };

        // An event listener to be called when an error occurs.
        this.ws.onerror = function (err) {
            console.log('Connection error using websocket', err);
            _this.updateStatusMessage("Failed with error" + JSON.stringify(err));

        };

        // An event listener to be called when the connection is closed.
        this.ws.onclose = function (err) {
            console.log('Connection error using websocket', err);
            _this.setDisconnectedFromGremlin();

            let retry_in = 10;


            let i = 1;
            let timer = setInterval((function () {

                    _this.updateStatusMessage("Connection Attempt Failed. Waited " + i + "s of " + (retry_in) + "s 'retry in' time...");
                    i += 1;

                    if (i > retry_in) {
                        clearInterval(timer);

                        _this.ws = _this.createNewWebsocket();
                        _this.setupGremlinServer();

                    }
                }
            ).bind(this), 1000); // retry in 5 seconds


        };
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
                    />
                </ErrorBoundary>

                <CanvasStatsCanvas nodes_count={this.state.nodes.length} links_count={this.state.links.length}/>
                <PropertiesCanvas selectedData={this.state.selectedData} showProperties={this.state.showProperties}/>
                <LegendCanvas nodes={this.state.nodes} links={this.state.links}/>

                <NotificationDiv/>
                <ConnectionStatus
                    statusMessage={this.state.statusMessage}
                    isConnected2Server={this.state.isConnected2Server}
                    errorMessage={this.state.errorMessage}
                />
                <CopyRightInfo/>

            </div>
        )
    }
};
