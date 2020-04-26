function show_notification(txt) {
    document.getElementById("notifications-div").innerText = txt;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function show_loading() {
    $(".page-loading").show();
}

function hide_loading() {
    $(".page-loading").hide();

}

function get_heading_fields(json_data) {
    if (json_data.length === 0) {
        return [];
    }
    let first_row = json_data[0];
    return Object.keys(first_row);
}

Array.prototype.extend = function (other_array) {
    /*
    lets you extend array like this
    var a = [1,2,3];
    var b = [5,4,3];
    a.extend(b);

     */
    /* You should include a test to check whether other_array really is an array */
    other_array.forEach(function (v) {
        this.push(v);
    }, this);
};
;class VertexUtils {

    constructor(canvas, color_schema) {
        this.canvas = canvas;
        this.color_schema = color_schema;
    }


    add(vertices, gremlin_canvas) {
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
                gremlin_canvas.onNodeHoverIn(d);
            })
            .on("mouseout", function (d) {
                gremlin_canvas.onNodeHoverOut(d);
            })
            .on("click", function (d) {
                gremlin_canvas.onNodeClicked(this, d);
            });

        node.append("title")
            .text(function (d) {
                return d.id;
            });

        node.append("text")
            .attr("dy", -3)
            .text(function (d) {
                return d.name;
            });

        return node;

    }

    remove(vertex) {

    }
};class EdgeUtils {

    constructor(canvas, color_schema) {
        this.canvas = canvas;
        this.color_schema = color_schema;

    }

    add(edges, gremlin_canvas) {

        let link = this.canvas.selectAll(".link")

            .data(edges)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr('marker-end', 'url(#arrowhead)')
            .on('mouseover', function (d) {
                gremlin_canvas.onLinkMoveHover(d);
            })
            .on('mouseout', function (d) {
                gremlin_canvas.onLinkMoveOut(d);
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
                },
                "fill": "#999"
            })
            .style("pointer-events", "none");

        let edgelabels = this.canvas.selectAll(".edgelabel")
            .data(edges)
            .enter()
            .append('text')
            .style("pointer-events", "none")
            .attr("dy", -2) //Move the text up/ down
            .attrs({
                'class': 'edgelabel',
                'id': function (d, i) {
                    return 'edgelabel-' + d.id;
                },
                'font-size': 12,
                'fill': '#999'
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
            .text(function (d) {
                return d.label;
            });

        return [link, edgepaths, edgelabels];

    }

    remove(edge) {

    }

}

;class GraphControls {

    hideVertexLabels() {
        $("g.node text").hide();
    }

    showVertexLabels() {
        $("g.node text").show();
    }

    hideEdgeLabels() {
        $(".edgelabel").hide();
    }

    showEdgeLabels() {
        $(".edgelabel").show();
    }

    center(gremlin_canvas) {
        // TODO - not completed
        // console.log("Centering the canvas")
        // gremlin_canvas.simulation.stop();
        // gremlin_canvas.simulation.force("charge", function(){
        //      return d3.forceManyBody().strength(-30)
        // });
        // gremlin_canvas.simulation.start();


        let root = gremlin_canvas.canvas;
        var bounds = root.node().getBBox();
        var parent = root.node().parentElement;
        var fullWidth = parent.clientWidth || parent.parentNode.clientWidth,
            fullHeight = parent.clientHeight || parent.parentNode.clientHeight;
        var width = bounds.width,
            height = bounds.height;
        var midX = bounds.x + width / 2,
            midY = bounds.y + height / 2;
        if (width === 0 || height === 0) return; // nothing to fit
        var scale = 0.85 / Math.max(width / fullWidth, height / fullHeight);
        var translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];
        let transitionDuration = 100;


        var transform = d3.zoomIdentity
            .translate(translate[0], translate[1])
            .scale(scale);

        gremlin_canvas
            .transition()
            .duration(transitionDuration || 0) // milliseconds
            .call(zoom.transform, transform);
    }


}
;class DataGraphCanvas {

    // Reference: http://bl.ocks.org/fancellu/2c782394602a93921faff74e594d1bb1
    constructor(html_selector_id, graph_ui) {
        this.html_selector_id = html_selector_id;
        this.graph_ui = graph_ui;
        this.color_schema = d3.scaleOrdinal(d3.schemeCategory10);

        this.vertices_list = [];
        this.edges_list = [];

        this.properties_canvas = d3.select("#properties-div");
        this.legend_canvas = d3.select("#legend-div svg");

        this.canvas = this.setup_canvas(html_selector_id);


        this.edge_utils = new EdgeUtils(this.canvas, this.color_schema);
        this.vertex_utils = new VertexUtils(this.canvas, this.color_schema);

        // canvas_width and canvas_height should be assigned as
        // soon as possible before any other methods being called.
        let _ = document.querySelector(html_selector_id).getBoundingClientRect();
        this.canvas_width = _.width;
        this.canvas_height = _.height;
        this.simulation = this.setup_simulation();
        this.controls = new GraphControls();
        this.NODE_ID_TO_LINK_IDS = {};
        this.LINK_ID_TO_LINK = {};
        this.remove_everything();

    }


    setup_canvas(html_selector_id) {
        // Per-type markers, as they don't inherit styles.
        let svg = d3.select(html_selector_id)
            .call(d3.zoom().on("zoom", function () {
                svg.attr("transform", d3.event.transform);
            }))
            .on("dblclick.zoom", null)   // double click zoom has been disabled since
            // we want double click to be reserved for highlighting neighbor nodes
            .append("g").attr("class", "everything");

        svg.select('*:not(circle), *:not(line), *:not(path), *:not(text), *:not(link)').on("click", function () {
            console.log("===>>>> canvas g clicked");
            d3.select(".node-menu").remove();
        });
        return svg;

    }

    remove_everything() {
        this.legend_canvas.selectAll("*").remove();
        d3.select(".everything").selectAll("*").remove();
        this.canvas.selectAll("*").remove();
    }


    reset_canvas_data() {
        // reset the this.vert
        this.vertices_list = [];
        this.edges_list = [];
    }

    clear_canvas() {
        // removes everything from the board.

        this.remove_everything();

        this.canvas.append('defs').append('marker')
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

    }

    setup_simulation() {

        let _this = this;
        let forceCollide = d3.forceCollide()
            .radius(function (d) {
                return d.radius + 1.2;
            })
            .iterations(1); /// TODO - revisit this
        const forceX = d3.forceX(this.canvas_width / 2).strength(0.040);
        const forceY = d3.forceY(this.canvas_height / 2).strength(0.040);


        return d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) {
                    return d.id;
                }).distance(150).strength(1)
            )
            .force("charge", _this.getSimulationCharge())
            .force("collide", forceCollide)
            .force('x', forceX)
            .force('y', forceY)
            .force("center", d3.forceCenter(this.canvas_width / 2, this.canvas_height / 2))
            .velocityDecay(0.4)
            .alphaTarget(0.1);
    }


    getSimulationCharge() {
        return d3.forceManyBody().strength(-1000);
    }

    getAdjacentNodeIds(nodeId) {
        let _this = this;
        let connectedLinkIds = this.NODE_ID_TO_LINK_IDS[nodeId] || new Set();
        let data = new Set([nodeId]);
        connectedLinkIds.forEach(linkId => {
            let link = _this.getLink(linkId);
            data.add(link.source.id);
            data.add(link.target.id);
        });
        return data;
    }

    getLink(linkId) {
        return this.LINK_ID_TO_LINK[linkId];
    }

    get_LINK_ID_TO_LINK(edges) {
        let data = {};
        edges.forEach(edge => {
            data[edge.id] = edge;
        });
        return data;
    }

    get_NODE_ID_TO_LINK_IDS(edges) {
        let data = {};
        edges.forEach(edge => {
            data[edge.source.id] = data[edge.source.id] || new Set();
            data[edge.target.id] = data[edge.target.id] || new Set();
            data[edge.source.id].add(edge.id);
            data[edge.target.id].add(edge.id);
        });
        return data;
    }

    getAdjacentLinkIds(nodeId) {
        return this.NODE_ID_TO_LINK_IDS[nodeId] || new Set();
    }

    expandInLinksAndNodes(selectedNode) {
        console.log("expandInLinksAndNodes", selectedNode);
        console.log("graph_ui", this.graph_ui);
        // TODO - improve performance of the query.


        let query_string = "node=g.V(" + selectedNode.id + ").toList(); " +
            "edges = g.V(" + selectedNode.id + ").outE().dedup().toList(); " +
            "other_nodes = g.V(" + selectedNode.id + ").outE().otherV().dedup().toList();" +
            "[other_nodes,edges,node]";

        this.graph_ui.submitQuery(query_string, false, false);

        return false;

    }

    expandOutLinksAndNodes(selectedNode) {
        console.log("expandOutLinksAndNodes", selectedNode);
        console.log("graph_ui", this.graph_ui);
        // TODO - improve performance of the query.
        let query_string = "node=g.V(" + selectedNode.id + ").toList(); " +
            "edges = g.V(" + selectedNode.id + ").inE().dedup().toList(); " +
            "other_nodes = g.V(" + selectedNode.id + ").inE().otherV().dedup().toList();" +
            "[other_nodes,edges,node]";
        this.graph_ui.submitQuery(query_string, false, false);
        return false;

    }

    closeNodeMenu(selectedNode) {
        console.log("closeNodeMenu clicked", selectedNode);
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
        console.log("thisNode is", thisNode);
        // this.legend_canvas.selectAll(".node");
        // .style("fill", function (d) {
        //     return fill(d.group);
        // });
        d3.select(".node-menu").remove();

        // thisNode.attr('r', 25).style("fill", "lightcoral");

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
                console.log(d);
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

    }


    onNodeHoverOut(selectedNode) {
        this.resetNodeHighlight(selectedNode);
        this.hideProperties();

    }

    showProperties(selected) {

        let data = Object.assign({}, selected);

        delete data.x;
        delete data.y;
        delete data.vy;
        delete data.vx;
        delete data.fx;
        delete data.fy;
        delete data.index;
        delete data.source;
        delete data.target;
        delete data.outV;
        delete data.inV;
        delete data.inVLabel;
        delete data.OutVLabel;
        document.getElementById("properties-div").style.display = "block";
        document.getElementById("properties-div").innerHTML = JSON.stringify(data, null, 2);
    }

    hideProperties() {
        document.getElementById("properties-div").style.display = "none";
        document.getElementById("properties-div").innerHTML = '';

    }


    onLinkMoveHover(selectedLink) {
        console.log("onLinkMoveHover", selectedLink);
        let nodeElements = this.canvas.selectAll('.node');
        let linkElements = this.canvas.selectAll('.link');

        linkElements.style('opacity', function (linkElement) {
            return selectedLink.id === linkElement.id ? '1' : '0.1';
        });

        let linkData = this.LINK_ID_TO_LINK[selectedLink.id];
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

    resetNodeHighlight(selectedNode) {
        let nodeElements = this.canvas.selectAll('.node');
        let linkElements = this.canvas.selectAll('.link');
        let linkLabels = this.canvas.selectAll('.edgelabel');

        nodeElements.style('opacity', '1');
        linkElements.style('opacity', '1');
        linkLabels.style('opacity', '1');
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


    onNodeHoverIn(selectedNode) {
        this.highlightHoveredNodesAndEdges(selectedNode);
        // console.log("onNodeHoverIn", selectedNode);
        this.showProperties(selectedNode);
    }

    add_vertices(vertices) {
        this.add_vertex_legend(vertices);
        return this.vertex_utils.add(vertices, this);
    }

    add_edges(edges) {
        this.add_edge_legend(edges);
        return this.edge_utils.add(edges, this);
    }

    add_vertex_legend(vertices) {

        let _this = this;
        let edges_legend_height = document.querySelector(".edges-legend").getBoundingClientRect().height;

        let legend = this.legend_canvas.append("g")
            .attr("class", "vertices-legend exclude-from-zoom")
            .attr("height", 0)
            .attr("width", 0)
            .attr('transform', 'translate(' + (10) + ',' + (edges_legend_height + 35) + ')');


        let legend_vertices_list = [];
        vertices.forEach(function (vertex) {
            if (legend_vertices_list.indexOf(vertex.label) === -1) {
                legend_vertices_list.push(vertex.label);
            }
        });

        console.log(" legend_vertices_list  ", legend_vertices_list);
        legend.selectAll('.legend-circle')
            .data(legend_vertices_list)
            .enter()
            .append('circle')
            .attr('class', 'legend-circle')
            .attr('transform', function (d, i) {
                return 'translate(' + (20) + ',' + ((i * 20) + 10) + ')';
            })
            .attr('r', 10)
            .style("fill", function (d, i) {
                return _this.color_schema(d);
            });

        legend.selectAll('.label')
            .data(legend_vertices_list)
            .enter()
            .append('text')
            .attr("x", "40")
            .attr("y", function (d, i) {
                return ((i * 20) + 15);
            })
            .text(function (d) {
                return d;
            });

    }

    add_edge_legend(edges) {
        let _this = this;


        let legend = this.legend_canvas.append("g")
            .attr("class", "edges-legend  exclude-from-zoom")
            .attr("height", 0)
            .attr("width", 0)
            .attr('transform', 'translate(' + (10) + ',30)');

        let legend_edges_list = [];
        edges.forEach(function (edge) {
            if (legend_edges_list.indexOf(edge.label) === -1) {
                legend_edges_list.push(edge.label);
            }
        });

        legend.selectAll('.legend-rect')
            .data(legend_edges_list)
            .enter()
            .append('rect')
            .attrs({width: 10, height: 4})

            .attr('class', 'legend-rect')
            .attr('transform', function (d, i) {
                return 'translate(' + (15) + ',' + ((i * 20) + 10) + ')';
            })
            .style("fill", function (d, i) {
                return _this.color_schema(d);
            });

        legend.selectAll('.label')
            .data(legend_edges_list)
            .enter()
            .append('text')
            .attr("x", "40")
            .attr("y", function (d, i) {
                return ((i * 20) + 15);
            })
            .style("fill", function (d, i) {
                return _this.color_schema(d);
            })
            .text(function (d) {
                return d;
            });

    }


    check_is_node_already_exist(node, existing_nodes) {
        var is_exist = false;
        existing_nodes.forEach(function (d) {
            if (d.id === node.id) {
                is_exist = true;
                return is_exist;
            }
        });
        return is_exist;
    }

    check_is_edge_already_exist(node, existing_links) {
        var is_exist = false;
        existing_links.forEach(function (d) {
            if (d.id === node.id) {
                is_exist = true;
                return is_exist;
            }
        });
        return is_exist;
    }


    draw(new_vertices, new_edges) {

        let _this = this;

        var overall_vertices = this.vertices_list;
        var overall_edges = this.edges_list;
        new_edges.forEach(function (d) {
            let is_exist = _this.check_is_edge_already_exist(d, overall_edges);
            if (!is_exist) {
                overall_edges.push(d);
            }

        });
        new_vertices.forEach(function (d) {
            let is_exist = _this.check_is_node_already_exist(d, overall_vertices);
            if (!is_exist) {
                overall_vertices.push(d);
            }
        });

        this.vertices_list = overall_vertices;
        this.edges_list = overall_edges;

        this.render_graph(overall_vertices, overall_edges);

    }


    render_graph(vertices, edges) {
        // add this data to the existing data

        let _this = this;

        this.clear_canvas();
        console.log("vertices " + vertices.length + "; edges " + edges.length);

        let _ = this.add_edges(edges);
        let link = _[0];
        let edgepaths = _[1];
        let edgelabels = _[2];

        let node = this.add_vertices(vertices);


        node
            .on("dblclick", function (d) {
                console.log("dblclick this, d", this, d);
                // d3.select(this).classed("fixed", d.fixed = false);
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


        function lock_node_position(d) {

        }

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
            // if (!d3.event.active) {
            //     _this.simulation.alphaTarget(0);
            // }
            console.log("======= dragended", d);
            // d.fixed = true;
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


        this.NODE_ID_TO_LINK_IDS = this.get_NODE_ID_TO_LINK_IDS(edges);
        this.LINK_ID_TO_LINK = this.get_LINK_ID_TO_LINK(edges);
        // console.log("LINK_ID_TO_LINK", this.LINK_ID_TO_LINK);
        // console.log("NODE_ID_TO_LINK_IDS", this.NODE_ID_TO_LINK_IDS);
    }


}

;class GremlinResponseSerializers {


    convert_vertex_property_to_json(property) {

        let _single_prop = property[0];
        if (_single_prop['@type'] !== "g:VertexProperty") {
            throw "Not a VertexProperty error. check if this is of g:VertexProperty type:: " + JSON.stringify(property);
        }
        let d = {};
        let value = _single_prop['@value'].value;
        d[_single_prop['@value'].label] = (typeof value === "string") ? value : value['@value'];
        return d;

    }


    convert_vertex_to_json(vtx) {
        if (vtx['@type'] !== "g:Vertex") {
            throw "Not a vertex error. check if this is of g:Vertex type:: " + JSON.stringify(vtx);
        }
        let d = {};
        d.type = "g:Vertex";
        let _this = this;
        d.id = vtx['@value'].id['@value'];
        d.label = vtx['@value'].label;
        let properties = vtx['@value'].properties;
        if (properties) {
            Object.keys(properties).forEach(function (key) {
                let property = properties[key];
                let _ = _this.convert_vertex_property_to_json(property);
                d[key] = _[key];
            });
        }

        return d;

    }


    convert_edge_property_to_json(property) {

        let _single_prop = property;
        if (_single_prop['@type'] !== "g:Property") {
            throw "Not a g:Property error. check if this is of g:Property type:: " + JSON.stringify(property);
        }
        let d = {};
        let value = _single_prop['@value'].value;
        d[_single_prop['@value'].key] = (typeof value === "string") ? value : value['@value'];
        return d;

    }


    convert_edge_to_json(edg) {
        if (edg['@type'] !== "g:Edge") {
            throw "Not a edge error. check if this is of g:Edge type:: " + JSON.stringify(edg);
        }
        let _this = this;
        let d = {};
        d.type = "g:Edge";
        d.label = edg['@value'].label;
        d.id = edg['@value'].id['@value'].relationId;
        d.inV = edg['@value'].inV['@value'];
        d.inVLabel = edg['@value'].inVLabel;
        d.outV = edg['@value'].outV['@value'];
        d.outVLabel = edg['@value'].outVLabel;

        let properties = edg['@value'].properties;

        if (properties) {
            Object.keys(properties).forEach(function (key) {
                let property = properties[key];
                let _ = _this.convert_edge_property_to_json(property);
                d[key] = _[key];
            });

        }

        return d;

    }

    convert_set_to_json(set_item) {

        if (set_item && "@type" in set_item) {
            if (set_item['@type'] !== "g:Set") {
                throw "Not a g:Set error. check if this is of g:Set type:: " + JSON.stringify(set_item);
            }
        }
        let _this = this;
        let items = [];
        if (set_item && '@value' in set_item) {
            set_item['@value'].forEach(function (item) {
                // TODO - NOT IMPLEMENTED - because no use case found yet.
                // let data_list = _this.process_item(item);
                // data_list.forEach(function (datum) {
                //     items.push(datum);
                // });
            });
        }
        return items;

    }

    convert_list_to_json(list_item) {
        console.log("convert_list_to_json list_item", list_item);
        if (list_item && "@type" in list_item) {
            if (list_item['@type'] !== "g:List") {
                throw "Not a List error. check if this is of g:List type:: " + JSON.stringify(list_item);
            }
        }
        let _this = this;
        let items = [];
        if (list_item && '@value' in list_item) {
            list_item['@value'].forEach(function (item) {
                let data_list = _this.process_item(item);
                console.log("data_list", data_list);
                data_list.forEach(function (datum) {
                    items.push(datum);
                });
            });
        }
        return items;

    }

    convert_bulkset_to_json(list_item) {
        console.log("Bulkset", list_item);
        if (list_item && "@type" in list_item) {
            if (list_item['@type'] !== "g:BulkSet") {
                throw "Not a g:BulkSet error. check if this is of g:BulkSet type:: " + JSON.stringify(list_item);
            }
        }
        let _this = this;
        let items = [];
        if (list_item && '@value' in list_item) {
            list_item['@value'].forEach(function (item) {
                let data_list = _this.process_item(item);
                console.log("====datalist", data_list, item);
                data_list.forEach(function (datum) {
                    items.push(datum);
                });
            });
        }
        return items;

    }

    convert_map_to_json(list_item) {

        if (list_item && "@type" in list_item) {
            if (list_item['@type'] !== "g:Map") {
                throw "Not a g:Map error. check if this is of g:Map type:: " + JSON.stringify(list_item);
            }
        }
        let _this = this;
        let items = [];
        if (list_item && '@value' in list_item) {
            list_item['@value'].forEach(function (item) {
                let data_list = _this.process_item(item);
                data_list.forEach(function (datum) {
                    items.push(datum);
                });
            });
        }
        return items;

    }


    convert_path_to_json(path_item) {

        if (path_item && "@type" in path_item) {
            if (path_item['@type'] !== "g:Path") {
                throw "Not a g:Path error. check if this is of g:Path type:: " + JSON.stringify(path_item);
            }
        }
        let _this = this;
        let items = [];
        if (path_item && '@value' in path_item) {
            if ("objects" in path_item['@value']) {
                path_item['@value'].objects['@value'].forEach(function (item) {
                    let data_list = _this.process_item(item);
                    data_list.forEach(function (datum) {
                        items.push(datum);
                    });
                });
            } else if ("labels" in path_item['@value']) {
                path_item['@value'].labels['@value'].forEach(function (item) {
                    let data_list = _this.process_item(item);
                    data_list.forEach(function (datum) {
                        items.push(datum);
                    });
                });
            }
        }
        return items;

    }

    process_item(item) {
        // this is very useful to route to the respective renderers;
        let _this = this;
        console.log("process item", typeof item, item);
        if (item && typeof item === "object" && '@type' in item) {
            if (item['@type'] === "g:Vertex") {
                let _ = _this.convert_vertex_to_json(item);
                return [_];
            } else if (item['@type'] === "g:Edge") {
                let _ = _this.convert_edge_to_json(item);
                return [_];
            } else if (item['@type'] === "g:List") {
                console.log("=======items", item);
                return _this.convert_list_to_json(item);
            } else if (item['@type'] === "g:Path") {
                console.log("=======items", item);
                return _this.convert_path_to_json(item);
            } else if (item['@type'] === "g:Set") {
                console.log("=======items", item);
                return _this.convert_set_to_json(item);
            } else if (item['@type'] === "g:BulkSet") {
                console.log("=======items", item);
                return _this.convert_bulkset_to_json(item);
            } else if (item['@type'] === "g:Map") {
                console.log("=======items", item);
                return _this.convert_map_to_json(item);
            }else{
                return [];
            }
        }else{
            return [];
        }

    }

    process(response) {
        let request_id = response.request_id;
        let data = response.result.data;
        return this.convert_list_to_json(data);
    }

    seperate_vertices_and_edges(data) {
        let vertices = [];
        let edges = [];
        if (data) {
            data.forEach(function (d) {
                if (d.type === "g:Vertex") {
                    vertices.push(d);
                } else if (d.type === "g:Edge") {
                    d.source = d.inV;
                    d.target = d.outV;
                    edges.push(d);
                }
            });
        }
        return [vertices, edges];
    }
};class GremlinConnector {

    setup_gremlin_server_socket(gremlin_server_url, message_callback) {
        /*
        Usage:


        let onMessageReceived = function (event) {
            let data = JSON.parse(event.data);
            console.log("onMessageReceived", data);

        }
        let socket = new setup_gremlin_server_socket(GREMLIN_SERVER_URL, onMessageReceived)


         */

        let _this = this;
        let ws = new WebSocket(gremlin_server_url);
        show_notification("Connecting to gremlin server url :" + gremlin_server_url);

        ws.onopen = function (event) {
            show_notification("Connected to Server");
            $("#connection-status span")
                .removeClass()
                .addClass("server-connected")
                .html("Connected Successfully")
                .attr("title", "Connected");
        };

        ws.onmessage = function (event) {
            show_notification("Message Received");
            message_callback(event);
        };

        // An event listener to be called when an error occurs.
        ws.onerror = function (err) {
            console.log('Connection error using websocket', err);
            show_notification("Something went wrong");
            $("#connection-status span")
                .removeClass()
                .addClass("server-not-connected")
                .html("Connection closed")
                .attr("title", "Unable to Connect");
        };

        // An event listener to be called when the connection is closed.
        ws.onclose = function (err) {
            console.log('Connection error using websocket', err);
            let retry_in = 10;
            show_notification("Connection Closed");
            $("#connection-status span")
                .removeClass()
                .addClass("server-not-connected")
                .html("Connection closed")

                .attr("title", "Connection Closed");


            let i = 1;
            let timer = setInterval((function () {

                    show_notification("Connection Attempt Failed. Waited " + i + "s of " + (retry_in) + "s 'retry in' time...");
                    i += 1;

                    if (i > retry_in) {
                        clearInterval(timer);
                        _this.ws = _this.setup_gremlin_server_socket(gremlin_server_url, message_callback);

                    }
                }
            ).bind(this), 1000); // retry in 5 seconds


        };
        return ws;
    }

    constructor(gremlin_server_url, message_callback) {
        this.ws = this.setup_gremlin_server_socket(gremlin_server_url, message_callback);
    }

    send(msg) {
        console.log("sending the query message", msg);
        this.ws.send(JSON.stringify(msg), {mask: true});
    }

}



;class InvanaKnowledgeGraphUI {

    constructor(gremlin_server_url, html_selector_id) {

        this.GREMLIN_SERVER_URL = gremlin_server_url; //"ws://127.0.0.1:8182/gremlin";
        this.html_selector_id = html_selector_id;
        this.canvas_selector_id = "#graph-area";
        this.gremlinConnector = null;
        this.init_html();
        this.graph_canvas = new DataGraphCanvas(this.canvas_selector_id, this);
    }

    init_html() {
        let html_structure = "<div class=\"invana-graph-viewer\">\n" +
            "    <div class=\"page-loading\" style=\"display: none\">\n" +
            "        <div class=\"loader-spin\"></div>\n" +
            "        <p class=\"text-center\">Loading ...</p>\n" +
            "    </div>\n" +
            "    <nav class=\"invana-graph-viewer-nav\">\n" +
            "        <div class=\"invana-graph-viewer-nav-brand\">\n" +
            "            <h3>Graph Studio</h3>\n" +
            "        </div>\n" +
            "        <div class=\"invana-graph-viewer-query\">\n" +
            "            <form id=\"header-query-form\">\n" +
            "                <input name=\"query\" type=\"text\" placeholder=\"Query the Graph here. Example: g.V().limit(5).toList()\">\n" +
            "            </form>\n" +
            "        </div>\n" +
            "\n" +
            "    </nav>\n" +
            "    <section class=\"canvas-section\">\n" +
            "        <div id=\"graph-area-wrapper\" class=\"full-screen\">\n" +
            "            <svg id=\"graph-area\" width=\"100%\" height=\"100%\">\n" +
            "            </svg>\n" +
            "        </div>\n" +
            "    </section>\n" +
            "    <div id=\"legend-div\">\n" +
            "        <svg></svg>\n" +
            "    </div>\n" +
            "    <pre id=\"properties-div\"></pre>\n" +
            "    <div id=\"controls-div\">\n" +
            "    </div>\n" +
            "    <div id=\"notifications-div\"></div>\n" +
            "    <div id=\"connection-status\"><span></span></div>\n" +
            "</div>";

        $(this.html_selector_id).html($(html_structure));

    }

    addQueryToUrl(query) {
        let u = new URL(location.href);
        var searchParams = new URLSearchParams(window.location.search);
        searchParams.set("query", query);
        if (window.history.replaceState) {
            //prevents browser from storing history with each change:
            // no history will be added with replaceState
            window.history.pushState({}, null, u.origin + u.pathname + "?" + searchParams.toString());
        }
    }


    submitQuery(query, validate_query, shall_update_url, clear_canvas) {
        let _this = this;

        if (typeof shall_update_url === "undefined") {
            shall_update_url = true;
        }
        if (typeof clear_canvas === "undefined") {
            clear_canvas = false;
        }

        if (clear_canvas) {
            this.graph_canvas.reset_canvas_data();
        }
        if (validate_query && !query) {
            alert("Query cannot be Blank");
        } else {
            if (query) { // soft ignore
                let msg = {
                    "requestId": uuidv4(),
                    "op": "eval",
                    "processor": "",
                    "args": {
                        "gremlin": query,
                        "bindings": {},
                        "language": "gremlin-groovy"
                    }
                };
                show_loading();
                if (shall_update_url === true) {
                    _this.addQueryToUrl(query);
                    $('[name="query"]').val(query);
                }
                _this.gremlinConnector.send(msg);
            }
        }
    }

    onPageLoadInitQuery() {
        let query = new URLSearchParams(window.location.search).get("query");
        this.submitQuery(query, false, true);

    }

    onHeaderQuerySubmit(_this, e) {

        e.preventDefault();
        let query = $('#header-query-form [name="query"]').val();
        console.log("query is ", query);
        _this.submitQuery(query, false, true, true);
    }

    start() {
        let _this = this;

        let gremlin_response_serializers = new GremlinResponseSerializers();

        let onMessageReceived = function (event) {
            let response = JSON.parse(event.data);
            console.log("onMessageReceived", response);
            let json_data = gremlin_response_serializers.process(response);
            console.log("json_data", json_data);

            show_notification("Rendered graph");
            let _ = gremlin_response_serializers.seperate_vertices_and_edges(json_data);
            let vertices = _[0];
            let edges = _[1];
            _this.graph_canvas.draw(vertices, edges);
            hide_loading();

        };
        this.gremlinConnector = new GremlinConnector(this.GREMLIN_SERVER_URL, onMessageReceived);


        $("#header-query-form").submit(function (e) {
            _this.onHeaderQuerySubmit(_this, e);
        });

        this.gremlinConnector.ws.addEventListener('open', function (event) {
            _this.onPageLoadInitQuery();
        });


    }
}

// $(document).ready(function () {
//
//     $('[name="vertex_label_toggle"]').change(function () {
//         if ($(this).is(":checked")) {
//             graph_canvas.controls.showVertexLabels();
//         } else {
//             graph_canvas.controls.hideVertexLabels();
//         }
//     });
//     $('[name="edge_label_toggle"]').change(function () {
//         if ($(this).is(":checked")) {
//             graph_canvas.controls.showEdgeLabels();
//         } else {
//             graph_canvas.controls.hideEdgeLabels();
//         }
//     });
// });