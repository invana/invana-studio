$(document).ready(function () {

    let GREMLIN_SERVER_URL = "ws://192.168.0.10:8182/gremlin";

    let response_handler = new GremlinResponseHandlers();


    let graph_canvas = new DataGraphCanvas("#graph-area") //

    let onMessageReceived = function (event) {
        let response = JSON.parse(event.data);
        console.log("onMessageReceived", response);
        let json_data = response_handler.process(response)
        console.log("json_data", json_data)

        show_notification("Rendered graph");
        let _ = response_handler.seperate_vertices_and_edges(json_data);
        let vertices = _[0];
        let edges = _[1];
        graph_canvas.draw(vertices, edges);
        hide_loading();

    }
    let gremlinConnector = new GremlinConnector(GREMLIN_SERVER_URL, onMessageReceived);


    let addQueryToUrl = function (query) {
        let u = new URL(location.href);
        var searchParams = new URLSearchParams(window.location.search)
        searchParams.set("query", query);
        if (window.history.replaceState) {
            //prevents browser from storing history with each change:
            window.history.replaceState({}, null, u.origin + "/?" + searchParams.toString());
        }
    }

    let submitQuery = function (query, validate_query) {

        if (validate_query && !query) {
            alert("Query cannot be Blank");
        } else {
            if (query) { // soft ignore
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
                show_loading()
                $('[name="query"]').val(query);
                addQueryToUrl(query);
                gremlinConnector.send(msg);
            }
        }
    }
    let onPageLoadInitQuery = function () {
        let query = new URLSearchParams(window.location.search).get("query");
        submitQuery(query, false);

    }
    let onHeaderQuerySubmit = function (e) {
        e.preventDefault();
        let query = $('#header-query-form [name="query"]').val();
        console.log("query is ", query);
        submitQuery(query);
    }

    $("#header-query-form").submit(onHeaderQuerySubmit);

    gremlinConnector.ws.addEventListener('open', function (event) {
        onPageLoadInitQuery();
    });


    $('[name="vertex_label_toggle"]').change(function () {
        if ($(this).is(":checked")) {
            graph_canvas.controls.showVertexLabels()
        } else {
            graph_canvas.controls.hideVertexLabels()
        }
    });
    $('[name="edge_label_toggle"]').change(function () {
        if ($(this).is(":checked")) {
            graph_canvas.controls.showEdgeLabels()
        } else {
            graph_canvas.controls.hideEdgeLabels()
        }
    });

})