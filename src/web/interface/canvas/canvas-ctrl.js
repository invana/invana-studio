/*

 */


export default class CanvasController {

    constructor(
        network,
        setStatusMessage,
        flushDataState,
        reRenderVisualizer
    ) {
        this.network = network;
        this.setStatusMessage = setStatusMessage;
        this.flushDataState = flushDataState;
        this.reRenderVisualizer = reRenderVisualizer;
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
            this.reRenderVisualizer();
            this.setStatusMessage("Re-Drawing canvas successful.");
        }
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
