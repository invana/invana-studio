import React from "react";
import * as d3 from "d3";
import {LightenDarkenColor} from "../core/utils";
import {DefaultNodeBgColor} from "../../config";
import {prepareNodesDataWithOptions} from "./canvas-utils";

export class LegendCanvas extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            legend_canvas: null,
        }

    }

    getLinkLabelConfig(label) {
        try {
            return this.props.linkLabels[label];

        } catch (e) {
            return null;
        }
    }

    getNodeLabelConfig(label) {
        try {
            return this.props.nodeLabels[label];

        } catch (e) {
            return {bgColor: DefaultNodeBgColor};
        }
    }

    addVertexLegend(vertices) {

        let _this = this;
        console.log("_this.props.nodeLabels", _this.props.nodeLabels)
        this.clearNodeLegendCanvas();
        let edges_legend_height = document.querySelector(".edges-legend")
            .getBoundingClientRect().height;

        let legend = this.state.legend_canvas.append("g")
            .attr("class", "vertices-legend")
            .attr("height", 0)
            .attr("width", 0)
            .attr('transform', 'translate(' + (10) + ',' + (edges_legend_height + 35) + ')');


        let legend_vertices_list = [];
        let legend_vertices_list_ = [];
        vertices.forEach(function (vertex) {
            if (legend_vertices_list_.indexOf(vertex.label) === -1) {
                legend_vertices_list.push(vertex);
                legend_vertices_list_.push(vertex.label)
            }
        });

        legend.selectAll('.legend-circle')
            .data(legend_vertices_list)
            .enter()
            .append('circle')
            .attr('class', 'legend-circle')
            .attr('transform', function (d, i) {
                return 'translate(' + (20) + ',' + (((i * 20) + 10) + (i * 5)) + ')';
            })
            .attr('r', 10)
            .style("fill", (d) => d.meta.shapeOptions.fillColor)
            .style("stroke-width", "3px")
            .style("cursor", "pointer")
            .style("stroke", (d) => d.meta.shapeOptions.strokeColor)

        legend.selectAll('.label')
            .data(legend_vertices_list)
            .enter()
            .append('text')
            .attr("x", "40")
            .attr("y", (d, i) => (((i * 20) + 15) + (i * 5)))
            .style("fill", (d) => d.meta.labelOptions.labelColor)
            .text((d) => d.label);


    }

    add_edge_legend(edges) {
        let _this = this;

        this.clearLinkLegendCanvas();
        let legend = this.state
            .legend_canvas.append("g")
            .attr("class", "edges-legend")
            .attr("height", 0)
            .attr("width", 0)
            .attr('transform', 'translate(' + (10) + ',30)');

        let legend_edges_list = [];
        let legend_edges_list_ = []
        edges.forEach(function (edge) {
            if (legend_edges_list_.indexOf(edge.label) === -1) {
                legend_edges_list.push(edge);
                legend_edges_list_.push(edge.label)
            }
        });

        legend.selectAll('.legend-rect')
            .data(legend_edges_list)
            .enter()
            .append('rect')
            .attrs({width: 10, height: 2})
            .attr('class', 'legend-rect')
            .attr('transform', function (d, i) {
                return 'translate(' + (15) + ',' + ((i * 20) + 10) + ')';
            })
            .style("fill", function (d, i) {

                return "#efefef";

            });

        legend.selectAll('.label')
            .data(legend_edges_list)
            .enter()
            .append('text')
            .attr("x", "40")
            .attr("y", function (d, i) {
                return ((i * 20) + 15);
            })
            .attr("fill", function (d) {
                return "#efefef";// _this.state.color_schema(d);
            })
            .text(function (d) {
                return d.label;
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
            const nodesData = Object.assign([], prepareNodesDataWithOptions(this.props.nodes, {}));
            this.addVertexLegend(nodesData);
        }


    }

    render() {

        this.startRendering();
        return <div id="legend-div">
            <svg></svg>
        </div>;
    }
}
