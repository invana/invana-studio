import {GREMLIN_SERVER_URL, DefaultConnectionRetryTimeout, UUIDGenerator} from "../../config";
import React from "react";


export default class GremlinConnectorViewBase extends React.Component {
    /*



     */
    constructor() {
        // This component can load
        super();
        this.state = {
            "freshQuery": true,
            "gremlinQuery": "",
            "isConnected2Server": "",
            "statusMessage": "",
            "errorMessage": "",
            "showErrorMessage": true

        };
    }

    nodes = []; // this is used to store during 206(partial data) status
    links = [];

    ws = this.createNewWebsocket();

    createNewWebsocket() {
        return new WebSocket(GREMLIN_SERVER_URL);
    }


    componentDidMount() {

        this.setupGremlinServer();
        this.onPageLoadInitQuery();

    }

    updateStatusMessage(statusMessage) {
        this.setState({
            "statusMessage": statusMessage
        })
    }

    onPageLoadInitQuery() {
        let query = new URLSearchParams(window.location.search).get("query");
        if (this.ws) {
            this.queryGremlinServer(query, true);
        }

    }

    setupGremlinServer() {
        /*
        Usage:


         */

        let _this = this;

        this.ws.onopen = function (event) {
            console.log("ws-opened");
            if (window.location.pathname === "/") {
                window.location.reload();
            }

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


            let i = 1;
            let timer = setInterval((function () {

                    _this.updateStatusMessage("Connection Attempt Failed. Waited " + i + "s of " + (DefaultConnectionRetryTimeout) + "s 'retry in' time...");
                    i += 1;

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

    queryGremlinServer(query, freshQuery) {
        let _this = this;
        if (typeof freshQuery === "undefined") {
            freshQuery = false;
        }

        this.nodes = [];
        this.links = [];

        console.log("queryGremlinServer ::: freshQuery, query", freshQuery, query);

        this.setState({
            "gremlinQuery": query
        })


        if (query) {

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
}
