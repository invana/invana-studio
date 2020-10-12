import QueryManagerBase from "./base";


export default class InvanaEngineQueryManager extends QueryManagerBase {

    getOutEdgeVertices(vertexId) {
        return {"query": "{getOutEdgesAndVertices(id:" + JSON.stringify(vertexId) + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}}"};
    }

    getInEdgeVertices(vertexId) {
        return {"query": "{getInEdgesAndVertices(id:" + JSON.stringify(vertexId) + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}}"};
    }

    getVerticesLabelStats() {
        return {"query": "{getVerticesLabelStats{label, count}}"};
    }

    initQuery() {
        return {"query": "{filterVertex(limit: 10){id,type,label,properties, inV, inVLabel, outV, outVLabel}}"};
    }

    filterVertices(label, limit, skip) {

        let queryParams = "";
        if (label) {
            queryParams += "label: \"" + label + "\",";
        }
        if (limit) {
            queryParams += "limit: " + limit + ",";
        }
        if (skip) {
            queryParams += "skip: " + skip;
        }

        queryParams = queryParams.replace(/,\s*$/, "");
        return {"query": "{filterVertex(" + queryParams + "){id,type,label,properties}}"};
    }

    rawQuery(queryString) {
        return {"query": "{rawQuery(gremlin:" + JSON.stringify(queryString) + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}}"};
    }

}

