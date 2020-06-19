import React, {Component} from 'react';
import ComponentBase from "./base";
import ConnectionIndicatorComponent from "../gremlin-connector/indicator";
import {
    DefaultConnectionRetryTimeout,
    DefaultMaxTimeElapsedWarningInSeconds,
    GREMLIN_SERVER_URL,
    UUIDGenerator
} from "../../config";


export default class GremlinHeadlessComponent extends ComponentBase {
    /*

    Usage

import React from "react";
import GremlinHeadlessComponent from "core/base/gremlin-component";

export default class GremlinQueryBox extends GremlinHeadlessComponent {

// use makeQuery("g.V().toList()") to query
// use processResponse(responses) method to listen to the responses.

    componentDidMount() {
        super.componentDidMount();
        const _this = this;

        setTimeout(function () {
            _this.makeQuery("g.V().limit(5).toList()", false);
        }, 1000)
    }

    processResponse(responses) {
        console.log("Response is ", responses);
    }

}


     */
    static defaultProps = {
        gremlinUrl: GREMLIN_SERVER_URL,
        reRenderCanvas: () => console.error("reRenderCanvas prop not added for VertexOptions")
    }

    constructor(props) {
        super(props);
        this.state = {
            isConnected2Gremlin: null,
            query: null,
            isStreaming: null,
            queryElapsedTimeCounter: null,
        }
        this.ws = this.createWebSocket();
        this.responses = [];
    }

    createWebSocket() {
        return new WebSocket(this.props.gremlinUrl);
    }

    reconnect() {
        this.ws = this.createWebSocket();
        this.connect();
    }

    setIsConnected2Gremlin(status) {
        // this.props.eventHandler({isConnected2Gremlin: status});
        console.log("setIsConnected2Gremlin", status)
        this.setState({isConnected2Gremlin: status});
    }


    setupWebSocket() {
        let _this = this;
        console.log("setupWebSocket triggered===========================")
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
            _this.setIsConnected2Gremlin(true);
            _this.setStatusMessage("Connected");
        }

        this.ws.onmessage = event => {
            // listen to data sent from the websocket server
            const response = JSON.parse(event.data)
            console.log("onmessage", response);
            _this.gatherDataFromStream(response);
        }

        this.ws.onclose = () => {
            console.log('disConnected2Gremlin')
            // automatically try to reconnect on connection loss
            _this.setIsConnected2Gremlin(false);

            let i = 0;
            let timer = setInterval((function () {
                    i += 1;
                    console.log(i)
                    _this.setStatusMessage("Connection lost. Reconnecting in " + (DefaultConnectionRetryTimeout - i) + "s...");
                    if (i >= DefaultConnectionRetryTimeout) {
                        clearInterval(timer);
                        _this.reconnect();
                    }
                }
            ), 1000); // retry in 5 seconds

        }
    }


    componentDidMount() {
        this.connect();
    }

    connect() {
        this.setupWebSocket();
    }

    flushResponsesData = () => this.responses = [];

    generateQueryPayload(query) {
        return {
            "requestId": UUIDGenerator(),
            "op": "eval",
            "processor": "",
            "args": {
                "gremlin": query,
                "bindings": {},
                "language": "gremlin-groovy"
            }
        };
    }

    setQueryElapsedTimeCounter(count) {
        // this.props.eventHandler({queryElapsedTimeCounter: count});
        this.setState({queryElapsedTimeCounter: count});
    }

    startTimer() {
        console.log("Timer started")
        this.setQueryElapsedTimeCounter(0);
        let _this = this;
        let timer = setInterval((function () {
                console.log("Timer started xyx", _this.state.queryElapsedTimeCounter);
                if (_this.state.isLoading === false) {
                    clearInterval(timer);
                }
                _this.updateTimer(_this.state.queryElapsedTimeCounter + 1, false);
                if (_this.state.queryElapsedTimeCounter >= DefaultMaxTimeElapsedWarningInSeconds) {
                    _this.updateTimer(_this.state.queryElapsedTimeCounter + 1, true);
                }
            }
        ), 1000); // check every second.
    }


    setIsStreaming(status) {
        this.setState({isStreaming: status});
    }

    //
    // processResponse = (responses) => console.error("processResponse not implemented. This functions " +
    //     "will get the responses from gremlin server. Use this to access the query response data.");

    _processResponse(responses) {
        this.resetLoader();
        this.processResponse(responses);
    }

    gatherDataFromStream(response) {
        // console.log("onmessage received", response);
        if (response.status.code >= 200 && response.status.code < 300) {
            this.setErrorMessage(null)
            if (response.status.code === 206) {
                this.setIsStreaming(true);
                this.setStatusMessage("Gathering data from the stream");
                this.responses.push(response);
            } else {
                this.responses.push(response);
                this.setIsStreaming(false);
                this.setStatusMessage("Responded to the Query Successfully");
                const responses = Object.assign(this.responses);
                this.flushResponsesData();
                this._processResponse(responses);
            }
        } else {
            this.setIsStreaming(false);
            console.log("response===========", response);
            this.setErrorMessage(response.status)
            this.setStatusMessage("Query Failed with " + response.status.code + " error.");
            this.responses.push(response);
            const responses = Object.assign(this.responses);
            this._processResponse(responses);
        }
    }


    setErrorMessage(message) {
        this.setState({
            errorMessage: message
        })
    }

    addQueryToState(query) {
        this.setState({
            query: query
        })
    }

    setQueryToUrl(query) {
        console.log("===setQueryToUrl", query);
        let u = new URL(window.location.href);
        let searchParams = new URLSearchParams(window.location.search);
        if (query && query !== "null") {
            searchParams.set("query", query);
            window.history.pushState({}, null, u.origin + u.pathname + "?" + searchParams.toString());
        }
    }

    addQueryToHistory(query) {
        //
    }

    makeQuery(query, setUrl) {


        // TODO - add logic to wait till server connects.
        if (typeof setUrl === "undefined") {
            setUrl = false;
        }
        if (setUrl) {
            this.setQueryToUrl(query);
            this.addQueryToState(query)

        } // remove this part from here soon.


        this.addQueryToHistory(query)
        let _this = this;
        console.log("queryGremlinServer :::  query", query);
        this.flushResponsesData();
        if (query) {
            this.startTimer();
            let msg = this.generateQueryPayload(query);
            let data = JSON.stringify(msg);
            console.log("Query long one", data);
            this.startLoader("Connecting..");

            if (this.ws.readyState === 1) {
                _this.ws.send(data, {mask: true});
                _this.setStatusMessage("Connecting..")
            } else {
                _this.ws.onopen = function () {
                    _this.ws.send(data, {mask: true});
                    _this.setStatusMessage("Connecting ..")

                };
            }
        }
    }

    render() {
        const superContent = super.render();
        return (
            <div>
                <ConnectionIndicatorComponent isConnected2Gremlin={this.state.isConnected2Gremlin}/>
                {superContent}
            </div>
        )
    }
}
