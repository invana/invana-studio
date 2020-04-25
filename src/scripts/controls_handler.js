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
