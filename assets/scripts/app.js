var app = angular.module("invanaGraphApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "assets/templates/main.html",
            controller: "dslCtrl"
        })
        .when("/help", {
            templateUrl: "assets/templates/help.html"
        })
        .when("/schema", {
            templateUrl: "assets/templates/schema.html"
        });
});

app.controller('baseCtrl', function ($scope, $rootScope) {
    $rootScope.server_url = "ws://127.0.0.1:8182/gremlin";

});