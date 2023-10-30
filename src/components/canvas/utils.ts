/*
 *
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
 *
 */


// export const getLabelValue(element, labelPropertyKey){
//
// }

const schemaNodeDataFn = (model: any) => {
    return {id: model.name, label: model.name, group: model.name}
}

const schemaEdgeDataFn = (model: any) => {
    let allEdgesModels: any = []
    model.link_paths.map((linkPath: any) => {
        allEdgesModels.push({
            id: model.name + "-" + linkPath.outv_label + "-" + linkPath.inv_label,
            label: model.name,
            group: model.name + "-" + linkPath.outv_label + "-" + linkPath.inv_label,
            from: linkPath.outv_label, to: linkPath.inv_label,
            arrows: "to"
        })
    })
    return allEdgesModels;
}

export const convertToNodesData = (nodes: any, nodeDataFn: any) => {
    let allVertexModels: any = [];
    nodes.map((model: any) => {
        allVertexModels.push(nodeDataFn(model))
    })
    return allVertexModels;
}


export const convertToEdgesData = (edges: any, edgeDataFn: any) => {
    let allEdgesModels: any = [];
    edges.map((model: any) => {
        const _ = edgeDataFn(model);
        if (Array.isArray(_)) {
            allEdgesModels.push(..._)
        } else {
            allEdgesModels.push(_)
        }
    })
    return allEdgesModels;
}


const convertSchemaDataToVisJsData = (responseData: any) => {
    console.log("responseData", responseData);
    let allEdgesModels: any = [];
    let allVertexModels: any = [];
    allVertexModels = convertToNodesData(responseData.get_all_vertex_models, schemaNodeDataFn)
    allEdgesModels = convertToEdgesData(responseData.get_all_edges_models, schemaEdgeDataFn)
    return {nodes: allVertexModels, edges: allEdgesModels}

}


const getNodeElementDataFn = (model: any) => {
    return {id: model.id, label: model.id.toString(), type: "node", group: model.label, properties: model.properties}
}

const getEdgeElementDataFn = (model: any) => {
    return {id: model.id, label: model.id.toString(), type: "edge", group: model.label, properties: model.properties}
}


export const convertToVisJsData = (nodes: any, edges: any) => {
    console.log("responseData", nodes, edges);
    let allEdgesModels: any = [];
    let allVertexModels: any = [];
    allVertexModels = convertToNodesData(nodes, getNodeElementDataFn)
    allEdgesModels = convertToEdgesData(edges, getEdgeElementDataFn)
    return {nodes: allVertexModels, edges: allEdgesModels}

}
export default convertSchemaDataToVisJsData;