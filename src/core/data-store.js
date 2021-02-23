
import {convertMapKeysToArray} from "./utils";
import {
    prepareLinkDataWithOptions,
    prepareLinksDataForCurves,
    prepareNodesDataWithOptions
} from "../web/interface/utils";

export default class InMemoryDataStore {
    /*
    in-memory example-data storage to save the responses example-data

    TODO - tons of performance issues to fix;
     review neighbor and not neighbor calc methods to start with


     */

    focusedNodes = [];

    // Data of raw  example-data from the response objects; for storage and retrieval purpose
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


    vertexOptions = new Map() // to save vertex meta options
    edgeOptions = new Map() // to save edge meta options.


    edgeUniqueStringDelimiter = "====="; // used to create unique links info for the schema
    schema = new Map() // {'sourceLabel': ['sourceLabel--targetLabel--edgeLabel],
    // 'targetLabel': ['sourceLabel--targetLabel--edgeLabel],
    // 'otherLabel': [] // no links)
    //{ "vertexId": {"neighbourLinks": [ "linkid-1", "linkid-2"], "neighbourNodes": ["nodeid-1" ]}
    // neighbourVerticesAndLinksMap = new Map();

    constructor() {
        this.resetData()
    }


    getUniqueFocusedNodes() {
        const focusedNodes = Object.assign([], this.focusedNodes);
        let uniqueMap = {};
        focusedNodes.forEach((node) => {
            uniqueMap[node.id] = node;
        });
        const uniqueNodes = Object.values(uniqueMap);
        console.log("=========uniqueNodes==>>", uniqueNodes)
        return uniqueNodes;
    }

    checkIfVertexExist(vertexId) {
        return !!this.#vertices.get(vertexId);
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

    // computeNeighbors() {
    //
    //
    //     // this.neighbourVerticesAndLinksMap
    // }
    //
    // getNodeByNodeLabelTextOrId(labelTextOrId) {
    //
    //     for (const [nodeId, nodeData] of this.#vertices.entries()) {
    //         // console.log("=====key", key);
    //         if (labelTextOrId === nodeId) {
    //             return nodeData;
    //         }
    //         if (nodeData.meta.labelOptions.labelText === labelTextOrId) {
    //             return nodeData;
    //         }
    //         // example-data.push(value);
    //     }
    //
    //     return
    // }

    searchNodeByNodeLabelTextOrId(labelTextOrId) {
        console.log("searchNodeByNodeLabelTextOrId", labelTextOrId, Number.isInteger(labelTextOrId))
        let results = [];
        const intLabelTextOrIdInt = parseInt(labelTextOrId);
        const strLabelTextOrIdInt = labelTextOrId.toString();
        for (const [nodeId, nodeData] of this.#vertices.entries()) {
            // console.log("=====key", key);
            if (strLabelTextOrIdInt === nodeId || intLabelTextOrIdInt === nodeId) {
                // covers both text and string version of the word
                results.push(nodeData);
            } else if (nodeData.meta.labelOptions.labelText) {
                // const intVersionOfTextOrId = parseInt(nodeData.meta.labelOptions.labelText);
                const strVersionOfTextOrId = nodeData.meta.labelOptions.labelText.toString().toLowerCase();
                if (strVersionOfTextOrId.includes(strLabelTextOrIdInt)) {
                    results.push(nodeData);
                }
                // .includes(labelTextOrId)
            }
            // example-data.push(value);
        }

        return results;
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


    addVertexToSchema(vertex) {

        if (!this.schema.get(vertex.label)) {
            this.schema.set(vertex.label, []);
        }
    }

    checkIfEdgeExistInSchema(vertexEdges, edgeUniqueStr) {
        // const nodeSchema = this.schema.get(vertexLabel);
        return vertexEdges.includes(edgeUniqueStr);
    }

    generateEdgeUniqueString(edge) {
        // sourceVLabel + delimiter + targetVLabel + delimiter + edgeLabel
        return edge.outVLabel + this.edgeUniqueStringDelimiter + edge.inVLabel + this.edgeUniqueStringDelimiter + edge.label;
    }

    addEdgeToSchema(edge) {
        const edgeUniqueStr = this.generateEdgeUniqueString(edge);
        // inV label example-data
        const inVEdges = this.schema.get(edge.inVLabel);
        const outVEdges = this.schema.get(edge.outVLabel);
        if (inVEdges && !this.checkIfEdgeExistInSchema(inVEdges, edgeUniqueStr)) {
            inVEdges.push(edgeUniqueStr);
            this.schema.set(edge.inVLabel, inVEdges);
        }
        if (outVEdges && !this.checkIfEdgeExistInSchema(outVEdges, edgeUniqueStr)) {
            outVEdges.push(edgeUniqueStr);
            this.schema.set(edge.outVLabel, outVEdges);
        }
    }

    getVertexSchema(vertexLabel) {
        const vertexEdges = this.schema.get(vertexLabel);
        let inE = [];
        let outE = [];

        // eslint-disable-next-line array-callback-return
        vertexEdges.map((vertexEdge) => {
            const [sourceLabel, targetLabel, edgeLabel] = vertexEdge.split(this.edgeUniqueStringDelimiter);
            if (sourceLabel === vertexLabel) {
                if (!outE.includes(sourceLabel)) {
                    outE.push(edgeLabel)
                }
            } else if (targetLabel === vertexLabel) {
                if (!inE.includes(targetLabel)) {
                    inE.push(edgeLabel)
                }
            }
        });
        return {inE, outE}
    }

    addToVertexOptions(vertex) {
        if (!this.vertexOptions.get(vertex.label)) {
            this.vertexOptions.set(vertex.label, vertex.meta);
        }
    }

    getVertexOptions(vertexLabel) {
        return this.vertexOptions.get(vertexLabel);
    }

    getEdgeOptions(edgeLabel) {
        return this.edgeOptions.get(edgeLabel);
    }

    addToEdgeOptions(edge) {
        if (!this.edgeOptions.get(edge.label)) {
            this.edgeOptions.set(edge.label, edge.meta);
        }
    }

    addData(newVertices, newEdges, onDataUpdated) {
        // make sure the newly added edges example-data has respective nodes example-data.
        let _this = this;
        for (let vertexI in newVertices) {
            let vertex = newVertices[vertexI];
            let doesNodeExist = _this.checkIfVertexExist(vertex.id);
            if (!doesNodeExist) {
                _this.addVertexToDataSet(vertex);
            }
            this.addVertexToSchema(vertex);
            this.addToVertexOptions(vertex);
        }
        for (let edgeI in newEdges) {
            let edge = newEdges[edgeI];
            let doesEdgeExist = _this.checkIfEdgeExist(edge.id);
            if (!doesEdgeExist) {
                this.addEdgeToDataSet(edge)
            }
            let checkIfInVExistInStore = _this.checkIfVertexExist(edge.inV);
            // console.log("checkIfInVExistInStore", checkIfInVExistInStore, edge.inV);
            if (!checkIfInVExistInStore) {
                this.addVertexToDataSet({id: edge.inV, label: edge.inVLabel, type: "g:Vertex", properties: {}});
            }
            let checkIfOutVExistInStore = _this.checkIfVertexExist(edge.outV);

            if (!checkIfOutVExistInStore) {
                this.addVertexToDataSet({id: edge.outV, label: edge.outVLabel, type: "g:Vertex", properties: {}});
            }
            this.addEdgeToSchema(edge);
            this.addToEdgeOptions(edge);
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

    checkIfNodeIsInVorOutV(link, nodeData) {
        if (link.inV === nodeData.id) {
            return "inV";
        } else if (link.outV === nodeData.id) {
            return "outV";
        }
    }


    getNodeBasicInfo(nodeData) {
        return {
            id: nodeData.id,
            labelText: nodeData.meta.labelOptions.labelText,
            label: nodeData.label,
            fillColorHex: nodeData.meta.shapeOptions.fillColorHex
        }
    }

    groupLinksToInEAndOutEByLabel(links, nodeData) {
        let inVGroups = {};
        let outVGroups = {};
        let _this = this;
        links.forEach(function (link) {
            // TODO - review this for performance.

            const linkType = _this.checkIfNodeIsInVorOutV(link, nodeData);
            if (linkType === "inV") {
                // so this node is an inV, so lets gather the info or outV for this, which is source (from d3)
                if (link.label in inVGroups) {
                    inVGroups[link.label].vertices.push(_this.getNodeBasicInfo(link.source))
                } else {
                    inVGroups[link.label] = {
                        // edgeLabel: "InE Label 1",
                        edgeFillColorHex: link.meta.shapeOptions.strokeColorHex,
                        vertices: [_this.getNodeBasicInfo(link.source)]
                    }

                }
            } else if (linkType === "outV") {
                if (link.label in outVGroups) {
                    outVGroups[link.label].vertices.push(_this.getNodeBasicInfo(link.target))
                } else {
                    outVGroups[link.label] = {
                        // edgeLabel: "InE Label 1",
                        edgeFillColorHex: link.meta.shapeOptions.strokeColorHex,
                        vertices: [_this.getNodeBasicInfo(link.target)]
                    }
                }
            }

        });
        return {inVGroups, outVGroups};
    }

    determineAllDataToRender() {
        console.log("=====getDataToRender triggered");
        const verticesData = this.getAllRawVerticesList();
        const edgesData = this.getAllRawEdgesList();
        const _this = this;


        // eslint-disable-next-line array-callback-return
        verticesData.map((vertex) => {
            // TODO - fix performance ASAP.
            const neighborData = this.getNeighborNodesAndLinks([vertex])

            // const links = neighborData.links;
            const {inVGroups, outVGroups} = _this.groupLinksToInEAndOutEByLabel(neighborData.links, vertex)

            // group links by label
            vertex.inData = inVGroups;
            vertex.outData = outVGroups;
        });

        // edgesData.map((edge) => {
        //
        // });

        const {newVerticesToRender, newEdgesToRender} = {
            newVerticesToRender: verticesData,
            newEdgesToRender: edgesData
        }


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
        const nodeOptions = Object.assign({}, JSON.parse(localStorage.getItem('nodeLabels')));
        return prepareLinkDataWithOptions(prepareLinksDataForCurves(convertMapKeysToArray(this.#edges)), nodeOptions);
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

    getNeighborNodesAndLinksOfNode(nodeId) {
        let neighborNodes = [];
        let neighborLinks = [];
        // get the links attached to nodeId
        this.getAllRawEdgesList().forEach((link) => {
            if (link.target.id === nodeId) {
                neighborLinks.push(link);
                neighborNodes.push(link.source);
            } else if (link.source.id === nodeId) {
                neighborLinks.push(link);
                neighborNodes.push(link.target);
            }
        })


        return {
            nodes: neighborNodes,
            links: neighborLinks
        }
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
            console.log("======checkIfVertexExistInFocused node, nodeData", node.id, nodeData.id);
            if (nodeData.id === node.id) {
                return true;
            }
        })
        return false;
    }

    addNode2Focus(nodeData) {
        if (this.checkIfVertexExistInFocused(nodeData) === false) {
            this.focusedNodes.push(nodeData);
        }
    }

    removeNodeFromFocus(nodeId) {
        let focusedNodes = this.getUniqueFocusedNodes();
        let indexId = null

        focusedNodes.forEach((focusedNode, index) => {
            if (focusedNode.id === nodeId) {
                indexId = index
                return index;
            }
        });
        focusedNodes.splice(indexId, 1);

        this.focusedNodes = focusedNodes;
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
