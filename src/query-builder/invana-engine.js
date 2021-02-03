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
        // 1. when query2 is null, queryKey is added from query1.
        //
        // TODO - Need fix [P3]; this doesnt work when combining query and mutation.
        let combinedQuery = {query: "", type: query1.type};

        const query2String = query2 ? query2.query : ""
        combinedQuery.query += query1.type + "{" + query1.query + query2String + "}";
        if (!query2) {
            combinedQuery.queryKey = query1.queryKey;
        }
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
            query: "getOrCreateVertex(label:\"" + label + "\", properties: "
                + JSON.stringify(JSON.stringify(properties)) + "){id,type,label,properties}",
            type: this.QUERY_TYPES.QUERY,
            queryKey: "getOrCreateVertex",
        };
    }

    updateVertexById(vertexId, properties) {
        return {
            query: "mutation{updateVertexById(id: " + vertexId + ", properties: "
                + JSON.stringify(JSON.stringify(properties)) + "){id,type,label,properties}}",
            type: this.QUERY_TYPES.MUTATION,
            queryKey: "updateVertexById",


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

    getLabelSchema(labelName, labelType) {
        let queryName = ""
        if (labelType === "vertex") {
            queryName = "getVertexLabelSchema";
        } else {
            queryName = "getEdgeLabelSchema"
        }
        return {
            type: this.QUERY_TYPES.QUERY,
            queryKey: queryName,
            query: queryName + "(label: \"" + labelName + "\"){ label,propertyKeys}"
        };
    }

    getLabelTotalCount(labelName, labelType) {
        let queryName = ""
        if (labelType === "vertex") {
            queryName = "getVertexLabelStats";
        } else {
            queryName = "getEdgeLabelStats"
        }
        return {
            type: this.QUERY_TYPES.QUERY,
            queryKey: queryName,
            query: queryName + "(label: \"" + labelName + "\"){ label,count}"
        };
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

    filterVertexAndNeighborEdgesAndVertices(id, label, limit, skip) {

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
            query: "filterVertexAndNeighborEdgesAndVertices(" + queryParams + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}",
            type: this.QUERY_TYPES.QUERY,
            queryKey: "filterVertexAndNeighborEdgesAndVertices",
        };
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
        return {
            query: "filterEdgeAndGetNeighborVertices(" + queryParams + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}",
            type: this.QUERY_TYPES.QUERY,
            queryKey: "filterEdgeAndGetNeighborVertices"
        };
    }

    rawQuery(queryString) {
        return {
            query: "rawQuery(gremlin:" + JSON.stringify(queryString) + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}",
            type: this.QUERY_TYPES.QUERY,
            queryKey: "rawQuery"

        };
    }

}

