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

    function run_websocket_request(gremlin_query, server_url) {
        $('#messageArea').html('<h3>(loading)</h3>');

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


        };
    }


    $scope.run_query = function () {
        run_websocket_request($scope.query_string, $scope.server_url)

    };

    $scope.show_node = function (i) {
        console.log("show_node", i);
        $scope.current_node = $scope.query_result[i];
    }

});