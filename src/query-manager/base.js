/*

*/


export default class QueryManagerBase {

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
