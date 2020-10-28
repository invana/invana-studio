/*


 */

import {convertMapKeysToArray} from "./utils";
import {
    prepareLinksDataForCurves,
    prepareNodesDataWithOptions,
    removeEdgeMeta,
    removeVertexMeta
} from "../canvas/canvas-utils";

export default class InMemoryDataStore {
    /*
    in-memory data storage to save the responses data
     */

    focusedNodes = [];

    // Data of raw  data from the response objects; for storage and retrieval purpose
    #vertices = new Map()
    #edges = new Map()

    // For moving and controlling highlighting of the links
    // TODO - move this to graphics store
    linkGraphicsArray = [];
    linkLabelGraphicsArray = [];

    // Data of the 2D arrangement of vertices and links
    verticesToRender = [];
    edgesToRender = [];

    constructor() {
        this.resetData()
    }


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

    setDataToRender(verticesToRender, edgesToRender) {
        console.log("=====setDataToRender triggered");
        this.verticesToRender = verticesToRender;
        this.edgesToRender = edgesToRender;
    }

    getAllDataToRender() {
        console.log("=====getAllDataToRender triggered");
        return {
            verticesToRender: this.getVerticesList(),
            edgesToRender: this.getEdgesList()
        }
    }

    getVerticesCount() {
        return this.#vertices.size;
    }

    resetData() {
        this.#vertices = new Map()
        this.#edges = new Map()
        this.linkGraphicsArray = [];
        this.linkLabelGraphicsArray = [];
    }

    getVerticesList() {
        if (this.verticesToRender.length === 0) {
            // assuming first-time
            const nodeOptions = Object.assign({}, JSON.parse(localStorage.getItem('nodeLabels')));
            const cleanedVertices = removeVertexMeta(convertMapKeysToArray(this.#vertices));
            return prepareNodesDataWithOptions(cleanedVertices, nodeOptions);

        } else {
            return this.verticesToRender;

        }
    }

    getEdgesList() {
        // return convertMapKeysToArray(this.#edges);
        // return this.getAllDataToRender().edgesToRender;
        if (this.verticesToRender.length === 0 && this.edgesToRender.length === 0) {
            // assuming first-time
            const cleanedEdges = removeEdgeMeta(convertMapKeysToArray(this.#edges));
            return prepareLinksDataForCurves(cleanedEdges)

        } else {
            return this.edgesToRender

        }

    }

    getNeighborNodesAndLinks(nodes) {
        let neighborNodes = [];
        let neighborLinks = [];
        // get the links attached to nodeId
        this.getEdgesList().forEach((link) => {
            nodes.forEach((nodeData) => {
                if (link.target.id === nodeData.id) {
                    neighborLinks.push(link);
                    neighborNodes.push(link.source);
                } else if (link.source.id === nodeData.id) {
                    neighborLinks.push(link);
                    neighborNodes.push(link.target);
                }
            })
        })


        return {
            nodes: neighborNodes,
            links: neighborLinks
        }
    }


    getNotNeighborLinks(selectedNodes) {
        let notNeighborLinks = [];
        let notNeighborNodes = [];
        const {nodes, links} = this.getNeighborNodesAndLinks(selectedNodes);

        nodes.push(...selectedNodes);
        this.getVerticesList().forEach((node) => {
            if (!nodes.includes(node)) {
                notNeighborNodes.push(node);
            }
        })
        this.getEdgesList().forEach((link) => {
            if (!links.includes(link)) {
                notNeighborLinks.push(link);
            }
        })
        console.log("=====notNeighborNodes", notNeighborNodes, notNeighborLinks)
        return {notNeighborLinks, notNeighborNodes};
    }

    removeAllNodes2Focus() {
        this.focusedNodes = [];
    }

    checkIfNodeExistInFocused(nodeData) {
        this.focusedNodes.forEach((node) => {
            if (nodeData.id === node.id) {
                return true;
            }
        })
        return false;
    }


    addNode2Focus(nodeData) {
        if (!this.checkIfNodeExistInFocused(nodeData)) {
            this.focusedNodes.push(nodeData);
        }
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
