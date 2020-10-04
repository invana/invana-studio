import QueryManagerBase from "./base";


export default class GremlinQueryManager extends QueryManagerBase{

    getOutEdgeVertices(vertexId) {
        console.log("===vertexId", vertexId);
        throw new TypeError("Please implement abstract method getOutEdgeVertices.");

    }

    getInEdgeVertices(vertexId) {
        console.log("===vertexId", vertexId);
        throw new TypeError("Please implement abstract method getInEdgeVertices.");
    }

}

