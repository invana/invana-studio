app.controller('schemaCtrl', function ($scope, $rootScope) {

    $scope.query_result = null;
    // $scope.vertex_list = [];
    //
    // $scope.edge_list = [];

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function run_websocket_request(gremlin_query, server_url, label_type) {
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
        };
        var ws = new WebSocket(server_url);

        var data = JSON.stringify(msg);

        ws.onopen = function (event) {
            console.log("ws.open");
            ws.send(data, {mask: true});

        };
        ws.onerror = function (err) {
            console.log('Connection error using websocket');
            console.log(err);

            alert("<p> Connection error using websocket</p>"
                + "<p> Cannot connect to " + server_url + " </p>");


        };
        ws.onmessage = function (event) {
            console.log("onmessage received", label_type, event.data,);
            var response = JSON.parse(event.data);
            var data = response.result.data;
            console.log(label_type, data, response);
            if (label_type === "vertex") {
                $scope.vertex_list = data;
            }
            else {
                $scope.edge_list = data;

            }
            $scope.$apply()

        };

    }


    $scope.run_query = function () {
        run_websocket_request("g.V().label().dedup();", $scope.server_url, "vertex")
        run_websocket_request("g.E().label().dedup();", $scope.server_url, "edge")

    };
    $scope.run_query();
    // $scope.run_query();


});