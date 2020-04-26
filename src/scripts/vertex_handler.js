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
            .attr("id", function(d){
                return "node-" + d.id;
            });


        node.append("circle")
            .attr("r", 20)
            .style("fill", function (d, i) {
                return _this.color_schema(d.label);
            })
            .style("cursor", "pointer")
            .on("mouseover", function (d) {
                gremlin_canvas.onNodeHoverIn(d);
            })
            .on("mouseout", function (d) {
                gremlin_canvas.onNodeHoverOut(d);
            })
            .on("click", function (d) {
                gremlin_canvas.onNodeClicked(this, d);
            });

        node.append("title")
            .text(function (d) {
                return d.id;
            });

        node.append("text")
            .attr("dy", -3)
            .text(function (d) {
                return d.name;
            });

        return node;

    }

    remove(vertex) {

    }
}