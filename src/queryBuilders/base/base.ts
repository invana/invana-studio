
export default class QueryManagerBase {

    initQuery() {
        throw new TypeError("Please implement abstract method initQuery.");
    }

    rawQuery(queryString: string) {
        return queryString;
    }

    getOutEdgeVertices(vertexId: string | number) {
        throw new TypeError("Please implement abstract method getOutEdgeVertices.");
    }

    getInEdgeVertices(vertexId: string | number) {
        throw new TypeError("Please implement abstract method getInEdgeVertices.");
    }

}