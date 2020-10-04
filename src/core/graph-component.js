import React from 'react';
import BaseComponent from "./base-component";
import {
    GREMLIN_SERVER_URL, historyLocalStorageKey,
    MAX_HISTORY_COUNT_TO_REMEMBER, DEFAULT_GRAPH_ENGINE
} from "../config";
import {
    getDataFromLocalStorage, redirectToConnectIfNeeded, setDataToLocalStorage,
} from "./utils";
import LoadSpinner from "../ui-components/spinner/spinner";
import PropTypes from "prop-types";
import DefaultHTTPConnector from "../connectors/http";
import DefaultWebSocketConnector from "../connectors/websocket";
import InvanaEngineHTTPConnector from "../connectors/invana-engine";

export default class RemoteGraphComponent extends BaseComponent {
    /*

RemoteGraphComponent shall have abilities to connect to remote
graph-engines and render data.

    Usage

import React from "react";
import GremlinBasedViewBase from "core/gremlin-component";

export default class GremlinQueryBox extends RemoteGraphComponent {

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

    flushResponsesData(){
        // this will delete responses,
    }



}


     */
    // timer = null;
    // timer2 = null;
    // queryElapsedTimerId = null;
    // reconnectingTimerId = null;
    queryStartedAt = null;
    queryEndedAt = null;
    ws = null;
    // streamResponses = null;
    static defaultProps = {
        gremlinUrl: GREMLIN_SERVER_URL,
        graphEngine: DEFAULT_GRAPH_ENGINE,
        // reRenderCanvas: () => console.error("reRenderCanvas prop not added for VertexOptions")
    }


    static propTypes = {
        gremlinUrl: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            isConnected2Gremlin: null,
            query: null,
            isStreaming: null,

            responses: [],
            vertices: [],
            edges: []
        }

        if (this.checkIfGremlinUrlIsValid()) {
            this.connector = this.connect();
        }
        if (this.checkIfGraphEngineIsValid() === "invana-engine") {
            this.requestBuilder = {};
            this.responseSerializer = {};
        } else {
            this.requestBuilder = {};
            this.responseSerializer = {};
        }
    }

    checkIfGremlinUrlIsValid() {
        return !!this.props.gremlinUrl;
    }

    checkIfGraphEngineIsValid() {
        return !!this.props.graphEngine;
    }

    connect() {
        const protocol = this.getProtocol();
        let connectorCls = DefaultWebSocketConnector;

        if (this.props.graphEngine === "invana-engine") {
            connectorCls = InvanaEngineHTTPConnector;
        } else {
            if (protocol === "ws") {
                connectorCls = DefaultWebSocketConnector
            } else {
                connectorCls = DefaultHTTPConnector;
            }
        }

        return new connectorCls(
            this.props.gremlinUrl,
            this.responseEventsCallback.bind(this),
            this._processResponse.bind(this),
            this.setIsConnected2Gremlin.bind(this)
        );
    }


    getProtocol() {
        const _ = new URL(this.props.gremlinUrl).protocol;
        return _.includes("ws") ? "ws" : "http";
    }


    setIsConnected2Gremlin(status) {
        // this.props.eventHandler({isConnected2Gremlin: status});
        console.log("setIsConnected2Gremlin", status)
        this.setState({isConnected2Gremlin: status});
    }


    componentDidMount() {
        console.log("gremlin-component componentDidMount")
        let shallConnect = redirectToConnectIfNeeded(this.props.gremlinUrl);
        if (shallConnect) {
            const protocol = this.getProtocol();
            console.log("We will be using " + protocol + " protocol");
            if (protocol === "ws") {
                this.connector.reconnectWithWS()
            } else {
                console.log("protocol will be " + protocol);
            }
        }
    }

    componentWillUnmount() {
        console.log("gremlin-component componentWillUnmount triggered");
        // clearInterval(this.queryElapsedTimerId);
        // clearInterval(this.reconnectingTimerId);
        // super.componentWillUnmount();
    }


    flushCanvas() {
        this.setState({
            responses: [],
            vertices: [],
            edges: [],
            shallReRenderD3Canvas: true,
            selectedElementData: null,
            middleBottomContentName: null
        })
    }

    setIsStreaming(status) {
        this.setState({isStreaming: status});
    }

    setstatusCode(statusCode) {
        this.setState({"statusCode": statusCode});
    }

    eventTranslator(eventName, eventValue) {
        console.log("===eventName", eventName, eventValue);

        if (eventName === "statusMessage") {
            this.setStatusMessage(eventValue);
        } else if (eventName === "statusCode") {
            this.setstatusCode(eventValue);
        } else if (eventName === "isStreaming") {
            this.setIsStreaming(eventValue);
        } else if (eventName === "errorMessage") {
            this.setErrorMessage(eventValue);
        } else if (eventName === "isConnected") {
            this.setIsConnected2Gremlin(eventValue);
        } else {
            this.setState({eventName: eventValue});
        }
    }


    responseEventsCallback(event) {
        console.log("received event", event);
        for (const [key, value] of Object.entries(event)) {
            this.eventTranslator(key, value)
        }
    }

    //
    // processResponse = (responses) => console.error("processResponse not implemented. This functions " +
    //     "will get the responses from gremlin server. Use this to access the query response data.");

    _processResponse(responses) {
        this.queryEndedAt = new Date();
        this.resetLoader();
        this.processResponse(responses);
    }


    setErrorMessage(message) {
        if (message) {
            this.setState({
                errorMessage: message,
                bottomContentName: "error-console"
            })
        } else {
            this.setState({
                errorMessage: null,
                bottomContentName: null
            })
        }
    }

    addQueryToState(query) {

        this.setState({
            query: query
        })
    }

    setQueryToUrl(query) {
        console.log("===setQueryToUrl", query);
        // let u = new URL(window.location.href);
        // let searchParams = new URLSearchParams(window.location.search);
        // if (query && query !== "null") {
        //     searchParams.set("query", query);
        //     window.history.pushState({}, null, u.origin + u.pathname + "?" + searchParams.toString());
        // }
    }

    addQueryToHistory(query, source) {
        //
        let existingHistory = getDataFromLocalStorage(historyLocalStorageKey, true) || [];

        existingHistory = existingHistory.slice(0, MAX_HISTORY_COUNT_TO_REMEMBER)
        existingHistory.unshift({
            "query": query,
            "source": source,
            "dt": new Date()
        })
        setDataToLocalStorage(historyLocalStorageKey, existingHistory);
    }


    makeQuery(query, queryOptions) {

        /*
            queryOptions.source = "internal|console|canvas"
         */

        // TODO - add logic to wait till server connects.

        if (typeof queryOptions === "undefined") {
            queryOptions = {}
        }
        if (typeof queryOptions.source === "undefined") {
            queryOptions.source = "internal";
        }
        if (queryOptions.source) {
            this.setQueryToUrl(query);
            this.addQueryToState(query)
            this.addQueryToHistory(query, queryOptions.source)
        } // remove this part from here soon.


        this.setState({statusMessage: "Querying..."})
        console.log("queryGremlinServer :::  query", query);
        if (query) {
            // this.startQueryTimer();
            // this.startLoader("Connecting..");
            this.queryStartedAt = new Date();
            this.queryEndedAt = new Date();
            this.connector.query(query);

        }
    }

    render() {
        return (
            <LoadSpinner
                loadingMessage={this.state.loadingMessage}
                isConnected2Gremlin={this.state.isConnected2Gremlin}
                loadingExtraText={this.state.loadingExtraText}
                isLoading={this.state.isLoading}
                showSignOut={true}
                loadTimeCounter={this.state.loaderElapsedTimer}/>
        )
    }
}
