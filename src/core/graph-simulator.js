/*



 */


import * as d3 from "d3";

export default class GraphSimulator {

    constructor(settings, onForceSimulationEnd, alphaDecay) {
        /*
        For table Canvas, use the alpha decay, so the rendering would be faster
        and no need to use onSimulationEnd
         */
        this.settings = settings;
        this.alphaDecay = alphaDecay;
        this.onForceSimulationEnd = onForceSimulationEnd;
        this.forceSimulator = this.generateForceSimulation();
    }

    generateForceSimulation() {
        const simulation = d3.forceSimulation()
            .force("charge", d3.forceManyBody().strength(this.settings.FORCE_LAYOUT_NODE_REPULSION_STRENGTH))
            .force("link", d3.forceLink().id(d => d.id).distance(this.settings.DEFAULT_LINK_LENGTH))
            .force("collide", d3.forceCollide(this.settings.NODE_HIT_RADIUS).iterations(10))
            // .force("center", d3.forceCenter(this.settings.SCREEN_WIDTH / 2, this.settings.SCREEN_HEIGHT / 2))

            .force("x", d3.forceX())
            .force("y", d3.forceY())

        // .tick(this.settings.FORCE_LAYOUT_ITERATIONS)

        if (this.alphaDecay) {
            simulation.alphaDecay(this.alphaDecay)
        }

        if (this.onForceSimulationEnd) {
            simulation.on("end", () => this.onForceSimulationEnd())
        }

        return simulation;
        //.on("tick", () => this.onForceSimulationEnd(this))
        //.tick([this.settings.FORCE_LAYOUT_ITERATIONS])
        //.alphaTarget(0.8);
        //.stop();
    }

    addDataToGraphSimulation(vertices2RenderPrepared, edges2RenderPrepared) {
        console.log("===addDataToGraphSimulation", vertices2RenderPrepared, edges2RenderPrepared);


        this.forceSimulator.nodes(vertices2RenderPrepared);
        this.forceSimulator.force("link").links(edges2RenderPrepared);


        // .id(linkData => linkData.id)
        // .distance(_this.settings.DEFAULT_LINK_LENGTH);
        // this.forceSimulator.alphaTarget(0.3).restart();
    }
}
