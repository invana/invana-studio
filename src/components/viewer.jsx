import React from 'react';
import './viewer.css';

import GremlinResponseSerializers from './gremlin-serializer';
import GraphCanvas from './canvas';
import {CopyRightInfo, NotificationDiv, ConnectionStatus} from "./util-components";
import {GremlinConnector} from "./gremlin-connector";
import {GREMLIN_SERVER_URL, uuidv4} from "../config";

export default class GraphViewer extends React.Component {

    gremlin_serializer = new GremlinResponseSerializers();

    constructor() {
        // This component can load
        super();
        this.state = {
            "nodes": [],
            "links": [],
            "gremlinQuery": "",
            "isConnected2Server": "",
            "statusMessage": "",
            "ws": null
        };
    }

    updateQueryInput(query) {
        document.querySelector('input[type="text"]').value = query;
    }

    queryGremlinServer(query, update_url) {
        let _this = this;
        if (typeof update_url === "undefined") {
            update_url = false;
        }
        console.log("queryGremlinServer ::: update_url, query", update_url, query);

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
        if (this.state.ws.readyState === 1) {
            _this.state.ws.send(data, {mask: true});
            _this.updateStatusMessage("Sending a Query")
        } else {
            _this.state.ws.onopen = function () {
                _this.state.ws.send(data, {mask: true});
                _this.updateStatusMessage("Sending a Query")

            };
        }

        if (update_url === true) {
            this.addQueryToUrl(query);
            this.updateQueryInput(query);
        }

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

        let existingNodes = _this.state.nodes;
        let existingLinks = _this.state.links;

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
        if (this.state.ws) {
            this.queryGremlinServer(query, true);
        }

    }

    componentDidMount() {
        this.onPageLoadInitQuery();
        this.setState({
            "ws": this.setupGremlinServer()
        })

    }

    onFormSubmit(e) {
        e.preventDefault();
        let query = e.target.query.value;
        if (query && this.state.ws) {
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
        let ws = new WebSocket(GREMLIN_SERVER_URL);

        ws.onopen = function (event) {
            console.log("ws-opened");
            _this.setConnected2Gremlin()
        };

        ws.onmessage = function (event) {
            _this.processGremlinResponseEvent(event);
            _this.updateStatusMessage("Query Successfully Responded.");

        };

        // An event listener to be called when an error occurs.
        ws.onerror = function (err) {
            console.log('Connection error using websocket', err);
            _this.updateStatusMessage("Failed with error" + JSON.stringify(err));

        };

        // An event listener to be called when the connection is closed.
        ws.onclose = function (err) {
            console.log('Connection error using websocket', err);
            let retry_in = 10;

            _this.setDisconnectedFromGremlin();

            let i = 1;
            let timer = setInterval((function () {

                    _this.updateStatusMessage("Connection Attempt Failed. Waited " + i + "s of " + (retry_in) + "s 'retry in' time...");
                    i += 1;

                    if (i > retry_in) {
                        clearInterval(timer);
                        _this.ws = _this.setupGremlinServer();

                    }
                }
            ).bind(this), 1000); // retry in 5 seconds


        };
        return ws;
    }

    startRenderingConnectionStatus() {
        console.log("isConnected2Server, ", this.state);
        let connectionElement = document.querySelector("#connection-status span");

        if (connectionElement) {
            if (this.state.isConnected2Server === true) {
                connectionElement.className = "server-connected";
                // connectionElement.innerHTML = this.state.statusMessage;
                connectionElement.title = "Connected";
            } else if (this.state.isConnected2Server === false) {
                connectionElement.className = "server-not-connected";
                // connectionElement.innerHTML = this.state.statusMessage;
                connectionElement.title = "Unable to Connect";
            } else {
                connectionElement.className = "";
                // connectionElement.innerHTML = this.state.statusMessage;
                connectionElement.title = "";
            }
        }

    }


    render() {
        this.startRenderingConnectionStatus();

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
                    // updateStatusMessage={this.updateStatusMessage.bind(this)}
                />


                <NotificationDiv/>
                <ConnectionStatus statusMessage={this.state.statusMessage}/>
                <CopyRightInfo/>

            </div>
        )
    }
};
