import {CONNECT_URL, AUTH_CONSTANTS} from "../config";
import GraphSONDeSerializer from "../serializers/graphson-v3";

const gremlinDeSerializer = new GraphSONDeSerializer();

function padZero(str, len) {
    len = len || 2;
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

export function invertColor(hex, bw) {
    /*
    https://stackoverflow.com/a/35970186/3448851
     */
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

export function LightenDarkenColor(col, amt) {

    let usePound = false;

    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }

    let num = parseInt(col, 16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;


    let g = ((num >> 8) & 0xff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;


    let b = (num & 0xff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    return (usePound ? "#" : "") + ((r << 16) | (g << 8) | b).toString(16);

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

export function getProtocol(gremlinUrl) {
    const _ = new URL(gremlinUrl).protocol;
    return _.includes("ws") ? "ws" : "http";
}

export async function postData(url = '', extraHeaders = {}, data = {}) {
    // Default options are marked with *
    const url_analysed = new URL(url);
    extraHeaders["Content-Type"] = "application/json";
    extraHeaders["Accept"] = "application/json";
    extraHeaders['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
    if (url_analysed.username && url_analysed.password) {
        extraHeaders['Authorization'] = 'Basic ' + btoa(url_analysed.username + ':' + url_analysed.password);
    } else if (url_analysed.username && url_analysed.password !== "") {
        extraHeaders['Authorization'] = 'Token ' + url_analysed.username;
    }

    const gremlinUrl = url_analysed.origin + url_analysed.pathname;
    const response = await fetch(gremlinUrl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'include', // include, *same-origin, omit
        headers: extraHeaders,
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log(response);
    let responseJson = null;
    // let statusCode = response.status; // response from the server.
    try {
        responseJson = await response.json();
    } catch (e) {
        console.log("failed to get the json data");
    }
    return {"response":responseJson, transporterStatusCode: response.status}
}

export function redirectToConnectIfNeeded(gremlinUrl) {
    console.log("redirectToConnectIfNeeded");
    const u = new URL(window.location.href)
    if ((gremlinUrl === null || gremlinUrl === "") && u.pathname !== "/connect") {
        window.location.href = "/connect";
    } else {
        return true;
    }
}


export function setElementColorOptionsToStorageUsingResponse(response) {
    /*
    If sent response from gremlin, it will automatically update those new
    vertex/edge key data only.
     */
    console.log("setElementColorOptionsToStorageUsingResponse", response)
    let result = gremlinDeSerializer.process(response);
    let nodesAndLinks = gremlinDeSerializer.separateVerticesAndEdges(result, false);
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
        removeItemFromLocalStorage(AUTH_CONSTANTS.gremlinServerUrlKey);
        window.location.href = CONNECT_URL;
    }
}


export function convertResponses2JSONs(responses) {

    let jsonResponses = [];
    responses.forEach(function (response) {
        const _ = gremlinDeSerializer.process(response)
        jsonResponses.push(_)
    })
    return jsonResponses;
}
