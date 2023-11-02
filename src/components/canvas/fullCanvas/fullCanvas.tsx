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
import React from "react";
import ArtBoard from "../artboard/artBoard";
import { CanvasArtBoardProps } from "../artboard/types";
import CanvasFooter from "../footer/footer";
import FocusedNodesList from "../focusedNode/focusedNode";
import ElementDetail from "../elementDetail/elementDetail";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { CanvasData, addCanvasData, clearCanvasData, removeFromFocuedNodes } from "../../../state/canvas/canvasSlice";
import ContextMenu from "../../contextMenu/contextMenu";


const FullCanvas = (props: CanvasArtBoardProps) => {


    // Footer 
    // HoveredElement - node/edge
    // SelectedElement - node/edge
    // FocusedNode 
    // ContextMenu
    // ElementProperties

    // getFocuseNodes = () => {
    //     const nodes = this.props.canvasCtrl.getData().nodes;
    //     if (nodes.length > 0) {
    //         return nodes.slice(0, 2)
    //     }
    //     return []
    // }

    // getSelectedNode = () => {
    //     const nodes = this.props.canvasCtrl.getData().nodes;
    //     if (nodes.length > 0) {
    //         return nodes[0]
    //     }
    //     return null
    // }
    const dispatch = useDispatch()
    const canvasData: CanvasData = useSelector((state: RootState) => state.canvas.canvasData);
    const selectedElement: any = useSelector((state: RootState) => state.canvas.selectedElement);
    const focusedNodes: any = useSelector((state: RootState) => state.canvas.focusedNodes);
    const hoveredElement: any = useSelector((state: RootState)=> state.canvas.hoveredElement);

    console.log("====selectedElement", selectedElement)
    console.log("=hoveredElement", hoveredElement)

    return (
        <div className={"canvasContainer w-100 h-100"}>
            <FocusedNodesList
                style={{ position: "absolute", top: 70, left: 70, right: 10 }}
                focusedNodes={focusedNodes}
                onRemove={(node: any) => dispatch(removeFromFocuedNodes(node))} />

            {
                selectedElement ? <ElementDetail element={selectedElement} /> : <React.Fragment />
            }
            <ContextMenu />
            <ArtBoard
                containerId={props.containerId}
                // data={props.canvasCtrl.getData()}
                data={canvasData}
                options={props.options}
                events={props.events}
                getNetwork={(network) => props.canvasCtrl.setNetwork(network)}
                style={{
                    width: "100%", height: "calc(100vh - 55px - 25px - 1px )",
                    borderTop: "1px solid var(--rs-border-primary)",
                    borderBottom: "1px solid var(--rs-border-primary)"
                }}
            />
            <CanvasFooter />

        </div>
    )

}

export default FullCanvas;