import React from 'react'
import {Redirect} from 'react-router-dom'
import GremlinConnectorViewBase from "../components/core/gremlin-connector";
import GremlinResponseSerializers from "../components/visualizer/gremlin-serializer";


export default class LandingPageView extends GremlinConnectorViewBase {

    gremlin_serializer = new GremlinResponseSerializers();

    constructor(props) {
        super(props);
        this.state = {
            "successLoading": null
        }
    }

    componentDidMount() {
        super.componentDidMount();
        let query = "g.V().hasLabel('InvanaManagement').toList();";
        this.queryGremlinServer(query, false)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // let query = "g.V().hasLabel('InvanaManagement').toList();";
        // this.queryGremlinServer(query, false)

    }


    setLabelsConfigToLocalStorage(response) {
        let result = this.gremlin_serializer.process(response);
        let nodesAndLinks = this.gremlin_serializer.seperate_vertices_and_edges(result, false);


        let _nodes = {};
        nodesAndLinks.nodes.forEach(function (node) {

            _nodes[node.properties.name] = node.properties;
        })
        let _links = {};
        nodesAndLinks.links.forEach(function (link) {
            _links[link.label] = link.properties;
        })

        // convert this list into dictionary.
        console.log("=======((", _nodes,_links)
        localStorage.setItem('nodeLabels', JSON.stringify(_nodes));
        localStorage.setItem('linkLabels', JSON.stringify(_links));
    }

    processGremlinResponseEvent(event) {
        let _this = this;
        let response = JSON.parse(event.data);

        console.log("onmessage received", response);

        if (response.status.code >= 200 || response.status.code <= 299) {
            _this.updateStatusMessage("Query Successfully Responded.");
            _this.setLabelsConfigToLocalStorage(response)
            _this.setState({
                "successLoading": true,
            })


        } else {

            _this.setState({
                "errorMessage": JSON.stringify(response,),
                "showErrorMessage": true,
                "statusMessage": "Query Successfully Responded." +
                    " But returned non 200 status[" + response.status.code + "]"
            })
        }


    }


    render() {
        return (
            <div>
                {
                    (this.state.successLoading) ? (
                        <Redirect to='/explorer'/>
                    ) : (<span>&nbsp;</span>)
                }
            </div>
        )
    }
}
