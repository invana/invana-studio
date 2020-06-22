import GremlinHeadlessComponent from "../core/base/gremlin";
import GremlinResponseSerializers from "../core/gremlin-connector/gremlin-serializer";
import {managementVertexLabel} from "../config";

export default class HomeView extends GremlinHeadlessComponent {


    componentDidMount() {
        super.componentDidMount();
        let _this = this;
        setTimeout(function () {
            _this.makeQuery("g.V().hasLabel('" + managementVertexLabel + "').toList();", false, "internal");
        }, 200)
    }

    gremlinSerializer = new GremlinResponseSerializers();

    setLabelsConfigToLocalStorage(response) {
        let result = this.gremlinSerializer.process(response);
        let nodesAndLinks = this.gremlinSerializer.separateVerticesAndEdges(result, false);
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
        console.log("onmessage received", response);
        if (response.status.code >= 200 || response.status.code <= 299) {
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
}
