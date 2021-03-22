import {
    getAllNodeShapes,
    getColorForString,
    getDefaultEdgeOptions,
    getDefaultNodeOptions,
    invertColor
} from "../../interface/utils";
import {LightenDarkenColor} from "../../../core/utils";
import {GRAPH_CANVAS_SETTINGS, RENDERING_CONFIG} from "../../../settings";

export default class VisJsGraphCanvasUtils {
    nodeGroups = {};
    edgeGroups = {};

    // getColorBasedOnText(groupName) {
    //     return;
    // }


    getEdgeColorObject(groupName) {
        const edgeColor = this.getElementColor(groupName);
        return {
            color: edgeColor,
            highlight: LightenDarkenColor(edgeColor, 10),
            hover: LightenDarkenColor(edgeColor, 20),
            inherit: false,
            opacity: 1
        }
    }

    getEdgeColorUnHighlightObject(groupName) {
        console.log("===groupName", groupName)
        /// when hovered - make the colors light
        const edgeColor = this.getElementColor(groupName);

        return {
            color: edgeColor,
            highlight: LightenDarkenColor(edgeColor, 10),
            hover: LightenDarkenColor(edgeColor, 20),
            inherit: false,
            opacity: .2
        }
        // return {
        //     color: LightenDarkenColor(originalEdgeColor, 90),
        //     highlight: LightenDarkenColor(originalEdgeColor, 20),
        //     hover: LightenDarkenColor(originalEdgeColor, 20),
        //     inherit: false
        //     // opacity: .4
        // }
    }

    // getNodeLabelColor(groupName) {
    //     const defaultNodeConfig = getDefaultNodeOptions(groupName);
    //     const renderingConfig = this.getRenderingConfigFromStorage(groupName);
    //
    //
    //
    // }


    getNodeColorObject(groupName) {

        const nodeColor = this.getElementColor(groupName);


        return {
            border: LightenDarkenColor(nodeColor, -20),
            background: nodeColor,
            highlight: {
                border: LightenDarkenColor(nodeColor, -30),
                background: nodeColor
            },
            hover: {
                border: LightenDarkenColor(nodeColor, -40),
                background: nodeColor
            }
        }
    }


    getNodeColorUnHighlightObject(groupName) {
        /// when hovered - make the colors light
        // return this.getNodeColorObject(groupName);
        const nodeColor = this.getElementColor(groupName);

        return {
            border: LightenDarkenColor(nodeColor, 50),
            background: LightenDarkenColor(nodeColor, 70),
            highlight: {
                border: LightenDarkenColor(nodeColor, 40),
                background: LightenDarkenColor(nodeColor, 70)
            },
            hover: {
                border: LightenDarkenColor(nodeColor, 40),
                background: LightenDarkenColor(nodeColor, 70)
            }
        }
    }

    unHighlightElementColor(groupName) {
        const nodeColor = this.getElementColor(groupName);
        return LightenDarkenColor(nodeColor, -10);
    }

    generateNodeConfig(groupName) {
        let config = {};
        const defaultNodeConfig = getDefaultNodeOptions(groupName);
        // if (nodeShape === undefined) {
        //     nodeShape = "dot"; // dot
        // }
        config.borderWidth = 2;
        config.borderWidthSelected = 3;
        config.shape = defaultNodeConfig.elementShape;
        config.chosen = false;
        config.color = this.getNodeColorObject(groupName);
        // config.physics = false;
        config.size = defaultNodeConfig.shapeSize;

        config.font = {
            size: defaultNodeConfig.labelFontSize,
            color: defaultNodeConfig.labelColor
            // bold: true
        };
        return config;
    }

    stringify(value) {
        return value.toString();
    }

    // generateNodeGroups(groupName) {
    //     if (groupName in this.nodeGroups) {
    //     } else {
    //         this.nodeGroups[groupName] = this.generateNodeConfig(groupName);
    //     }
    // }

    generateEdgeConfig(groupName, arrowShape) {
        let config = {};

        const defaultLinkOptions = getDefaultEdgeOptions();

        // config.length = defaultLinkOptions.linkLength;

        if (arrowShape === undefined) {
            /*
            var arrow_types = [
        "arrow",
        "bar",
        "circle",
        "box",
        "crow",
        "curve",
        "inv_curve",
        "diamond",
        "triangle",
        "inv_triangle",
        "vee",
      ];

             */
            arrowShape = "arrow"; // dot
        }
        config.arrows = {
            to: {
                enabled: true,
                type: arrowShape,
                scaleFactor: 0.4
            },
            // color: this.getEdgeColorObject(groupName)
        };
        // config.chosen = false;
        config.arrowStrikethrough = false;
        // config.label = true;
        config.group = undefined;
        // config.arrows: "to, from";
        config.color = this.getEdgeColorObject(groupName)

        config.font = {
            size: defaultLinkOptions.labelFontSize,
            color: defaultLinkOptions.labelColor
            // bold: true
        };
        return config;
    }

    _prepareNode(vertexData, labelPropertyKey) {
        if (!vertexData._label) {
            vertexData._label = vertexData.label;
        }
        const groupName = vertexData._label;
        let vertexDataaUpdated = Object.assign({}, vertexData, this.generateNodeConfig(groupName))
        const renderingConfigFromStorage = this.getRenderingConfigFromStorage(groupName);
        // const defaultNodeRenderingConfig = this.getEdgeColorObject()
        let label = vertexDataaUpdated.id;
        if (!labelPropertyKey && renderingConfigFromStorage) {
            labelPropertyKey = renderingConfigFromStorage.labelPropertyKey

            if (labelPropertyKey === "_id") {
                label = vertexDataaUpdated.id;
            } else if (labelPropertyKey === "_label") {
                label = vertexDataaUpdated._label;
            } else if (vertexDataaUpdated.properties[labelPropertyKey]) {
                label = vertexDataaUpdated.properties[labelPropertyKey];
            }
        }
        const allNodeShapes = getAllNodeShapes();
        if (renderingConfigFromStorage && renderingConfigFromStorage.elementShape) {
            vertexDataaUpdated.shape = renderingConfigFromStorage.elementShape;
        }
        console.log("shape is ", vertexDataaUpdated.id, vertexDataaUpdated.shape)
        if (allNodeShapes['inLabelShapes'].includes(vertexDataaUpdated.shape)) {
            delete vertexDataaUpdated.size; // = renderingConfigFromStorage.shapeSize/2;

        }
        if (allNodeShapes['outLabelShapes'].includes(vertexDataaUpdated.shape) && renderingConfigFromStorage && renderingConfigFromStorage.shapeSize) {
            vertexDataaUpdated.size = renderingConfigFromStorage.shapeSize;
        }
        vertexDataaUpdated.label = this.stringify(label).substring(0, GRAPH_CANVAS_SETTINGS.MAX_LABEL_LENGTH);
        vertexDataaUpdated.group = undefined;// groupName

        // delete vertexData.shape;
        delete vertexDataaUpdated.image;

        console.log("=====renderingConfigFromStorage", vertexDataaUpdated._label, renderingConfigFromStorage)
        if (allNodeShapes['bgImageShapes'].includes(vertexDataaUpdated.shape) &&
            renderingConfigFromStorage && renderingConfigFromStorage.bgImagePropertyKey) {
            const image = vertexDataaUpdated.properties[renderingConfigFromStorage.bgImagePropertyKey];
            vertexDataaUpdated.image = image || GRAPH_CANVAS_SETTINGS.DEFAULT_NODE_IMAGE;
        }
        // if the shape is text, make it to some other
        // if shape with in text
        if (
            allNodeShapes['inLabelShapes'].includes(vertexDataaUpdated.shape)
            // && vertexDataaUpdated.shape !== "circle"
        ) {
            vertexDataaUpdated.widthConstraint = {
                minimum: vertexDataaUpdated.size * 3,
                maximum: vertexDataaUpdated.size * 6
            }
            if (vertexDataaUpdated.color) {
                vertexDataaUpdated.font.color = invertColor(vertexDataaUpdated.color.background, true);
            }

        }
        if (renderingConfigFromStorage && renderingConfigFromStorage.labelFontSize) {
            vertexDataaUpdated.font.size = renderingConfigFromStorage.labelFontSize;
        }
        console.log("=====renderingConfigFromStorage", vertexDataaUpdated)

        return vertexDataaUpdated;
    }

    _prepareEdge(edgeData, labelPropertyKey) {
        if (!edgeData._label) {
            edgeData._label = edgeData.label;
        }
        const groupName = edgeData._label;
        const defaultLinkOptions = getDefaultEdgeOptions();

        // this.generateEdgeGroups(groupName);
        const edgeDefaultConfig = this.generateEdgeConfig(groupName);
        let edgeDataUpdated = {...edgeData, ...edgeDefaultConfig};
        const renderingConfigFromStorage = this.getRenderingConfigFromStorage(groupName);


        let label = edgeDataUpdated.id;

        labelPropertyKey = renderingConfigFromStorage && renderingConfigFromStorage.labelPropertyKey
            ? renderingConfigFromStorage.labelPropertyKey : defaultLinkOptions.labelPropertyKey;
        if (labelPropertyKey === "_id") {
            label = edgeDataUpdated.id;
        } else if (labelPropertyKey === "_label") {
            label = edgeDataUpdated._label;
        } else if (edgeDataUpdated.properties[labelPropertyKey]) {
            label = edgeDataUpdated.properties[labelPropertyKey];
        }

        edgeDataUpdated.label = this.stringify(label).substring(0, GRAPH_CANVAS_SETTINGS.MAX_LABEL_LENGTH);
        edgeDataUpdated.group = undefined; // groupName

        edgeDataUpdated.from = edgeDataUpdated.outV;
        edgeDataUpdated.to = edgeDataUpdated.inV;

        if (renderingConfigFromStorage && renderingConfigFromStorage.linkLength) {
            edgeDataUpdated.length = renderingConfigFromStorage.linkLength;
        }
        if (renderingConfigFromStorage && renderingConfigFromStorage.linkColor) {
            edgeDataUpdated.color = renderingConfigFromStorage.linkColor;
        }
        if (renderingConfigFromStorage && renderingConfigFromStorage.labelFontSize) {
            edgeDataUpdated.font.size = renderingConfigFromStorage.labelFontSize;
        }


        return edgeDataUpdated;

    }

    prepareNodes(verticesData) {
        let nodesPrepared = [];
        verticesData.forEach((node) => {
            nodesPrepared.push(this._prepareNode(node));
        });
        return nodesPrepared;
    }

    prepareEdges(edgesData) {
        let edgesPrepared = [];
        edgesData.forEach((edge) => {
            edgesPrepared.push(this._prepareEdge(edge));
        });
        return edgesPrepared;
    }


    getRenderingConfigFromStorage(nodeLabel) {
        const renderingOptions = Object.assign({}, JSON.parse(localStorage.getItem(RENDERING_CONFIG.LOCAL_STORAGE_KEY)));
        return renderingOptions[nodeLabel];
    }

    getElementColor(label) {
        const nodeRenderingOption = this.getRenderingConfigFromStorage(label);
        if (nodeRenderingOption && nodeRenderingOption.bgColor) {
            return nodeRenderingOption.bgColor;
        } else {
            return getColorForString(label);
        }
    }

    // getTextColor() {}
    // getBgColor() {}
    // constructor(labelName, nodeShape) {}
}
