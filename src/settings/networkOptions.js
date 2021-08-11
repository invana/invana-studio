import {STUDIO_SETTINGS} from "./index";


export const physicsSettings = {

    forceAtlas2Based: {
        gravitationalConstant: -70,
        centralGravity: 0.005,
        springLength: STUDIO_SETTINGS.RENDERING_EDGES_SETTINGS.length,
        springConstant: 0.18,
        avoidOverlap: 1.5
    },
    // maxVelocity: 146,
    solver: 'forceAtlas2Based',
    // timestep: 0.35,
    // minVelocity: 0.1,
    maxVelocity: 300,

    stabilization: {
        enabled: true,
        // iterations: 1000,
        updateInterval: 200,
        // fit: true
    }

}

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

    physics: physicsSettings,
    //
    // physics: {
    //     forceAtlas2Based: {
    //         gravitationalConstant: -70,
    //         centralGravity: 0.005,
    //         springLength: STUDIO_SETTINGS.RENDERING_EDGES_SETTINGS.length,
    //         springConstant: 0.18,
    //         avoidOverlap: 1
    //     },
    //     // maxVelocity: 146,
    //     solver: "forceAtlas2Based", // forceAtlas2Based
    //     // timestep: 0.55,
    //     stabilization: {
    //         enabled: true,
    //         // updateInterval: 100,
    //         // iterations: 1000    // YMMV
    //     },
    //     minVelocity: undefined
    //     // barnesHut: {
    //     //     gravitationalConstant: -23000,
    //     //     centralGravity: 0,
    //     //     springLength: 0,
    //     //     springConstant: 0.5,
    //     //     damping: 1,
    //     //     avoidOverlap: 1
    //     // }
    // },

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

        ...STUDIO_SETTINGS.RENDERING_EDGES_SETTINGS,
        chosen: {
            edge: function (values, id, selected, hovering) {
                console.log("=====", id, selected, hovering);
                values.width = values.width * 1.5;
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

export default defaultOptions;
