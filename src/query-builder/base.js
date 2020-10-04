/*

*/


export default class QueryManagerBase {

    initQuery() {
        return "g.V().limit(10).toList()";
    }

    rawQuery(queryString) {
        console.log("===queryString", queryString);
        return queryString;
    }


    getOutEdgeVertices(vertexId) {
        console.log("===vertexId", vertexId);
        throw new TypeError("Please implement abstract method getOutEdgeVertices.");

    }

    getInEdgeVertices(vertexId) {
        console.log("===vertexId", vertexId);

        throw new TypeError("Please implement abstract method getInEdgeVertices.");

    }

}
