import cytoscape from "cytoscape/src";
import {flattenProperties, deFlattenProperties} from "./cytoscape-utils";
import React from "react";
import PropTypes from "prop-types";


export default class CytoscapeEngine extends React.Component {


    static defaultProps = {
        queryGremlinServer: () => console.error("queryGremlinServer not set"),
        htmlSelector: null,

        vertices: [],
        edges: [],
        shallReRenderD3Canvas: false,

        setSelectedElementData: (selectedData) => console.error("setSelectedElementData not set", selectedData),
        setMiddleBottomContentName: (contentName) => console.error("setMiddleBottomContentName not set", contentName),
    }

    static propTypes = {
        queryGremlinServer: PropTypes.func,
        htmlSelector: PropTypes.string,

        edges: PropTypes.array,
        vertices: PropTypes.array,
        shallReRenderD3Canvas: PropTypes.bool,

        setSelectedElementData: PropTypes.func,
        setMiddleBottomContentName: PropTypes.func,
    }


    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        this.reRender()
    }

    reRender() {
        let _this = this;
        this.cy = cytoscape({
            container: document.querySelector(this.props.htmlSelector),
            boxSelectionEnabled: false,
            autounselectify: true,
            zoomingEnabled: true,
            userZoomingEnabled: true,
            panningEnabled: true,
            userPanningEnabled: true,
            // fit: true,

            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            // avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
            // nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
            elements: {
                nodes: [],
                edges: []
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        label: "data(id)",
                        "background-fit": "cover",
                        "border-color": "#333",
                        "border-width": 5,
                        "border-opacity": 0.5,
                        color: "#efefef",
                        "background-color": "data(metaBgColor)",
                        shape: "data(metaShape)",
                        "background-image": "data(metaBgImage)"
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        "curve-style": "bezier",
                        "target-arrow-shape": "triangle",
                        width: 3,
                        label: "data(label)",
                        "line-color": "data(metaBgColor)",
                        "target-arrow-color": "data(metaBgColor)",
                        "text-background-opacity": 1,
                        color: "#efefef",
                        "text-background-color": "#efefef",
                        "text-background-shape": "roundrectangle",
                        "text-border-color": "#efefef",
                        "text-border-width": 1,
                        "text-border-opacity": 1,
                        "edge-text-rotation": "autorotate"
                    }
                }
            ],
            layout: {
                name: "circle",
                directed: true,
                // avoidOverlap: true,
                padding: 10,
                ready: () => console.log("layout ready")
            }

        })

        //
        // this.addNodes([
        //     {
        //         id: 'n0',
        //         metaShape: "ellipse",
        //         metaBgColor: "green",
        //         metaBgImage: "https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg"
        //     },
        //     {
        //         id: 'n1',
        //         metaShape: "ellipse",
        //         metaBgColor: "green",
        //         metaBgImage: "https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg"
        //     }
        // ])
        // this.addEdges([{id: 'e0', source: 'n0', target: 'n1'}])

        console.log("this.props.vertices", this.props.vertices);
        console.log("this.props.edges", this.props.edges);
        this.addNodes(this.props.vertices)
        this.addEdges(this.props.edges)
        this.cy.center(/*eles*/); // Moves the graph to the exact center of your tree
        let layout = this.cy.layout({name: 'circle'});
        layout.run();

        this.cy.on("tap", "node", function (evt) {
            console.log(evt, evt.target.id(), evt.target.data());
            _this.showElementProperties( evt.target.data());
        });
    }


    addNodes(nodes) {
        /*

           {
             data: {
              id: "ae",
              label: "a->e",

              metaBgColor: "red",
              metaLabelColor: "black",
              metaBgImage: 'https://',
              metaShape: 'round'
              }
            }

         */
        console.log("======", nodes);
        let _cleaned = [];
        nodes.forEach((node) => _cleaned.push({group: 'nodes', data: flattenProperties(node, true)}));
        this.cy.add(_cleaned);
    }

    addEdges(edges) {
        /*

             {
                data: {
                  id: "ae",
                  label: "a->e",
                  source: "a",
                  target: "e",
                  metaBgColor: "red",
                  metaLabelColor: "black"
                }
              }

         */
        console.log("======", edges);
        let _cleaned = [];
        edges.forEach((edge) => _cleaned.push({group: 'edges', data: flattenProperties(edge, false)}));
        this.cy.add(_cleaned);

    }

    componentDidUpdate() {
        this.reRender();
    }

    // shouldComponentUpdate(nextProps) {
    //     return nextProps.shallReRenderD3Canvas;
    // }

    showElementProperties(selectedNode) {
        console.log("deFlattenProperties(selectedNode, true)", deFlattenProperties(selectedNode, true));
        this.props.setSelectedElementData(deFlattenProperties(selectedNode, true))
        this.props.setMiddleBottomContentName("selected-data-overview")
    }

    hideElementProperties() {
        this.props.setSelectedElementData(null)
        this.props.setMiddleBottomContentName(null)
    }

    render() {
        const canvasClass = this.props.htmlSelector
            .replace(".", "")
            .replace("#", "");
        return (
            <div className={canvasClass}
                 style={{height: "100%", width: "100%"}}
            />
        )

    }

}
