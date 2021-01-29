import {getColorForString} from "../../interface/utils";
import {LightenDarkenColor} from "../../../core/utils";

export default class VisJsGraphCanvasUtils {
    nodeGroups = {};
    edgeGroups = {};

    getColorBasedOnText(groupName) {
        return;
    }

    generateNodeConfig(groupName, nodeShape) {
        let config = {};
        if (nodeShape === undefined) {
            nodeShape = "circle"; // dot
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
        // config.size = 6;
        config.font = {
            size: 6,
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

    generateEdgeGroups(groupName) {
        if (groupName in this.edgeGroups) {
        } else {
            this.edgeGroups[groupName] = this.generateNodeConfig(groupName);
        }
    }

    _prepareNode(vertexData, labelPropertyKey) {
        const groupName = vertexData.label;
        vertexData.label = labelPropertyKey
            ? this.stringify(vertexData[labelPropertyKey])
            : this.stringify(vertexData.id);
        vertexData.group = groupName;
        this.generateNodeGroups(groupName);
        return vertexData;
    }

    _prepareEdge(edgeData, labelPropertyKey) {
        const groupName = edgeData.label;
        edgeData.label = labelPropertyKey
            ? this.stringify(edgeData[labelPropertyKey])
            : this.stringify(edgeData.id);
        edgeData.group = groupName;
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


    getElementColor(label) {
        const nodeLabels = Object.assign({}, JSON.parse(localStorage.getItem('nodeLabels')));
        const nodeLabelOption = nodeLabels[label];
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
