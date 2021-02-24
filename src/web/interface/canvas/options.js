const defaultOptions = {
    // layout: {
    //     hierarchical: false
    // },

    interaction: {
        hideEdgesOnDrag: true,
        tooltipDelay: 200,
        hover: true
    },

       layout: {
        // randomSeed: 100,
        hierarchical: false
    },
    physics: {
        forceAtlas2Based: {
            gravitationalConstant: -70,
            centralGravity: 0.005,
            springLength: 220,
            springConstant: 0.18,
            // avoidOverlap: 1

        },
        // maxVelocity: 146,
        solver: "forceAtlas2Based", // forceAtlas2Based
        // timestep: 0.55,
        stabilization: {
            enabled: true,
            // updateInterval: 25,
            // iterations: 1000    // YMMV
        },
        // barnesHut: {
        //     gravitationalConstant: -23000,
        //     centralGravity: 0,
        //     springLength: 0,
        //     springConstant: 0.5,
        //     damping: 1,
        //     avoidOverlap: 1
        // }
    },

    // layout: {
    //     hierarchical: {
    //         enabled: true,
    //         // levelSeparation: 300,
    //     },
    // },
    // manipulation: false,
    // physics: {
    //     hierarchicalRepulsion: {
    //         nodeDistance: 300,
    //     },
    // },
    edges: {
        // // color: "#999999",
        physics: true,
        smooth: {
            enabled: false,
            // dynamic, continuous, discrete, diagonalCross, straightCross,
            // curvedCW, curvedCCW, cubicBezier, horizontal, vertical
            type: "continuous",
            // vertical or horizontal
            forceDirection: "vertical",
            roundness: .5
        },

        chosen: {
            edge: function (values, id, selected, hovering) {
                values.width = 1.5 * 1.4;
            }
        },
        selectionWidth: function (width) {
            return width * 1.2;
        },
        // hoverWidth: function (width) {
        //     return width * 1.4;
        // }
        hoverWidth: function (width) {
            return width + 1;
        }


    },
    nodes: {
        // physics: false,
        shape: "dot",
        // size: 10,
        scaling: {
            min: 10,
            max: 10,
        },
    }
}

export default defaultOptions;
