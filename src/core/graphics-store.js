import {convertMapKeysToArray} from "./utils";

export default class GraphicsStore {


    constructor(dataStore, graphicsEngine) {
        this.dataStore = dataStore;
        this.graphicsEngine = graphicsEngine;
        this.clearAndSetupNew();
    }

    alreadyRenderedData() {
        // TODO fix this later
        // const {renderedVertices, renderedEdges} = this.dataStore.getAllData()
        // const {vertices, edges} = this.dataStore.getAllData()
        return {
            renderedVertices: convertMapKeysToArray(this.nodeDataToNodeGfx),
            renderedEdges: convertMapKeysToArray(this.linkDataToLinkGfx)
        }
        // return {vertices, edges}
    }

    clearAndSetupNew() {
        this.hoveredNodeGfxOriginalChildren = [];
        this.hoveredNodeLabelGfxOriginalChildren = [];

        this.hoveredlinkGfxOriginalChildren = [];
        this.hoveredlinkLabelOriginalChildren = [];


        this.hoveredNodeChildrenPairs = {};
        this.nodeDataToNodeGfx = new Map();
        this.nodeGfxToNodeData = new Map();
        this.nodeDataToLabelGfx = new Map();
        this.labelGfxToNodeData = new Map();


        this.linkDataToLinkGfx = new Map();
        this.linkGfxToLinkData = new Map();
        this.linkDataToLabelGfx = new Map();
        this.labelGfxToLinkData = new Map();

        this.nodeDataGfxPairs = [];
        this.linkDataGfxPairs = [];
    }


    getElementsToHighlightFromNodes(nodes) {
        /*
        This method will return the nodes and links to highlight.
        from nodes.
         */

        const notNeighborData = this.dataStore.getNotNeighborLinks(nodes);
        // const {verticesToRender, edgesToRender} = this.dataStore.getDataToRender()
        const neighborsData = this.dataStore.getNeighborNodesAndLinks(nodes);
        // let notNeighborData ={}
        return {notNeighborData, neighborsData}

    }

    getElementsToHighlightFromLink(linkData) {
        /*
        This method will return the nodes and links to highlight
        from link.
         */

        const neighborsData = {
            links: [linkData],
            nodes: [linkData.source, linkData.target]
        }
        let notNeighborData = {
            notNeighborNodes: [],
            notNeighborLinks: []
        }

        this.dataStore.getAllRawVerticesList().forEach((node) => {
            if (!neighborsData.nodes.includes(node)) {
                notNeighborData.notNeighborNodes.push(node);
            }
        })
        this.dataStore.getAllRawEdgesList().forEach((link) => {
            if (!neighborsData.links.includes(link)) {
                notNeighborData.notNeighborLinks.push(link);
            }
        })

        return {notNeighborData, neighborsData}

    }


    focusOnElements(nodes, linkData) {
        console.log("=====focusOnElements", nodes, linkData);
        let _this = this;
        // this.resetFocus();
        let data = null;

        if (linkData) {
            data = this.getElementsToHighlightFromLink(linkData)
        } else {
            data = this.getElementsToHighlightFromNodes(nodes)
        }
        if (!nodes) {
            nodes = data.neighborsData.nodes;
        }
        // // unhighlighting not  neighbors
        data.notNeighborData.notNeighborLinks.forEach((linkData) => {
            let linkGfx = _this.linkDataToLinkGfx.get(linkData.id);
            let linkGfxLabel = _this.linkDataToLabelGfx.get(linkData.id);

            linkGfx.alpha = _this.graphicsEngine.settings.LINK_UN_HIGHLIGHT_ALPHA;
            linkGfxLabel.alpha = _this.graphicsEngine.settings.LINK_UN_HIGHLIGHT_ALPHA;

            // move to front layer
            _this.graphicsEngine.linksLayer.removeChild(linkGfx);
            _this.graphicsEngine.frontLayer.addChild(linkGfx);
            _this.graphicsEngine.linksLabelsLayer.removeChild(linkGfxLabel);
            _this.graphicsEngine.frontLayer.addChild(linkGfxLabel);
        })
        data.notNeighborData.notNeighborNodes.forEach((node2Highlight) => {
            let nodeContainer = _this.nodeDataToNodeGfx.get(node2Highlight.id);
            // console.log("==nodeContainer", node2Highlight, nodeContainer);
            const labelGfx = _this.nodeDataToLabelGfx.get(node2Highlight.id);

            // reset the border
            nodeContainer.children[0].alpha = _this.graphicsEngine.settings.NODE_BORDER_UN_HIGHLIGHT_ALPHA;

            // reset alpha
            nodeContainer.alpha = _this.graphicsEngine.settings.LINK_UN_HIGHLIGHT_ALPHA;
            labelGfx.alpha = _this.graphicsEngine.settings.LINK_UN_HIGHLIGHT_ALPHA;

            // move to front layer
            _this.graphicsEngine.nodesLayer.removeChild(nodeContainer);
            _this.graphicsEngine.frontLayer.addChild(nodeContainer);
            _this.graphicsEngine.nodeLabelsLayer.removeChild(labelGfx);
            _this.graphicsEngine.frontLayer.addChild(labelGfx);

        });


        // highlighting neighbors
        data.neighborsData.links.forEach((linkData) => {
            let linkGfx = _this.linkDataToLinkGfx.get(linkData.id);
            let linkGfxLabel = _this.linkDataToLabelGfx.get(linkData.id);

            linkGfx.alpha = _this.graphicsEngine.settings.LINK_DEFAULT_ALPHA;
            linkGfxLabel.alpha = _this.graphicsEngine.settings.LINK_DEFAULT_ALPHA;

            // move to front layer
            _this.graphicsEngine.linksLayer.removeChild(linkGfx);
            _this.graphicsEngine.frontLayer.addChild(linkGfx);
            _this.graphicsEngine.linksLabelsLayer.removeChild(linkGfxLabel);
            _this.graphicsEngine.frontLayer.addChild(linkGfxLabel);
        })
        data.neighborsData.nodes.forEach((node2Highlight) => {
            let nodeContainer = _this.nodeDataToNodeGfx.get(node2Highlight.id);
            // console.log("==nodeContainer", node2Highlight, nodeContainer);
            const labelGfx = _this.nodeDataToLabelGfx.get(node2Highlight.id);

            // reset the border
            nodeContainer.children[0].alpha = _this.graphicsEngine.settings.NODE_BORDER_UN_HIGHLIGHT_ALPHA;

            // reset alpha
            nodeContainer.alpha = _this.graphicsEngine.settings.LINK_DEFAULT_ALPHA;
            labelGfx.alpha = _this.graphicsEngine.settings.LINK_DEFAULT_ALPHA;

            // move to front layer
            _this.graphicsEngine.nodesLayer.removeChild(nodeContainer);
            _this.graphicsEngine.frontLayer.addChild(nodeContainer);
            _this.graphicsEngine.nodeLabelsLayer.removeChild(labelGfx);
            _this.graphicsEngine.frontLayer.addChild(labelGfx);

        });

        nodes.forEach((node) => {
            // let nodeContainer = _this.nodeDataToNodeGfx.get(node.id);
            // console.log("==nodeContainer", node, nodeContainer);

            let nodeContainer = _this.nodeDataToNodeGfx.get(node.id);
            console.log("==nodeContainer", node, nodeContainer);
            if (nodeContainer) {
                // TODO - check why nodeContainer is undefined sometimes.
                nodeContainer.children[0].alpha = _this.graphicsEngine.settings.NODE_BORDER_HIGHLIGHT_ALPHA;
            }
            const labelGfx = _this.nodeDataToLabelGfx.get(node.id);

            nodeContainer.alpha = _this.graphicsEngine.settings.LINK_DEFAULT_ALPHA;
            labelGfx.alpha = _this.graphicsEngine.settings.LINK_DEFAULT_ALPHA;

            // move to front layer
            _this.graphicsEngine.nodesLayer.removeChild(nodeContainer);
            _this.graphicsEngine.frontLayer.addChild(nodeContainer);
            _this.graphicsEngine.nodeLabelsLayer.removeChild(labelGfx);
            _this.graphicsEngine.frontLayer.addChild(labelGfx);


            // move to front layer
            // _this.graphicsEngine.nodesLayer.removeChild(nodeContainer);
            // _this.graphicsEngine.frontLayer.addChild(nodeContainer);
        });


    }

    //
    highlightThisNodeAlso(nodeId) {
        const nodeGfx = this.nodeDataToNodeGfx.get(nodeId);
        nodeGfx.children[0].alpha = this.graphicsEngine.settings.NODE_BORDER_HIGHLIGHT_ALPHA;

    }

    resetFocus() {
        // reset everything to normal
        let _this = this;
        // const

        console.log("++reset focus")
        const {verticesToRender, edgesToRender} = this.dataStore.getDataToRender()
        console.log("++", verticesToRender, edgesToRender)

        // TODO - review code, do we need forEach on getAllRawEdgesList instead of iterating over all
        //  _this.linkDataToLinkGfx and _this.linkDataToLabelGfx
        edgesToRender.forEach((link) => {
            const linkGfx = _this.linkDataToLinkGfx.get(link.id);
            const linkLabelGfx = _this.linkDataToLabelGfx.get(link.id);

            if (linkGfx) {
                linkGfx.alpha = _this.graphicsEngine.settings.LINK_DEFAULT_ALPHA;
                linkLabelGfx.alpha = _this.graphicsEngine.settings.LINK_DEFAULT_ALPHA;
                // // move back from front layer
                _this.graphicsEngine.frontLayer.removeChild(linkGfx);
                _this.graphicsEngine.linksLayer.addChild(linkGfx);
                _this.graphicsEngine.frontLayer.removeChild(linkLabelGfx);
                _this.graphicsEngine.linksLabelsLayer.addChild(linkLabelGfx);
            }

        })

        verticesToRender.forEach((node) => {
            const nodeGfx = _this.nodeDataToNodeGfx.get(node.id);
            const labelGfx = _this.nodeDataToLabelGfx.get(node.id);

            // move back from front layer
            _this.graphicsEngine.frontLayer.removeChild(nodeGfx);
            _this.graphicsEngine.nodesLayer.addChild(nodeGfx);
            _this.graphicsEngine.frontLayer.removeChild(labelGfx);
            _this.graphicsEngine.nodeLabelsLayer.addChild(labelGfx);

            nodeGfx.alpha = _this.graphicsEngine.settings.NODE_DEFAULT_ALPHA;
            labelGfx.alpha = _this.graphicsEngine.settings.NODE_DEFAULT_ALPHA;
            nodeGfx.children[0].alpha = _this.graphicsEngine.settings.NODE_BORDER_UN_HIGHLIGHT_ALPHA;

            // // // clearAndSetupNew hover effect


            // const nodeGfxChildren = nodeGfx.children;
            // for (let child of nodeGfxChildren) {
            //     if (_this.hoveredNodeChildrenPairs[node.id]
            //         && !_this.hoveredNodeChildrenPairs[node.id].includes(child)) {
            //         nodeGfx.removeChild(child);
            //     }
            // }

        })

    }

    updateNodePairs(newNodeDataGfxPairs) {

        newNodeDataGfxPairs.forEach((nodeDataPair) => {
            this.nodeDataGfxPairs.push(nodeDataPair)
        })

        // create lookup tables
        // eslint-disable-next-line no-unused-vars
        this.nodeDataToNodeGfx = new Map(this.nodeDataGfxPairs.map(([nodeData, nodeGfx, labelGfx]) => [nodeData.id, nodeGfx]));
        // eslint-disable-next-line no-unused-vars
        this.nodeGfxToNodeData = new Map(this.nodeDataGfxPairs.map(([nodeData, nodeGfx, labelGfx]) => [nodeGfx, nodeData.id]));
        // eslint-disable-next-line no-unused-vars
        this.nodeDataToLabelGfx = new Map(this.nodeDataGfxPairs.map(([nodeData, nodeGfx, labelGfx]) => [nodeData.id, labelGfx]));
        // eslint-disable-next-line no-unused-vars
        this.labelGfxToNodeData = new Map(this.nodeDataGfxPairs.map(([nodeData, nodeGfx, labelGfx]) => [labelGfx, nodeData.id]));
        // add Neighbours map also.
    }

    updateLinkPairs(newLinkDataGfxPairs) {

        newLinkDataGfxPairs.forEach((linkDataPair) => {
            this.linkDataGfxPairs.push(linkDataPair)
        })


        // create lookup tables
        // eslint-disable-next-line no-unused-vars
        this.linkDataToLinkGfx = new Map(this.linkDataGfxPairs.map(([linkData, linkGfx, labelGfx]) => [linkData.id, linkGfx]));
        // eslint-disable-next-line no-unused-vars
        this.linkGfxToLinkData = new Map(this.linkDataGfxPairs.map(([linkData, linkGfx, labelGfx]) => [linkGfx, linkData.id]));
        // eslint-disable-next-line no-unused-vars
        this.linkDataToLabelGfx = new Map(this.linkDataGfxPairs.map(([linkData, linkGfx, labelGfx]) => [linkData.id, labelGfx]));
        // eslint-disable-next-line no-unused-vars
        this.labelGfxToLinkData = new Map(this.linkDataGfxPairs.map(([linkData, linkGfx, labelGfx]) => [labelGfx, linkData.id]));
        // add Neighbours map also.
    }


}
