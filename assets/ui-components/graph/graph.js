class VertexUtils {

    add(vertex) {

    }

    remove(vertex) {

    }

}

class EdgeUtils {

    add(edge) {

    }


    remove(edge) {

    }

}


class DataGraphCanvas {

    // Reference: http://bl.ocks.org/fancellu/2c782394602a93921faff74e594d1bb1
    constructor(html_selector_id) {
        this.html_selector_id = html_selector_id;

        this.edge_utils = new EdgeUtils();
        this.vertex_utils = new VertexUtils();

        this.color_schema = d3.scaleOrdinal(d3.schemeCategory10);

        this.canvas = this.setup_canvas(html_selector_id);
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
            }).distance(100).strength(1))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.canvas_width / 2, this.canvas_height / 2));
    }

    add_vertex(vertex) {
        this.vertex_utils.add(vertex);
    }

    add_edge(vertex) {
        this.vertex_utils.add(vertex);
    }

    draw(nodes, links) {

        let _this = this;
        console.log("Nodes " + nodes.length + "; Links " + links.length);
        let link = this.canvas.selectAll(".link")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr('marker-end', 'url(#arrowhead)')

        link.append("title")
            .text(function (d) {
                return d.type;
            });

        let edgepaths = this.canvas.selectAll(".edgepath")
            .data(links)
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

        let edgelabels = this.canvas.selectAll(".edgelabel")
            .data(links)
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
                return d.type
            });

        let node = this.canvas.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag()
                    .on("start", _this.dragstarted)
                    .on("drag", _this.dragged)
                //.on("end", dragended)
            );

        node.append("circle")
            .attr("r", 5)
            .style("fill", function (d, i) {
                return _this.color_schema(i);
            })

        node.append("title")
            .text(function (d) {
                return d.id;
            });

        node.append("text")
            .attr("dy", -3)
            .text(function (d) {
                return d.name + ":" + d.label;
            });

        let ticked = function () {
            _this.ticked_actual(node, link, edgepaths, edgelabels);
        }

        this.simulation
            .nodes(nodes)
            .on("tick", ticked);

        this.simulation.force("link")
            .links(links);
    }

    dragstarted(d) {
        // let _this = this;
        // if (!d3.event.active) {
        //     console.log("this.simulation", this);
        //     this.simulation.alphaTarget(0.3).restart()
        // }
        d.fx = d.x;
        d.fy = d.y;
    }

    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    ticked_actual(node, link, edgepaths, edgelabels) {
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

