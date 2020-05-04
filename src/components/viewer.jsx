import React from 'react';
import './viewer.css';

import GremlinResponseSerializers from './gremlin-serializer';
import GraphCanvas from './canvas';
import {GREMLIN_SERVER_URL, uuidv4} from "../config";


export default class GraphViewer extends React.Component {

    ws = new WebSocket(GREMLIN_SERVER_URL);
    gremlin_serializer = new GremlinResponseSerializers();

    constructor() {
        // This component can load
        super();
        this.state = {
            "nodes": [],
            "links": []
        };
    }

    updateQueryInput(query) {
        document.querySelector('input[type="text"]').value = query;
    }

    queryGremlinServer(query, update_url) {

        if (typeof update_url === "undefined") {
            update_url = false;
        }
        console.log("queryGremlinServer ::: update_url, query", update_url, query);

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
            this.ws.send(data, {mask: true});
        } else {
            this.ws.onopen = () => this.ws.send(data, {mask: true});
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

    setupWebSocket() {
        let _this = this;
        this.ws.onopen = function (event) {
            console.log("ws.open");
        };

        this.ws.onerror = function (err) {
            console.log('Connection error using websocket');
            console.log(err);
        };
        this.ws.onmessage = function (event) {
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
        };
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
        this.queryGremlinServer(query, true);

    }

    componentDidMount() {
        this.setupWebSocket();
        this.onPageLoadInitQuery();

    }

    onFormSubmit(e) {
        e.preventDefault();
        let query = e.target.query.value;
        if (query) {
            this.queryGremlinServer(query, true);
        }
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
                <GraphCanvas nodes={this.state.nodes} links={this.state.links}
                             queryGremlinServer={this.queryGremlinServer.bind(this)}/>
            </div>
        )
    }
};
