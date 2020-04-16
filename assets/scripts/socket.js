class GremlinServer {
    constructor(gremlin_server_url, message_callback) {
        this.ws = new WebSocket(gremlin_server_url);
        show_notification("Connecting to gremlin server url :" + gremlin_server_url);

        this.ws.onopen = function (event) {
            console.log("ws.open", event);
            show_notification("Connected to Server");
            $("#connection-status span").removeClass().addClass("server-connected").attr("title", "Connected");
        };

        this.ws.onmessage = function (event) {
            show_notification("Message Received");
            console.log("ws.onmessage", event);
            message_callback(event);
        };

        // An event listener to be called when an error occurs.
        this.ws.onerror = function (err) {
            console.log('Connection error using websocket', err);
            show_notification("Something went wrong");
            $("#connection-status span").removeClass().addClass("server-not-connected").attr("title", "Unable to Connect");
        };

        // An event listener to be called when the connection is closed.
        this.ws.onclose = function (err) {
            console.log('Connection error using websocket', err);
            show_notification("Connection Closed");
            $("#connection-status span").removeClass().addClass("server-not-connected").attr("title", "Connection Closed");
            let _this = this;
            setTimeout((function () {
                    var _ = new WebSocket(_this.ws.url);
                    _.onopen = _this.ws.onopen;
                    _.onmessage = _this.ws.onmessage;
                    _.onclose = _this.ws.onclose;
                    _.onerror = _this.ws.onerror;
                    _this.ws = _
                }
            ).bind(this), 5000); // retry in 5 seconds
        };
    }

    send(msg) {
        console.log("sending the query message", msg)
        this.ws.send(JSON.stringify(msg), {mask: true});
    }

}
