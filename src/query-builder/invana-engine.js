import QueryManagerBase from "./base";


export default class InvanaEngineQueryManager extends QueryManagerBase {

    getOrCreateVertices(label, properties) {
        return {
            "query": "{getOrCreateVertex(label:\"" + label + "\", properties: "
                + JSON.stringify(JSON.stringify(properties)) + "){id,type,label,properties}}"
        };
    }

    updateVertexById(vertexId, properties) {
        return {
            "query": "mutation{updateVertexById(id: " + vertexId + ", properties: "
                + JSON.stringify(JSON.stringify(properties)) + "){id,type,label,properties}}"
        };
    }

    getOutEdgeVertices(vertexId) {
        return {"query": "{getOutEdgesAndVertices(id:" + JSON.stringify(vertexId) + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}}"};
    }

    getInEdgeVertices(vertexId) {
        return {"query": "{getInEdgesAndVertices(id:" + JSON.stringify(vertexId) + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}}"};
    }

    getVerticesLabelStats() {
        return {"query": "{getVerticesLabelStats{label, count}}"};
    }

    getEdgesLabelStats() {
        return {"query": "{getEdgesLabelStats{label, count}}"};
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

    getNeighborEdgesAndVertices(label, limit, skip) {

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
        return {"query": "{getNeighborEdgesAndVertices(" + queryParams + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}}"};
    }

    filterEdges(label, limit, skip) {

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
        return {"query": "{filterEdge(" + queryParams + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}}"};
    }

    filterEdgeAndGetNeighborVertices(label, limit, skip) {

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
        return {"query": "{filterEdgeAndGetNeighborVertices(" + queryParams + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}}"};
    }

    rawQuery(queryString) {
        return {"query": "{rawQuery(gremlin:" + JSON.stringify(queryString) + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}}"};
    }

}

