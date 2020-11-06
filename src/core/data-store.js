import {convertMapKeysToArray} from "./utils";
import {
    prepareLinksDataForCurves,
    prepareNodesDataWithOptions
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

    verticesStats = new Map();
    edgesStats = new Map();

    // Data of the 2D arrangement of vertices and links
    verticesToRender = [];
    edgesToRender = [];

    verticesAlreadyRendered = [];
    edgesAlreadyRendered = [];

    constructor() {
        this.resetData()
    }

    checkIfVertexExist(vertexId) {
        return !!this.#vertices.get(vertexId)
    }

    checkIfEdgeExist(vertexId) {
        return !!this.#edges.get(vertexId)
    }

    addVertexToDataSet(vertex) {
        this.#vertices.set(vertex.id, vertex);
    }

    addEdgeToDataSet(edge) {
        this.#edges.set(edge.id, edge);
    }

    computeDataDistributionStats() {
        this.verticesStats = new Map(); // resetting the stats
        this.edgesStats = new Map(); // resetting the stats

        convertMapKeysToArray(this.#vertices).forEach((vertex) => {
            const existingLabelStats = this.verticesStats.get(vertex.label);
            if (this.verticesStats.get(vertex.label)) {
                this.verticesStats.set(vertex.label, existingLabelStats + 1)
            } else {
                this.verticesStats.set(vertex.label, 1)
            }
        })

        convertMapKeysToArray(this.#edges).forEach((edge) => {
            const existingLabelStats = this.edgesStats.get(edge.label);
            if (this.edgesStats.get(edge.label)) {
                this.edgesStats.set(edge.label, existingLabelStats + 1)
            } else {
                this.edgesStats.set(edge.label, 1)
            }
        })
    }

    addData(newVertices, newEdges, onDataUpdated) {
        // make sure the newly added edges data has respective nodes data.
        let _this = this;
        for (let vertexI in newVertices) {
            let vertex = newVertices[vertexI];
            let doesNodeExist = _this.checkIfVertexExist(vertex.id);
            if (!doesNodeExist) {
                _this.addVertexToDataSet(vertex)
            }
        }
        for (let edgeI in newEdges) {
            let edge = newEdges[edgeI];
            let doesEdgeExist = _this.checkIfEdgeExist(edge.id);
            if (!doesEdgeExist) {
                this.addEdgeToDataSet(edge)
            }
            let checkIfInVExistInStore = _this.checkIfVertexExist(edge.inV);
            console.log("checkIfInVExistInStore", checkIfInVExistInStore, edge.inV);
            if (!checkIfInVExistInStore) {
                this.addVertexToDataSet({id: edge.inV, label: edge.inVLabel, type: "g:Vertex", properties: {}})
            }
            let checkIfOutVExistInStore = _this.checkIfVertexExist(edge.outV);

            if (!checkIfOutVExistInStore) {
                this.addVertexToDataSet({id: edge.outV, label: edge.outVLabel, type: "g:Vertex", properties: {}})
            }
        }
        // this will compute the stats of each nodes and links
        this.computeDataDistributionStats();
        if (onDataUpdated) {
            onDataUpdated();
        }
    }

    getAllData() {
        return {vertices: this.#vertices, edges: this.#edges}
    }

    setDataToRender(verticesToRender, edgesToRender) {
        console.log("=====setDataToRender triggered", verticesToRender.length, edgesToRender.length);
        this.verticesToRender = verticesToRender;
        this.edgesToRender = edgesToRender;
    }

    getDataToRender() {

        const keyValueArray = this.verticesToRender.map(entry => [entry['id'], entry]);
        const map = new Map(keyValueArray);
        const verticesToRender = Array.from(map.values());


        const keyValueArrayEdge = this.edgesToRender.map(entry => [entry['id'], entry]);
        const mapEdge = new Map(keyValueArrayEdge);
        const edgesToRender = Array.from(mapEdge.values());


        return {verticesToRender: verticesToRender, edgesToRender: edgesToRender};

    }

    checkIfExist(element, existingElements) {
        // console.log("existingElements", existingElements)
        existingElements.forEach((_elem) => {
            // console.log("_elem.id, element.id", (_elem.id === element.id), _elem.id, element.id,)
            if (_elem.id === element.id) {
                // console.log("====>>>>>");
                return true;
            }
        })
        // console.log("=======")
        return false;
    }


    getNewDataToRender() {

        // using all the

        // return { newVerticesToRender: this.getAllRawVerticesList(), newEdgesToRender: this.getAllRawEdgesList()}

        // const {verticesAlreadyRendered, edgesAlreadyRendered} = this.getAlreadyRenderedData()
        // const allRawVertices = this.getAllRawVerticesList();
        // const allRawEdges = this.getAllRawEdgesList();
        //
        // console.log("*****|| allRawVertices allRawEdges", allRawVertices, allRawEdges)
        // let newVerticesToRender = [];
        // allRawVertices.forEach((vertex) => {
        //     console.log("-----------");
        //     if (!this.checkIfExist(vertex, verticesAlreadyRendered) && !this.checkIfExist(vertex, newVerticesToRender)) {
        //         console.log("^^node", vertex);
        //         newVerticesToRender.push(vertex)
        //     }
        // })
        // let newEdgesToRender = [];
        // allRawEdges.forEach((edge) => {
        //     if (!this.checkIfExist(edge, edgesAlreadyRendered) && !this.checkIfExist(edge, newEdgesToRender)) {
        //         newEdgesToRender.push(edge)
        //     }
        // })
        // console.log("*****|| newVerticesToRender", newVerticesToRender, newEdgesToRender)
        // return {newVerticesToRender, newEdgesToRender}
    }

    determineAllDataToRender() {
        console.log("=====getDataToRender triggered");

        const {newVerticesToRender, newEdgesToRender} = {
            newVerticesToRender: this.getAllRawVerticesList(),
            newEdgesToRender: this.getAllRawEdgesList()
        }

        // // const {newVerticesToRender, newEdgesToRender} = this.getNewDataToRender();
        // let {verticesAlreadyRendered, edgesAlreadyRendered} = this.getAlreadyRenderedData();
        //
        //
        // console.log("(((( newVerticesToRender, newEdgesToRender", newVerticesToRender, newEdgesToRender)
        // console.log("(((( verticesAlreadyRendered, edgesAlreadyRendered", verticesAlreadyRendered, edgesAlreadyRendered)
        //
        // /*
        // has to use too many if's :( to not get into duplicates issue
        // when this method is called multiple times.
        //
        //  if (!this.checkIfExist(vertex, newVerticesToRender)) {
        //         if (!this.checkIfExist(vertex, verticesToRender)) {
        //             verticesToRender.push(vertex);
        //         }
        //     }
        //
        //
        //  */
        //
        // let verticesToRender = [].concat(verticesAlreadyRendered); // start with already rendered data.
        // newVerticesToRender.forEach((vertex) => {
        //     console.log("newV", this.checkIfExist(vertex, verticesAlreadyRendered), this.checkIfExist(vertex, verticesToRender))
        //     if (!this.checkIfExist(vertex, verticesAlreadyRendered) && !this.checkIfExist(vertex, verticesToRender)) {
        //         verticesToRender.push(vertex);
        //     }
        // })
        //
        // let edgesToRender = [].concat(edgesAlreadyRendered)
        // newEdgesToRender.forEach((edge) => {
        //     if (!this.checkIfExist(edge, edgesAlreadyRendered) && !this.checkIfExist(edge, edgesToRender)) {
        //         edgesToRender.push(edge);
        //     }
        // })

        console.log("======newVerticesToRender, newEdgesToRender", newVerticesToRender, newEdgesToRender)

        return {
            verticesToRender: newVerticesToRender,
            edgesToRender: newEdgesToRender
        }
    }

    getVerticesCount() {
        return this.#vertices.size;
    }

    checkIfShouldBeConvertedToGraphics() {

    }

    resetData() {
        this.#vertices = new Map()
        this.#edges = new Map()
        this.linkGraphicsArray = [];
        this.linkLabelGraphicsArray = [];
    }

    prepareNodes(vertices) {
        const nodeOptions = Object.assign({}, JSON.parse(localStorage.getItem('nodeLabels')));
        // const cleanedVertices = removeVertexMeta(convertMapKeysToArray(this.#vertices));
        return prepareNodesDataWithOptions(vertices, nodeOptions);

    }

    getAllRawVerticesList() {
        return this.prepareNodes(convertMapKeysToArray(this.#vertices))
    }

    getAllRawEdgesList() {
        return prepareLinksDataForCurves(convertMapKeysToArray(this.#edges));
    }

    getAlreadyRenderedData() {
        return {
            verticesAlreadyRendered: this.verticesAlreadyRendered,
            edgesAlreadyRendered: this.edgesAlreadyRendered
        }
    }

    setAlreadyRenderedData(verticesAlreadyRendered, edgesAlreadyRendered) {
        this.verticesAlreadyRendered = verticesAlreadyRendered;
        this.edgesAlreadyRendered = edgesAlreadyRendered;
    }


    getNeighborNodesAndLinks(nodes) {
        let neighborNodes = [];
        let neighborLinks = [];
        // get the links attached to nodeId
        this.getAllRawEdgesList().forEach((link) => {
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
        this.getAllRawVerticesList().forEach((node) => {
            if (!nodes.includes(node)) {
                notNeighborNodes.push(node);
            }
        })
        this.getAllRawEdgesList().forEach((link) => {
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

    checkIfVertexExistInFocused(nodeData) {
        this.focusedNodes.forEach((node) => {
            if (nodeData.id === node.id) {
                return true;
            }
        })
        return false;
    }

    addNode2Focus(nodeData) {
        if (!this.checkIfVertexExistInFocused(nodeData)) {
            this.focusedNodes.push(nodeData);
        }
    }

    getEdgesCount() {
        return this.#edges.size;
    }

    getEdge(edgeId) {
        return this.#edges.get(edgeId);
    }

    getVertex(nodeId) {
        return this.#vertices.get(nodeId);
    }
}
