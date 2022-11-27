import QueryManagerBase from "./base";


export default class InvanaEngineQueryManager extends QueryManagerBase {


    /*

    1. each query method should return an object with following data

        schemaGetVertexLabels() {
            return {
                type: this.QUERY_TYPES.QUERY,
                queryKey: "schemaGetVertexLabels",
                query: "schemaGetVertexLabels{label, count}"
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
        combinedQuery.query += query1.type + "{" + query1.query + "\n" + query2String + "}";
        if (!query2) {
            combinedQuery.queryKey = query1.queryKey;
        }
        return combinedQuery;
    }

    schemaGetVertexLabels() {
        return {
            type: this.QUERY_TYPES.QUERY,
            queryKey: "schemaGetVertexLabels",
            query: "schemaGetVertexLabels"
        };
    }

    schemaGetEdgeLabels() {
        return {
            type: this.QUERY_TYPES.QUERY,
            queryKey: "schemaGetEdgeLabels",
            query: "schemaGetEdgeLabels"
        };
    }

    getOrCreateVertex(label, properties) {
        return {
            query: "getOrCreateVertex(label:\"" + label + "\", properties: "
                + JSON.stringify(JSON.stringify(properties)) + "){isCreated,data{id,type,label,properties}}",
            type: this.QUERY_TYPES.QUERY,
            queryKey: "getOrCreateVertex"
        };
    }

    updateVertexById(vertexId, properties) {
        return {

            query: "mutation{updateVertexById(id: " + vertexId + ", properties: "
                + JSON.stringify(JSON.stringify(properties)) + "){id,type,label,properties}}",
            type: this.QUERY_TYPES.MUTATION,
            queryKey: "updateVertexById"

        };
    }

    getOutEdgeVertices(vertexId) {

        return {
            query: "getOutEdgesAndVertices(id:" + JSON.stringify(vertexId) + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}",
            type: this.QUERY_TYPES.QUERY,
            queryKey: "getOutEdgesAndVertices"
        };
    }

    getInEdgeVertices(vertexId) {
        return {
            query: "getInEdgesAndVertices(id:" + JSON.stringify(vertexId) + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}",
            type: this.QUERY_TYPES.QUERY,
            queryKey: "getInEdgesAndVertices",
        };
    }


    initQuery() {
        return {"query": "{getVertices(limit: 1){id,type,label,properties }}"};
    }

    getLabelSchema(labelName, labelType) {
        let queryName = ""
        if (labelType === "vertex") {
            queryName = "schemaGetVertexSchema";
        } else {
            queryName = "schemaGetEdgeSchema"
        }
        return {
            type: this.QUERY_TYPES.QUERY,
            queryKey: queryName,
            query: queryName + "(label: \"" + labelName + "\"){ " +
                "name, partitioned, static, properties {" +
                "name,cardinality,type}}"
        };
    }


    getLabelPropertyKeys(labelName, labelType) {
        let queryName = ""
        if (labelType === "vertex") {
            queryName = "schemaGetVertexLabelPropertyKeys";
        } else {
            queryName = "schemaGetEdgeLabelPropertyKeys"
        }
        return {
            type: this.QUERY_TYPES.QUERY,
            queryKey: queryName,
            query: queryName + "(label: \"" + labelName + "\")"
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

    getVerticesByLabel(label, limit, skip) {

        let queryParams = "";
        if (label) {
            queryParams += "filters: \"{ \\\"has__label\\\" : \\\"" + label + "\\\"} \","
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
            queryKey: "getVertices",
            query: "getVertices(" + queryParams + "){id,type,label,properties}"
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

    getNodesAndNeighboursByLabel(id, label, limit, skip) {


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
            query: label+"(" + queryParams + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}",
            type: this.QUERY_TYPES.QUERY,
            queryKey: label,
        };
    }


    getEdgesAndNeighboursByLabel(label, limit, skip) {

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
            query: "getEdgesAndNeighboursByLabel(" + queryParams + "){id,type,label,properties, inV, inVLabel, outV, outVLabel}",
            type: this.QUERY_TYPES.QUERY,
            queryKey: "getEdgesAndNeighboursByLabel"
        };
    }

    executeQuery(queryString) {
        return {
            query: "executeQuery(gremlin:" + JSON.stringify(queryString) + "){data}",
            type: this.QUERY_TYPES.QUERY,
            queryKey: "executeQuery"

        };

    }

}

