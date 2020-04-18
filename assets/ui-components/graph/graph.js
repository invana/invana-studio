class VertexUtils {
    constructor(canvas, color_schema) {
        this.canvas = canvas;
        this.color_schema = color_schema;
    }

    add(vertices) {
        let _this = this;
        let node = this.canvas.selectAll(".node")
            .data(vertices)
            .enter()
            .append("g")
            .attr("class", "node")


        node.append("circle")
            .attr("r", 5)
            .style("fill", function (d, i) {
                return _this.color_schema(d.label);
            })

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

    add(edges) {

        let link = this.canvas.selectAll(".link")
            .data(edges)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr('marker-end', 'url(#arrowhead)')

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
                    return 'edgepath' + i
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
                    return 'edgelabel' + i
                },
                'font-size': 10,
                'fill': '#aaa'
            });

        edgelabels.append('textPath')
            .attr('xlink:href', function (d, i) {
                return '#edgepath' + i
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
        this.canvas_width = this.canvas.attr("width");
        this.canvas_height = this.canvas.attr("height");
        this.simulation = this.setup_simulation();

    }


    setup_canvas(html_selector_id) {
        // Per-type markers, as they don't inherit styles.
        return d3.select(html_selector_id);
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
                'markerWidth': 13,
                'markerHeight': 13,
                'xoverflow': 'visible'
            })
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#999')
            .style('stroke', 'none');


    }

    setup_simulation() {
        return d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) {
                return d.id;
            }).distance(100).strength(1))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.canvas_width / 2, this.canvas_height / 2));
    }

    add_vertices(vertices) {
        this.add_vertex_legend(vertices)
        return this.vertex_utils.add(vertices);
    }

    add_edges(edges) {
        this.add_edge_legend(edges)
        return this.edge_utils.add(edges);
    }

    add_vertex_legend(vertices) {
        let _this = this;
        let legend = this.canvas.append("g")
            .attr("class", "vertices-legend")
            .attr("height", 0)
            .attr("width", 0)
            .attr('transform', 'translate(20,250)');


        let legend_vertices_list = [];

        vertices.forEach(function (vertex) {
            if (legend_vertices_list.indexOf(vertex.label) === -1) {
                legend_vertices_list.push(vertex.label)
            }
        })

        console.log(" legend_vertices_list  ", legend_vertices_list);
        legend.selectAll('.symbol')
            .data(legend_vertices_list)
            .enter()
            .append('circle')
            .attr('class', 'symbol')
            .attr('transform', function (d, i) {
                return 'translate(' + (20) + ',' + ((i * 20) + 10) + ')';
            })
            .attr('r', 10)
            .style("fill", function (d, i) {
                return _this.color_schema(d);
            })

        // d3.selectAll('.label').exit().remove();
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
            .attr("class", "edge-legend")
            .attr("height", 0)
            .attr("width", 0)
        // .attr('transform', 'translate(20,250)');


        let legend_edges_list = [];
        edges.forEach(function (edge) {
            if (legend_edges_list.indexOf(edge.label) === -1) {
                legend_edges_list.push(edge.label)
            }
        })

        console.log("legend_edges_list", legend_edges_list)


        legend.selectAll('.legend-edge')
            .data(legend_edges_list)
            .enter()
            .append('line')
            .attrs({
                'class': 'edgepath',
                'fill-opacity': 0,
                'stroke-opacity': 0,
                // "stroke": "2px",
                'id': function (d, i) {
                    return 'edgepath' + i
                }
            })
            .style("pointer-events", "none")
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


        let node = this.add_vertices(vertices);


        node.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", _this.dragged)
            //.on("end", dragended)
        );

        let _ = this.add_edges(edges);
        let link = _[0];
        let edgepaths = _[1];
        let edgelabels = _[2];


        function dragstarted(d) {
            // let _this = this;
            if (!d3.event.active) {
                console.log("this.simulation", this);
                _this.simulation.alphaTarget(0.3).restart()
            }
            d.fx = d.x;
            d.fy = d.y;
        }


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


    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }


}

