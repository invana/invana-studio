import {array} from "prop-types";
import {RENDERING_CONFIG} from "../../settings";
import {GRAPH_CANVAS_SETTINGS} from "../../settings/canvas";
import {STUDIO_CONNECT_CONSTANTS} from "../../settings/constants";
import {removeItemFromLocalStorage} from "../../utils/localStorage";
// import {LightenDarkenColor} from "../../core/utils";
import ColorHash from 'color-hash'


// let colorHash = new ColorHash({hue: [{min: 20, max: 120}, {min: 20, max: 120}, {min: 20, max: 80}]});
// var colorHash = new ColorHash({saturation: 0.6});
var colorHash = new ColorHash({saturation: [0.35, 0.5, 0.65]});

export function getColorForString(label) {
    return colorHash.hex(label); // '#8796c5'
}

export const colorToNumber = (c) => {
    return parseInt(c.slice(1), 16)
}

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

export function renderPropertyData(key, value) {
    // console.log("renderPropertyData", key, typeof value, typeof value === "object", value instanceof Boolean, value,);
    try {
        if (typeof value === "boolean") {
            return value.toString();
        } else if (value === null) {
            return "None";
        } else if (typeof value === array) {
            return JSON.stringify(value);
        } else if (typeof value === "object" && value['@value'] && value['@value'].coordinates) {
            // geo coordinates
            return "(" + value['@value'].coordinates[0] + "," + value['@value'].coordinates[1] + ")";

        } else if (typeof value === "object") {
            return JSON.stringify(value);
        }
        return value;
    } catch (e) {
        return "Failed to render"
    }

}

export function getDefaultNodeOptions(label) {

    return {
        bgColor: getColorForString(label),
        borderColor: GRAPH_CANVAS_SETTINGS.DefaultNodeBorderColor,
        bgImagePropertyKey: null,
        labelPropertyKey: GRAPH_CANVAS_SETTINGS.DefaultNodeLabelPropertyKey,
        // tagHtml: null,
        elementShape: "dot",
        shapeSize: GRAPH_CANVAS_SETTINGS.DEFAULT_NODE_SHAPE_SIZE,
        labelFontSize: GRAPH_CANVAS_SETTINGS.DEFAULT_NODE_LABEL_FONT_SIZE,
        labelColor: GRAPH_CANVAS_SETTINGS.DefaultElementTextColor

    }
}

export function getDefaultEdgeOptions(label) {

    return {
        linkColor: getColorForString(label),
        // linkLength: GRAPH_CANVAS_SETTINGS.DEFAULT_LINK_LENGTH,
        labelPropertyKey: GRAPH_CANVAS_SETTINGS.DefaultLinkLabelPropertyKey,
        labelFontSize: GRAPH_CANVAS_SETTINGS.DEFAULT_LINK_LABEL_FONT_SIZE,
        labelColor: GRAPH_CANVAS_SETTINGS.DefaultLinkLabelColor

    }
}

export function getAllNodeShapes() {
    const inLabelShapes = ["ellipse", "circle", "database", "box", "text"];
    const outLabelShapes = ["image", "circularImage", "diamond", "dot",
        "star", "triangle", "triangleDown", "hexagon", "square", "icon"];
    const bgImageShapes = ["image", "circularImage"]
    return {inLabelShapes, outLabelShapes, bgImageShapes};
}

export function getAllNodeShapesList() {
    const _ = getAllNodeShapes();
    console.log("[..._['inLabelShapes'], ..._['outLabelShapes']]", ..._['inLabelShapes'], ..._['outLabelShapes']);
    return [..._['inLabelShapes'], ..._['outLabelShapes']];
}

export function askToSwitchGremlinServer() {
    let r = window.confirm("You are about to sign out of the workspace. " +
        "Gladly, your query history will be preserved. Do you want to continue?");
    if (r === true) {
        removeItemFromLocalStorage(STUDIO_CONNECT_CONSTANTS.INVANA_ENGINE_URL);
        removeItemFromLocalStorage(STUDIO_CONNECT_CONSTANTS.GRAPH_ENGINE_NAME);
        removeItemFromLocalStorage(STUDIO_CONNECT_CONSTANTS.HTTP_HEADERS);
        removeItemFromLocalStorage(RENDERING_CONFIG.LOCAL_STORAGE_KEY);
        window.location.href = "/";
    }
}

// export function getDefaultLinkOptions(label) {
//     return {
//         bgColor: getColorForString(label),
//         labelPropertyKey: DefaultNodeLabelPropertyKey,
//     }
// }

// export function removeVertexMeta(data) {
//     let newData = [];
//     data.forEach((datum) => {
//         delete datum.meta;
//         delete datum.x;
//         delete datum.y;
//         delete datum.vx;
//         delete datum.vy;
//         delete datum.index;
//         newData.push(datum)
//     });
//     return newData
// }
//
// export function removeEdgeMeta(data) {
//     console.log("removeEdgeMeta")
//     let newData = [];
//     data.forEach((datum) => {
//         // delete datum.meta;
//         // delete datum.x;
//         // delete datum.y;
//         // delete datum.vx;
//         // delete datum.vy;
//         // delete datum.index;
//         if (typeof datum.source === "object") {
//             datum.source = datum.source.id;
//         }
//         if (typeof datum.target === "object") {
//             datum.target = datum.target.id;
//         }
//         newData.push(datum)
//     });
//     return newData
// }
//
// function getLabelOptionsOfElement(element, isNode) {
//     // nodeLabelOptions
//     if (!element.meta.labelOptions) {
//         element.meta.labelOptions = {}
//     }
//     // console.log("===element******",element);
//
//     if (typeof element.meta.labelOptions.showLabel === "undefined") {
//         element.meta.labelOptions.showLabel = GRAPH_CANVAS_SETTINGS.DefaultLabelVisibility
//     }
//     let labelString = null;
//     if (element.meta.shapeOptions && element.meta.shapeOptions.labelPropertyKey) {
//         if (element.meta.shapeOptions.labelPropertyKey === "_id") {
//             labelString = element.id;
//         } else if (element.meta.shapeOptions.labelPropertyKey === "_label") {
//             labelString = element.label;
//         } else {
//             labelString = element.properties[element.meta.shapeOptions.labelPropertyKey];
//         }
//     }
//     if (!labelString && isNode === true) { // fallback to id as default label for nodes
//         labelString = element.id;
//     }
//
//     element.meta.labelOptions.labelText = labelString
//     if (!element.meta.labelOptions.labelColor) {
//         element.meta.labelOptions.labelColor = isNode ? colorToNumber(GRAPH_CANVAS_SETTINGS.DefaultNodeLabelColor) :
//             colorToNumber(GRAPH_CANVAS_SETTINGS.DefaultLinkLabelColor);
//     }
//     return element;
//
// }

// export function prepareLinksDataForCurves(links) {
//     /*
//     This method will set attributes on to the links that will
//     help us controls the curves of the links.
//      */
//
//     // const nodeLabels = Object.assign({}, JSON.parse(localStorage.getItem(RENDERING_CONFIG.LOCAL_STORAGE_KEY)));
//
//     links.forEach(function (link) {
//
//         // find other links with same target+source or source+target
//         let same = links.filter(function (v) {
//             return ((v.source === link.source && v.target === link.target));
//         })
//         let sameAlt = links.filter(function (v) {
//             return ((v.source === link.target && v.target === link.source));
//         })
//
//         let sameAll = same.concat(sameAlt);
//         sameAll.forEach(function (s, i) {
//             s.sameIndex = (i + 1);
//             s.sameTotal = sameAll.length;
//             s.sameTotalHalf = (s.sameTotal / 2);
//             s.sameUneven = ((s.sameTotal % 2) !== 0);
//             s.sameMiddleLink = ((s.sameUneven === true) && (Math.ceil(s.sameTotalHalf) === s.sameIndex));
//             s.sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
//             s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
//             s.sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));
//
//             // if (s.sameIndexCorrected === 2) {
//             //     s.sameArcDirection = 1;
//             // }
//             // if (s.sameIndexCorrected === 1) {
//             //     s.sameArcDirection = 0;
//             // }
//         });
//     });
//
//     links.sort(function (a, b) {
//         if (a.sameTotal < b.sameTotal) return -1;
//         if (a.sameTotal > b.sameTotal) return 1;
//         return 0;
//     });
//
//     if (links.length > 0) {
//         const maxSame = links[links.length - 1].sameTotal;
//
//         links.forEach(function (link, i) {
//             links[i].maxSameHalf = Math.round(maxSame / 3);
//         });
//
//     }
//
//
//     return links.map(link => {
//         let obj = link;
//         obj.source = link.source;
//         obj.target = link.target;
//         return obj;
//     })
// }

// export function prepareLinkDataWithOptions(links, options) {
//
//     if (typeof options === "undefined") {
//         options = {};
//     } else if (typeof options === "string") {
//         options = JSON.parse(options);
//     }
//
//     links.forEach((link) => {
//         const metaFromStorage = getDefaultMeta(link.label, options);
//
//         link.meta = {};
//
//         if (!link.meta.shapeOptions) {
//             link.meta.shapeOptions = {}
//         }
//
//         link = getLabelOptionsOfElement(link, false);
//
//         if (!link.meta.shapeOptions.strokeWidth) {
//             link.meta.shapeOptions.strokeWidth = GRAPH_CANVAS_SETTINGS.DefaultLinkStrokeWidth
//         }
//         if (!link.meta.shapeOptions.strokeColor) {
//             // link.meta.shapeOptions.strokeColor = metaFromStorage.borderColor ?
//             //     metaFromStorage.borderColor : getColorForString(link.label);
//             link.meta.shapeOptions.strokeColor = colorToNumber(getColorForString(link.label));
//         }
//         if (!link.meta.shapeOptions.strokeColorHex) {
//             // link.meta.shapeOptions.strokeColor = metaFromStorage.borderColor ?
//             //     metaFromStorage.borderColor : getColorForString(link.label);
//             link.meta.shapeOptions.strokeColorHex = getColorForString(link.label);
//         }
//         // if (!node.meta.shapeOptions.fillColor) {
//         //     node.meta.shapeOptions.fillColor = metaFromStorage.bgColor || getColorForString(node.label)
//         // }
//         if (!link.meta.shapeOptions.labelColor) {
//             link.meta.shapeOptions.labelColor = GRAPH_CANVAS_SETTINGS.DefaultNodeInShapeTextColor
//         }
//         if (!link.meta.shapeOptions.labelPropertyKey) {
//             link.meta.shapeOptions.labelPropertyKey = metaFromStorage.labelPropertyKey || GRAPH_CANVAS_SETTINGS.DefaultLinkLabelPropertyKey;
//         }
//     });
//
//     return links;
// }
//
//
// function getDefaultMeta(label, options) {
//     let metaFromStorage = {}
//     try {
//         metaFromStorage = options[label];
//     } catch (e) {
//         metaFromStorage = {}
//     }
//     if (!metaFromStorage) {
//         metaFromStorage = {}
//     }
//     return metaFromStorage
// }

// export function prepareNodesDataWithOptions(nodes, options) {
//     /*
//         options = {
//             "Planet": {
//                 "bgImagePropertyKey": "image",
//                 "nodeShape": "circle",
//                 "shapeOptions": {
//                     "radius": "20",
//                     "strokeWidth": "2px",
//                     "strokeColor": "#333333",
//                     "fillColor": "#999999"
//                 }
//             },
//              "Satellite": {
//                 "bgImageUrl": "https://pngimg.com/uploads/moon/moon_PNG19.png",
//                 "nodeShape": "circle",
//                 "shapeOptions": {
//                     "radius": "20",
//                     "strokeWidth": "2px",
//                     "strokeColor": "#333333",
//                     "fillColor": "#999999"
//                 }
//             }
//         }
//
//      */
//     if (typeof options === "undefined") {
//         options = {};
//     } else if (typeof options === "string") {
//         options = JSON.parse(options);
//     }
//
//     let nodesCleaned = [];
//     nodes.forEach(function (nodeData) {
//         // let node = Object.assign({}, nodeData)
//         let node = nodeData;
//         // check if options data has node.label meta data or set defaults.
//
//         const metaFromStorage = getDefaultMeta(node.label, options);
//         node.meta = {"bgImageUrl": null, "nodeShape": "circle"};
//         node.meta.bgImagePropertyKey = metaFromStorage.bgImagePropertyKey;
//         if (!node.meta.shapeOptions) {
//             node.meta.shapeOptions = {}
//         }
//         // shapeOptions
//         if (!node.meta.shapeOptions.radius) {
//             node.meta.shapeOptions.radius = GRAPH_CANVAS_SETTINGS.DefaultNodeRadius;
//         }
//         if (!node.meta.shapeOptions.radiusBuffered) {
//             node.meta.shapeOptions.radiusBuffered = GRAPH_CANVAS_SETTINGS.DefaultNodeRadius + 5;
//         }
//         if (!node.meta.shapeOptions.strokeWidth) {
//             node.meta.shapeOptions.strokeWidth = GRAPH_CANVAS_SETTINGS.DefaultNodeStrokeWidth;
//         }
//         if (!node.meta.shapeOptions.strokeColor) {
//             node.meta.shapeOptions.strokeColor = metaFromStorage.borderColor
//                 ? colorToNumber(metaFromStorage.borderColor)
//                 : colorToNumber(LightenDarkenColor(getColorForString(node.label), -40))
//         }
//         if (!node.meta.shapeOptions.fillColor) {
//             node.meta.shapeOptions.fillColor = metaFromStorage.bgColor
//                 ? colorToNumber(metaFromStorage.bgColor)
//                 : colorToNumber(getColorForString(node.label))
//         }
//         if (!node.meta.shapeOptions.fillColorHex) {
//             node.meta.shapeOptions.fillColorHex = metaFromStorage.bgColor
//                 ? metaFromStorage.bgColor
//                 : getColorForString(node.label)
//         }
//         if (!node.meta.shapeOptions.labelColor) {
//             node.meta.shapeOptions.labelColor = GRAPH_CANVAS_SETTINGS.DefaultNodeInShapeTextColor
//         }
//         if (!node.meta.shapeOptions.labelPropertyKey) {
//             node.meta.shapeOptions.labelPropertyKey = metaFromStorage.labelPropertyKey || GRAPH_CANVAS_SETTINGS.DefaultNodeLabelPropertyKey;
//         }
//         // if (node.meta.shapeOptions.inShapeHTMLFn) {
//         //     node.meta.shapeOptions.textPropertyKey = node.meta.shapeOptions.inShapeHTMLFn(node)
//         // } else {
//         //     node.meta.shapeOptions.inShapeHTML = DefaultInShapeHTMLFn(node);
//         // }
//
//
//         node = getLabelOptionsOfElement(node, true);
//
//         // tagOptions
//         if (!node.meta.tagOptions) {
//             node.meta.tagOptions = {}
//         }
//         if (metaFromStorage.tagHtml) {
//             node.meta.tagOptions.tagHtml = metaFromStorage.tagHtml
//         }
//         // nodeImageOptions
//         if (node.meta.bgImagePropertyKey) {
//             node.meta.bgImageUrl = node.properties[node.meta.bgImagePropertyKey];
//         }
//         if (!node.meta.bgImageUrl) {
//             node.meta.bgImageUrl = metaFromStorage.bgImageUrl;
//         }
//         // nodesCleaned.push(JSON.parse(JSON.stringify(node)))
//         if (node.target) {
//             delete node.target
//         }
//         if (node.source) {
//             delete node.source
//         }
//         nodesCleaned.push(node)
//     });
//
//     return nodesCleaned;
// }
//
