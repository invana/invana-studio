import React from "react";
import * as d3 from 'd3';
import 'd3-selection-multi'
import GraphControls from "./controls-handler";

export default class GraphCanvas extends React.Component {

    html_selector_id = ".main-canvas";
    // NODE_ID_TO_LINK_IDS = {};
    // LINK_ID_TO_LINK = {};
    controls = new GraphControls();


    constructor(props) {
        super(props);

        this.state = {
            canvas: null,
        }
    }

    resetNodeHighlight(selectedNode) {
        let nodeElements = this.canvas.selectAll('.node');
        let linkElements = this.canvas.selectAll('.link');
        let linkLabels = this.canvas.selectAll('.edgelabel');

        nodeElements.style('opacity', '1');
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

    showProperties(properties) {
        this.props.setSelectedData({
            "selectedData": properties,
            "showProperties": true
        })
    }

    hideProperties() {
        this.props.setSelectedData({
            "selectedData": {},
            "showProperties": false
        })
    }

    getAdjacentNodeIds(nodeId) {
        let _this = this;
        let connectedLinkIds = this.props.NODE_ID_TO_LINK_IDS[nodeId] || new Set();
        let data = new Set([nodeId]);
        connectedLinkIds.forEach(linkId => {
            let link = _this.props.LINK_ID_TO_LINK[linkId];
            data.add(link.source.id);
            data.add(link.target.id);
        });
        return data;
    }

    highlightHoveredNodesAndEdges(selectedNode) {
        // this is performance intensive operation
        let nodeElements = this.canvas.selectAll('.node');
        let linkElements = this.canvas.selectAll('.link');
        let linkLabels = this.canvas.selectAll('.edgelabel');


        let adjacentNodeIds = this.getAdjacentNodeIds(selectedNode.id);
        nodeElements.style('opacity', function (nodeElement) {
            return adjacentNodeIds.has(nodeElement.id) ? '1' : '0.1';
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
        return this.props.NODE_ID_TO_LINK_IDS[nodeId] || new Set();
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
        console.log("closeNodeMenu clicked", selectedNode);
        this.hideProperties();
        d3.select(".node-menu").remove();
    }

    releaseNodeLock(selectedNode) {
        console.log("releaseNodeLock clicked", selectedNode);
        selectedNode.fixed = false;
        selectedNode.fx = null;
        selectedNode.fy = null;
        this.simulation.alpha(0.3).restart();

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
        var widthMenu = 180,
            heightMenu = 180,
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
            .attr("x", -90)
            .attr("y", -90)
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
        // .on("mouseover", function(d) {tip.hide(d);});

        // Add colors
        var path = g.append("path")
            .attr("d", arc)
            .attr("fill", function (d) {
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
            // tip.hide(d);
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

    addVertices(vertices) {

        console.log("VertexUtils.add", vertices, this.canvas);
        let _this = this;
        let node = this.canvas.selectAll(".node")
            .data(vertices)
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("id", function (d) {
                return "node-" + d.id;
            });


        node.append("circle")
            .attr("r", 20)
            .style("fill", function (d, i) {
                return _this.color_schema(d.label);
            })
            .style("cursor", "pointer")
            .on("mouseover", function (d) {
                _this.onNodeHoverIn(d);
            })
            .on("mouseout", function (d) {
                _this.onNodeHoverOut(d);
            })
            .on("click", function (d) {
                _this.onNodeClicked(this, d);
            });

        node.append("title")
            .text(function (d) {
                return d.properties.name || d.id;
            });

        node.append("text")
            .attr("dy", -3)
            .text(function (d) {
                return d.properties.name || d.id;
            })
            .style("fill", function (d, i) {
                return "#ececec";
            })
            .style("font-size", function (d, i) {
                return "12px";
            })
            .style("font-weight", function (d, i) {
                return "bold";
            });

        return node;
    }

    onLinkMoveHover(selectedLink) {
        console.log("onLinkMoveHover", selectedLink);
        let nodeElements = this.canvas.selectAll('.node');
        let linkElements = this.canvas.selectAll('.link');

        linkElements.style('opacity', function (linkElement) {
            return selectedLink.id === linkElement.id ? '1' : '0.1';
        });

        let linkData = this.props.LINK_ID_TO_LINK[selectedLink.id];
        let adjacentNodeIds = new Set([linkData.source.id, linkData.target.id]);

        nodeElements.style('opacity', function (nodeElement) {
            return adjacentNodeIds.has(nodeElement.id) ? '1' : '0.1';
        });


        d3.select('#link-' + selectedLink.id).style('stroke', "black");
        this.showProperties(selectedLink);

    }

    onLinkMoveOut(selectedLink) {
        let nodeElements = this.canvas.selectAll('.node');
        let linkElements = this.canvas.selectAll('.link');

        nodeElements.style('opacity', '1');
        linkElements.style('opacity', '1');


        d3.select('#link-' + selectedLink.id).style('stroke', "#666");
        this.hideProperties();
    }

    addEdges(edges) {

        let _this = this
        let link = this.canvas.selectAll(".link")

            .data(edges)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr('marker-end', 'url(#arrowhead)')
            .on('mouseover', function (d) {
                _this.onLinkMoveHover(d);
            })
            .on('mouseout', function (d) {
                _this.onLinkMoveOut(d);
            })
            .attr('id', function (d, i) {
                return 'link-' + d.id;
            })
            .style('stroke-width', 2)
            .style('stroke', "#999");

        link.append("title")
            .text(function (d) {
                return d.label;
            });

        let edgepaths = this.canvas.selectAll(".edgepath")
            .data(edges)
            .enter()
            .append('path')
            .attrs({
                'class': 'edgepath',
                'fill-opacity': 0,
                'stroke-opacity': 0,
                'id': function (d, i) {
                    return 'edgepath-' + d.id;
                }
            })
            .style("fill", function (d, i) {
                return _this.color_schema(d);
            })
            .style("pointer-events", "none");

        let edgelabels = this.canvas.selectAll(".edgelabel")
            .data(edges)
            .enter()
            .append('text')
            .style("pointer-events", "none")
            .attr("dy", -3) //Move the text up/ down
            .style("fill", function (d, i) {
                return _this.color_schema(d);
            })
            .attrs({
                'class': 'edgelabel',
                'id': function (d, i) {
                    return 'edgelabel-' + d.id;
                },
                'font-size': 12,
            });

        edgelabels.append('textPath')
            .attr('xlink:href', function (d, i) {
                return '#edgepath-' + d.id;
            })
            .style("text-anchor", "middle")
            // .style("text-transform", "uppercase")
            .style("background", "#ffffff")
            .style("pointer-events", "none")
            .attr("startOffset", "50%")
            .style("fill", function (d, i) {
                return _this.color_schema(d);
            })
            .text(function (d) {
                return d.label;
            });

        return [link, edgepaths, edgelabels];


    }

    setupSimulation(canvas_width, canvas_height) {

        let forceCollide = d3.forceCollide()
            .radius(function (d) {
                return d.radius + 1.2;
            })
            .iterations(1); /// TODO - revisit this
        const forceX = d3.forceX(canvas_width / 2).strength(0.040);
        const forceY = d3.forceY(canvas_height / 2).strength(0.040);

        let getSimulationCharge = function () {
            return d3.forceManyBody().strength(-1000);
        }

        return d3.forceSimulation()
            .force("link", d3.forceLink()
                .id(function (d) {
                    console.log("=================link", d);
                    return d.id;
                })
                .distance(150).strength(1)
            )
            .force("charge", getSimulationCharge())
            .force("collide", forceCollide)
            .force('x', forceX)
            .force('y', forceY)
            .force("center", d3.forceCenter(canvas_width / 2, canvas_height / 2))
            .velocityDecay(0.4)
            .alphaTarget(0.1);
    }

    setupCanvas() {
        d3.select(this.html_selector_id).selectAll("*").remove();
        let svg = d3.select(this.html_selector_id)
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
        return svg;
    }

    removeEverythingInCanvas(canvas) {
        console.log("removeEverythingInCanvas");
        // d3.select(".everything").remove();
        canvas.selectAll(".everything").remove();
        canvas.selectAll("*").remove();
        d3.select(this.html_selector_id).selectAll("*").remove();
        return canvas;
    }

    setupMarker(canvas) {

        canvas.append('defs').append('marker')
            .attrs({
                'id': 'arrowhead',
                'viewBox': '-0 -5 10 10',
                'refX': 23,
                'refY': 0,
                'orient': 'auto',
                'markerWidth': 7,
                'markerHeight': 7,
                'xoverflow': 'visible'
            })
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#666')
            .style('stroke', 'none');
        return canvas;

    }

    startFreshCanvas() {
        // removes everything from the board.
        // console.log("=======startFreshCanvas this.state", this.state);
        // if (this.canvas) {
        //     this.removeEverythingInCanvas();
        //     this.setupMarker();
        // }
        // this.removeEverythingInCanvas();
        let canvas = this.setupCanvas();
        // canvas = this.removeEverythingInCanvas(canvas);
        return this.setupMarker(canvas);
    }

    startRenderingGraph(nodes, links) {
        // add this data to the existing data


        console.log("^^^^^^^^startRenderingGraph^^^^^^^^^", this.canvas);
        console.log("^^^^^^^^startRenderingGraph^^^^^^^^^ nodes", nodes.length);
        console.log("^^^^^^^^startRenderingGraph^^^^^^^^^ links", links.length);

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
                    _this.simulation.alphaTarget(0.3).restart();
                }
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            );


        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragstarted(d) {
            if (!d3.event.active) {
                _this.simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;

        }

        function dragended(d) {
            if (!d3.event.active) {
                _this.simulation.alphaTarget(0);
            }
            _this.simulation.alpha(0.3).restart();
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
            link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });


            node
                .attr("transform", function (d) {
                    return "translate(" + d.x + ", " + d.y + ")";
                });

            edgepaths.attr('d', function (d) {
                return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
            });

            edgelabels.attr('transform', function (d) {
                if (d.target.x < d.source.x) {
                    let bbox = this.getBBox();

                    let rx = bbox.x + bbox.width / 2;
                    let ry = bbox.y + bbox.height / 2;
                    return 'rotate(180 ' + rx + ' ' + ry + ')';
                } else {
                    return 'rotate(0)';
                }
            });
        }


    }


    componentDidMount() {


        // this.startRenderingGraph(this.props.nodes, this.props.links);

    }

    componentWillUnmount() {
        // this.canvas = null;
        // this.color_schema = null;
        // this.simulation = null;
    }


    componentDidUpdate(prevProps) {
        // // Typical usage (don't forget to compare props):
        // console.log("componentDidUpdate===== this.props", this.props,);
        // console.log("componentDidUpdate===== prevProps", prevProps);
        // if (
        //     this.checkIfChanged(this.props.nodes, prevProps.nodes) ||
        //     this.checkIfChanged(this.props.links, prevProps.links)
        // ) {

        // this.removeEverythingInCanvas(this.canvas);
        this.canvas = this.startFreshCanvas();
        let canvasDimensions = document.querySelector(this.html_selector_id).getBoundingClientRect();
        this.color_schema = d3.scaleOrdinal(d3.schemeCategory10);
        this.simulation = this.setupSimulation(canvasDimensions.width, canvasDimensions.height);

        this.startRenderingGraph(this.props.nodes, this.props.links)
        // }
    }

    shouldComponentUpdate(nextProps, nextState) {

        return nextProps.isDataChanged
        // return true;

    }

    render() {
        console.log("<<<<<<<<< rendering GraphCanvas", this.props.nodes.length, this.props.links.length);
        // if (this.canvas && this.simulation) {
        //     this.startRenderingGraph(this.props.nodes, this.props.links);
        // }

        let canvasClass = this.html_selector_id.replace(".", "");

        return (

            <svg className={canvasClass}></svg>

        )
    }
}
