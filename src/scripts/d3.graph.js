class DataGraphCanvas {

    // Reference: http://bl.ocks.org/fancellu/2c782394602a93921faff74e594d1bb1
    constructor(html_selector_id, graph_ui) {
        this.html_selector_id = html_selector_id;
        this.graph_ui = graph_ui;
        this.color_schema = d3.scaleOrdinal(d3.schemeCategory10);

        this.vertices_list = [];
        this.edges_list = [];

        this.canvas = this.setup_canvas(html_selector_id);

        this.properties_canvas = d3.select("#properties-div");
        this.legend_canvas = d3.select("#legend-div svg");
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
        return svg;

    }

    clear_canvas() {

        this.legend_canvas.selectAll("*").remove();
        this.canvas.selectAll("*").remove();

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
            })
                .distance(150).strength(1))
            .force("charge", _this.getSimulationCharge())
            .force("collide", forceCollide)
            .force('x', forceX)
            .force('y', forceY)
            .force("center", d3.forceCenter(this.canvas_width / 2, this.canvas_height / 2))
            .velocityDecay(0.4)
            .alphaTarget(0.1);
    }


    getSimulationCharge() {
        return d3.forceManyBody().strength(-300);
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


    onNodeClicked(thisnode, selectedNode) {
        console.log("onNodeClicked", selectedNode);
        let _this = this;
        let thisNode = d3.select(thisnode);

        this.legend_canvas.selectAll(".node");
        // .style("fill", function (d) {
        //     return fill(d.group);
        // });
        d3.select(".menu").remove();

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
            option_name: "not-assigned",
            title: "not assigned",
            html: "."
        }, {
            id: 105,
            option_name: "in-links",
            title: "in links",
            html: "&rarr;"
        }, {
            id: 105,
            option_name: "not-assigned",
            title: "not assigned",
            html: "."
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
            .attr("class", "menu")
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
            .on("click", function (arch_node) {
                console.log("You clicked on: ", arch_node.data.option_name, " and its id is: ", arch_node.data.id);
                console.log("Its node is: ", selectedNode);
                if (arch_node.data.option_name === "out-links") {
                    _this.expandOutLinksAndNodes(selectedNode);
                } else if (arch_node.data.option_name === "in-links") {
                    _this.expandInLinksAndNodes(selectedNode);
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
            .attr("stroke", function (d) {
                return "#ffffff"; // color(d.data.size);
            });
        // .on("mouseenter", tip.hide);


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

        node.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", _this.dragged)
            .on("end", dragended)
        );


        function dragstarted(d) {
            // let _this = this;
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
            d.fx = null;
            d.fy = null;
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


    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }


}

