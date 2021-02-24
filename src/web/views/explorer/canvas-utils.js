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

    generateNodeConfig(groupName, nodeShape) {
        let config = {};
        if (nodeShape === undefined) {
            nodeShape = "dot"; // dot
        }


        config.borderWidth = 2;
        config.borderWidthSelected = 3;
        config.shape = nodeShape;
        config.chosen = false;
        config.color = this.getNodeColorObject(groupName);
        // config.physics = false;
        config.size = 16;
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
        const groupConfig = this.getElementConfig(groupName);


        let label = vertexData.id;
        if (!labelPropertyKey && groupConfig) {
            labelPropertyKey = groupConfig.labelPropertyKey

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

        if (groupConfig && groupConfig.bgImagePropertyKey) {
            const image = vertexData.properties[groupConfig.bgImagePropertyKey];
            if (image) {
                vertexData.shape = "circularImage";
                vertexData.image = image;
            }
        }
        this.generateNodeGroups(groupName);

        // if (groupConfig && groupConfig.labelPropertyKey) {
        //     // vertexData.shape = "circularImage";
        //     vertexData.label = vertexData.properties[groupConfig.labelPropertyKey];
        // }

        console.log("====this.nodeGroups[groupName]", this.nodeGroups[groupName]);
        return Object.assign({}, vertexData, this.nodeGroups[groupName]);
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
