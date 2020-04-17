class GremlinConnector {

    setup_gremlin_server_socket(gremlin_server_url, message_callback) {
        /*
        Usage:


        let onMessageReceived = function (event) {
            let data = JSON.parse(event.data);
            console.log("onMessageReceived", data);

        }
        let socket = new setup_gremlin_server_socket(GREMLIN_SERVER_URL, onMessageReceived)


         */

        let _this = this;
        let ws = new WebSocket(gremlin_server_url);
        show_notification("Connecting to gremlin server url :" + gremlin_server_url);

        ws.onopen = function (event) {
            show_notification("Connected to Server");
            $("#connection-status span").removeClass().addClass("server-connected").attr("title", "Connected");
        };

        ws.onmessage = function (event) {
            show_notification("Message Received");
            message_callback(event);
        };

        // An event listener to be called when an error occurs.
        ws.onerror = function (err) {
            console.log('Connection error using websocket', err);
            show_notification("Something went wrong");
            $("#connection-status span").removeClass().addClass("server-not-connected").attr("title", "Unable to Connect");
        };

        // An event listener to be called when the connection is closed.
        ws.onclose = function (err) {
            console.log('Connection error using websocket', err);
            let retry_in = 10;
            show_notification("Connection Closed");
            $("#connection-status span").removeClass().addClass("server-not-connected").attr("title", "Connection Closed");


            let i = 1;
            let timer = setInterval((function () {

                    show_notification("Connection Attempt Failed. Waited " + i + "s of " + (retry_in) + "s 'retry in' time...");
                    i += 1;

                    if (i > retry_in) {
                        clearInterval(timer);
                        _this.ws = _this.setup_gremlin_server_socket(gremlin_server_url, message_callback)

                    }
                }
            ).bind(this), 1000); // retry in 5 seconds


        };
        return ws;
    }

    constructor(gremlin_server_url, message_callback) {
        this.ws = this.setup_gremlin_server_socket(gremlin_server_url, message_callback);
    }

    send(msg) {
        console.log("sending the query message", msg)
        this.ws.send(JSON.stringify(msg), {mask: true});
    }

}



