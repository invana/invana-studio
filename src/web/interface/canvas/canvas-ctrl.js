// /*
//
//  */
//
//
// export default class CanvasController {
//
//     constructor(connector, dataStore,
//                 updateCanvasState,
//                 setStatusMessage,
//                 flushCanvas, setShallReRenderD3Canvas) {
//         this.connector = connector;
//         this.dataStore = dataStore;
//         this.updateCanvasState = updateCanvasState
//         this.setStatusMessage = setStatusMessage
//         this.flushCanvas = flushCanvas
//         this.setShallReRenderD3Canvas = setShallReRenderD3Canvas
//     }
//
//
//     switchCanvasTo(canvasType) {
//         this.updateCanvasState({
//             canvasType: canvasType,
//         });
//         this.setStatusMessage("Canvas switched to " + canvasType);
//     }
//
//
//     confirmFlushCanvas() {
//         let r = window.confirm("Are you sure you want to clear the canvas");
//         if (r === true) {
//             this.flushCanvas();
//         }
//     }
//
//     confirmRedrawCanvas() {
//
//         let r = window.confirm("Are you sure you want to re-draw the canvas");
//         if (r === true) {
//             // this.setState({shallReRenderD3Canvas: true})
//             this.setShallReRenderD3Canvas(true);
//         }
//     }
//
//
//     downloadCanvasImage() {
//         // Source from:  http://stackoverflow.com/questions/18480474/how-to-save-an-image-from-canvas
//         const canvas = document.querySelector('canvas');
//         const filename = "image.png";
//         /// create an "off-screen" anchor tag
//         var lnk = document.createElement('a'), e;
//
//         /// the key here is to set the download attribute of the a tag
//         lnk.download = filename;
//
//         /// convert canvas content to data-uri for link. When download
//         /// attribute is set the content pointed to by link will be
//         /// pushed as "download" in HTML5 capable browsers
//         lnk.href = canvas.toDataURL("image/png;base64");
//
//         /// create a "fake" click-event to trigger the download
//         if (document.createEvent) {
//             e = document.createEvent("MouseEvents");
//             e.initMouseEvent("click", true, true, window,
//                 0, 0, 0, 0, 0, false, false, false,
//                 false, 0, null);
//
//             lnk.dispatchEvent(e);
//         } else if (lnk.fireEvent) {
//             lnk.fireEvent("onclick");
//         }
//     }
//
// }
