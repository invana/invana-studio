import {getColorForString, getDefaultNodeOptions} from "../../interface/utils";
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
            arrowShape = "triangle"; // dot
        }
        // config.borderWidth = 1;
        // config.borderWidthSelected = 1;
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

        // config.physics = false;
        config.size = 16;
        config.width = 1.5;
        config.font = {
            size: 12,
            color: GRAPH_CANVAS_SETTINGS.DefaultElementTextColor
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

        vertexData.label = this.stringify(label);
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

        // override the options with image
        if (renderingConfigFromStorage && renderingConfigFromStorage.bgImagePropertyKey) {
            const image = vertexData.properties[renderingConfigFromStorage.bgImagePropertyKey];
            if (image) {
                vertexData.image = image;
                vertexData.shape = "circularImage";
            }
        }


        let vertexDataaUpdated = Object.assign({}, this.nodeGroups[groupName], vertexData)
        // if the shape is text, make it to some other
        if(vertexDataaUpdated.shape === "text"){
            vertexDataaUpdated.widthConstraint = {
                minimum: vertexDataaUpdated.size * 10,
                maximum: vertexDataaUpdated.size * 15
            }
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
        const renderingConfigFromStorage = this.getRenderingConfigFromStorage(groupName);


        let label = edgeData.id;
        if (!labelPropertyKey && renderingConfigFromStorage) {
            labelPropertyKey = renderingConfigFromStorage.labelPropertyKey

            if (labelPropertyKey === "_id") {
                label = edgeData.id;
            } else if (labelPropertyKey === "_label") {
                label = edgeData._label;
            } else if (edgeData.properties[labelPropertyKey]) {
                label = edgeData.properties[labelPropertyKey];
            }
        }

        edgeData.label = this.stringify(label);
        edgeData.group = undefined; // groupName


        // edgeData.label = labelPropertyKey
        //     ? this.stringify(edgeData[labelPropertyKey])
        //     : this.stringify(edgeData.id);
        // edgeData.group = groupName;
        this.generateEdgeGroups(groupName);

        edgeData.from = edgeData.outV;
        edgeData.to = edgeData.inV;
        return Object.assign({}, edgeData, this.edgeGroups[groupName]);

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
