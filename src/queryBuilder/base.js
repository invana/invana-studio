/*

*/





export default class QueryManagerBase {

    initQuery() {
        throw new TypeError("Please implement abstract method initQuery.");
    }

    executeQuery(queryString) {
        return queryString;
    }


    // eslint-disable-next-line no-unused-vars
    getOutEdgeVertices(vertexId) {
        throw new TypeError("Please implement abstract method getOutEdgeVertices.");

    }

    // eslint-disable-next-line no-unused-vars
    getInEdgeVertices(vertexId) {
        throw new TypeError("Please implement abstract method getInEdgeVertices.");
    }

    // eslint-disable-next-line no-unused-vars
    managementGetVertexLabelStats(limit, skip) {
        throw new TypeError("Please implement abstract method managementGetVertexLabelStats.");
    }

    // eslint-disable-next-line no-unused-vars
    managementGetEdgeLabelStats(limit, skip) {
        throw new TypeError("Please implement abstract method managementGetEdgeLabelStats.");
    }

}
