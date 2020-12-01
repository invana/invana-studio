import React from 'react';
import BaseComponent from "./base-component";
import {
    GREMLIN_SERVER_URL, historyLocalStorageKey,
    MAX_HISTORY_COUNT_TO_REMEMBER, GRAPH_ENGINE_NAME
} from "../config";
import {
    getDataFromLocalStorage, redirectToConnectIfNeeded, setDataToLocalStorage,
} from "./utils";
import LoadSpinner from "../ui-components/spinner/spinner";
import PropTypes from "prop-types";
import DefaultHTTPConnector from "../connectors/http";
import DefaultWebSocketConnector from "../connectors/websocket";
import InvanaEngineHTTPConnector from "../connectors/invana-engine";
import GremlinQueryManager from "../query-builder/gremlin";
import GraphSONDeSerializer from "../serializers/graphson-v3";
import InvanaEngineDeSerializer from "../serializers/invana-engine";
import InvanaEngineQueryManager from "../query-builder/invana-engine";
import InMemoryDataStore from "./data-store";

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


    // to access responses use this.connector.getLastResponse or this.connector.getLatestResponse



}


     */
    // timer = null;
    // timer2 = null;
    // queryElapsedTimerId = null;
    // reconnectingTimerId = null;
    queryStartedAt = null;
    queryEndedAt = null;
    ws = null;
    // responsesList = null;
    static defaultProps = {
        gremlinUrl: GREMLIN_SERVER_URL,
        graphEngine: GRAPH_ENGINE_NAME,
        parentGraphComponent: null
        // reRenderCanvas: () => console.error("reRenderCanvas prop not added for VertexOptions")
    }


    static propTypes = {
        gremlinUrl: PropTypes.string,
        graphEngine: PropTypes.string,
        parentGraphComponent: PropTypes.object
    }


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            isConnected2Gremlin: null,
            query: null,
            isStreaming: null,

            // responses: [],
            // vertices: [],
            // edges: []
        }

        if (this.checkIfGremlinUrlIsValid()) {
            this.connector = this.connect();
        }
        if (this.checkIfGraphEngineIsValid() && this.props.graphEngine === "invana-engine") {
            // this.requestBuilder = new InvanaEngineQueryManager();
            this.responseSerializer = new InvanaEngineDeSerializer();
        } else {
            // this.requestBuilder = new GremlinQueryManager();
            this.responseSerializer = new GraphSONDeSerializer();
        }
        this.dataStore = new InMemoryDataStore();

    }

    checkIfGremlinUrlIsValid() {
        return !!this.props.gremlinUrl;
    }

    checkIfGraphEngineIsValid() {
        return !!this.props.graphEngine;
    }

    connect() {
        const protocol = this.getProtocol();
        let connectorCls = null;

        if (this.props.graphEngine === "invana-engine") {
            connectorCls = InvanaEngineHTTPConnector;
        } else {
            if (protocol === "ws") {
                connectorCls = DefaultWebSocketConnector
            } else {
                connectorCls = DefaultHTTPConnector;
            }
        }
        let requestBuilder = new GremlinQueryManager()
        if (this.checkIfGraphEngineIsValid() && this.props.graphEngine === "invana-engine") {
            requestBuilder = new InvanaEngineQueryManager();
        }

        return new connectorCls(
            this.props.gremlinUrl,
            this.responseEventsCallback.bind(this),
            this.onResponseCallback.bind(this),
            requestBuilder
        );
    }


    getProtocol() {
        if (this.props.gremlinUrl) {
            const _ = new URL(this.props.gremlinUrl).protocol;
            return _.includes("ws") ? "ws" : "http";
        } else {
            return null;
        }
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
            // DEPRECATED - not using ws for now.
            if (protocol === "ws") {
                try {
                    this.connector.reconnectWithWS()
                } catch (e) {
                    console.error("Failed to connect to websocket", e);
                    window.location.href = "/connect?error=Failed to connect. " +
                        "WebSocket connections are not supported at the moment."
                }
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
            // responses: [],
            // vertices: [],
            // edges: [],
            shallReRenderD3Canvas: true,
            selectedElementData: null,
            middleBottomContentName: null
        })
        this.dataStore.resetData();
        this.connector.flushResponses();
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

    onResponseCallback(response) {
        this.queryEndedAt = new Date();
        this.resetLoader(); // updates the status of the ui
        this.processResponse(response);

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
        console.log("======addQueryToState", query);
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


    makeQuery(queryObj, queryOptions) {

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
            // this.setQueryToUrl(queryObj);
            // this.addQueryToState(queryObj)
            this.addQueryToHistory(queryObj, queryOptions.source)
        } // remove this part from here soon.

        this.setState({statusMessage: "Querying..."})
        console.log("makeQuery :::  query", JSON.stringify(queryObj));
        if (queryObj) {
            // this.startQueryTimer();
            // this.startLoader("Connecting..");
            this.queryStartedAt = new Date();
            this.queryEndedAt = new Date();
            this.connector.query(queryObj);

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
