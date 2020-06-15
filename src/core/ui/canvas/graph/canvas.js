import React from "react";
import GraphControls from "./graph-controls";
import {prepareLinksDataForCurves, prepareNodesDataWithOptions} from "./canvas-utils";
import {LightenDarkenColor} from "./utils";
import "./graph.scss";

import {
    DefaultHoverOpacity,
    DefaultLinkTextColor,
    DefaultLinkStrokeWidth,
    DefaultLinkPathColor,
    DefaultNodeRadius,
    DefaultLinkDistance,
    linkCurvature
} from "../../../../config";
import * as d3 from 'd3';
import 'd3-selection-multi';

export default class D3ForceDirectedCanvas extends React.Component {

    static defaultProps = {
        nodes: [],
        links: [],
        shallReRenderD3Canvas: null,
        getSelectedElementDataFn: (selectedData) => console.error("getSelectedElementDataFn not set"),
        queryGremlinServer: () => console.error("queryGremlinServer not set"),
    }
    canvas = null;
    htmlSelectorId = ".main-canvas";
    // nodeIDtoLinkIDs = {};
    // linkIDtoLinkMap = {};
    controls = new GraphControls();

    resetNodeHighlight(selectedNode) {
        let nodeElements = this.canvas.selectAll('.node .circle');
        let linkElements = this.canvas.selectAll('.link');
        let linkLabels = this.canvas.selectAll('.edgelabel');

        nodeElements.style('fill', (nodeElement) => nodeElement.meta.shapeOptions.fillColor);
        linkElements.style('opacity', '1');
        linkLabels.style('opacity', '1');
    }

    onNodeHoverOut(selectedNode) {
        this.resetNodeHighlight(selectedNode);

    }

    onNodeHoverIn(selectedNode) {
        this.highlightHoveredNodesAndEdges(selectedNode);
        // console.log("onNodeHoverIn", selectedNode);
    }

    showProperties(selectedNode) {
        this.props.getSelectedElementDataFn(
            selectedNode
        )
    }

    hideProperties() {
        this.props.getSelectedElementDataFn(
            null
        )
    }

    getAdjacentNodeIds(nodeId) {
        let _this = this;
        console.log("nodeIDtoLinkIDs", nodeId, this.nodeIDtoLinkIDs)
        let connectedLinkIds = this.nodeIDtoLinkIDs[nodeId] || new Set();
        console.log("connectedLinkIds", connectedLinkIds)
        let data = new Set([nodeId]);
        connectedLinkIds.forEach(linkId => {
            let link = this.linkIDtoLinkMap[linkId];
            data.add(link.source.id);
            data.add(link.target.id);
        });
        return data;
    }

    highlightHoveredNodesAndEdges(selectedNode) {
        // this is performance intensive operation
        // let nodeElements = document.querySelectorAll('.everything .node');
        let nodeElements = this.canvas.selectAll('.node .circle');
        let linkElements = this.canvas.selectAll('.link');
        let linkLabels = this.canvas.selectAll('.edgelabel');
        let adjacentNodeIds = this.getAdjacentNodeIds(selectedNode.id);
        nodeElements.style('fill', function (nodeElement) {
            return adjacentNodeIds.has(nodeElement.id) ? LightenDarkenColor(nodeElement.meta.shapeOptions.fillColor, -50) : nodeElement.meta.shapeOptions.fillColor;
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

    closeNodeMenu(selectedNode) {
        console.log("closeNodeMenu clicked", selectedNode, d3.select(".node-menu").selectAll("*"));
        this.hideProperties();
        setTimeout(function () {
            d3.select(".node-menu").selectAll("*").remove();
            if (document.querySelector(".node-menu")) {
                document.querySelector(".node-menu").remove();
            }
        }, 50);
    }

    releaseNodeLock(selectedNode) {
        console.log("releaseNodeLock clicked", selectedNode);
        selectedNode.fixed = false;
        selectedNode.fx = null;
        selectedNode.fy = null;
        this.simulation.alpha(DefaultHoverOpacity).restart();
    }

    onNodeClicked(thisnode, selectedNode) {
        console.log("onNodeClicked:: thisnode : selectedNode", thisnode, selectedNode);
        let _this = this;
        let thisNode = d3.select("#node-" + selectedNode.id);
        d3.select(".node-menu").remove();

        var menuDataSet = [{
            id: 101,
            option_name: "not-assigned",
            title: "not assigned",
            html: "."
        }, {
            id: 102,
            option_name: "out-links",
            title: "out links",
            html: "&rarr;"
        }, {
            id: 103,
            option_name: "not-assigned",
            title: "not assigned",
            html: "."
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
            .value(function (d) {
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
                } else {
                    alert("not implemented");
                }
            });

        // Add colors
        var path = g.append("path")
            .attr("d", arc)
            .attr("fill", function (d) {
                return "#333333"; // color(d.data.size);
            })
            .attr("stroke-width", "2px")
            .attr("stroke", function (d) {
                return "#333333"; // color(d.data.size);
            });

        // Add labels
        var labels = g.append("text")
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
        path.on("mouseenter", function (d, i) {
            d3.select(this)
                .attr("fill", "#555555")
                .attr("cursor", "pointer")
                .attr("class", "on");
        });

        path.on("mouseout", function (d) {
            d3.select(this)
                .attr("fill", function (d) {
                    return "#333333";
                })
                .attr("class", "off");
        });
        this.showProperties(selectedNode);
    }


    addVertices(nodesData) {
        console.log("VertexUtils.add", nodesData);
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
            .on("click", (d) => this.onNodeClicked(_this, d))

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
            .style("font-size", function (d) {
                return "12px";
            })
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
            .style("font-size", function (d) {
                return "12px";
            })
            .attr("height", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4)) // side
            .append("xhtml:body")
            .style("color", (d) => d.meta.shapeOptions.textColor)
            .style("font-size", "16px") // make this dynamic based on the node radius also
            .style("margin", "0")
            .style("text-align", "center")
            .style("background", "transparent");

        inShapeTextNode.append("xhtml:h6")
            // .style("display", "block")
            // .style("vertical-align", "middle")
            .style("font-size", "10px")
            .style("font-weight", "bold")
            .style("color", (d) => d.meta.shapeOptions.textColor)
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
            .style("color", (d) => d.meta.shapeOptions.textColor)
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
            .style("font-size", function (d) {
                return "12px";
            })
            .attr("height", (d) => 2 * d.meta.shapeOptions.radius * Math.cos(Math.PI / 4)) // side
            .append("xhtml:body")
            .style("color", (d) => d.meta.shapeOptions.textColor)
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
            .style("font-size", (d) => "12px")
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
            return adjacentNodeIds.has(nodeElement.id) ? LightenDarkenColor(nodeElement.meta.shapeOptions.fillColor, -50) : nodeElement.meta.shapeOptions.fillColor;
        });
        d3.select('#link-' + selectedLink.id).style('stroke', "black");
        this.showProperties(selectedLink);
    }

    onLinkMoveOut(selectedLink) {
        let nodeElements = this.canvas.selectAll('.node .circle');
        let linkElements = this.canvas.selectAll('.link');

        nodeElements.style('fill', (nodeElement) => nodeElement.meta.shapeOptions.fillColor);
        linkElements.style('opacity', '1');
        d3.select('#link-' + selectedLink.id).style('stroke', "#666");
        this.hideProperties();
    }

    addEdges(edges) {
        let _this = this
        let links = this.canvas
            .selectAll("g.links")
            .data(edges)
            .enter().append("g")
            .attr("cursor", "pointer")

        links
            .append("svg:marker")
            .attr("id", (d, i) => "link-arrow-" + d.id)
            .attr("viewBox", "0 -5 10 10")
            .attr("refY", 0)
            // .attr("refX", function (d, i) {
            //     console.log("=====marker", d);
            //     return d.target.meta.shapeOptions.radius
            //         - (d.target.meta.shapeOptions.radius / 4)
            //         + d.target.meta.shapeOptions.strokeWidth
            //
            // })
            .attr("refX", (d, i) => (DefaultNodeRadius - (DefaultNodeRadius / 4) + DefaultLinkStrokeWidth))
            .attr("fill", (d) => DefaultLinkPathColor)
            .attr("stroke", (d) => DefaultLinkPathColor)
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
            .attr("association-id", function (d, i) {
                return "link-" + d.target + "-" + d.source;
            })
            .attr("sameIndexCorrected", function (d, i) {
                return d.sameIndexCorrected;
            })
            .attr('stroke', DefaultLinkPathColor)
            .attr("stroke-width", DefaultLinkStrokeWidth + "px")
            .attr("fill", "transparent")
            // .attr('marker-end', (d, i) => 'url(#link-arrow-' + i + ')')
            .attr('marker-end', (d, i) => 'url(#arrowhead)')
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
            .text((d, i) => `${d.label || d.id}`);
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
        let link = _[0];
        let edgepaths = _[1];
        let edgelabels = _[2];
        let node = this.addVertices(vertices);
        node
            .on("dblclick", function (d) {
                d.fixed = false;
                if (!d3.event.active) {
                    _this.simulation.alphaTarget(DefaultHoverOpacity).restart();
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
                _this.simulation.alphaTarget(DefaultHoverOpacity).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragEnded(d) {
            if (!d3.event.active) {
                _this.simulation.alphaTarget(0);
            }
            _this.simulation.alpha(DefaultHoverOpacity).restart();
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
        console.log("===== this.props", this.props);
        this.canvas = this.startFreshCanvas();
        this.canvasDimensions = document.querySelector(this.htmlSelectorId).getBoundingClientRect();
        console.log("canvasDimensions", this.canvasDimensions)
        // this.color_schema = d3.scaleOrdinal(d3.schemeCategory10);
        this.simulation = this.setupSimulation(this.canvasDimensions.width, this.canvasDimensions.height);

        const nodeOptions = Object.assign({}, JSON.parse(localStorage.getItem('nodeLabels')));
        let linksData = prepareLinksDataForCurves(this.props.links);
        let nodesData = prepareNodesDataWithOptions(this.props.nodes, nodeOptions);
        // let nodesData = this.props.nodes;
        this.startRenderingGraph(nodesData, linksData)
        this.nodeIDtoLinkIDs = this.getNodeIDtoLinkIDs(this.props.links)
        this.linkIDtoLinkMap = this.getLinkIDtoLink(this.props.nodes)
    }

    componentDidMount() {
        this.reRender();
    }

    componentDidUpdate(prevProps) {
        this.reRender();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.shallReRenderD3Canvas
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
                <svg className={canvasClass}></svg>
            </div>


        )
    }
}
