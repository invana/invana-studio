/*



 */


import * as d3 from "d3";

export default class GraphSimulator {

    constructor(settings, onForceSimulationEnd) {
        this.settings = settings;
        this.onForceSimulationEnd = onForceSimulationEnd;
        this.forceSimulator = this.generateForceSimulation();
    }

    generateForceSimulation() {
        // const defaultLinkLength = this.settings.DEFAULT_LINK_LENGTH;
        // return d3.forceSimulation()
        //     .force("link", d3.forceLink()
        //         .id(linkData => linkData.id)
        //         .distance(function (d) {
        //             return d.distance || defaultLinkLength
        //         })
        //     )
        //     .force("charge", d3.forceManyBody().strength(this.settings.FORCE_LAYOUT_NODE_REPULSION_STRENGTH))
        //     // .force("center", d3.forceCenter())
        //     .force("x", d3.forceX())
        //     .force("y", d3.forceY())
        //
        //     // .tick(this.settings.FORCE_LAYOUT_ITERATIONS)
        //     // .on("tick", () => this.onForceSimulationEnd(this))
        //     .on("end", () => this.onForceSimulationEnd(this))
        // .stop();

        return d3.forceSimulation()
            .force("charge", d3.forceManyBody().strength(this.settings.FORCE_LAYOUT_NODE_REPULSION_STRENGTH))
            .force("link", d3.forceLink().id(d => d.id).distance(this.settings.DEFAULT_LINK_LENGTH))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            // .tick(this.settings.FORCE_LAYOUT_ITERATIONS)

            .on("end", () => this.onForceSimulationEnd())
        // .on("tick", () => this.onForceSimulationEnd(this))
        //     .tick([this.settings.FORCE_LAYOUT_ITERATIONS])

        // .alphaTarget(0.8);

    }

    addDataToGraphSimulation(vertices2RenderPrepared, edges2RenderPrepared, dataStore) {
        console.log("===addDataToGraphSimulation", vertices2RenderPrepared, edges2RenderPrepared);


        this.forceSimulator.nodes(vertices2RenderPrepared);
        this.forceSimulator.force("link").links(edges2RenderPrepared);

        // save the 2d position data to storage.
        dataStore.setDataToRender(vertices2RenderPrepared, edges2RenderPrepared);

        // .id(linkData => linkData.id)
        // .distance(_this.settings.DEFAULT_LINK_LENGTH);
        // this.forceSimulator.alphaTarget(0.3).restart();
    }
}
