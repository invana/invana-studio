/*


 */

export default class InMemoryDataStore {
    /*
    in-memory data storage to save the responses data
     */
    #vertices = new Map()
    #edges = new Map()


    addData(newVertices, newEdges, onDataUpdated) {
        let _this = this;
        for (let vertexI in newVertices) {
            if (_this.#vertices[vertexI]) {
                // already indexed
            } else {
                let vertex = newVertices[vertexI];
                _this.#vertices.set(vertex.id, vertex);
            }
        }
        for (let edgeI in newEdges) {
            if (_this.#edges[edgeI]) {
                // already indexed
            } else {
                let edge = newEdges[edgeI];
                _this.#edges.set(edge.id, edge);
            }
        }
        if (onDataUpdated) {
            onDataUpdated();
        }
    }

    getAllData() {
        return {vertices: this.#vertices, edges: this.#edges}
    }

    getVerticesCount() {
        return this.#vertices.size;
    }

    getVerticesList() {
        let vertices = [];
        for (let i in this.#vertices) {
            vertices.push(this.#vertices[i]);
        }
        return vertices;
    }

    getEdgesList() {
        let edges = [];
        for (let i in this.#edges) {
            edges.push(this.#edges[i]);
        }
        return edges;
    }

    getEdgesCount() {
        return this.#edges.size;
    }

    getNode(edgeId) {
        return this.#edges.get(edgeId);
    }

    getVertex(nodeId) {
        return this.#vertices.get(nodeId);
    }
}