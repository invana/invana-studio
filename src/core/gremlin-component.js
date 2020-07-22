import React from 'react';
import BaseComponent from "./base-component";
import {
    DefaultConnectionRetryTimeout,
    DefaultMaxTimeElapsedWarningInSeconds,
    GREMLIN_SERVER_URL, historyLocalStorageKey,
    MAX_HISTORY_COUNT_TO_REMEMBER,
    UUIDGenerator
} from "../config";
import {
    getDataFromLocalStorage, redirectToConnectIfNeeded, setDataToLocalStorage, postData,
} from "./utils";
import LoadSpinner from "../ui-components/spinner/spinner";
import PropTypes from "prop-types";


export default class GremlinBasedComponent extends BaseComponent {
    /*

    Usage

import React from "react";
import GremlinBasedViewBase from "core/gremlin-component";

export default class GremlinQueryBox extends GremlinBasedComponent {

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
    queryElapsedTimerId = null;
    reconnectingTimerId = null;
    ws = null;
    streamResponses = null;
    static defaultProps = {
        gremlinUrl: GREMLIN_SERVER_URL,
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
            queryElapsedTimeCounter: null,

            responses: [],
            vertices: [],
            edges: []
        }
        // this.ws = this.createWebSocket();
        this.streamResponses = [];
    }

    getProtocol() {
        const _ = new URL(this.props.gremlinUrl).protocol;
        return _.includes("ws") ? "ws" : "http";
    }

    createWebSocket() {
        return new WebSocket(this.props.gremlinUrl);
    }


    reconnectWithWS() {
        // clearInterval(this.timer2);
        // clearInterval(this.timer);
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
            clearInterval(_this.reconnectingTimerId);
        }

        this.ws.onmessage = event => {
            // listen to data sent from the websocket server
            const response = JSON.parse(event.data)
            console.log("onmessage", response);
            _this.gatherDataFromStream(response);
        }

        this.ws.onclose = () => {
            console.log('disConnected2Gremlin')
            clearInterval(_this.reconnectingTimerId);
            // automatically try to reconnectWithWS on connection loss
            _this.setIsConnected2Gremlin(false);

            let i = 0;
            this.reconnectingTimerId = setInterval((function () {
                    i += 1;
                    console.log("Retrying after it is closed ", i, " seconds elapsed")
                    _this.setStatusMessage("Connection failed. Reconnecting in " + (DefaultConnectionRetryTimeout - i) + "s...");
                    if (i >= DefaultConnectionRetryTimeout) {
                        clearInterval(_this.reconnectingTimerId);
                        _this.reconnectWithWS();
                    }
                }
            ), 1000); // retry in 5 seconds

        }
    }

    componentDidMount() {
        console.log("gremlin-component componentDidMount")
        let shallConnect = redirectToConnectIfNeeded();
        if (shallConnect) {
            const protocol = this.getProtocol();
            console.log("We will be using " + protocol + " protocol");
            if (protocol === "ws") {
                this.reconnectWithWS()
            } else {
                console.log("protocol will be " + protocol);
            }
        }
    }

    componentWillUnmount() {
        console.log("gremlin-component componentWillUnmount triggered");
        clearInterval(this.queryElapsedTimerId);
        clearInterval(this.reconnectingTimerId);
        super.componentWillUnmount();

    }

    connect() {
        this.setupWebSocket();
    }

    flushStreamResponsesData() {
        this.streamResponses = [];
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
        this.setState({queryElapsedTimeCounter: count});
    }

    startQueryTimer() {
        console.log("Timer started")
        this.setQueryElapsedTimeCounter(0);
        let _this = this;
        this.queryElapsedTimerId = setInterval((function () {
                console.log("Timer started xyx", _this.state.queryElapsedTimeCounter, _this.state.isLoading);
                if (_this.state.isLoading === false) {
                    console.log("clearInterval triggered");
                    clearInterval(_this.queryElapsedTimerId);
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
        console.log("onmessage received", response);
        if (response.status.code >= 200 && response.status.code < 300) {
            this.setErrorMessage(null)
            if (response.status.code === 206) {
                this.setIsStreaming(true);
                this.setStatusMessage("Gathering data from the stream");
                this.streamResponses.push(response);
            } else {
                this.streamResponses.push(response);
                this.setIsStreaming(false);
                this.setStatusMessage("Responded to the Query Successfully");
                const responses = Object.assign(this.streamResponses);
                this.flushStreamResponsesData();
                this._processResponse(responses);
            }
        } else {
            this.setIsStreaming(false);
            console.log("response===========", response);
            this.setErrorMessage(response.status)
            this.setStatusMessage("Query Failed with " + response.status.code + " error.");
            this.streamResponses.push(response);
            const responses = Object.assign(this.streamResponses);
            this._processResponse(responses);
        }
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

    _queryWS(queryData) {
        /*

         */

        let _this = this;
        console.log("===Query", queryData);
        if (this.ws.readyState === 1) {
            _this.ws.send(queryData, {mask: true});
            _this.setStatusMessage("Connecting..")
        } else {
            _this.ws.onopen = function () {
                _this.ws.send(queryData, {mask: true});
                _this.setStatusMessage("Connecting ..")
                clearInterval(_this.reconnectingTimerId);

            };
        }
    }

    _queryHTTP(query) {
        const payload = {"gremlin": query};
        let _this = this;
        postData(this.props.gremlinUrl, {}, payload).then(data => {
            _this.gatherDataFromStream(data);
        });

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
            this.startQueryTimer();
            let msg = this.generateQueryPayload(query);
            let queryData = JSON.stringify(msg);
            console.log("Query long one", queryData);
            this.startLoader("Connecting..");

            const protocol = this.getProtocol();
            if (protocol === "ws") {
                this._queryWS(queryData)
            } else {
                this._queryHTTP(query);
            }

        }


    }

    render() {
        return (
            <LoadSpinner
                loadingMessage={this.state.loadingMessage}
                loadingExtraText={this.state.loadingExtraText}
                isLoading={this.state.isLoading}
                showSignOut={true}
                loadTimeCounter={this.state.loaderElapsedTimer}/>
        )
    }
}
