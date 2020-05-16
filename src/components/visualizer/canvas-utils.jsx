// generic
const showLabelDefaultChoice = true;
const DefaultCanvasBackgroundColor = "#333333";

// node specific
const nodeRadius = 24;
const nodeFillColor = "#333333";
const nodeTxtColor = "#efefef";
const nodeStrokeColor = "#4385b8";
const nodeStrokeWidth = 5;
const nodeLabelColor = "#ffffff"
const nodeLabelBgColor = "#333333";


export function prepareLinksDataForCurves(links) {
    /*
    This method will set attributes on to the links that will
    help us controls the curves of the links.
     */
    links.forEach(function (link) {

        // find other links with same target+source or source+target
        let same = links.filter(function (v, i) {
            return ((v.source === link.source && v.target === link.target));
        })
        let sameAlt = links.filter(function (v, i) {
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
    }

    let nodesCleaned = [];
    nodes.forEach(function (nodeData, index) {

        let node = Object.assign({}, nodeData)
        // check if options data has node.label meta data or set defaults.
        if (node.label in options) {
            node.meta = Object.assign({}, options[node.label]);
        }
        if (!node.meta) {
            node.meta = {"bgImageUrl": null, "nodeShape": "circle"};
        }
        if (!node.meta.shapeOptions) {
            node.meta.shapeOptions = {}
        }


        // shapeOptions
        if (!node.meta.shapeOptions.radius) {
            node.meta.shapeOptions.radius = nodeRadius
        }
        if (!node.meta.shapeOptions.strokeWidth) {
            node.meta.shapeOptions.strokeWidth = nodeStrokeWidth
        }
        if (!node.meta.shapeOptions.strokeColor) {
            node.meta.shapeOptions.strokeColor = nodeStrokeColor
        }
        if (!node.meta.shapeOptions.fillColor) {
            node.meta.shapeOptions.fillColor = nodeFillColor
        }
        if (!node.meta.shapeOptions.textColor) {
            node.meta.shapeOptions.textColor = nodeTxtColor
        }

        if (!node.meta.shapeOptions.labelBgColor) {
            node.meta.shapeOptions.labelBgColor = nodeLabelBgColor
        }
        if (node.meta.shapeOptions.inShapeHTMLFn) {
            node.meta.shapeOptions.inShapeHTML = node.meta.shapeOptions.inShapeHTMLFn(node);
        }

        // nodeLabelOptions
        if (!node.meta.labelOptions) {
            node.meta.labelOptions = {}
        }
        if (typeof node.meta.labelOptions.showLabel === "undefined") {
            node.meta.labelOptions.showLabel = showLabelDefaultChoice
        }
        if (node.meta.labelOptions.labelTextFn) {
            node.meta.labelOptions.labelText = node.meta.labelOptions.labelTextFn(node);
        } else {
            node.meta.labelOptions.labelText = node.properties.name || node.id;
        }
        if (!node.meta.labelOptions.labelColor) {
            node.meta.labelOptions.labelColor = nodeLabelColor;
        }

        // nodeImageOptions
        if (node.meta.bgImagePropertyKey) {
            node.meta.bgImageUrl = node.properties[node.meta.bgImagePropertyKey];
        }
        // nodesCleaned.push(JSON.parse(JSON.stringify(node)))
        nodesCleaned.push(node)
    });

    return nodesCleaned;
}
