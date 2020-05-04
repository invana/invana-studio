import React from "react";
import * as d3 from "d3";

export class LegendCanvas extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            legend_canvas: null,
            color_schema: d3.scaleOrdinal(d3.schemeCategory10)
        }

    }

    add_vertex_legend(vertices) {

        let _this = this;

        this.clearNodeLegendCanvas();
        let edges_legend_height = document.querySelector(".edges-legend").getBoundingClientRect().height;

        let legend = this.state.legend_canvas.append("g")
            .attr("class", "vertices-legend")
            .attr("height", 0)
            .attr("width", 0)
            .attr('transform', 'translate(' + (10) + ',' + (edges_legend_height + 35) + ')');


        let legend_vertices_list = [];
        vertices.forEach(function (vertex) {
            if (legend_vertices_list.indexOf(vertex.label) === -1) {
                legend_vertices_list.push(vertex.label);
            }
        });

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
                return _this.state.color_schema(d);
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

        this.clearLinkLegendCanvas();
        let legend = this.state.legend_canvas.append("g")
            .attr("class", "edges-legend")
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
                return _this.state.color_schema(d);
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
                return _this.state.color_schema(d);
            })
            .text(function (d) {
                return d;
            });

    }

    componentDidMount() {
        this.setState({
            legend_canvas: d3.select("#legend-div svg")
        })
    }

    clearNodeLegendCanvas() {
        let _ = this.state.legend_canvas.select(".vertices-legend")
        if (_) {
            _.remove();
        }
    }

    clearLinkLegendCanvas() {
        let _ = this.state.legend_canvas.select(".edges-legend")
        if (_) {
            _.remove();
        }
    }

    startRendering() {
        if (this.state.legend_canvas) {
            console.log("startRendering LegendCanvas<<<<<<>>>>>>>>>>>>>>>><<<<<<")
            this.add_edge_legend(this.props.links);
            this.add_vertex_legend(this.props.nodes);
        }


    }

    render() {

        this.startRendering();
        return <div id="legend-div">
            <svg></svg>
        </div>;
    }
}
