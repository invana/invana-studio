/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


// import {STUDIO_SETTINGS} from "../settings";

export const physicsSettings = {
    // hierarchicalRepulsion: {
    //     avoidOverlap: 1,
    // },
    forceAtlas2Based: {
        gravitationalConstant: -56,
        centralGravity: 0.005,
        springLength: 180,
        // springLength: STUDIO_SETTINGS.RENDERING_EDGES_SETTINGS.length,
        springConstant: 0.18,
        avoidOverlap: 1.5
    },
    maxVelocity: 146,
    solver: 'forceAtlas2Based',
    timestep: 0.35,
    stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 10,
        fit: true
    }

}

const defaultOptions = {
    // layout: {
    //     hierarchical: false
    // },
    autoResize: true,
    interaction: {
        hideEdgesOnDrag: true,
        tooltipDelay: 200,
        hover: true
    },

    // layout: {
    //     randomSeed: 100,
    //     hierarchical: {
    //         // enabled: true,
    //         // levelSeparation: 250,
    //         nodeSpacing: 150,
    //         direction: "LR", // UD, DU, LR, RL
    //         // sortMethod: "directed"
    //     }
    // },

    // physics: false,
    physics: physicsSettings,

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

        // ...STUDIO_SETTINGS.RENDERING_EDGES_SETTINGS,
        // chosen: {
        //     edge: function (values) {
        //         // console.log("=====", id, selected, hovering);
        //         values.width = values.width * 1.5;
        //     }
        // },
        // selectionWidth: function (width) {
        //     return width * 1.2;
        // },
        // // hoverWidth: function (width) {
        // //     return width * 1.4;
        // // }
        // hoverWidth: function (width) {
        //     return width + 1;
        // },


    },
    nodes: {
        // physics: false,
        shape: "dot",
        // size: 10,
        scaling: {
            min: 10,
            max: 10,
        },
        // shapeProperties: {
        //     interpolation: false    // 'true' for intensive zooming
        // }
    }
}

export default defaultOptions;