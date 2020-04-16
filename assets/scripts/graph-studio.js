$(document).ready(function () {

    // var GREMLIN_SERVER_URL = "ws://127.0.0.1:8182/gremlin"


    let onHeaderQuerySubmit = function (e) {
        e.preventDefault();
        let query = $('#header-query-form [name="query"]').val();
        console.log("query is ", query);
    }

    $("#header-query-form").submit(onHeaderQuerySubmit);


    console.log(window.ws);

})