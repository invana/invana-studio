import {CONNECT_URL, GREMLIN_SERVER_URL, gremlinServerUrlKey} from "../config";
import GremlinResponseSerializers from "./gremlin-serializer";

const gremlinSerializer = new GremlinResponseSerializers();

export function LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }

    let num = parseInt(col, 16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}


export function getDataFromLocalStorage(itemKey, isJson) {

    if (isJson) {
        return JSON.parse(localStorage.getItem(itemKey));
    } else {
        return localStorage.getItem(itemKey)
    }

}

export function setDataToLocalStorage(itemKey, itemData) {
    console.log("settings data", itemKey, itemData)
    if (typeof itemData === 'object') {
        itemData = JSON.stringify(itemData);
    }
    localStorage.setItem(itemKey, itemData);
}

export function removeItemFromLocalStorage(itemKey) {
    localStorage.removeItem(itemKey);
}

export function removeEverythingFromLocalStorage() {
    localStorage.clear();
}


export function redirectToConnectIfNeeded() {
    console.log("redirectToConnectIfNeeded");
    const u = new URL(window.location.href)
    if ((GREMLIN_SERVER_URL === null || GREMLIN_SERVER_URL === "") && u.pathname !== "/connect") {
        window.location.href = "/connect";
    }else{
        // alert("GREMLIN_SERVER_URL" + GREMLIN_SERVER_URL)
        return true
    }
}


export function setElementColorOptionsToStorageUsingResponse(response) {
    /*
    If sent response from gremlin, it will automatically update those new
    vertex/edge key data only.
     */
    console.log("setElementColorOptionsToStorageUsingResponse", response)
    let result = gremlinSerializer.process(response);
    let nodesAndLinks = gremlinSerializer.separateVerticesAndEdges(result, false);
    let _nodes = getDataFromLocalStorage("nodeLabels", true) || {};
    nodesAndLinks.nodes.forEach(function (node) {
        _nodes[node.properties.name] = node.properties;
    })
    let _links = getDataFromLocalStorage("linkLabels", true) || {};
    nodesAndLinks.links.forEach(function (link) {
        _links[link.label] = link.properties;
    })
    // convert this list into dictionary.
    console.log("=======((", _nodes, _links)
    setDataToLocalStorage('nodeLabels', _nodes);
    setDataToLocalStorage('linkLabels', _links);
}


export function askToSwitchGremlinServer() {
    var r = window.confirm("You are about to sign out of the workspace. " +
        "Your query history will be preserved. Do you want to continue?");
    if (r === true) {
        removeItemFromLocalStorage(gremlinServerUrlKey);
        window.location.href = CONNECT_URL;
    }
}


export function convertResponses2JSONs(responses) {

    let jsonResponses = [];
    responses.forEach(function (response) {
        const _ = gremlinSerializer.process(response)
        jsonResponses.push(_)
    })
    return jsonResponses;
}
