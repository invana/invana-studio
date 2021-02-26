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

    getColorBasedOnText(groupName) {
        return;
    }


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
        config.size = defaultNodeConfig.size;
        // config.widthConstraint = {
        //     minimum: defaultNodeConfig.size,
        //     maximum: defaultNodeConfig.size + 20
        // }
        config.font = {
            size: 16,
            color: "#333333"
            // bold: true
        };
        return config;
    }

    stringify(value) {
        return value.toString();
    }

    generateNodeGroups(groupName) {
        if (groupName in this.nodeGroups) {
        } else {
            this.nodeGroups[groupName] = this.generateNodeConfig(groupName);
        }
    }

    generateEdgeConfig(groupName, arrowShape) {
        let config = {};

        const defaultLinkOptions = getDefaultEdgeOptions();

        config.length = defaultLinkOptions.linkLength;

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
            color: defaultLinkOptions.linkColor
            // bold: true
        };
        return config;
    }

    generateEdgeGroups(groupName) {
        if (groupName in this.edgeGroups) {
        } else {
            this.edgeGroups[groupName] = this.generateEdgeConfig(groupName);
        }
    }

    _prepareNode(vertexData, labelPropertyKey) {

        if (!vertexData._label) {
            vertexData._label = vertexData.label;
        }
        const groupName = vertexData._label;
        const renderingConfigFromStorage = this.getRenderingConfigFromStorage(groupName);
        // const defaultNodeRenderingConfig = this.getEdgeColorObject()


        let label = vertexData.id;
        if (!labelPropertyKey && renderingConfigFromStorage) {
            labelPropertyKey = renderingConfigFromStorage.labelPropertyKey

            if (labelPropertyKey === "_id") {
                label = vertexData.id;
            } else if (labelPropertyKey === "_label") {
                label = vertexData._label;
            } else if (vertexData.properties[labelPropertyKey]) {
                label = vertexData.properties[labelPropertyKey];
            }
        }
        if (renderingConfigFromStorage && renderingConfigFromStorage.size) {
            vertexData.size = renderingConfigFromStorage.size;
        }

        vertexData.label = this.stringify(label).substring(0, GRAPH_CANVAS_SETTINGS.MAX_LABEL_LENGTH);
        vertexData.group = undefined;// groupName


        delete vertexData.shape;
        delete vertexData.image;


        // else if (renderingConfigFromStorage && renderingConfigFromStorage.bgImagePropertyKey) {
        //
        // } else if (renderingConfigFromStorage.elementShape) {
        //     vertexData.shape = renderingConfigFromStorage.elementShape;
        // }


        this.generateNodeGroups(groupName);


        // vertexData = Object.assign({}, vertexData, this.nodeGroups[groupName])


        console.log("=====renderingConfigFromStorage", vertexData._label, renderingConfigFromStorage)
        if (renderingConfigFromStorage && renderingConfigFromStorage.elementShape) {
            vertexData.shape = renderingConfigFromStorage.elementShape;
        }
        const allNodeShapes = getAllNodeShapes();

        // override the options with image

        if (allNodeShapes['bgImageShapes'].includes(vertexData.shape) &&
            renderingConfigFromStorage && renderingConfigFromStorage.bgImagePropertyKey) {
            const image = vertexData.properties[renderingConfigFromStorage.bgImagePropertyKey];
            vertexData.image = image || GRAPH_CANVAS_SETTINGS.DEFAULT_NODE_IMAGE;
        }


        let vertexDataaUpdated = Object.assign({}, this.nodeGroups[groupName], vertexData)
        // if the shape is text, make it to some other

        // if shape with in text
        if (allNodeShapes['inLabelShapes'].includes(vertexDataaUpdated.shape)) {
            vertexDataaUpdated.widthConstraint = {
                minimum: vertexDataaUpdated.size * 10,
                maximum: vertexDataaUpdated.size * 10
            }


            if (vertexDataaUpdated.color && allNodeShapes['inLabelShapes'].includes(vertexDataaUpdated.shape)) {
                vertexDataaUpdated.font.color = invertColor(vertexDataaUpdated.color.background, true);
            }
            // vertexDataaUpdated.heightContstraint = {
            //     minimum: vertexDataaUpdated.size * 1
            // }
        }

        console.log("=====renderingConfigFromStorage", vertexData)


        // if (!vertexData.shape) {
        //     vertexData.shape = renderingConfigFromStorage.elementShape;
        // }

        // if (renderingConfigFromStorage && renderingConfigFromStorage.labelPropertyKey) {
        //     // vertexData.shape = "circularImage";
        //     vertexData.label = vertexData.properties[renderingConfigFromStorage.labelPropertyKey];
        // }

        // console.log("====this.nodeGroups[groupName]", this.nodeGroups[groupName]);
        return vertexDataaUpdated;
    }

    _prepareEdge(edgeData, labelPropertyKey) {
        if (!edgeData._label) {
            edgeData._label = edgeData.label;
        }
        const groupName = edgeData._label;

        this.generateEdgeGroups(groupName);
        const edgeDefaultConfig = this.edgeGroups[groupName];
        let edgeDataUpdated = {...edgeData, ...edgeDefaultConfig};
        const renderingConfigFromStorage = this.getRenderingConfigFromStorage(groupName);


        let label = edgeDataUpdated.id;
        if (!labelPropertyKey && renderingConfigFromStorage) {
            labelPropertyKey = renderingConfigFromStorage.labelPropertyKey

            if (labelPropertyKey === "_id") {
                label = edgeDataUpdated.id;
            } else if (labelPropertyKey === "_label") {
                label = edgeDataUpdated._label;
            } else if (edgeDataUpdated.properties[labelPropertyKey]) {
                label = edgeDataUpdated.properties[labelPropertyKey];
            }
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
        const nodeLabels = Object.assign({}, JSON.parse(localStorage.getItem(RENDERING_CONFIG.LOCAL_STORAGE_KEY)));
        return nodeLabels[nodeLabel];
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
