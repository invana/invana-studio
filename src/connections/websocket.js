import ProtocolBase from "./base";
import {DefaultConnectionRetryTimeout} from "../config";


export default class WebSocketConnection extends ProtocolBase {
    ws = null;

    constructor(serverUrl, responseEventsCallback, responseCallback, setIsConnected2Gremlin,
                onOpenCallback, onMessageCallback, onCloseCallback) {
        super(serverUrl, responseEventsCallback, responseCallback,);
        this.onOpenCallback = onOpenCallback || this.defaultOnOpenCallback;
        this.onMessageCallback = onMessageCallback || this.defaultOnMessageCallback;
        this.onCloseCallback = onCloseCallback || this.defaultOnCloseCallback;
        this.setIsConnected2Gremlin = setIsConnected2Gremlin;
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
        // clearInterval(_this.reconnectingTimerId);
        // automatically try to reconnectWithWS on connection loss
        _this.setIsConnected2Gremlin(false);
        // let i = 0;
        // this.reconnectingTimerId = setInterval((function () {
        //         i += 1;
        //         console.log("Retrying after it is closed ", i, " seconds elapsed")
        //         _this.setStatusMessage("Connection failed. Reconnecting in " + (DefaultConnectionRetryTimeout - i) + "s...");
        //         if (i >= DefaultConnectionRetryTimeout) {
        //             clearInterval(_this.reconnectingTimerId);
        //             _this.reconnectWithWS();
        //         }
        //     }
        // ), 1000); // retry in 5 seconds
    }


    connect() {
        this.setupWebSocket();
    }

    createWebSocket() {
        return new WebSocket(this.serverUrl);
    }

    reconnectWithWS() {
        // clearInterval(this.queryElapsedTimerId);
        // clearInterval(this.reconnectingTimerId);
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

    query(queryData) {
        /*

         */

        let _this = this;
        console.log("===Query", queryData);
        if (this.ws.readyState === 1) {
            _this.ws.send(queryData, {mask: true});

            this.responseEventsCallback({
                statusMessage: "Querying..."
            })
        } else {
            _this.ws.onopen = function () {
                _this.ws.send(queryData, {mask: true});
                this.responseEventsCallback({
                    statusMessage: "Querying..."
                })
                // clearInterval(_this.reconnectingTimerId);
            };
        }
    }

}
