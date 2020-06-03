import {
    GREMLIN_SERVER_URL,
    DefaultConnectionRetryTimeout,
    UUIDGenerator,
    DefaultMaxTimeExlapsedWarninginSeconds
} from "../../config";
import React from "react";
import {Redirect} from "react-router-dom";


export default class GremlinConnectorViewBase extends React.Component {
    /*



     */
    constructor() {
        // This component can load
        console.log("GremlinConnectorViewBase")
        super();
        this.state = {
            freshQuery: true,
            gremlinQuery: "",
            isConnected2Server: "",
            statusMessage: "",
            errorMessage: "",
            showLoading: false,
            showErrorMessage: true,
            loadTimeCounter: 0,
            maxTimeElapsedError: false
        };
    }

    nodes = []; // this is used to store during 206(partial data) status
    links = [];

    createNewWebsocket() {
        console.log("thi.createNewWebsocket", GREMLIN_SERVER_URL);
        if (GREMLIN_SERVER_URL) {
            return new WebSocket(GREMLIN_SERVER_URL);
        } else {
            const u = new URL(window.location.href);
            if (u.pathname !== "/") {
                window.location.href = encodeURIComponent("/?next=" + u.pathname + u.search);
            }
        }
    }


    ws = this.createNewWebsocket()


    componentDidMount() {
        console.log("connector base componentDidMount", GREMLIN_SERVER_URL, this.state);
        this.setState({"showLoading": false});
        if (GREMLIN_SERVER_URL) {
            this.setupGremlinServer();
            this.onPageLoadInitQuery();
        }
    }

    updateStatusMessage(statusMessage) {
        this.setState({
            "statusMessage": statusMessage
        })
    }

    _processGremlinResponseEvent(event) {
        // wrapper to do some common chores
        let response = JSON.parse(event.data);
        console.log("onmessage received", response);
        if (response.status.code !== 206) {
            this.setState({
                "showLoading": false
            })
        }
        this.processGremlinResponseEvent(event);
    }

    onPageLoadInitQuery() {
        let query = new URLSearchParams(window.location.search).get("query");
        this.queryGremlinServer(query, true);


    }

    setupGremlinServer() {
        /*
        Usage:


         */
        console.log("======setupGremlinServer")
        let _this = this;

        this.ws.onopen = function (event) {
            console.log("ws-opened");
            _this.setConnected2Gremlin()
            if (window.location.pathname === "/") {
                window.location.reload();
            }
        };

        this.ws.onmessage = function (event) {
            _this._processGremlinResponseEvent(event);
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


            let i = 0;
            let timer = setInterval((function () {
                    i += 1;
                    _this.updateStatusMessage("Connection Attempt Failed. Waited " + i + "s of " + (DefaultConnectionRetryTimeout) + "s 'retry in' time...");

                    if (i > DefaultConnectionRetryTimeout) {
                        clearInterval(timer);

                        _this.ws = _this.createNewWebsocket();
                        _this.setupGremlinServer();

                    }
                }
            ), 1000); // retry in 5 seconds


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

    updateQueryInput(query) {
        // document.querySelector('input[type="text"]').value = query;
    }

    setConnected2Gremlin() {
        this.setState({
            "isConnected2Server": true,
            "statusMessage": "Connected to Server"
        })
    }

    closeErrorMessage() {
        this.setState({
            "showErrorMessage": false,

        })
    }

    setDisconnectedFromGremlin() {
        this.setState({
            "isConnected2Server": false,
            "statusMessage": "Disconnected from Server"
        })
    }

    startTimer() {

        let _this = this;
        let timer = setInterval((function () {
                console.log("Timer started xyx", _this.state.loadTimeCounter);
                if (_this.state.showLoading === false) {
                    clearInterval(timer);
                }
                _this.setState({loadTimeCounter: _this.state.loadTimeCounter + 1, maxTimeElapsedError: false});
                if (_this.state.loadTimeCounter >= DefaultMaxTimeExlapsedWarninginSeconds) {
                    _this.setState({loadTimeCounter: _this.state.loadTimeCounter + 1, maxTimeElapsedError: true});

                }
            }
        ), 1000); // retry in 5 seconds

    }

    queryGremlinServer(query, freshQuery) {
        let _this = this;
        if (typeof freshQuery === "undefined") {
            freshQuery = false;
        }

        this.nodes = [];
        this.links = [];

        console.log("queryGremlinServer ::: freshQuery, query", freshQuery, query);


        if (query) {
            this.setState({
                gremlinQuery: query,
                loadTimeCounter: 0,
                showLoading: true
            })

            this.startTimer();

            let msg = {
                "requestId": UUIDGenerator(),
                "op": "eval",
                "processor": "",
                "args": {
                    "gremlin": query,
                    "bindings": {},
                    "language": "gremlin-groovy"
                }
            };


            let data = JSON.stringify(msg);
            console.log("Query long one", data);
            if (this.ws) {
                _this.setState({
                    "freshQuery": freshQuery
                })

                if (this.ws.readyState === 1) {
                    _this.ws.send(data, {mask: true});
                    _this.updateStatusMessage("Sending a Query");
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

    }
}
