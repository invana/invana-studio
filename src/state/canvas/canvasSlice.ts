import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Node, Edge } from "vis-network";

export interface CanvasNode extends Node {
    properties? : any;
    type: string
}

export interface CanvasEdge extends Edge {
    properties? : any;
    type: string
}

export interface CanvasData {
    nodes: CanvasNode[] | null,
    edges: CanvasEdge[] | null
}

export interface ContextMenuData {
    node: CanvasNode,
    position_x: number,
    position_y: number
}

export interface CanvasState {
    // canvasNodes: CanvasNode[],
    canvasData : CanvasData
    selectedElement : CanvasNode|CanvasEdge|null,
    hoveredElement : CanvasNode|CanvasEdge|null,
    focusedNodes: CanvasNode[],
    contextMenuData: ContextMenuData|null
}


const initialState: CanvasState = {
    // canvasNodes: [],
    canvasData : {nodes: [], edges: []},
    selectedElement: null,
    hoveredElement: null,
    focusedNodes: [],
    contextMenuData: null
};

const canvasSlice = createSlice({
    name: "canvas",
    initialState,
    reducers: {
        addCanvasData: (state, action: PayloadAction<CanvasData>) => {
            // TODO - write logic to update the existing data with new data 
            console.log("=====action", action, JSON.stringify(action.payload))
            const {nodes, edges} = action.payload

            // const existingNodes = state.canvasData.nodes;
            // const existingEdges = state.canvasData.edges;


            // @ts-ignore
            state.canvasData =  {nodes: nodes, edges: edges}
        },
        clearCanvasData: (state)=>{
            state.canvasData =  {nodes: [], edges: []}
        },
        setHoveredElement: (state, action: PayloadAction<CanvasEdge|CanvasNode|null>)=>{
            console.log('=====setHoveredElement', action)
            // @ts-ignore
            state.hoveredElement = action.payload;
        },
        setSelectedElement : (state, action: PayloadAction<CanvasEdge|CanvasNode|null>)=>{
            // @ts-ignore
            state.selectedElement = action.payload;
        },
        setContextMenuData : (state, action: PayloadAction<ContextMenuData|null>)=>{
            // @ts-ignore
            state.contextMenuData = action.payload;
        },
        addToFocuedNodes: (state, action: PayloadAction<CanvasNode>)=>{
            const existingFocusedNodes = state.focusedNodes
            // @ts-ignore
            existingFocusedNodes.push(action.payload)
            state.focusedNodes = existingFocusedNodes
        },
        removeFromFocuedNodes: (state, action: PayloadAction<CanvasNode>)=>{
            // const existingFocusedNodes = state.focusedNodes;
            console.log("=====removeFromFocuedNodes", action.payload.id)
            state.focusedNodes = state.focusedNodes.filter(obj => action.payload.id !== obj.id);
        },
    }
})

export const {addCanvasData, clearCanvasData, setHoveredElement, setSelectedElement, 
    setContextMenuData, addToFocuedNodes, removeFromFocuedNodes} = canvasSlice.actions;

export default canvasSlice.reducer