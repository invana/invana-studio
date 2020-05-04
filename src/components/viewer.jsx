import React from 'react';
import './viewer.css';

import GremlinResponseSerializers from './gremlin-serializer';
import GraphCanvas from './canvas';
import {CopyRightInfo, NotificationDiv, ConnectionStatus} from "./util-components";
import {GREMLIN_SERVER_URL, uuidv4} from "../config";

export default class GraphViewer extends React.Component {

    gremlin_serializer = new GremlinResponseSerializers();
    ws = this.createNewWebsocket();

    constructor() {
        // This component can load
        super();
        this.state = {
            "nodes": [],
            "links": [],
            "freshQuery": true,
            "gremlinQuery": "",
            "isConnected2Server": "",
            "statusMessage": ""
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

    checkIfNodeAlreadyExist(node, existingNodes) {
        var is_exist = false;
        existingNodes.forEach(function (d) {
            if (d.id === node.id) {
                is_exist = true;
                return is_exist;
            }
        });
        return is_exist;
    }

    checkIfEdgeAlreadyExist(node, existing_links) {
        var is_exist = false;
        existing_links.forEach(function (d) {
            if (d.id === node.id) {
                is_exist = true;
                return is_exist;
            }
        });
        return is_exist;
    }

    processGremlinResponseEvent(event) {
        let _this = this;
        let response = JSON.parse(event.data);

        console.log("onmessage received", response);
        let result = _this.gremlin_serializer.process(response);
        let _ = _this.gremlin_serializer.seperate_vertices_and_edges(result);


        // use the data from current query only as this is a fresh query.
        let existingNodes = _[0];
        let existingLinks = _[1];


        if (this.state.freshQuery === false) {
            // extend the graph if this is not fresh query.

            existingNodes = _this.state.nodes;
            existingLinks = _this.state.links;

            _[0].forEach(function (d) {
                let is_exist = _this.checkIfNodeAlreadyExist(d, existingNodes);
                if (!is_exist) {
                    existingNodes.push(d);
                }
            });

            _[1].forEach(function (d) {
                let is_exist = _this.checkIfEdgeAlreadyExist(d, existingLinks);
                if (!is_exist) {
                    existingLinks.push(d);
                }
            });
        }
        _this.setState({
            nodes: existingNodes,
            links: existingLinks
        });


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
            _this.updateStatusMessage("Query Successfully Responded.");

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

            // let retry_in = 10;


            // let i = 1;
            // let timer = setInterval((function () {
            //
            //         _this.updateStatusMessage("Connection Attempt Failed. Waited " + i + "s of " + (retry_in) + "s 'retry in' time...");
            //         i += 1;
            //
            //         if (i > retry_in) {
            //             clearInterval(timer);
            //             _this.ws = _this.setupGremlinServer();
            //
            //         }
            //     }
            // ).bind(this), 1000); // retry in 5 seconds


        };
    }


    render() {

        console.log("=================== Rendering the Viewer ===================");
        return (
            <div>
                <div className="search-div">
                    <form className={"viewer-form "} action="" onSubmit={this.onFormSubmit.bind(this)}>
                        <input type="text" name="query" placeholder="g.V().limit(5)"/>
                    </form>
                </div>
                <GraphCanvas
                    nodes={this.state.nodes} links={this.state.links}
                    queryGremlinServer={this.queryGremlinServer.bind(this)}
                />


                <NotificationDiv/>
                <ConnectionStatus statusMessage={this.state.statusMessage}
                                  isConnected2Server={this.state.isConnected2Server}/>
                <CopyRightInfo/>

            </div>
        )
    }
};
