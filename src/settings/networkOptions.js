
export const defaultEdgesOptions = {
    physics: true,
    // length: undefined,
    length: 320,
    smooth: {
        enabled: true,
        // dynamic, continuous, discrete, diagonalCross, straightCross,
        // curvedCW, curvedCCW, cubicBezier, horizontal, vertical
        type: "continuous",
        // vertical or horizontal
        forceDirection: "none",
        roundness: .5
    },
}

export const supportedPhysicsSolvers = [
    "forceAtlas2Based",
    "barnesHut",
    "repulsion",
    "hierarchicalRepulsion",
]

export const defaultPhysicsSettings = {
    enabled: true,
    solver: 'forceAtlas2Based',
    forceAtlas2Based: {
        gravitationalConstant: -70,
        centralGravity: 0.005,
        springLength: defaultEdgesOptions.length,
        springConstant: 0.18,
        avoidOverlap: 1.5
    },
    barnesHut: {
        theta: 0.5,
        gravitationalConstant: -2000,
        centralGravity: 0.3,
        springLength: defaultEdgesOptions.length,
        springConstant: 0.04,
        avoidOverlap: 0,
        damping: 0.09
    },
    repulsion: {
        nodeDistance: 100,
        centralGravity: 0.2,
        springLength: defaultEdgesOptions.length,
        springConstant: 0.05,
        damping: 0.09
    },
    hierarchicalRepulsion: {
        nodeDistance: 120,
        centralGravity: 0.0,
        springLength: 100,
        springConstant: 0.01,
        damping: 0.09,
        avoidOverlap: 0
    },
    // timestep: 0.35,
    adaptiveTimestep: true,
    // minVelocity: 0.1,
    maxVelocity: 300,
    stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 200,
        // fit: true
    }

}

const defaultNetworkOptions = {
    interaction: {
        hideEdgesOnDrag: true,
        tooltipDelay: 200,
        hover: true
    },
    layout: {
        // randomSeed: 100,
        hierarchical: false
    },
    physics: defaultPhysicsSettings,
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
        ...defaultEdgesOptions,
        chosen: {
            edge: function (values, id, selected, hovering) {
                console.log("=====", id, selected, hovering);
                values.width = values.width * 1.5;
            }
        },
        selectionWidth: function (width) {
            return width * 1.2;
        },
        hoverWidth: function (width) {
            return width + 1;
        },


    },
    nodes: {
        // physics: false,
        shape: "dot",
        // size: 10,
        // scaling: {
        //     min: 10,
        //     max: 10,
        // },
        // shapeProperties: {
        //     interpolation: false    // 'true' for intensive zooming
        // }
    }
}

export default defaultNetworkOptions;
