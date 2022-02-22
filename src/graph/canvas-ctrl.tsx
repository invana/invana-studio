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
import {Network} from "vis-network/peer/esm/vis-network";

export class GraphCanvasCtrl {
    network: any = null;
    nodes: Array<any> = [];
    edges: Array<any> = []
    shallReRender: boolean = true


    constructor() {
        this.nodes = [];
        this.edges = [];
        // this.network.body.data.nodes.update(nodesPrepared)
        // this.network.body.data.edges.update(edgesPrepared)
    }

    setNetwork(network: Network) {
        this.network = network;
        this.setupNetworkEvents();
    }

    updateNetworkData() {
        if (this.network) {
            this.network.body.data.nodes.update(this.nodes)
            this.network.body.data.edges.update(this.edges)
        }
    }

    addNewData(nodes: Array<any>, edges: Array<any>) {
        //TODO -  fix deduping issue later
        console.log("addNewData", nodes, edges);
        this.nodes = this.nodes.concat(nodes)
        this.edges = this.edges.concat(edges)
        this.updateNetworkData()

    }


    getData() {
        return {nodes: this.nodes, edges: this.edges}
    }

    setupNetworkEvents() {
        // let this_ = this;
        // this.network.on("stabilizationIterationsDone", function () {
        //     console.log("stabilizationIterationsDone");
        //     this_.network.setOptions({physics: false});
        // });
    }


}
