import {
    DefaultNodeRadius,
    DefaultNodeBorderColor,
    DefaultNodeStrokeWidth,
    DefaultNodeInShapeTextColor,
    DefaultLabelVisibility,
    DefaultNodeLabelColor,
    DefaultNodeLabelPropertyKey,
    DefaultLinkStrokeWidth,
    DefaultLinkLabelPropertyKey,
    DefaultLinkLabelColor
} from "../config";

const ColorHash = require('color-hash');

let colorHash = new ColorHash({hue: [{min: 120, max: 190}, {min: 120, max: 190}, {min: 120, max: 190}]});

export function getColorForString(label) {
    return colorHash.hex(label); // '#8796c5'
}

export const colorToNumber = (c) => {
    return parseInt(c.slice(1), 16)
}

export function getDefaultNodeOptions(label) {

    return {
        bgColor: getColorForString(label),
        borderColor: DefaultNodeBorderColor,
        bgImageUrl: null,
        bgImagePropertyKey: null,
        labelPropertyKey: DefaultNodeLabelPropertyKey,
        tagHtml: null
    }
}

// export function getDefaultLinkOptions(label) {
//     return {
//         bgColor: getColorForString(label),
//         labelPropertyKey: DefaultNodeLabelPropertyKey,
//     }
// }

export function removeVertexMeta(data) {
    let newData = [];
    data.forEach((datum) => {
        delete datum.meta;
        delete datum.x;
        delete datum.y;
        delete datum.vx;
        delete datum.vy;
        delete datum.index;
        newData.push(datum)
    });
    return newData
}

export function removeEdgeMeta(data) {
    console.log("removeEdgeMeta")
    let newData = [];
    data.forEach((datum) => {
        // delete datum.meta;
        // delete datum.x;
        // delete datum.y;
        // delete datum.vx;
        // delete datum.vy;
        // delete datum.index;
        if (typeof datum.source === "object") {
            datum.source = datum.source.id;
        }
        if (typeof datum.target === "object") {
            datum.target = datum.target.id;
        }
        newData.push(datum)
    });
    return newData
}

function getLabelOptionsOfElement(element, isNode) {
    // nodeLabelOptions
    if (!element.meta.labelOptions) {
        element.meta.labelOptions = {}
    }
    if (typeof element.meta.labelOptions.showLabel === "undefined") {
        element.meta.labelOptions.showLabel = DefaultLabelVisibility
    }
    // if (node.meta.labelOptions.labelTextFn) {
    //     node.meta.labelOptions.labelText = node.meta.labelOptions.labelTextFn(node);
    // } else {
    //     node.meta.labelOptions.labelText = node.properties.name || node.id;
    // }
    //

    let labelString = null;
    if (element.meta.shapeOptions && element.meta.shapeOptions.labelPropertyKey === "id") {
        labelString = element.id;
    } else {
        labelString = element.properties[element.meta.shapeOptions.labelPropertyKey];
    }
    if (!labelString) {
        labelString = element.id;
    }
    element.meta.labelOptions.labelText = labelString

    if (!element.meta.labelOptions.labelColor) {
        element.meta.labelOptions.labelColor = isNode ? colorToNumber(DefaultNodeLabelColor) :
            colorToNumber(DefaultLinkLabelColor);
    }

    return element;

}

export function prepareLinksDataForCurves(links) {
    /*
    This method will set attributes on to the links that will
    help us controls the curves of the links.
     */

    // const nodeLabels = Object.assign({}, JSON.parse(localStorage.getItem('nodeLabels')));

    links.forEach(function (link) {
        //
        // let labelOption = nodeLabels[link.label];
        //
        // if (labelOption){
        //
        // }


        // link.meta = {
        //     color: getColorForString(link.label),
        //     text: link.id,
        //     labelPropertyKey: "id"
        // };


        // find other links with same target+source or source+target
        let same = links.filter(function (v) {
            return ((v.source === link.source && v.target === link.target));
        })
        let sameAlt = links.filter(function (v) {
            return ((v.source === link.target && v.target === link.source));
        })

        let sameAll = same.concat(sameAlt);
        sameAll.forEach(function (s, i) {
            s.sameIndex = (i + 1);
            s.sameTotal = sameAll.length;
            s.sameTotalHalf = (s.sameTotal / 2);
            s.sameUneven = ((s.sameTotal % 2) !== 0);
            s.sameMiddleLink = ((s.sameUneven === true) && (Math.ceil(s.sameTotalHalf) === s.sameIndex));
            s.sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
            s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
            s.sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));

            // if (s.sameIndexCorrected === 2) {
            //     s.sameArcDirection = 1;
            // }
            // if (s.sameIndexCorrected === 1) {
            //     s.sameArcDirection = 0;
            // }
        });
    });

    links.sort(function (a, b) {
        if (a.sameTotal < b.sameTotal) return -1;
        if (a.sameTotal > b.sameTotal) return 1;
        return 0;
    });

    if (links.length > 0) {
        const maxSame = links[links.length - 1].sameTotal;

        links.forEach(function (link, i) {
            links[i].maxSameHalf = Math.round(maxSame / 3);
        });

    }


    return links.map(link => {
        let obj = link;
        obj.source = link.source;
        obj.target = link.target;
        return obj;
    })
}

export function prepareLinkDataWithOptions(links, options) {

    if (typeof options === "undefined") {
        options = {};
    } else if (typeof options === "string") {
        options = JSON.parse(options);
    }

    links.forEach((link) => {
        const metaFromStorage = getDefaultMeta(link.label, options);

        link.meta = {};

        if (!link.meta.shapeOptions) {
            link.meta.shapeOptions = {}
        }

        link = getLabelOptionsOfElement(link, false);

        if (!link.meta.shapeOptions.strokeWidth) {
            link.meta.shapeOptions.strokeWidth = DefaultLinkStrokeWidth
        }
        if (!link.meta.shapeOptions.strokeColor) {
            // link.meta.shapeOptions.strokeColor = metaFromStorage.borderColor ?
            //     metaFromStorage.borderColor : getColorForString(link.label);
            link.meta.shapeOptions.strokeColor = colorToNumber(getColorForString(link.label));
        }
        if (!link.meta.shapeOptions.strokeColorHex) {
            // link.meta.shapeOptions.strokeColor = metaFromStorage.borderColor ?
            //     metaFromStorage.borderColor : getColorForString(link.label);
            link.meta.shapeOptions.strokeColorHex = getColorForString(link.label);
        }
        // if (!node.meta.shapeOptions.fillColor) {
        //     node.meta.shapeOptions.fillColor = metaFromStorage.bgColor || getColorForString(node.label)
        // }
        if (!link.meta.shapeOptions.labelColor) {
            link.meta.shapeOptions.labelColor = DefaultNodeInShapeTextColor
        }
        if (!link.meta.shapeOptions.labelPropertyKey) {
            link.meta.shapeOptions.labelPropertyKey = metaFromStorage.labelPropertyKey || DefaultLinkLabelPropertyKey;
        }
    });

    return links;
}


function getDefaultMeta(label, options) {
    let metaFromStorage = {}
    try {
        metaFromStorage = options[label];
    } catch (e) {
        metaFromStorage = {}
    }
    if (!metaFromStorage) {
        metaFromStorage = {}
    }
    return metaFromStorage
}

export function prepareNodesDataWithOptions(nodes, options) {
    /*
        options = {
            "Planet": {
                "bgImagePropertyKey": "image",
                "nodeShape": "circle",
                "shapeOptions": {
                    "radius": "20",
                    "strokeWidth": "2px",
                    "strokeColor": "#333333",
                    "fillColor": "#999999"
                }
            },
             "Satellite": {
                "bgImageUrl": "https://pngimg.com/uploads/moon/moon_PNG19.png",
                "nodeShape": "circle",
                "shapeOptions": {
                    "radius": "20",
                    "strokeWidth": "2px",
                    "strokeColor": "#333333",
                    "fillColor": "#999999"
                }
            }
        }

     */
    if (typeof options === "undefined") {
        options = {};
    } else if (typeof options === "string") {
        options = JSON.parse(options);
    }

    let nodesCleaned = [];
    nodes.forEach(function (nodeData) {
        // let node = Object.assign({}, nodeData)
        let node = nodeData;
        // check if options data has node.label meta data or set defaults.

        const metaFromStorage = getDefaultMeta(node.label, options);
        node.meta = {"bgImageUrl": null, "nodeShape": "circle"};
        node.meta.bgImagePropertyKey = metaFromStorage.bgImagePropertyKey;
        if (!node.meta.shapeOptions) {
            node.meta.shapeOptions = {}
        }
        // shapeOptions
        if (!node.meta.shapeOptions.radius) {
            node.meta.shapeOptions.radius = DefaultNodeRadius
        }
        if (!node.meta.shapeOptions.strokeWidth) {
            node.meta.shapeOptions.strokeWidth = DefaultNodeStrokeWidth
        }
        if (!node.meta.shapeOptions.strokeColor) {
            node.meta.shapeOptions.strokeColor = metaFromStorage.borderColor
                ? colorToNumber(metaFromStorage.borderColor)
                : colorToNumber(DefaultNodeBorderColor)
        }
        if (!node.meta.shapeOptions.fillColor) {
            node.meta.shapeOptions.fillColor = metaFromStorage.bgColor
                ? colorToNumber(metaFromStorage.bgColor)
                : colorToNumber(getColorForString(node.label))
        }
        if (!node.meta.shapeOptions.fillColorHex) {
            node.meta.shapeOptions.fillColorHex = metaFromStorage.bgColor
                ? metaFromStorage.bgColor
                : getColorForString(node.label)
        }
        if (!node.meta.shapeOptions.labelColor) {
            node.meta.shapeOptions.labelColor = DefaultNodeInShapeTextColor
        }
        if (!node.meta.shapeOptions.labelPropertyKey) {
            node.meta.shapeOptions.labelPropertyKey = metaFromStorage.labelPropertyKey || DefaultNodeLabelPropertyKey;
        }
        // if (node.meta.shapeOptions.inShapeHTMLFn) {
        //     node.meta.shapeOptions.textPropertyKey = node.meta.shapeOptions.inShapeHTMLFn(node)
        // } else {
        //     node.meta.shapeOptions.inShapeHTML = DefaultInShapeHTMLFn(node);
        // }


        node = getLabelOptionsOfElement(node, true);

        // tagOptions
        if (!node.meta.tagOptions) {
            node.meta.tagOptions = {}
        }
        if (metaFromStorage.tagHtml) {
            node.meta.tagOptions.tagHtml = metaFromStorage.tagHtml
        }
        // nodeImageOptions
        if (node.meta.bgImagePropertyKey) {
            node.meta.bgImageUrl = node.properties[node.meta.bgImagePropertyKey];
        }
        if (!node.meta.bgImageUrl) {
            node.meta.bgImageUrl = metaFromStorage.bgImageUrl;
        }
        // nodesCleaned.push(JSON.parse(JSON.stringify(node)))
        if (node.target) {
            delete node.target
        }
        if (node.source) {
            delete node.source
        }
        nodesCleaned.push(node)
    });

    return nodesCleaned;
}
