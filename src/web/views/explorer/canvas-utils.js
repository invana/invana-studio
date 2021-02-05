import {getColorForString} from "../../interface/utils";
import {LightenDarkenColor} from "../../../core/utils";
import {GRAPH_CANVAS_SETTINGS} from "../../../settings";

export default class VisJsGraphCanvasUtils {
    nodeGroups = {};
    edgeGroups = {};

    getColorBasedOnText(groupName) {
        return;
    }


    getEdgeColorObject(groupName) {
        const edgeColor = this.getElementColor(groupName);
        const highLightColor = LightenDarkenColor(edgeColor, 20);
        const highLightBorderColor = LightenDarkenColor(highLightColor, -40);

        return {
            color: edgeColor,
            highlight: highLightColor,
            hover: highLightBorderColor,
        }
    }

    getEdgeColorUnHighlightObject(groupName) {
        /// when hovered - make the colors light
        const edgeColor = this.getElementColor(groupName);
        const highLightColor = LightenDarkenColor(edgeColor, -95);
        const highLightBorderColor = LightenDarkenColor(highLightColor, -95);

        return {
            color: edgeColor,
            highlight: highLightColor,
            hover: highLightBorderColor,
        }
    }

    unHighlightElementColor(groupName) {
        const nodeColor = this.getElementColor(groupName);
        return LightenDarkenColor(nodeColor, -10);
    }

    generateNodeConfig(groupName, nodeShape) {
        let config = {};
        if (nodeShape === undefined) {
            nodeShape = "dot"; // dot
        }

        const nodeColor = this.getElementColor(groupName);


        const borderColor = LightenDarkenColor(nodeColor, -35);
        const highLightColor = LightenDarkenColor(nodeColor, 20);
        const highLightBorderColor = LightenDarkenColor(highLightColor, -40);
        config.borderWidth = 1;
        config.borderWidthSelected = 1;
        config.shape = nodeShape;
        config.color = {
            border: borderColor,
            background: nodeColor,
            highlight: {
                border: highLightBorderColor,
                background: highLightColor
            },
            hover: {
                border: highLightBorderColor,
                background: highLightColor
            }
        };
        // config.physics = false;
        config.size = 16;
        config.font = {
            size: 12,
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
            },
        };
        config.label = true;

        // config.arrows: "to, from";
        config.color = this.getEdgeColorObject(groupName)

        // config.physics = false;
        config.size = 16;
        config.width = 1;
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
        const groupConfig = this.getElementConfig(groupName);


        let label = vertexData.id;
        if (!labelPropertyKey && groupConfig) {
            labelPropertyKey = groupConfig.labelPropertyKey
            if (vertexData.properties[labelPropertyKey]) {
                label = vertexData.properties[labelPropertyKey];
            }
        }

        vertexData.label = this.stringify(label);
        vertexData.group = groupName;


        delete vertexData.shape;
        delete vertexData.image;

        if (groupConfig && groupConfig.bgImagePropertyKey) {
            const image = vertexData.properties[groupConfig.bgImagePropertyKey];
            if (image) {
                vertexData.shape = "circularImage";
                vertexData.image = image;
            }
        }

        // if (groupConfig && groupConfig.labelPropertyKey) {
        //     // vertexData.shape = "circularImage";
        //     vertexData.label = vertexData.properties[groupConfig.labelPropertyKey];
        // }


        this.generateNodeGroups(groupName);
        return vertexData;
    }

    _prepareEdge(edgeData, labelPropertyKey) {
        if (!edgeData._label) {
            edgeData._label = edgeData.label;
        }
        const groupName = edgeData._label;
        const groupConfig = this.getElementConfig(groupName);


        let label = edgeData.id;
        if (!labelPropertyKey && groupConfig) {
            labelPropertyKey = groupConfig.labelPropertyKey
            if (edgeData.properties[labelPropertyKey]) {
                label = edgeData.properties[labelPropertyKey];
            }
        }

        edgeData.label = this.stringify(label);
        edgeData.group = groupName;


        // edgeData.label = labelPropertyKey
        //     ? this.stringify(edgeData[labelPropertyKey])
        //     : this.stringify(edgeData.id);
        // edgeData.group = groupName;
        this.generateEdgeGroups(groupName);

        edgeData.from = edgeData.outV;
        edgeData.to = edgeData.inV;

        return edgeData;
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


    getElementConfig(nodeLabel) {
        const nodeLabels = Object.assign({}, JSON.parse(localStorage.getItem('nodeLabels')));
        return nodeLabels[nodeLabel];
    }

    getElementColor(label) {
        const nodeLabelOption = this.getElementConfig(label);
        if (nodeLabelOption && nodeLabelOption.bgColor) {
            return nodeLabelOption.bgColor;
        } else {
            return getColorForString(label);
        }
    }

    // getTextColor() {}
    // getBgColor() {}
    // constructor(labelName, nodeShape) {}
}
