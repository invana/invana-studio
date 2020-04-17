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
            .attr("r", 10)
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

        let edge_paths = this.canvas.selectAll(".edgepath")
            .data(edges)
            .enter()
            .append('path')
            .attrs({
                'class': 'edgepath',
                'fill-opacity': 0,
                'stroke-opacity': 0,
                'id': function (d, i) {
                    return 'edgepath' + i
                }
            })
            .style("pointer-events", "none");

        let edge_labels = this.canvas.selectAll(".edgelabel")
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

        edge_labels.append('textPath')
            .attr('xlink:href', function (d, i) {
                return '#edgepath' + i
            })
            .style("text-anchor", "middle")
            .style("pointer-events", "none")
            .attr("startOffset", "50%")
            .text(function (d) {
                return d.label
            });

        return [link, edge_paths, edge_labels];

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
        let svg = d3.select(html_selector_id);
        svg.append('defs').append('marker')
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
        return svg
    }

    setup_simulation() {
        return d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) {
                return d.id;
            }).distance(100).strength(1.6))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.canvas_width / 2, this.canvas_height / 2));
    }

    add_vertices(vertices) {
        this.add_legend(vertices)
        return this.vertex_utils.add(vertices);
    }

    add_edges(edges) {
        return this.edge_utils.add(edges);
    }

    add_legend(vertices) {
        let _this = this;
        let legend = this.canvas.append("g")
            .attr("class", "legend")
            .attr("height", 0)
            .attr("width", 0)
            .attr('transform', 'translate(20,250)');


        let legend_list = [];
        for (let i = 0; i < vertices.length; i++) {
            for (let j = 0; j < vertices.length; j++) {
                if (vertices[i].label === vertices[j].label && legend_list.indexOf(vertices[i].label) === -1) {
                    legend_list.push(vertices[i].label);
                }
            }
        }
        console.log(" legend_list  ", legend_list);
        this.canvas.selectAll('.symbol')
            .data(legend_list)
            // .attr('class','symbol')
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
        this.canvas.selectAll('.label')
            .data(legend_list)
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

    draw(vertices, edges) {


        this.canvas.selectAll("*").remove();
        $("g").remove();
        $("line").remove();

        let _this = this;
        console.log("vertices " + vertices.length + "; edges " + edges.length);
        let node = this.add_vertices(vertices);


        node.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", _this.dragged)
            //.on("end", dragended)
        );

        let _ = this.add_edges(edges);
        let link = _[0];
        let edge_paths = _[1];
        let edge_labels = _[2];


        function dragstarted(d) {
            // let _this = this;
            if (!d3.event.active) {
                console.log("this.simulation", this);
                _this.simulation.alphaTarget(0.3).restart()
            }
            d.fx = d.x;
            d.fy = d.y;
        }


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

            edge_paths.attr('d', function (d) {
                return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
            });

            edge_labels.attr('transform', function (d) {
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

        this.simulation
            .nodes(vertices)
            .on("tick", ticked);

        this.simulation.force("link")
            .links(edges);
    }


    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }


}

