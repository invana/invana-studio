app.controller('dslCtrl', function ($scope, $rootScope) {

    $scope.query_result = null;
    $scope.current_node = null;
    $scope.query_string = "g.V()";

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function run_websocket_request(gremlin_query, server_url, query_type) {
        $('#messageArea').html('<p class="text-muted">(loading)</p>');

        var msg = {
            "requestId": uuidv4(),
            "op": "eval",
            "processor": "",
            "args": {
                "gremlin": gremlin_query,
                "bindings": {},
                "language": "gremlin-groovy"
            }
        }
        var ws = new WebSocket(server_url);

        var data = JSON.stringify(msg);

        ws.onopen = function (event) {
            console.log("ws.open");
            ws.send(data, {mask: true});

        };
        ws.onerror = function (err) {
            console.log('Connection error using websocket');
            console.log(err);

            $('#outputArea').html("<p> Connection error using websocket</p>"
                + "<p> Cannot connect to " + server_url + " </p>");
            $('#messageArea').html('');


        };
        ws.onmessage = function (event) {
            console.log("onmessage received", event.data);
            var response = JSON.parse(event.data);
            var data = response.result.data;
            console.log(data, response);
            if (query_type === "query") {
                if (data == null) {

                    $('#outputArea').html(response.status.message);
                    $('#messageArea').html('Server error. No data.');
                    return 1;

                } else {
                    $('#messageArea').html('');
                    $('#outputArea').html(data);
                    $scope.query_result = data;
                    console.log("$scope.query_result", $scope.query_result);

                }
            }
            else if (query_type === "get_vertices") {
                $scope.vertex_list = data;
            }
            $scope.$apply();
            $scope.show_table();

        };


    }


    $scope.run_query = function () {
        run_websocket_request($scope.query_string, $scope.server_url, "query")

    };

    $scope.show_node = function (i) {
        console.log("show_node", i);
        $scope.current_node = $scope.query_result[i];
    }
    run_websocket_request("g.V().label().dedup();", $scope.server_url, "get_vertices");


    $scope.show_vertex_data = function (vertex_class) {
        query = "g.V().hasLabel('" + vertex_class + "');"
        $scope.query_string = query;

        run_websocket_request(query, $scope.server_url, "query");
    };

    $scope.shall_show_table = true;
    // $scope.shall_show_pretty = false;
    $scope.shall_show_graph = false;

    $scope.show_table = function () {
        $('.nav-result .nav-link').removeClass("active");
        $('#show-table').addClass("active");
        // $scope.result_tabulated_data = angular.copy($scope.query_result);
        $scope.shall_show_table = true;
        // $scope.shall_show_pretty = false;
        $scope.shall_show_graph = false;

    };


    // $scope.show_pretty = function () {
    //     console.log("show_pretty");
    //     $('.nav-result .nav-link').removeClass("active");
    //     $('#show-pretty').addClass("active");
    //     $scope.shall_show_table = false;
    //     $scope.shall_show_pretty = true;
    //     $scope.shall_show_graph = false;
    // };

    $scope.show_graph = function () {
        $('.nav-result .nav-link').removeClass("active")
        $('#show-graph').addClass("active");
        $scope.shall_show_table = false;
        // $scope.shall_show_pretty = false;
        $scope.shall_show_graph = true;

    };

    $scope.delete_current_node = function (node_type, node_id) {
        console.log(node_type, node_id);
        if (node_type === "vertex") {
            query = "g.V(" + node_id + ").drop()";
            $scope.query_string = query;
            run_websocket_request(query, $scope.server_url, "delete_vertex");
        } else if (node_type === "edge") {
            query = "g.E(" + node_id + ").drop()";
            $scope.query_string = query;

            run_websocket_request(query, $scope.server_url, "delete_edge");

        }
    };


});