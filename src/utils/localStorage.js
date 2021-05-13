import {RENDERING_CONFIG} from "../settings";

export function getDataFromLocalStorage(itemKey, isJson) {

    if (isJson) {
        return JSON.parse(localStorage.getItem(itemKey));
    } else {
        return localStorage.getItem(itemKey)
    }

}

export function setDataToLocalStorage(itemKey, itemData) {
    // console.log("settings example-data", itemKey, itemData)
    if (typeof itemData === 'object') {
        itemData = JSON.stringify(itemData);
    }
    localStorage.setItem(itemKey, itemData);
}


export function setElementColorOptionsToStorageUsingResponse(response) {
    /*
    If sent response from gremlin, it will automatically update those new
    vertex/edge key data only.
     */
    console.log("setElementColorOptionsToStorageUsingResponse", response.response.data.filterVertex);
    let nodeLabelsConfig = {};
    response.response.data.filterVertex.forEach((vertexConfig) => {
        nodeLabelsConfig[vertexConfig.properties.name] = vertexConfig.properties;
    });
    setDataToLocalStorage(RENDERING_CONFIG.LOCAL_STORAGE_KEY, nodeLabelsConfig);
}

export function removeItemFromLocalStorage(itemKey) {
    localStorage.removeItem(itemKey);
}

export function setElementColorOptionsToStorage(vertexOption) {
    /*
    If sent response from gremlin, it will automatically update those new
    vertex/edge key data only.
     */
    console.log("setElementColorOptionsToStorage", vertexOption)

    // if (vertexOption.type === "g:Vertex") {
    let _nodes = getDataFromLocalStorage(RENDERING_CONFIG.LOCAL_STORAGE_KEY, true) || {};
    _nodes[vertexOption.properties.name] = vertexOption.properties;
    setDataToLocalStorage(RENDERING_CONFIG.LOCAL_STORAGE_KEY, _nodes);

    // } else {
    //     let _links = getDataFromLocalStorage("linkLabels", true) || {};
    //     _links[vertexOption.properties.name] = vertexOption.properties;
    //     setDataToLocalStorage('linkLabels', _links);
    //
    //
    // }

}
