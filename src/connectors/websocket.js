import ConnectorBase from "./base";
import {UUIDGenerator} from "../config";
import GremlinResponse from "../responses/gremlin";


export default class DefaultWebSocketConnector extends ConnectorBase {
    ws = null;
    responseObjectCls = GremlinResponse;

    constructor(serverUrl, responseEventsCallback, responseCallback, setIsConnected2Gremlin,
                onOpenCallback, onMessageCallback, onCloseCallback) {
        super(serverUrl, responseEventsCallback, responseCallback,);
        this.onOpenCallback = onOpenCallback || this.defaultOnOpenCallback;
        this.onMessageCallback = onMessageCallback || this.defaultOnMessageCallback;
        this.onCloseCallback = onCloseCallback || this.defaultOnCloseCallback;
        this.setIsConnected2Gremlin = setIsConnected2Gremlin;
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


    defaultOnOpenCallback() {
        console.log('connected')
        this.responseEventsCallback({
            statusMessage: "Connected",
            isConnected: true
        })
    }

    defaultOnMessageCallback(event) {
        const response = JSON.parse(event.data)
        console.log("onmessage", response);
        this.gatherDataFromStream(response, response.status.code);
    }

    defaultOnCloseCallback(event) {
        let _this = this;
        if (event.code !== 3001) {
            console.log('ws connection error');
        }
        // automatically try to reconnectWithWS on connection loss
        _this.setIsConnected2Gremlin(false);
    }


    connect() {
        this.setupWebSocket();
    }

    createWebSocket() {
        return new WebSocket(this.serverUrl);
    }

    reconnectWithWS() {
        this.ws = this.createWebSocket();
        this.connect();
    }

    setupWebSocket() {
        let _this = this;
        console.log("setupWebSocket triggered===========================")
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            _this.onOpenCallback();
        }

        this.ws.onmessage = event => {
            // listen to data sent from the websocket server
            _this.onMessageCallback(event);
        }

        this.ws.onclose = (event) => {
            console.log('disConnected2Gremlin');
            this.onCloseCallback(event);

        }
    }

    query(query) {
        /*

         */

        let msg = this.generateQueryPayload(query);
        let queryData = JSON.stringify(msg);
        console.log("Query long one", queryData);
        let _this = this;
        if (this.ws.readyState === 1) {
            _this.ws.send(queryData, {mask: true});
            this.responseEventsCallback({
                statusMessage: "Querying..."
            });
        } else {
            _this.ws.onopen = function () {
                _this.ws.send(queryData, {mask: true});
                this.responseEventsCallback({
                    statusMessage: "Querying..."
                })
            };
        }
    }

}
