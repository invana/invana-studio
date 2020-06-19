import React from "react";
import * as d3 from "d3";
import {prepareNodesDataWithOptions} from "./canvas-utils";
import "d3-selection-multi";
import "./legend.scss";

export default class LegendCanvas extends React.Component {


    static defaultProps = {
        nodes: [],
        links: [],
        nodeLabels: {},
        linkLabels: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            legendCanvas: null,
        }

    }

    addVertexLegend(vertices) {
        this.clearNodeLegendCanvas();
        let edges_legend_height = document.querySelector(".edges-legend")
            .getBoundingClientRect().height;

        let legend = this.state.legendCanvas.append("g")
            .attr("class", "vertices-legend")
            .style("margin-top", "5px")
            .attr("height", 0)
            .attr("width", 0)
            .attr('transform', 'translate(' + (10) + ',' + (edges_legend_height + 35) + ')');


        let legend_vertices_list = [];
        let legend_vertices_list_ = [];
        console.log("=======vertices", vertices);
        for (let i in vertices) {
            let vertex = vertices[i];
            if (legend_vertices_list_.indexOf(vertex.label) === -1) {
                legend_vertices_list.push(vertex);
                legend_vertices_list_.push(vertex.label)
            }
        }

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

    addEdgeLegend(edges) {

        this.clearLinkLegendCanvas();
        let legend = this.state
            .legendCanvas.append("g")
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
            .attr('width', '10px')
            .attr('height', '2px')
            .attr('class', 'legend-rect')
            .attr('transform', function (d, i) {
                return 'translate(' + (15) + ',' + ((i * 20) + 10) + ')';
            })
            .style("fill", (d, i) => "#efefef");

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
            legendCanvas: d3.select(".graphLegend svg")
        })
    }

    clearNodeLegendCanvas() {
        let _ = this.state.legendCanvas.select(".vertices-legend")
        if (_) {
            _.remove();
        }
    }

    clearLinkLegendCanvas() {
        let _ = this.state.legendCanvas.select(".edges-legend")
        if (_) {
            _.remove();
        }
    }

    startRendering() {
        if (this.state.legendCanvas) {
            this.addEdgeLegend(this.props.links);
            const nodeOptions = localStorage.getItem('nodeLabels');
            const nodesData = Object.assign({},
                prepareNodesDataWithOptions(
                    this.props.nodes,
                    nodeOptions)
            );
            this.addVertexLegend(nodesData);
        }
    }

    render() {

        this.startRendering();
        return <div className={"graphLegend"}>
            <svg></svg>
        </div>;
    }
}
