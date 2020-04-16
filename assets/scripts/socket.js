$(document).ready(function () {


    let GREMLIN_SERVER_URL = "ws://127.0.0.1:8182/gremlin"
    let ws = new WebSocket(GREMLIN_SERVER_URL);
    show_notification("Connecting to " +  GREMLIN_SERVER_URL);

    ws.onopen = function (event) {
        console.log("ws.open", event);
        show_notification("Connection Opened");
        $("#connection-status span").removeClass().addClass("server-connected").attr("title", "Connected");
    };

    ws.onmessage = function (event) {
        show_notification("Message Received");
        console.log("ws.onmessage", event);
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
        show_notification("Connection Closed");
        $("#connection-status span").removeClass().addClass("server-not-connected").attr("title", "Connection Closed");
        setTimeout((function () {
                var _ = new WebSocket(ws.url);
                _.onopen = ws.onopen;
                _.onmessage = ws.onmessage;
                _.onclose = ws.onclose;
                _.onerror = ws.onerror;
                ws = _
            }
        ).bind(this), 5000); // retry in 5 seconds
    };

})