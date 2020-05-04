import React, {Component} from 'react';

export default function CanvasStatsCanvas(props) {
    return <div id={"canvas-stats"}>{props.nodes_count} nodes; {props.links_count} edges;</div>;
}

export function PropertiesCanvas(props) {
    return <pre id="properties-div"></pre>;
}


export function NotificationDiv(props) {
    return <div id="notifications-div"></div>;
}

export function ConnectionStatus(props) {
    return <div id="connection-status"><span></span></div>;
}


export class LegendCanvas extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            "nodes": props.nodes || [],
            "links": props.links || []
        }
    }

    add_vertex_legend(vertices) {

        let _this = this;
        let legend_elem = document.querySelector(".edges-legend");
        if (legend_elem) {
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


    render() {


        return <div id="legend-div">
            <svg></svg>
        </div>;
    }
}
