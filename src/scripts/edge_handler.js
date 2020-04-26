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
            .attr("dy", -3) //Move the text up/ down
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

