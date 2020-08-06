import cytoscape from "cytoscape/src";
import {flattenProperties, deFlattenProperties} from "./cytoscape-utils";
import React from "react";
import PropTypes from "prop-types";
import cxtmenu from 'cytoscape-cxtmenu';
import cola from 'cytoscape-cola';

cytoscape.use(cxtmenu); // register extension
cytoscape.use(cola);


export default class CytoscapeEngine extends React.Component {


    constructor(props) {
        super(props);

        this.layoutOpts = {
            name: 'cola',
            refresh: 2,
            edgeLength: 200,
            fit: false
        }

    }


    static defaultProps = {
        queryGremlinServer: () => console.error("queryGremlinServer not set"),
        startQuery: () => console.error("startQuery not set"),
        htmlSelector: null,

        vertices: [],
        edges: [],
        shallReRenderD3Canvas: false,

        setSelectedElementData: (selectedData) => console.error("setSelectedElementData not set", selectedData),
        setMiddleBottomContentName: (contentName) => console.error("setMiddleBottomContentName not set", contentName),
    }

    static propTypes = {
        queryGremlinServer: PropTypes.func,
        startQuery: PropTypes.func,
        htmlSelector: PropTypes.string,

        edges: PropTypes.array,
        vertices: PropTypes.array,
        shallReRenderD3Canvas: PropTypes.bool,

        setSelectedElementData: PropTypes.func,
        setMiddleBottomContentName: PropTypes.func,
    }


    setupMenu() {
        let _this = this;
        // the default values of each option are outlined below:
        let defaults = {
            menuRadius: 90, // the radius of the circular menu in pixels
            selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
            commands: [ // an array of commands to list in the menu or a function that returns the array

                { // example command
                    fillColor: 'rgba(78,78,78,0.75)', // optional: custom background color for item
                    content: '...', // html/text content to be displayed in the menu
                    contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                    select: function (ele) { // a function to execute when the command is selected
                        console.log("show vertex options", ele.data(), ele.id()) // `ele` holds the reference to the active element
                        _this.showVertexOptions(deFlattenProperties(ele.data(), true));
                    },
                    enabled: true // whether the command is selectable
                },
                { // example command
                    fillColor: 'rgba(78,78,78,0.75)', // optional: custom background color for item
                    content: '&rarr;', // html/text content to be displayed in the menu
                    contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                    select: function (ele) { // a function to execute when the command is selected
                        console.log("show outlinks", ele.id()) // `ele` holds the reference to the active element
                        _this.expandOutLinksAndNodes(deFlattenProperties(ele.data()));
                    },
                    enabled: true // whether the command is selectable
                },
                { // example command
                    fillColor: 'rgba(78,78,78,0.75)', // optional: custom background color for item
                    content: '&#x1F50D;', // html/text content to be displayed in the menu
                    contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                    select: function (ele) { // a function to execute when the command is selected
                        console.log("start querying ", ele.id()) // `ele` holds the reference to the active element
                        const selectedNode = deFlattenProperties(ele.data());
                        const query = "node= g.V(" + selectedNode.id + ")";
                        _this.props.startQuery(query)

                    },
                    enabled: true // whether the command is selectable
                },
                { // example command
                    fillColor: 'rgba(78,78,78,0.75)', // optional: custom background color for item
                    content: '&#x2715;', // html/text content to be displayed in the menu
                    contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                    select: function (ele) { // a function to execute when the command is selected
                        console.log("close menu ", ele.id()) // `ele` holds the reference to the active element
                        alert("not implemented");
                    },
                    enabled: true // whether the command is selectable
                },
                { // example command
                    fillColor: 'rgba(78,78,78,0.75)', // optional: custom background color for item
                    content: '&rarr;', // html/text content to be displayed in the menu
                    contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                    select: function (ele) { // a function to execute when the command is selected
                        console.log("in links ", ele.id()) // `ele` holds the reference to the active element
                        _this.expandInLinksAndNodes(deFlattenProperties(ele.data()));
                    },
                    enabled: true // whether the command is selectable
                },
                { // example command
                    fillColor: 'rgba(78,78,78,0.75)', // optional: custom background color for item
                    content: '?', // html/text content to be displayed in the menu
                    contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                    select: function (ele) { // a function to execute when the command is selected
                        console.log("extra ", ele.id()) // `ele` holds the reference to the active element
                        alert("not implemented");
                    },
                    enabled: true // whether the command is selectable
                }

            ], // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
            fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
            activeFillColor: 'rgba(1,217,73,0.75)', // the colour used to indicate the selected command
            activePadding: 5, // additional size in pixels for the active command
            indicatorSize: 14, // the size in pixels of the pointer to the active command
            separatorWidth: 1, // the empty spacing in pixels between successive commands
            spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
            minSpotlightRadius: 18, // the minimum radius in pixels of the spotlight
            maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
            openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
            itemColor: 'white', // the colour of text in the command's content
            itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
            zIndex: 9999, // the z-index of the ui div
            atMouse: false // draw menu at mouse position
        };

        let menu = this.cy.cxtmenu(defaults);
        console.log("===menu", menu);
    }


    refreshLayout() {
        // layout.stop();
        // let layout = this.cy.elements().makeLayout(this.layoutOpts);
        // layout.stop();
        // layout.run();
    }

    setUpCystoscape() {
        return cytoscape({
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
                        label: "data(name)",
                        "background-fit": "cover",
                        "border-color": "#333",
                        "border-width": 5,
                        "border-opacity": 0.5,
                        color: "#efefef",
                        "background-color": "data(metaBgColor)",
                        shape: "data(metaShape)",
                        "background-image": "data(metaBgImage)",
                        "cursor": "pointer"
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
                        color: "#666666",
                        "text-background-color": "#efefef",
                        "text-background-shape": "roundrectangle",
                        "text-border-color": "#efefef",
                        "text-border-width": 1,
                        "text-border-opacity": 1,
                        "edge-text-rotation": "autorotate",
                        "cursor": "pointer"
                    }
                }
            ],
            layout: {
                name: "cola",
                directed: true,
                avoidOverlap: true,
                padding: 10,
                ready: () => console.log("layout ready")
            }
        })
    }

    componentDidMount() {
        // this.setupCanvas();
        this.cy = this.setUpCystoscape()
        this.setupMenu();
        this.reRender()
    }

    reRender() {
        let _this = this;

        this.cy.startBatch();
        this.cy.on('mouseover', 'node', function (e) {
            // $('#diagram-wrapper').css('cursor', 'pointer');
        });
        this.cy.on('mouseout', 'node', function (e) {
            // $('#diagram-wrapper').css('cursor', 'default');
        });
        console.log("this.props.vertices", this.props.vertices);
        console.log("this.props.edges", this.props.edges);
        this.addNodes(this.props.vertices)
        this.addEdges(this.props.edges)
        // this.cy.center(/*eles*/); // Moves the graph to the exact center of your tree
        let layout = this.cy.layout({name: 'circle'});
        layout.run();


        this.cy.on("tapdrag", "node", function (event) {
            // update all relevant labels
            const labels = event.target.connectedEdges();
            for (let i = 0; i < labels.length; i++) {
                // render with the right positions?
                console.log("============label", deFlattenProperties(labels[i].data(), false));
            }
        });

        this.cy.on("tap", "node", function (evt) {
            console.log(evt, evt.target.id(), evt.target.data());
            _this.showElementProperties(evt.target.data());
        });
        this.refreshLayout()
        this.cy.endBatch();

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

    showVertexOptions(selectedNode) {
        // this.stopPropagatingChildClickEventToParentEl();
        this.props.setSelectedElementData(selectedNode);
        this.props.setMiddleBottomContentName('vertex-options')
    }

    expandInLinksAndNodes(selectedNode) {
        console.log("expandInLinksAndNodes", selectedNode);
        // TODO - improve performance of the query.
        let query_string = "node=g.V(" + selectedNode.id + ").toList(); " +
            "edges = g.V(" + selectedNode.id + ").outE().dedup().toList(); " +
            "other_nodes = g.V(" + selectedNode.id + ").outE().otherV().dedup().toList();" +
            "[other_nodes,edges,node]";
        this.props.queryGremlinServer(query_string);
        return false;
    }


    expandOutLinksAndNodes(selectedNode) {
        console.log("expandOutLinksAndNodes", selectedNode);
        // TODO - improve performance of the query.
        let query_string = "node=g.V(" + selectedNode.id + ").toList(); " +
            "edges = g.V(" + selectedNode.id + ").inE().dedup().toList(); " +
            "other_nodes = g.V(" + selectedNode.id + ").inE().otherV().dedup().toList();" +
            "[other_nodes,edges,node]";
        this.props.queryGremlinServer(query_string);
        return false;
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
