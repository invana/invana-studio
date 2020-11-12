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
        return d3.forceSimulation()
            .force("charge", d3.forceManyBody().strength(this.settings.FORCE_LAYOUT_NODE_REPULSION_STRENGTH))
            .force("link", d3.forceLink().id(d => d.id).distance(this.settings.DEFAULT_LINK_LENGTH))
            .force("collide", d3.forceCollide(this.settings.NODE_HIT_RADIUS).iterations(10))
            // .force("center", d3.forceCenter(this.settings.SCREEN_WIDTH / 2, this.settings.SCREEN_HEIGHT / 2))

            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .alphaDecay(0.5)
            // .tick(this.settings.FORCE_LAYOUT_ITERATIONS)
            .on("end", () => this.onForceSimulationEnd());
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
