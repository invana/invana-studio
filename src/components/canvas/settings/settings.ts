



export const defaultEdgesOptions = {
    physics: true,
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

export const physicsSettings = {
    forceAtlas2Based: {
        gravitationalConstant: -56,
        centralGravity: 0.005,
        springLength: defaultEdgesOptions.length,
        springConstant: 0.18,
        avoidOverlap: 1.5
    },
    maxVelocity: 146,
    solver: 'forceAtlas2Based',
    timestep: 0.35,
    stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 50,
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
    physics: physicsSettings,
    edges: {
        ...defaultEdgesOptions,
        chosen: {
            edge: function (values: any, id: any, selected: any, hovering: any) {
                // console.log("=====", id, selected, hovering);
                values.width = values.width * 1.5;
            }
        },
        selectionWidth: function (width: number) {
            return width * 1.2;
        }, 
        hoverWidth: function (width: number) {
            return width + 1;
        },
    },
    nodes: {
        shape: "dot",
        size: 10,
        scaling: {
            min: 10,
            max: 10,
        },
        shapeProperties: {
            interpolation: false    // 'true' for intensive zooming
        }
    }
}

export default defaultNetworkOptions;