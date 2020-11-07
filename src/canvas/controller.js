/*

 */


export default class CanvasController {

    constructor(connector, dataStore, updateCanvasState, setStatusMessage,
                flushCanvas, setShallReRenderD3Canvas) {
        this.connector = connector;
        this.dataStore = dataStore;
        this.updateCanvasState = updateCanvasState
        this.setStatusMessage = setStatusMessage
        this.flushCanvas = flushCanvas
        this.setShallReRenderD3Canvas = setShallReRenderD3Canvas
    }


    switchCanvasTo(canvasType) {
        this.updateCanvasState({
            canvasType: canvasType,
        })
        this.setStatusMessage("Canvas switched to " + canvasType)
    }


    confirmFlushCanvas() {
        let r = window.confirm("Are you sure you want to clear the canvas");
        if (r === true) {
            this.flushCanvas();
        }
    }

    confirmRedrawCanvas() {

        let r = window.confirm("Are you sure you want to re-draw the canvas");
        if (r === true) {
            // this.setState({shallReRenderD3Canvas: true})
            this.setShallReRenderD3Canvas(true);
        }
    }

}
