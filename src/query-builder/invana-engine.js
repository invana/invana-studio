import QueryManagerBase from "./base";


export default class InvanaEngineQueryManager extends QueryManagerBase {

    /*

    1. each query method should return an object with following data

        getVerticesLabelStats() {
            return {
                type: this.QUERY_TYPES.QUERY,
                queryKey: "getVerticesLabelStats",
                query: "getVerticesLabelStats{label, count}"
            };
        }

    2. Use combineQueries(query1, query2) to run two queries at a time.



     */
    QUERY_TYPES = {
        QUERY: "query",
        MUTATION: "mutation"
    }

    combineQueries(query1, query2) {
        // takes two separate queries and combine them into one graphql query
        // TODO - Need fix [P3]; this doesnt work when combining query and mutation.
        let combinedQuery = {query: "", type: this.QUERY_TYPES.QUERY};

        const query2String = query2 ? query2.query : ""
        combinedQuery.query += "{" + query1.query + query2String + "}";
        return combinedQuery;
    }

    getVerticesLabelStats() {
        return {
            type: this.QUERY_TYPES.QUERY,
            queryKey: "getVerticesLabelStats",
            query: "getVerticesLabelStats{label, count}"
        };
    }

    getEdgesLabelStats() {
        return {
            type: this.QUERY_TYPES.QUERY,
            queryKey: "getEdgesLabelStats",
            query: "getEdgesLabelStats{label, count}"
        };
    }

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
        return {
            type: this.QUERY_TYPES.QUERY,
            queryKey: "filterVertex",
            query: "filterVertex(" + queryParams + "){id,type,label,properties}"
        };
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
        return {
            type: this.QUERY_TYPES.QUERY,
            queryKey: "filterEdge",
            query: "filterEdge(" + queryParams + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}"
        };
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

