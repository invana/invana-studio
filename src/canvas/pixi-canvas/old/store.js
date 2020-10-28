/*


 */

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

        nodes.forEach((node) => {
            const isElemExist = _this.checkIfElementExist(node.id, _this.nodes);
            if (!isElemExist) {
                _this.nodes.push(node);
            }
        });
        links.forEach((link) => {
            const isElemExist = _this.checkIfElementExist(link.id, _this.links);
            // console.log("isElemExist", isElemExist, link.id);
            if (!isElemExist) {
                _this.links.push(link);
            }
        });

        // console.log("after addition", _this.nodes.length, _this.links.length)
    }

}

