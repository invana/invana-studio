import QueryManagerBase from "./base";


export default class GremlinQueryManager extends QueryManagerBase{

    getOutEdgeVertices(vertexId) {
        console.log("===vertexId", vertexId);
           return "node=g.V(" + vertexId + ").toList(); " +
            "edges = g.V(" + vertexId + ").inE().dedup().toList(); " +
            "other_nodes = g.V(" + vertexId + ").inE().otherV().dedup().toList();" +
            "[other_nodes,edges,node]";

    }

    getInEdgeVertices(vertexId) {
        console.log("===vertexId", vertexId);

        return  "node=g.V(" +vertexId + ").toList(); " +
            "edges = g.V(" + vertexId + ").outE().dedup().toList(); " +
            "other_nodes = g.V(" + vertexId + ").outE().otherV().dedup().toList();" +
            "[other_nodes,edges,node]";
    }

}

