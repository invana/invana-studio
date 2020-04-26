class InvanaKnowledgeGraphUI {

    constructor(gremlin_server_url, html_selector_id) {

        this.GREMLIN_SERVER_URL = gremlin_server_url; //"ws://127.0.0.1:8182/gremlin";
        this.html_selector_id = html_selector_id;
        this.canvas_selector_id = "#graph-area";
        this.gremlinConnector = null;
        this.init_html();
        this.graph_canvas = new DataGraphCanvas(this.canvas_selector_id, this);
    }

    init_html() {
        let html_structure = "<div class=\"invana-graph-viewer\">\n" +
            "    <div class=\"page-loading\" style=\"display: none\">\n" +
            "        <div class=\"loader-spin\"></div>\n" +
            "        <p class=\"text-center\">Loading ...</p>\n" +
            "    </div>\n" +
            "    <nav class=\"invana-graph-viewer-nav\">\n" +
            "        <div class=\"invana-graph-viewer-nav-brand\">\n" +
            "            <h3>Graph Studio</h3>\n" +
            "        </div>\n" +
            "        <div class=\"invana-graph-viewer-query\">\n" +
            "            <form id=\"header-query-form\">\n" +
            "                <input name=\"query\" type=\"text\" placeholder=\"Query the Graph here. Example: g.V().limit(5).toList()\">\n" +
            "            </form>\n" +
            "        </div>\n" +
            "\n" +
            "    </nav>\n" +
            "    <section class=\"canvas-section\">\n" +
            "        <div id=\"graph-area-wrapper\" class=\"full-screen\">\n" +
            "            <svg id=\"graph-area\" width=\"100%\" height=\"100%\">\n" +
            "            </svg>\n" +
            "        </div>\n" +
            "    </section>\n" +
            "    <div id=\"legend-div\">\n" +
            "        <svg></svg>\n" +
            "    </div>\n" +
            "    <pre id=\"properties-div\"></pre>\n" +
            "    <div id=\"controls-div\">\n" +
            "    </div>\n" +
            "    <div id=\"notifications-div\"></div>\n" +
            "    <div id=\"connection-status\"><span></span></div>\n" +
            "</div>";

        $(this.html_selector_id).html($(html_structure));

    }

    addQueryToUrl(query) {
        let u = new URL(location.href);
        var searchParams = new URLSearchParams(window.location.search);
        searchParams.set("query", query);
        if (window.history.replaceState) {
            //prevents browser from storing history with each change:
            // no history will be added with replaceState
            window.history.pushState({}, null, u.origin + u.pathname + "?" + searchParams.toString());
        }
    }


    submitQuery(query, validate_query, shall_update_url, clear_canvas) {
        let _this = this;

        if (typeof shall_update_url === "undefined") {
            shall_update_url = true;
        }
        if (typeof clear_canvas === "undefined") {
            clear_canvas = false;
        }

        if (clear_canvas) {
            this.graph_canvas.reset_canvas_data();
        }
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
                };
                show_loading();
                if (shall_update_url === true) {
                    _this.addQueryToUrl(query);
                    $('[name="query"]').val(query);
                }
                _this.gremlinConnector.send(msg);
            }
        }
    }

    onPageLoadInitQuery() {
        let query = new URLSearchParams(window.location.search).get("query");
        this.submitQuery(query, false, true);

    }

    onHeaderQuerySubmit(_this, e) {

        e.preventDefault();
        let query = $('#header-query-form [name="query"]').val();
        console.log("query is ", query);
        _this.submitQuery(query, false, true, true);
    }

    start() {
        let _this = this;

        let gremlin_response_serializers = new GremlinResponseSerializers();

        let onMessageReceived = function (event) {
            let response = JSON.parse(event.data);
            console.log("onMessageReceived", response);
            let json_data = gremlin_response_serializers.process(response);
            console.log("json_data", json_data);

            show_notification("Rendered graph");
            let _ = gremlin_response_serializers.seperate_vertices_and_edges(json_data);
            let vertices = _[0];
            let edges = _[1];
            _this.graph_canvas.draw(vertices, edges);
            hide_loading();

        };
        this.gremlinConnector = new GremlinConnector(this.GREMLIN_SERVER_URL, onMessageReceived);


        $("#header-query-form").submit(function (e) {
            _this.onHeaderQuerySubmit(_this, e);
        });

        this.gremlinConnector.ws.addEventListener('open', function (event) {
            _this.onPageLoadInitQuery();
        });


    }
}

// $(document).ready(function () {
//
//     $('[name="vertex_label_toggle"]').change(function () {
//         if ($(this).is(":checked")) {
//             graph_canvas.controls.showVertexLabels();
//         } else {
//             graph_canvas.controls.hideVertexLabels();
//         }
//     });
//     $('[name="edge_label_toggle"]').change(function () {
//         if ($(this).is(":checked")) {
//             graph_canvas.controls.showEdgeLabels();
//         } else {
//             graph_canvas.controls.hideEdgeLabels();
//         }
//     });
// });