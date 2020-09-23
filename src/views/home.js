import GremlinBasedComponent from "../core/gremlin-component";
import GraphSONDeSerializer from "../serializers/graphs/graphson-v3";
import {managementVertexLabel} from "../config";

export default class HomeView extends GremlinBasedComponent {


    componentDidMount() {
        super.componentDidMount();
        let _this = this;
        setTimeout(function () {
            _this.makeQuery("g.V().hasLabel('" + managementVertexLabel + "').toList();",
                {source: "internal"});
        }, 200)
    }

    gremlinDeSerializer = new GraphSONDeSerializer();

    setLabelsConfigToLocalStorage(response) {
        let result = this.gremlinDeSerializer.process(response);
        let nodesAndLinks = this.gremlinDeSerializer.separateVerticesAndEdges(result, false);
        let _nodes = {};
        nodesAndLinks.nodes.forEach(function (node) {
            _nodes[node.properties.name] = node.properties;
        })
        let _links = {};
        nodesAndLinks.links.forEach(function (link) {
            _links[link.label] = link.properties;
        })
        // convert this list into dictionary.
        console.log("=======((", _nodes, _links)
        localStorage.setItem('nodeLabels', JSON.stringify(_nodes));
        localStorage.setItem('linkLabels', JSON.stringify(_links));
    }

    processResponse(responses) {
        let _this = this;
        let response = responses[0];
        console.log("processResponse received", response);
        const statusCode = response.getGremlinStatusCode();
        if (statusCode >= 200 || statusCode < 300) {
            _this.setStatusMessage("Query Successfully Responded.");
            _this.setLabelsConfigToLocalStorage(response)
            _this.setState({
                "successLoading": true,
            })
            window.location.href = "/explorer";
        } else {
            _this.setState({
                "errorMessage": JSON.stringify(response,),
                "showErrorMessage": true,
                "statusMessage": "Query Successfully Responded." +
                    " But returned non 200 status[" + response.status.code + "]"
            })
        }
    }

    // render() {
    //     return super.render();
    // }

}
