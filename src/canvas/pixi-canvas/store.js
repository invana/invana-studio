import * as PIXI from 'pixi.js-legacy'

export class DataStore {

    constructor() {
        this.clear();
    }

    clear() {
        this.nodes = []
        this.links = []
        this.linkGraphicsArray = [];
        this.linkLabelGraphicsArray = [];
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
    removeAllNodes2Focus() {
        this.focusedNodes = [];
    }


    getNotNeighborLinks(selectedNodes) {
        let notNeighborLinks = [];
        let notNeighborNodes = [];
        const {nodes, links} = this.getNeighborNodesAndLinks(selectedNodes);

        nodes.push(...selectedNodes);
        this.nodes.forEach((node) => {
            if (!nodes.includes(node)) {
                notNeighborNodes.push(node);
            }
        })
        this.links.forEach((link) => {
            if (!links.includes(link)) {
                notNeighborLinks.push(link);
            }
        })
        console.log("=====notNeighborNodes", notNeighborNodes, notNeighborLinks)
        return {notNeighborLinks, notNeighborNodes};
    }


    getNeighborNodesAndLinks(nodes) {
        let neighborNodes = [];
        let neighborLinks = [];
        // get the links attached to nodeId
        this.links.forEach((link) => {
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

    checkIfElementExist(elementId, elementsData) {
        elementsData.forEach((elem) => {
            if (elementId === elem.id) {
                return true;
            }
        })
        return false
    }


    addData(nodes, links) {
        // TODO - review this logic again,
        // this where old data will be merged with the new data.
        let _this = this;
        links.forEach((link) => {
            const isElemExist = _this.checkIfElementExist(link.id, _this.links);
            // console.log("isElemExist", isElemExist, link.id);
            if (!isElemExist) {
                _this.links.push(link);
            }
        });
        nodes.forEach((node) => {
            const isElemExist = _this.checkIfElementExist(node.id, _this.nodes);
            if (!isElemExist) {
                _this.nodes.push(node);
            }
        });

        // console.log("after addition", _this.nodes.length, _this.links.length)
    }

}

export default class GraphStore {


    constructor(dataStore, graphCanvas) {
        this.dataStore = dataStore;
        this.graphCanvas = graphCanvas;
        this.clear();
    }

    clear() {
        this.hoveredNodeGfxOriginalChildren = [];
        this.hoveredNodeLabelGfxOriginalChildren = [];

        this.hoveredlinkGfxOriginalChildren = [];
        this.hoveredlinkLabelOriginalChildren = [];


        this.hoveredNodeChildrenPairs = {};
        this.nodeDataToNodeGfx = new WeakMap();
        this.nodeGfxToNodeData = new WeakMap();
        this.nodeDataToLabelGfx = new WeakMap();
        this.labelGfxToNodeData = new WeakMap();


        this.linkDataToLinkGfx = new WeakMap();
        this.linkGfxToLinkData = new WeakMap();
        this.linkDataToLabelGfx = new WeakMap();
        this.labelGfxToLinkData = new WeakMap();

        this.nodeDataGfxPairs = [];
        this.linkDataGfxPairs = [];
    }


    focusOnNodes(nodes) {
        let _this = this;
        this.resetFocus();
        const {notNeighborLinks, notNeighborNodes} = _this.dataStore.getNotNeighborLinks(nodes);
        notNeighborLinks.forEach((linkData) => {
            let linkGfx = _this.linkDataToLinkGfx.get(linkData);
            let linkGfxLabel = _this.linkDataToLabelGfx.get(linkData);

            linkGfx.alpha = _this.graphCanvas.settings.LINK_UN_HIGHLIGHT_ALPHA;
            linkGfxLabel.alpha = _this.graphCanvas.settings.LINK_UN_HIGHLIGHT_ALPHA;

            // move to front layer
            _this.graphCanvas.linksLayer.removeChild(linkGfx);
            _this.graphCanvas.frontLayer.addChild(linkGfx);
            _this.graphCanvas.linksLabelsLayer.removeChild(linkGfxLabel);
            _this.graphCanvas.frontLayer.addChild(linkGfxLabel);


        })

        notNeighborNodes.forEach((node2Highlight) => {
            let nodeContainer = _this.nodeDataToNodeGfx.get(node2Highlight);
            console.log("==nodeContainer", node2Highlight, nodeContainer);
            const labelGfx = _this.nodeDataToLabelGfx.get(node2Highlight);

            nodeContainer.alpha = _this.graphCanvas.settings.LINK_UN_HIGHLIGHT_ALPHA;
            labelGfx.alpha = _this.graphCanvas.settings.LINK_UN_HIGHLIGHT_ALPHA;

            // move to front layer
            _this.graphCanvas.nodesLayer.removeChild(nodeContainer);
            _this.graphCanvas.frontLayer.addChild(nodeContainer);
            _this.graphCanvas.nodeLabelsLayer.removeChild(labelGfx);
            _this.graphCanvas.frontLayer.addChild(labelGfx);

        });

        nodes.forEach((node) => {
            let nodeContainer = _this.nodeDataToNodeGfx.get(node);
            console.log("==nodeContainer", node, nodeContainer);
            //
            // _this.hoveredNodeChildrenPairs[node.id] = nodeContainer.children;

            nodeContainer.children[1].alpha =  _this.graphCanvas.settings.NODE_BORDER_HIGHLIGHT_ALPHA;
            // // circle border
            // const circleBorder = new PIXI.Graphics();
            // circleBorder.x = 0;
            // circleBorder.y = 0;
            // circleBorder.lineStyle(2.5, _this.graphCanvas.settings.NODE_FOCUSED_NODE_BORDER_COLOR);
            // circleBorder.drawCircle(0, 0, _this.graphCanvas.settings.NODE_RADIUS);
            // nodeContainer.addChild(circleBorder);
            //

            // move to front layer
            _this.graphCanvas.nodesLayer.removeChild(nodeContainer);
            _this.graphCanvas.frontLayer.addChild(nodeContainer);


        });
    }


    resetFocus() {
        // reset everything to normal
        let _this = this;
        this.dataStore.links.forEach((link, i) => {

            const linkGfx = _this.linkDataToLinkGfx.get(link);
            const linkLabelGfx = _this.linkDataToLabelGfx.get(link);
            // console.log("====unhighlight link", link, linkGfx)

            linkGfx.alpha = _this.graphCanvas.settings.LINK_DEFAULT_ALPHA;
            linkLabelGfx.alpha = _this.graphCanvas.settings.LINK_DEFAULT_ALPHA;

            // // move back from front layer
            _this.graphCanvas.frontLayer.removeChild(linkGfx);
            _this.graphCanvas.linksLayer.addChild(linkGfx);
            _this.graphCanvas.frontLayer.removeChild(linkLabelGfx);
            _this.graphCanvas.linksLabelsLayer.addChild(linkLabelGfx);

        })

        this.dataStore.nodes.forEach((node, i) => {
            const nodeGfx = _this.nodeDataToNodeGfx.get(node);
            const labelGfx = _this.nodeDataToLabelGfx.get(node);

            // move back from front layer
            _this.graphCanvas.frontLayer.removeChild(nodeGfx);
            _this.graphCanvas.nodesLayer.addChild(nodeGfx);
            _this.graphCanvas.frontLayer.removeChild(labelGfx);
            _this.graphCanvas.nodeLabelsLayer.addChild(labelGfx);

            nodeGfx.alpha = _this.graphCanvas.settings.NODE_DEFAULT_ALPHA;
            labelGfx.alpha = _this.graphCanvas.settings.NODE_DEFAULT_ALPHA;
            nodeGfx.children[1].alpha = _this.graphCanvas.settings.NODE_BORDER_UN_HIGHLIGHT_ALPHA;

            // // // clear hover effect


            // const nodeGfxChildren = nodeGfx.children;
            // for (let child of nodeGfxChildren) {
            //     if (_this.hoveredNodeChildrenPairs[node.id]
            //         && !_this.hoveredNodeChildrenPairs[node.id].includes(child)) {
            //         nodeGfx.removeChild(child);
            //     }
            // }

        })


    }


    addNode(node) {

    }

    addEdge(edge) {

    }


    updateNodePairs(newNodeDataGfxPairs) {

        newNodeDataGfxPairs.forEach((nodeDataPair) => {
            this.nodeDataGfxPairs.push(nodeDataPair)
        })


        // create lookup tables
        this.nodeDataToNodeGfx = new WeakMap(this.nodeDataGfxPairs.map(([nodeData, nodeGfx, labelGfx]) => [nodeData, nodeGfx]));
        this.nodeGfxToNodeData = new WeakMap(this.nodeDataGfxPairs.map(([nodeData, nodeGfx, labelGfx]) => [nodeGfx, nodeData]));
        this.nodeDataToLabelGfx = new WeakMap(this.nodeDataGfxPairs.map(([nodeData, nodeGfx, labelGfx]) => [nodeData, labelGfx]));
        this.labelGfxToNodeData = new WeakMap(this.nodeDataGfxPairs.map(([nodeData, nodeGfx, labelGfx]) => [labelGfx, nodeData]));
        // add Neighbours map also.
    }

    updateLinkPairs(newLinkDataGfxPairs) {

        newLinkDataGfxPairs.forEach((linkDataPair) => {
            this.linkDataGfxPairs.push(linkDataPair)
        })


        // create lookup tables
        this.linkDataToLinkGfx = new WeakMap(this.linkDataGfxPairs.map(([linkData, linkGfx, labelGfx]) => [linkData, linkGfx]));
        this.linkGfxToLinkData = new WeakMap(this.linkDataGfxPairs.map(([linkData, linkGfx, labelGfx]) => [linkGfx, linkData]));
        this.linkDataToLabelGfx = new WeakMap(this.linkDataGfxPairs.map(([linkData, linkGfx, labelGfx]) => [linkData, labelGfx]));
        this.labelGfxToLinkData = new WeakMap(this.linkDataGfxPairs.map(([linkData, linkGfx, labelGfx]) => [labelGfx, linkData]));
        // add Neighbours map also.
    }

}
