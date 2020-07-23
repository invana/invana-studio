import React from "react";
import GraphControls from "./graph-controls";
import {prepareLinksDataForCurves, prepareNodesDataWithOptions, removeVertexMeta,
    removeEdgeMeta} from "./canvas-utils";
import {LightenDarkenColor, invertColor} from "../../core/utils";
import "./graph.scss";

import {
    simulationAlpha,
    DefaultLinkTextColor,
    DefaultLinkStrokeWidth,
    DefaultLinkPathColor,
    DefaultNodeRadius,
    DefaultLinkDistance,
    linkCurvature
} from "../../config";
import * as d3 from 'd3';
import 'd3-selection-multi';
import PropTypes from 'prop-types';

export default class D3ForceDirectedCanvas extends React.Component {

    static defaultProps = {
        vertices: [],
        edges: [],
        shallReRenderD3Canvas: false,
        setSelectedElementData: (selectedData) => console.error("setSelectedElementData not set", selectedData),
        setMiddleBottomContentName: (contentName) => console.error("setMiddleBottomContentName not set", contentName),
        queryGremlinServer: () => console.error("queryGremlinServer not set"),
    }

    static propTypes = {
        setSelectedElementData: PropTypes.func,
        setMiddleBottomContentName: PropTypes.func,
        queryGremlinServer: PropTypes.func,
        setHideVertexOptions: PropTypes.func,
        setRightContentName: PropTypes.func,
        middleBottomContentName: PropTypes.string,
        edges: PropTypes.array,
        vertices: PropTypes.array,
        shallReRenderD3Canvas: PropTypes.bool
    }


    canvas = null;
    htmlSelectorId = ".graph-canvas";
    // nodeIDtoLinkIDs = {};
    // linkIDtoLinkMap = {};
    controls = new GraphControls();

    resetNodeHighlight(selectedNode) {
        console.log("selectedNode", selectedNode)
        let nodeElements = this.canvas.selectAll('.node .circle');
        let linkElements = this.canvas.selectAll('.link');
        let linkLabels = this.canvas.selectAll('.edgelabel');

        nodeElements.style('fill', (nodeElement) => nodeElement.meta.shapeOptions.fillColor);
        linkElements.style('opacity', '1');
        linkLabels.style('opacity', '1');
    }

    showElementProperties(selectedNode) {
        // this.props.setHideVertexOptions();
        this.props.setSelectedElementData(selectedNode)
        this.props.setMiddleBottomContentName("selected-data-overview")
    }

    hideElementProperties() {
        this.props.setSelectedElementData(
            null
        )
        this.props.setMiddleBottomContentName(null)

    }

    getAdjacentNodeIds(nodeId) {
        // console.log("nodeIDtoLinkIDs", nodeId, this.nodeIDtoLinkIDs)
        let connectedLinkIds = this.nodeIDtoLinkIDs[nodeId] || new Set();
        // console.log("connectedLinkIds", connectedLinkIds)
        let data = new Set([nodeId]);
        console.debug("linkIDtoLinkMap", this.linkIDtoLinkMap);
        connectedLinkIds.forEach(linkId => {
            let link = this.linkIDtoLinkMap[linkId];
            data.add(link.source.id);
            data.add(link.target.id);
        });
        return data;
    }

    highlightHoveredNodesAndEdges(selectedNode) {
        this.stopPropagatingChildClickEventToParentEl();

        // this is performance intensive operation
        // let nodeElements = document.querySelectorAll('.everything .node');
        // console.log("highlightHoveredNodesAndEdges selectedNode=====", selectedNode);
        let nodeElements = this.canvas.selectAll('.node .circle');
        let linkElements = this.canvas.selectAll('.link');
        let linkLabels = this.canvas.selectAll('.edgelabel');
        let adjacentNodeIds = this.getAdjacentNodeIds(selectedNode.id);
        nodeElements.style('fill', function (nodeElement) {
            return adjacentNodeIds.has(nodeElement.id) ? LightenDarkenColor(nodeElement.meta.shapeOptions.fillColor, +22) : nodeElement.meta.shapeOptions.fillColor;
        });

        let adjacentLinkIds = this.getAdjacentLinkIds(selectedNode.id);
        linkElements.style('opacity', function (linkElement) {
            return adjacentLinkIds.has(linkElement.id) ? '1' : '0.1';
        });

        linkLabels.style('opacity', function (linkLabel) {
            return adjacentLinkIds.has(linkLabel.id) ? '1' : '0.1';
        });
    }

    getAdjacentLinkIds(nodeId) {
        return this.nodeIDtoLinkIDs[nodeId] || new Set();
    }

    expandInLinksAndNodes(selectedNode) {
        this.stopPropagatingChildClickEventToParentEl();

        console.log("expandInLinksAndNodes", selectedNode);
        // TODO - improve performance of the query.
        let query_string = "node=g.V(" + selectedNode.id + ").toList(); " +
            "edges = g.V(" + selectedNode.id + ").outE().dedup().toList(); " +
            "other_nodes = g.V(" + selectedNode.id + ").outE().otherV().dedup().toList();" +
            "[other_nodes,edges,node]";
        this.props.queryGremlinServer(query_string);
        return false;
    }

    stopPropagatingChildClickEventToParentEl() {
        // this will avoid clicks to parent when a child is clicked.
        const e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        console.debug("onNodeClicked:: ignored, because this is from child");
    }

    expandOutLinksAndNodes(selectedNode) {
        this.stopPropagatingChildClickEventToParentEl();

        console.log("expandOutLinksAndNodes", selectedNode);
        // TODO - improve performance of the query.
        let query_string = "node=g.V(" + selectedNode.id + ").toList(); " +
            "edges = g.V(" + selectedNode.id + ").inE().dedup().toList(); " +
            "other_nodes = g.V(" + selectedNode.id + ").inE().otherV().dedup().toList();" +
            "[other_nodes,edges,node]";
        this.props.queryGremlinServer(query_string);
        return false;
    }

    closeNodeMenu(selectedNode) {
        this.stopPropagatingChildClickEventToParentEl();

        console.log("closeNodeMenu clicked", selectedNode, d3.select(".node-menu").selectAll("*"));
        let _this = this;
        // setTimeout(function () {
        _this.hideElementProperties();

        d3.select(".node-menu").selectAll("*").remove();
        if (document.querySelector(".node-menu")) {
            document.querySelector(".node-menu").remove();
        }
        // }, 50);
        this.props.setHideVertexOptions();
        this.hideElementProperties();
        this.props.setRightContentName(null);
    }

    releaseNodeLock(selectedNode) {
        this.stopPropagatingChildClickEventToParentEl();

        console.log("releaseNodeLock clicked", selectedNode);
        selectedNode.fixed = false;
        selectedNode.fx = null;
        selectedNode.fy = null;
        this.simulation.alpha(simulationAlpha).restart();
    }

    showVertexOptions(selectedNode) {
        this.stopPropagatingChildClickEventToParentEl();
        this.props.setSelectedElementData(selectedNode);
        this.props.setMiddleBottomContentName('vertex-options')
    }

    onNodeClicked(thisnode, selectedNode) {
        console.log("onNodeClicked:: thisnode : selectedNode", thisnode, selectedNode);

        let _this = this;
        let thisNode = d3.select("#node-" + selectedNode.id);
        d3.select(".node-menu").remove();

        var menuDataSet = [{
            id: 101,
            option_name: "vertex-options",
            title: "Vertex Options",
            html: "..."
        }, {
            id: 102,
            option_name: "out-links",
            title: "out links",
            html: "&rarr;"
        }, {
            id: 103,
            option_name: "start-querying",
            title: "Start Querying",
            html: "&#x1F50D;"
        }, {
            id: 104,
            option_name: "close-node-menu",
            title: "Close Menu",
            html: "&#x2715;"
        }, {
            id: 105,
            option_name: "in-links",
            title: "in links",
            html: "&rarr;"
        }, {
            id: 106,
            option_name: "release-lock",
            title: "Release Lock",
            html: "&#x1f513;"
        }];

        // Barvy menu
        var pie = d3.pie()
            .sort(null)
            .value(function () {
                return Object.keys(menuDataSet).length;
            }); // zde je nutnÃ© zadat celkovou populaci - poÄetz prvkÅ¯ v

        // Menu
        // var widthMenu = (selectedNode.meta.shapeOptions.radius + selectedNode.meta.shapeOptions.strokeWidth) * 7,
        //     heightMenu = (selectedNode.meta.shapeOptions.radius + selectedNode.meta.shapeOptions.strokeWidth)  * 7,
        //     radiusMenu = Math.min(widthMenu, heightMenu) / 2;

        // Menu
        var widthMenu = 200,
            heightMenu = 200,
            radiusMenu = Math.min(widthMenu, heightMenu) / 2;

        // Arc setting
        var arc = d3.arc()
            .innerRadius(radiusMenu - 70)
            .outerRadius(radiusMenu - 35);

        // Graph space
        var svgMenu = thisNode.append("svg")
            .attr("width", widthMenu)
            .attr("height", heightMenu)
            .attr("class", "node-menu")
            .attr("x", -100)
            .attr("y", -100)
            .append("g")
            .attr("transform", "translate(" + widthMenu / 2 + "," + heightMenu / 2 + ")");
        // Prepare graph and load data
        var g = svgMenu.selectAll(".arc")
            .data(pie(menuDataSet))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("title", function (d) {
                return d.title;
            })
            .on("click", function (arch_node) {
                console.log("You clicked on: ", arch_node.data.option_name, " and its id is: ", arch_node.data.id);
                console.log("Its node is: ", selectedNode);
                if (arch_node.data.option_name === "out-links") {
                    _this.expandOutLinksAndNodes(selectedNode);
                } else if (arch_node.data.option_name === "in-links") {
                    _this.expandInLinksAndNodes(selectedNode);
                } else if (arch_node.data.option_name === "close-node-menu") {
                    _this.closeNodeMenu(selectedNode);
                } else if (arch_node.data.option_name === "release-lock") {
                    _this.releaseNodeLock(selectedNode);
                } else if (arch_node.data.option_name === "vertex-options") {
                    _this.showVertexOptions(selectedNode);
                } else if (arch_node.data.option_name === "start-querying") {
                    const query = "node= g.V(" + selectedNode.id + ")";
                    _this.props.startQuery(query)
                }
            });

        // Add colors
        var path = g.append("path")
            .attr("d", arc)
            .attr("fill", "#333333")
            .attr("stroke-width", "2px")
            .attr("stroke", "#333333");

        // Add labels
        g.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .html(function (d) {
                return d.data.html;
            })
            .attr("title", function (d) {
                return d.data.title;
            })
            .attr("stroke", "#ffffff");

        g.append("title")
            .text(function (d) {
                return d.data.title;
            });

        // Add hover action
        path.on("mouseenter", function () {
            d3.select(this)
                .attr("fill", "#555555")
                .attr("cursor", "pointer")
                .attr("class", "on");
        });

        path.on("mouseout", function () {
            d3.select(this)
                .attr("fill", "#333333")
                .attr("class", "off");
        })

        // this.showElementProperties(selectedNode);
    }

    onNodeHoverOut(selectedNode) {
        console.log("on node hover out", selectedNode);
        this.stopPropagatingChildClickEventToParentEl();
        this.resetNodeHighlight(selectedNode);
    }

    onNodeHoverIn(selectedNode) {
        this.stopPropagatingChildClickEventToParentEl();
        // this.se
        if (this.props.middleBottomContentName !== "vertex-options") {
            this.props.setMiddleBottomContentName('selected-data-overview')
            this.props.setSelectedElementData(selectedNode);
            this.highlightHoveredNodesAndEdges(selectedNode);
        }

    }

    addVertices(nodesData) {
        console.log("VertexUtils.add", JSON.parse(JSON.stringify(nodesData)));
        let _this = this;
        let node = this.canvas.selectAll(".node")
            .data(nodesData)
            .enter()
            .append("g")
            .attr("class", "node")
            .style("z-index", "100")
            .attr("id", function (d) {
                return "node-" + d.id;
            })
            .on("mouseover", (d) => this.onNodeHoverIn(d))
            .on("mouseout", (d) => this.onNodeHoverOut(d))
            .on("click", (d) => this.onNodeClicked(_this, d));

        // node first circle
        node.append("circle")
            .attr("class", "circle")
            .attr("r", (d) => d.meta.shapeOptions.radius)
            .attr("fill", (d) => d.meta.shapeOptions.fillColor)
            .attr("stroke", (d) => d.meta.shapeOptions.strokeColor)
            .attr("stroke-width", (d) => d.meta.shapeOptions.strokeWidth);

        // for bgImageUrl
        node.append('g')
            .attr("class", "bgImageUrl")
            .attr('transform', function (d) {
                    const side = 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4);
                    const dx = -1 * (side / 2) * 1.5;
                    // const dx = d.meta.shapeOptions.radius - (side / 2) * (2.5);
                    // const dy = d.meta.shapeOptions.radius - (side / 2) * (2.5) * (2.5 / 3) - 4;
                    return 'translate(' + [dx, dx] + ')'
                }
            )
            .append("foreignObject")
            .attr("width", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4) * 2) // side
            .style("font-size", "12px")
            .attr("height", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4) * 2) // side
            .append("xhtml:body")

            .style("background-color", "transparent")
            .append("xhtml:span")
            .style("color", (d) => d.meta.shapeOptions.textColor)
            .style("background-color", "transparent")
            .style("padding-top", (d) => d.meta.shapeOptions.radius / 4)
            .html(function (d) {
                const side = 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4) * 1.5;
                if (d.meta.bgImageUrl) {
                    return "<img src='" + d.meta.bgImageUrl + "' style='width: " + side + "px; border-radius: 3rem;' />"
                }
            })

        // node bgImageUrl CAP ; this will create a border ring around the image on top of it. creating clean UI
        node.append("circle")
            .attr("class", "bgImageUrlCap")
            .attr("r", (d) => d.meta.shapeOptions.radius)
            .attr("fill", "transparent")
            .attr("stroke", (d) => d.meta.shapeOptions.strokeColor)
            .attr("stroke-width", (d) => d.meta.shapeOptions.strokeWidth + 1);

        // for nodeBgHtml - this will be on top of background image
        let inShapeTextNode = node.append('g')
            .attr("class", "nodeHTML")
            .attr('transform', function (d) {
                    const side = 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4);
                    const dx = -1 * (side / 2);
                    // const dx = d.meta.shapeOptions.radius - (side / 2) * (2.5);
                    // const dy = d.meta.shapeOptions.radius - (side / 2) * (2.5) * (2.5 / 3) - 4;
                    return 'translate(' + [dx, dx] + ')'
                }
            )
            .append("foreignObject")
            .attr("width", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4)) // side
            .style("font-size", "12px")
            .attr("height", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4)) // side
            .append("xhtml:body")
            .style("color", (d) => invertColor(d.meta.shapeOptions.fillColor, true))
            .style("font-size", "16px") // make this dynamic based on the node radius also
            .style("margin", "0")
            .style("text-align", "center")
            .style("background", "transparent");

        inShapeTextNode.append("xhtml:h6")
            // .style("display", "block")
            // .style("vertical-align", "middle")
            .style("font-size", "10px")
            .style("font-weight", "bold")
            .style("color", (d) => invertColor(d.meta.shapeOptions.fillColor, true))
            .style("background-color", "transparent")
            .style("padding-top", (d) => d.meta.shapeOptions.radius / 4)
            .style("margin", "0")
            .style("margin-top", "7px")

            .html(function (d) {
                if (d.meta.shapeOptions.inShapeHTML && !d.meta.bgImageUrl) {
                    return d.meta.shapeOptions.inShapeHTML;
                }
            })

        inShapeTextNode.append("xhtml:small")
            .style("text-align", "center")
            .style("font-size", "4px")
            .style("vertical-align", "middle")
            .style("font-weight", "bold")
            .style("color", (d) => invertColor(d.meta.shapeOptions.fillColor, true))
            .style("background-color", "transparent")
            // .style("padding-top", (d) => d.meta.shapeOptions.radius / 4)
            .html(function (d) {
                if (d.meta.shapeOptions.inShapeHTML && !d.meta.bgImageUrl) {
                    return d.id;
                }
            });

        //
        node.append('g')
            .attr("class", "tagHTML")
            .attr('transform', function (d) {
                    const side = 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4);
                    const dx = (side / 2);
                    // const dx = d.meta.shapeOptions.radius - (side / 2) * (2.5);
                    // const dy = d.meta.shapeOptions.radius - (side / 2) * (2.5) * (2.5 / 3) - 4;
                    return 'translate(' + [dx, dx - (d.meta.shapeOptions.radius / 4) + d.meta.shapeOptions.strokeWidth] + ')'
                }
            )
            .append("foreignObject")
            .attr("width", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4)) // side
            .style("font-size", "12px")
            .attr("height", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4)) // side
            .append("xhtml:body")
            .style("color", (d) => invertColor(d.meta.shapeOptions.fillColor, true))
            .style("font-size", "16px") // make this dynamic based on the node radius also
            // .style("font-weight", "bold")
            .style("background-color", "transparent")
            .append("xhtml:span")
            .style("color", (d) => d.meta.shapeOptions.textColor)
            .style("background-color", "transparent")
            .html(function (d) {
                if (d.meta.tagOptions.tagHtml) {
                    return d.meta.tagOptions.tagHtml
                }
            });

        node.append("title")
            .text(function (d) {
                return d.meta.labelOptions.labelText || d.id;
            })
        node.append("text")
            .attr("dy", -16)
            .attr("dx", 6)
            .text((d) => d.meta.labelOptions.labelText || d.id)
            .attr("stroke", (d) => d.meta.labelOptions.labelColor)
            .attr("fill", (d) => d.meta.labelOptions.labelColor)
            .style("font-size", "12px")
            .style("display", (d) => (d.meta.labelOptions.showLabel) ? "block" : "none")
        // .style("text-shadow", function (d, i) {
        //     return "1px 1px " + d3.rgb(d.meta.labelOptions.labelColor).darker(1);
        // });
        return node;
    }

    onLinkMoveHover(selectedLink) {
        console.log("onLinkMoveHover", selectedLink);
        let nodeElements = this.canvas.selectAll('.node .circle');
        let linkElements = this.canvas.selectAll('.link');
        linkElements.style('opacity', function (linkElement) {
            return selectedLink.id === linkElement.id ? '1' : '0.1';
        });
        let linkData = this.linkIDtoLinkMap[selectedLink.id];
        let adjacentNodeIds = new Set([linkData.source.id, linkData.target.id]);
        nodeElements.style('fill', function (nodeElement) {
            return adjacentNodeIds.has(nodeElement.id) ? LightenDarkenColor(nodeElement.meta.shapeOptions.fillColor, +22) : nodeElement.meta.shapeOptions.fillColor;
        });
        d3.select('#link-' + selectedLink.id).style('stroke', "black");
        this.showElementProperties(selectedLink);
    }

    onLinkMoveOut(selectedLink) {
        let nodeElements = this.canvas.selectAll('.node .circle');
        let linkElements = this.canvas.selectAll('.link');

        nodeElements.style('fill', (nodeElement) => nodeElement.meta.shapeOptions.fillColor);
        linkElements.style('opacity', '1');
        d3.select('#link-' + selectedLink.id).style('stroke', "#666");
        // this.hideElementProperties();
    }

    addEdges(edges) {

        console.log("EdgeUtils.add", JSON.parse(JSON.stringify(edges)));
        let _this = this
        let links = this.canvas
            .selectAll("g.links")
            .data(edges)
            .enter().append("g")
            .attr("cursor", "pointer")

        links
            .append("svg:marker")
            .attr("id", (d) => "link-arrow-" + d.id)
            .attr("viewBox", "0 -5 10 10")
            .attr("refY", 0)
            // .attr("refX", function (d, i) {
            //     console.log("=====marker", d);
            //     return d.target.meta.shapeOptions.radius
            //         - (d.target.meta.shapeOptions.radius / 4)
            //         + d.target.meta.shapeOptions.strokeWidth
            //
            // })
            .attr("refX", (DefaultNodeRadius - (DefaultNodeRadius / 4) + DefaultLinkStrokeWidth))
            .attr("fill", DefaultLinkPathColor)
            .attr("stroke", DefaultLinkPathColor)
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");

        const linkPaths = links
            .append("path")
            .attr("id", function (d, i) {
                return "link-" + i;
            })
            .attr("association-id", function (d) {
                return "link-" + d.target + "-" + d.source;
            })
            .attr("sameIndexCorrected", function (d) {
                return d.sameIndexCorrected;
            })
            .attr('stroke', DefaultLinkPathColor)
            .attr("stroke-width", DefaultLinkStrokeWidth + "px")
            .attr("fill", "transparent")
            // .attr('marker-end', (d, i) => 'url(#link-arrow-' + i + ')')
            .attr('marker-end', 'url(#arrowhead)')
            .on("mouseover", (d) => _this.onLinkMoveHover(d))
            .on("mouseout", (d) => _this.onLinkMoveOut(d))

        const linkText = links
            .append("text")
            .attr("dy", -4)
            .append("textPath")
            .attr("xlink:href", function (d, i) {
                return "#link-" + i;
            })
            .style("text-anchor", "middle")
            .attr("startOffset", "50%")
            .attr('fill', DefaultLinkTextColor) // TODO add .meta for links also
            .attr('stroke', DefaultLinkTextColor)
            .text((d) => `${d.label || d.id}`);
        return [links, linkPaths, linkText];
    }

    setupSimulation(canvas_width, canvas_height) {
        let forceCollide = d3.forceCollide()
            .radius(function (d) {
                return d.radius + 1.2;
            })
            .iterations(1); /// TODO - revisit this
        const forceX = d3.forceX(canvas_width / 2).strength(0.10);
        const forceY = d3.forceY(canvas_height / 2).strength(0.10);

        let getSimulationCharge = function () {
            return d3.forceManyBody()
                .strength(-240);
        }
        return d3.forceSimulation()
            .force("link", d3.forceLink()
                .id(function (d) {
                    return d.id;
                })
                .distance(DefaultLinkDistance).strength(1)
            )
            .force("charge", getSimulationCharge())
            .force("collide", forceCollide)
            .force('x', forceX)
            .force('y', forceY)
            .force("center", d3.forceCenter(canvas_width / 2, canvas_height / 2))
        // .velocityDecay(0.4)
        // .alphaTarget(0.1);
    }

    setupCanvas() {
        console.log("=====d3.select(this.htmlSelectorId)", d3.select(this.htmlSelectorId))
        d3.select(this.htmlSelectorId).selectAll("*").remove();
        let svg = d3.select(this.htmlSelectorId)
            // .selectAll("*").remove()
            .call(d3.zoom().on("zoom", function () {
                svg.attr("transform", d3.event.transform);
            }))
            .on("dblclick.zoom", null)   // double click zoom has been disabled since
            // we want double click to be reserved for highlighting neighbor nodes
            .append("g")
            .attr("class", "everything");
        // on clicking on any node or link, remove the context menu that is opened in the canvas.
        svg.select('*:not(circle), *:not(line), *:not(path), *:not(text), *:not(link)').on("click", function () {
            d3.select(".node-menu").remove();
        });
        console.log("=======setupcanvas", svg)
        return svg;
    }

    setupMarker(canvas) {
        console.log("setupMarker", typeof canvas);
        canvas.append('defs').append('marker')
            .attr('id', "arrowhead")
            .attr('viewBox', "-0 -5 10 10")
            .attr('refX', 23)
            .attr('refY', 0)
            .attr('orient', "auto")
            .attr('markerWidth', 8)
            .attr('markerHeight', 9)
            .attr('xoverflow', "visible")
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', DefaultLinkPathColor)
            .style('stroke', 'none');
        return canvas;

    }

    startFreshCanvas() {
        let canvas = this.setupCanvas();
        // return canvas;
        return this.setupMarker(canvas);
    }

    startRenderingGraph(nodes, links) {
        // add this data to the existing data
        let vertices = nodes;
        let edges = links;
        let _this = this;
        let _ = this.addEdges(edges);
        // let link = _[0];
        let edgepaths = _[1];
        // let edgelabels = _[2];
        let node = this.addVertices(vertices);
        node
            .on("dblclick", function (d) {
                d.fixed = false;
                if (!d3.event.active) {
                    _this.simulation.alphaTarget(simulationAlpha).restart();
                }
            })
            .call(d3.drag()
                .on("start", dragStarted)
                .on("drag", dragged)
                .on("end", dragEnded)
            );

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragStarted(d) {
            if (!d3.event.active) {
                _this.simulation.alphaTarget(simulationAlpha).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
            d3.selectAll(".node").each(function (d) {
                d.fixed = true;//thsi will fix the node.
            });
        }

        function dragEnded(d) {
            console.log("===drag ended", d);
            if (!d3.event.active) {
                _this.simulation.alphaTarget(0);
            }
            _this.simulation.alpha(simulationAlpha).restart();
            d3.selectAll(".node").each(function (d) {
                d.fixed = true;//thsi will fix the node.
            });
            // d.fx = null;
            // d.fy = null;
        }

        d3.select('#center-canvas').on('click', function () {
            _this.controls.center(_this);
        });

        this.simulation
            .nodes(vertices)
            .on("tick", ticked);

        this.simulation.force("link")
            .links(edges);

        function ticked() {
            node
                .attr("transform", function (d) {
                    return "translate(" + d.x + ", " + d.y + ")";
                });

            function linkArc(d) {
                let dx = (d.target.x - d.source.x),
                    dy = (d.target.y - d.source.y),
                    dr = Math.sqrt(dx * dx + dy * dy),
                    unevenCorrection = (d.sameUneven ? 0 : 0.5),
                    arc = ((dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection)) * linkCurvature;
                if (d.sameMiddleLink) {
                    arc = 0;
                }
                return "M" + d.source.x + "," + d.source.y + "A" + arc + "," + arc + " 0 0," + d.sameArcDirection + " " + d.target.x + "," + d.target.y;
            }

            edgepaths.attr("d", (d) => linkArc(d))
        }
    }


    reRender() {
        // alert("re-rendering");

        console.log("===== this.props", this.props);
        this.canvas = this.startFreshCanvas();
        this.canvasDimensions = document.querySelector(this.htmlSelectorId).getBoundingClientRect();
        console.log("canvasDimensions", this.canvasDimensions)
        // this.color_schema = d3.scaleOrdinal(d3.schemeCategory10);
        this.simulation = this.setupSimulation(this.canvasDimensions.width, this.canvasDimensions.height);

        const nodeOptions = Object.assign({}, JSON.parse(localStorage.getItem('nodeLabels')));

        const cleanedEdges = removeEdgeMeta(this.props.edges);
        const cleanedVertices = removeVertexMeta(this.props.vertices);
        let linksData = prepareLinksDataForCurves(cleanedEdges);
        let nodesData = prepareNodesDataWithOptions(cleanedVertices, nodeOptions);
        this.startRenderingGraph(nodesData, linksData)
        this.nodeIDtoLinkIDs = this.getNodeIDtoLinkIDs(cleanedEdges)
        this.linkIDtoLinkMap = this.getLinkIDtoLink(cleanedEdges)
    }

    componentDidMount() {
        this.reRender();
    }

    componentDidUpdate() {
        this.reRender();
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.shallReRenderD3Canvas;
    }

    getNodeIDtoLinkIDs(edges) {
        let data = {};
        edges.forEach(edge => {
            data[edge.source.id || edge.source] = data[edge.source.id || edge.source] || new Set();
            data[edge.target.id || edge.target] = data[edge.target.id || edge.target] || new Set();
            data[edge.source.id || edge.source].add(edge.id);
            data[edge.target.id || edge.target].add(edge.id);
        });
        return data;
    }

    getLinkIDtoLink(edges) {
        let data = {};
        edges.forEach(edge => {
            data[edge.id] = edge;
        });
        return data;
    }

    render() {
        const canvasClass = this.htmlSelectorId.replace(".", "");
        return (
            <div className={"D3GraphCanvas"}>
                <svg className={canvasClass} style={{
                    height: 'inherit',
                    width: 'inherit'
                }}></svg>
            </div>


        )
    }
}
