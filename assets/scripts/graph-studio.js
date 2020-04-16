$(document).ready(function () {

    var GREMLIN_SERVER_URL = "ws://127.0.0.1:8182/gremlin"

    let onMessageReceived = function (event) {
        let data = JSON.parse(event.data);
        console.log("onMessageReceived", data);

    }
    let socket = new setup_gremlin_server_socket(GREMLIN_SERVER_URL, onMessageReceived)
    console.log(socket);

    let onHeaderQuerySubmit = function (e) {
        e.preventDefault();
        let query = $('#header-query-form [name="query"]').val();
        console.log("query is ", query);
        let msg = {
            "requestId": uuidv4(),
            "op": "eval",
            "processor": "",
            "args": {
                "gremlin": query,
                "bindings": {},
                "language": "gremlin-groovy"
            }
        }
        // socket.send(msg);
        socket.send(JSON.stringify(msg), {mask: true});

    }


    $("#header-query-form").submit(onHeaderQuerySubmit);


})