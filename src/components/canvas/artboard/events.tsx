/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { setHoveredElement, setSelectedElement, setContextMenuData } from "../../../state/canvas/canvasSlice"
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../state/store";

const GenerateEvents = (canvasCtrl: any) => {


    const dispatch = useDispatch();
    // const canvasData = useSelector((state: RootState) => state.canvas.canvasData);

    // https://github.com/invana/invana-studio/blob/285940b565cf2a091e8b394e3aa90cabd11541d6/src/web/interface/canvas/canvas-art-board.js#L28
    return {

        hoverNode: function (params: any) {
            console.log("hoverNode Event:", params);
            if (params.event) {
                const node = canvasCtrl.network.body.data.nodes.get(params.node)
                dispatch(setHoveredElement(node))
                dispatch(setContextMenuData({node:node, position_x: params.event.pageX, position_y: params.event.pageY}))
            }
        },

        blurNode: function (params: any) {
            console.log("blurNode Event:", params);
            dispatch(setHoveredElement(null))
            dispatch(setContextMenuData(null))

        },
 
        hoverEdge: function (params: any) {
            console.log("hoverEdge Event:", params);
            if (params.event) {
                dispatch(setHoveredElement(params.node))

                // _this.props.setSelectedElementData(params.edge, "g:Edge");
                // _this.props.setNodeMenuPosition(params.event.pageX, params.event.pageY);
            }
        },
        blurEdge: function (params: any) {
            console.log("blurEdge Event:", params);
            dispatch(setHoveredElement(null))
            dispatch(setContextMenuData(null))

        },

        click: function (params: any) {
            params.event = "[original event]";
            console.log(
                "click event, getNodeAt returns: ", params,
                //  this.getNodeAt(params.pointer.DOM)
            );
            // if (params.edges.length === 0 && params.nodes.length === 0) {
            //     setSelectedElement(selectedNode)        
            // }
            // dispatch(setContextMenuData(null))

        },
        selectNode: function (params: any) {
            console.log("selectNode Event:", params);
            const selectedNode = canvasCtrl.network.body.data.nodes.get(params.nodes[0])
            dispatch(setSelectedElement(selectedNode))        
        },
        // selectEdge: function (params) {
        //     console.log("selectEdge Event:", params);
        //
        // },
        deselectNode: function (params: any) {
            console.log("deselectNode Event:", params);
            dispatch(setSelectedElement(null))
        },
        // deselectEdge: function (params) {
        //     console.log("deselectEdge Event:", params);
        // },
    }

    // return {
    //     click: function (params) {
    //         params.event = "[original event]";
    //         // console.log(
    //         //     "click event, getNodeAt returns: ", params, this.getNodeAt(params.pointer.DOM)
    //         // );
    //         if (params.edges.length === 0 && params.nodes.length === 0) {
    //             _this.props.setSelectedElementData(null);
    //         }
    //     },
    //     doubleClick: function (params) {
    //         // console.log("doubleClick Event:", params);
    //         params.event = "[original event]";
    //         if (params.edges.length === 0 && params.nodes.length === 0) {
    //             _this.props.setSelectedElementData(null);
    //         }
    //     },
    //     oncontext: function (params) {
    //         console.log("oncontext Event:", params);
    //
    //         params.event = "[original event]";
    //     },
    //     dragStart: function (params) {
    //         // There's no point in displaying this event on screen, it gets immediately overwritten
    //         params.event = "[original event]";
    //         console.log("dragStart Event:", params);
    //         console.log(
    //             "dragStart event, getNodeAt returns: " +
    //             this.getNodeAt(params.pointer.DOM)
    //         );
    //         _this.props.setNodeMenuPosition(null, null);
    //         _this.props.setSelectedElementData(null);
    //
    //     },
    //     dragging: function (params) {
    //         params.event = "[original event]";
    //     },
    //     dragEnd: function (params) {
    //         params.event = "[original event]";
    //         console.log("dragEnd Event:", params);
    //         console.log(
    //             "dragEnd event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM)
    //         );
    //     },
    //     controlNodeDragging: function (params) {
    //         params.event = "[original event]";
    //     },
    //     controlNodeDragEnd: function (params) {
    //         params.event = "[original event]";
    //         console.log("controlNodeDragEnd Event:", params);
    //     },
    //     zoom: function (params) {
    //         console.log("params", params);
    //
    //     },
    //     showPopup: function (params) {
    //         console.log("params", params);
    //     },
    //     hidePopup: function () {
    //         console.log("hidePopup Event");
    //     },
    //     select: function (params) {
    //         console.log("select Event:", params);
    //     },
    //     selectNode: function (params) {
    //         console.log("selectNode Event:", params);
    //         // const selectedNode = this.props.getNetwork().get(params.nodes[0])
    //         // console.log("selectedNode", selectedNode)
    //     },
    //     selectEdge: function (params) {
    //         console.log("selectEdge Event:", params);
    //
    //     },
    //     deselectNode: function (params) {
    //         console.log("deselectNode Event:", params);
    //     },
    //     deselectEdge: function (params) {
    //         console.log("deselectEdge Event:", params);
    //     },
    //     hoverNode: function (params) {
    //         // console.log("hoverNode Event:", params);
    //         if (params.event) {
    //             _this.props.setSelectedElementData(params.node, "g:Vertex");
    //             _this.props.setNodeMenuPosition(params.event.pageX, params.event.pageY);
    //         }
    //     },
    //     hoverEdge: function (params) {
    //         // console.log("hoverEdge Event:", params);
    //         if (params.event) {
    //             _this.props.setSelectedElementData(params.edge, "g:Edge");
    //             _this.props.setNodeMenuPosition(params.event.pageX, params.event.pageY);
    //         }
    //     },
    //     blurNode: function (params) {
    //         console.log("blurNode Event:", params);
    //     },
    //     blurEdge: function (params) {
    //         console.log("blurEdge Event:", params);
    //     },
    //     stabilized: function (params) {
    //         console.log("stabilized Event:", params);
    //
    //         // _this.props.setRenderingStatusEnded();
    //         _this.props.stopRenderingGraph();
    //     },
    //     stabilizationProgress: function (params) {
    //         console.log("stabilizationProgress Event:", params);
    //
    //         // _this.props.setRenderingStatusEnded();
    //     }
    // }


}

export default GenerateEvents;