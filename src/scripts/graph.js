class VertexUtils {
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
            .on("mouseover", function (d) {
                gremlin_canvas.onNodeHoverIn(d);
            })
            .on("mouseout", function (d) {
                gremlin_canvas.onNodeHoverOut(d);
            })


        node.append("circle")
            .attr("r", 10)
            .style("fill", function (d, i) {
                return _this.color_schema(d.label);
            }).style("cursor", "pointer")

        node.append("title")
            .text(function (d) {
                return d.id;
            });

        node.append("text")
            .attr("dy", -3)
            .text(function (d) {
                return d.name;
            });

        return node

    }

    remove(vertex) {

    }

}

class EdgeUtils {

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
                return 'link-' + d.id
            })
            .style('stroke-width', 2)
            .style('stroke-color', "#222")


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
                    return 'edgepath-' + d.id
                },
                "fill": "#aaa"
            })
            .style("pointer-events", "none");

        let edgelabels = this.canvas.selectAll(".edgelabel")
            .data(edges)
            .enter()
            .append('text')
            .style("pointer-events", "none")
            .attrs({
                'class': 'edgelabel',
                'id': function (d, i) {
                    return 'edgelabel-' + d.id
                },
                'font-size': 10,
                'fill': '#aaa'
            });

        edgelabels.append('textPath')
            .attr('xlink:href', function (d, i) {
                return '#edgepath-' + d.id
            })
            .style("text-anchor", "middle")
            .style("pointer-events", "none")
            .attr("startOffset", "50%")
            .text(function (d) {
                return d.label
            });

        return [link, edgepaths, edgelabels];

    }

    remove(edge) {

    }

}


class GraphControls {

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

class DataGraphCanvas {

    // Reference: http://bl.ocks.org/fancellu/2c782394602a93921faff74e594d1bb1
    constructor(html_selector_id) {
        this.html_selector_id = html_selector_id;
        this.color_schema = d3.scaleOrdinal(d3.schemeCategory10);

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

    }

    setup_canvas(html_selector_id) {
        // Per-type markers, as they don't inherit styles.
        let svg = d3.select(html_selector_id)
            .call(d3.zoom().on("zoom", function () {
                svg.attr("transform", d3.event.transform)
            }))
            .on("dblclick.zoom", null)   // double click zoom has been disabled since
        // we want double click to be reserved for highlighting neighbor nodes

        return svg;

    }

    clear_canvas() {

        this.canvas.selectAll("*").remove();
        $("g").remove();
        $("line").remove();

        this.canvas.append('defs').append('marker')
            .attrs({
                'id': 'arrowhead',
                'viewBox': '-0 -5 10 10',
                'refX': 13,
                'refY': 0,
                'orient': 'auto',
                'markerWidth': 7,
                'markerHeight': 7,
                'xoverflow': 'visible'
            })
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#999')
            .style('stroke', 'none');


    }

    setup_simulation() {

        let _this = this;
        let forceCollide = d3.forceCollide()
            .radius(function (d) {
                return d.radius + 1.2;
            })
            .iterations(1); /// TODO - revisit this
        const forceX = d3.forceX(this.canvas_width / 2).strength(0.055);
        const forceY = d3.forceY(this.canvas_height / 2).strength(0.055);


        return d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) {
                return d.id;
            })
                .distance(150).strength(1))
            .force("charge", _this.getSimulationCharge())
            .force("collide", forceCollide)
            .force('x', forceX)
            .force('y', forceY)
            .force("center", d3.forceCenter(this.canvas_width / 2, this.canvas_height / 2));
    }


    getSimulationCharge() {
        return d3.forceManyBody().strength(-300)
    }

    getAdjacentNodeIds(nodeId) {
        let _this = this;
        let connectedLinkIds = this.NODE_ID_TO_LINK_IDS[nodeId] || new Set()
        let data = new Set([nodeId])
        connectedLinkIds.forEach(linkId => {
            let link = _this.getLink(linkId)
            data.add(link.source.id)
            data.add(link.target.id)
        })
        return data
    }

    getLink(linkId) {
        return this.LINK_ID_TO_LINK[linkId];
    }

    get_LINK_ID_TO_LINK(edges) {
        let data = {}
        edges.forEach(edge => {
            data[edge.id] = edge
        })
        return data
    }

    get_NODE_ID_TO_LINK_IDS(edges) {
        let data = {}
        edges.forEach(edge => {
            data[edge.source.id] = data[edge.source.id] || new Set()
            data[edge.target.id] = data[edge.target.id] || new Set()
            data[edge.source.id].add(edge.id)
            data[edge.target.id].add(edge.id)
        })
        return data
    }

    getAdjacentLinkIds(nodeId) {
        return this.NODE_ID_TO_LINK_IDS[nodeId] || new Set()
    }


    onNodeHoverOut(selectedNode) {
        let nodeElements = this.canvas.selectAll('.node')
        let linkElements = this.canvas.selectAll('.link')
        let linkLabels = this.canvas.selectAll('.edgelabel')

        nodeElements.style('opacity', '1')
        linkElements.style('opacity', '1')
        linkLabels.style('opacity', '1')
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
        document.getElementById("selected-data-properties").innerHTML = JSON.stringify(data);
    }

    hideProperties() {
        document.getElementById("selected-data-properties").innerHTML = '';

    }


    onLinkMoveHover(selectedLink) {
        console.log("onLinkMoveHover", selectedLink)
        let nodeElements = this.canvas.selectAll('.node')
        let linkElements = this.canvas.selectAll('.link')

        linkElements.style('opacity', function (linkElement) {
            return selectedLink.id === linkElement.id ? '1' : '0.1'
        })

        let linkData = this.LINK_ID_TO_LINK[selectedLink.id]
        let adjacentNodeIds = new Set([linkData.source.id, linkData.target.id])

        nodeElements.style('opacity', function (nodeElement) {
            return adjacentNodeIds.has(nodeElement.id) ? '1' : '0.1'
        })


        d3.select('#link-' + selectedLink.id).style('stroke', "black")
        this.showProperties(selectedLink)

    }

    onLinkMoveOut(selectedLink) {
        let nodeElements = this.canvas.selectAll('.node')
        let linkElements = this.canvas.selectAll('.link')

        nodeElements.style('opacity', '1')
        linkElements.style('opacity', '1')


        d3.select('#link-' + selectedLink.id).style('stroke', "#999")
        this.hideProperties()
    }

    onNodeHoverIn(selectedNode) {
        let nodeElements = this.canvas.selectAll('.node')
        let linkElements = this.canvas.selectAll('.link')
        let linkLabels = this.canvas.selectAll('.edgelabel')


        let adjacentNodeIds = this.getAdjacentNodeIds(selectedNode.id)
        nodeElements.style('opacity', function (nodeElement) {
            return adjacentNodeIds.has(nodeElement.id) ? '1' : '0.1'
        })

        let adjacentLinkIds = this.getAdjacentLinkIds(selectedNode.id)
        linkElements.style('opacity', function (linkElement) {
            return adjacentLinkIds.has(linkElement.id) ? '1' : '0.1'
        })

        linkLabels.style('opacity', function (linkLabel) {
            return adjacentLinkIds.has(linkLabel.id) ? '1' : '0.1'
        })
        console.log("onNodeHoverIn", selectedNode);
        this.showProperties(selectedNode)
    }

    add_vertices(vertices) {
        this.add_vertex_legend(vertices)
        return this.vertex_utils.add(vertices, this);
    }

    add_edges(edges) {
        this.add_edge_legend(edges)
        return this.edge_utils.add(edges, this);
    }

    add_vertex_legend(vertices) {
        let _this = this;
        let edges_legend_height = document.querySelector(".edges-legend").getBoundingClientRect().height;

        let legend = this.canvas.append("g")
            .attr("class", "vertices-legend exclude-from-zoom")
            .attr("height", 0)
            .attr("width", 0)
            .attr('transform', 'translate(' + (this.canvas_width - 100) + ',' + (edges_legend_height + 35) + ')');


        let legend_vertices_list = [];
        vertices.forEach(function (vertex) {
            if (legend_vertices_list.indexOf(vertex.label) === -1) {
                legend_vertices_list.push(vertex.label)
            }
        })

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
            })

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


        let legend = this.canvas.append("g")
            .attr("class", "edges-legend  exclude-from-zoom")
            .attr("height", 0)
            .attr("width", 0)
            .attr('transform', 'translate(' + (this.canvas_width - 100) + ',30)');


        let legend_edges_list = [];
        edges.forEach(function (edge) {
            if (legend_edges_list.indexOf(edge.label) === -1) {
                legend_edges_list.push(edge.label)
            }
        })

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
            })

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

    draw(vertices, edges) {


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
                console.log("this.simulation", this);
                _this.simulation.alphaTarget(0.3).restart()
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
        })

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

        this.NODE_ID_TO_LINK_IDS = this.get_NODE_ID_TO_LINK_IDS(edges)
        this.LINK_ID_TO_LINK = this.get_LINK_ID_TO_LINK(edges);
        console.log("LINK_ID_TO_LINK", this.LINK_ID_TO_LINK);
        console.log("NODE_ID_TO_LINK_IDS", this.NODE_ID_TO_LINK_IDS);
    }


    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }


}

