$(document).ready(function () {

    var GREMLIN_SERVER_URL = "ws://127.0.0.1:8182/gremlin"

    let response_handler = new GremlinResponseHandlers();
    let table = new Table();

    let onMessageReceived = function (event) {
        let response = JSON.parse(event.data);
        console.log("onMessageReceived", response);

        let json_data = response_handler.process(response)
        console.log("json_data", json_data)

        let heading_fields = get_heading_fields(json_data);
        table.render("#data-table-table", heading_fields, json_data);

    }
    let gremlinConnector = new GremlinConnector(GREMLIN_SERVER_URL, onMessageReceived);

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
        gremlinConnector.send(msg);

    }


    $("#header-query-form").submit(onHeaderQuerySubmit);


})