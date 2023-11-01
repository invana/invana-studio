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

export interface CanvasState {
    // canvasNodes: CanvasNode[],
    canvasData : CanvasData
    selectedElement : any,
    hoveredElement : any,
    focusedNodes: any[]
}


const initialState: CanvasState = {
    // canvasNodes: [],
    canvasData : {nodes: [], edges: []},
    selectedElement: null,
    hoveredElement: null,
    focusedNodes: []
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
        }
    }
})

export const {addCanvasData, clearCanvasData} = canvasSlice.actions;

export default canvasSlice.reducer