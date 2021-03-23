/*

 */



export default class CanvasController {

    constructor(
        network,
        setStatusMessage,
        flushDataState,
        reRenderVisualizer,
        setRenderingStatusEnded,
        startRenderingStatus
    ) {
        this.network = network;
        this.setStatusMessage = setStatusMessage;
        this.flushDataState = flushDataState;
        this.reRenderVisualizer = reRenderVisualizer;
        this.setRenderingStatusEnded = setRenderingStatusEnded;
        this.startRenderingStatus = startRenderingStatus;
    }


    confirmFlushCanvas() {
        let r = window.confirm("Are you sure you want to clear the canvas");
        if (r === true) {
            this.flushDataState();
            this.setStatusMessage("Cleared the data from canvas");
        }
    }

    confirmRedrawCanvas() {
        let r = window.confirm("Are you sure you want to re-draw the canvas");
        if (r === true) {
            this.startRenderingGraph();
            // this.setStatusMessage("Re-Drawing canvas successful.");
        }
    }

    stopRenderingGraph() {
        console.log("stopRenderingGraph");
        this.network.setOptions({physics: false});
        this.setRenderingStatusEnded();
    }

    startRenderingGraph(newOptions) {
        console.log("startRenderingGraph");
        if (newOptions) {
            this.network.setOptions(newOptions);
        } else {
            this.network.setOptions({physics: true});
        }
        this.network.startSimulation();
        this.startRenderingStatus();

    }

    centerGraph() {
        this.network.fit();
    }

    hideData(hiddenNodeLabels, hiddenEdgeLabels) {

        console.log("hiddenNodeLabels", hiddenNodeLabels);
        const allNodes = this.network.body.data.nodes;
        const allEdges = this.network.body.data.edges;
        //
        //
        // let newNodes = [];
        // let newEdges = [];
        // allNodes.forEach((newNode) => {
        //     newNode.hidden = hiddenNodeLabels.includes(newNode.label);
        //     newNodes.push(newNode);
        // });
        // allEdges.forEach((newEdge) => {
        //     newEdge.hidden = hiddenEdgeLabels.includes(newEdge.label);
        //     newEdges.push(newEdge);
        // });

        const allEdgesOptions = allEdges.map(edge => ({
            id: edge.id,
            hidden: hiddenEdgeLabels.includes(edge._label),
            _label: edge._label
        }));

        const allNodesOptions = allNodes.map(node => ({
            id: node.id,
            hidden: hiddenNodeLabels.includes(node._label),
            _label: node._label
        }));
        console.log("allNodesOptions", allNodesOptions)

        // this.startRenderingGraph();

        console.log("new nodes after hiding data", allNodesOptions.length)
        this.network.body.data.nodes.update(allNodesOptions);
        this.network.body.data.edges.update(allEdgesOptions);
        this.network.redraw();

    }

    downloadCanvasImage() {
        // Source from:  http://stackoverflow.com/questions/18480474/how-to-save-an-image-from-canvas
        const canvas = document.querySelector('canvas');
        const filename = "image.png";
        /// create an "off-screen" anchor tag
        var lnk = document.createElement('a'), e;

        /// the key here is to set the download attribute of the a tag
        lnk.download = filename;

        /// convert canvas content to data-uri for link. When download
        /// attribute is set the content pointed to by link will be
        /// pushed as "download" in HTML5 capable browsers
        lnk.href = canvas.toDataURL("image/png;base64");

        /// create a "fake" click-event to trigger the download
        if (document.createEvent) {
            e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false,
                false, 0, null);

            lnk.dispatchEvent(e);
        } else if (lnk.fireEvent) {
            lnk.fireEvent("onclick");
        }
    }

    getNewDataToAdd(newNodes, newEdges) {
        // TODO - fix performance later  ;) please
        const existingNodes = this.network.body.data.nodes;
        const existingEdges = this.network.body.data.edges;
        let newNodesToAdd = [];
        let newEdgesToAdd = [];
        newNodes.forEach((newNode) => {
            if (!existingNodes.get(newNode.id)) {
                newNodesToAdd.push(newNode);
            }
        });
        newEdges.forEach((newEdge) => {
            if (!existingEdges.get(newEdge.id)) {
                newEdgesToAdd.push(newEdge);
            }
        });
        return {newNodesToAdd, newEdgesToAdd}
    }


}
