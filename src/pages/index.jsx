import React from 'react'
import {Redirect} from 'react-router-dom'
import GremlinConnectorViewBase from "../components/core/gremlin-connector";
import GremlinResponseSerializers from "../components/visualizer/gremlin-serializer";
import {ConnectionStatus, CopyRightInfo} from "../components/visualizer/util-components";
import LoadingDiv from "../components/core/loading";
import StartupUIComponent from "../components/startup/startup";
import {getDataFromLocalStorage} from "../components/core/utils";
import {gremlinServerUrlKey} from "../config";

export default class IndexPageView extends GremlinConnectorViewBase {

    gremlin_serializer = new GremlinResponseSerializers();

    constructor(props) {
        super(props);
        this.state = {
            "successLoading": null,
            "gremlinServerUrl": getDataFromLocalStorage(gremlinServerUrlKey)
        }
    }

    componentDidMount() {
        super.componentDidMount();
        let query = "g.V().hasLabel('InvanaManagement').toList();";
        this.queryGremlinServer(query, false)
    }

    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     // let query = "g.V().hasLabel('InvanaManagement').toList();";
    //     // this.queryGremlinServer(query, false)
    //
    // }


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
        console.log("=======((", _nodes, _links)
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
        console.log("state.successLoading", this.state.successLoading, this.state);
        let u = new URL(window.location.href);

        if (this.state.successLoading && u.searchParams.get('next')) {
            this.setState({"showLoading": false})
            return (<Redirect to={decodeURIComponent(u.searchParams.get('next'))}/>)
        } else if (this.state.successLoading === true) {
            this.setState({"showLoading": false})
            return (<Redirect to='/explorer'/>)
        } else {


            return (

                <div>
                    {
                        (!this.state.gremlinServerUrl) ? (
                            <StartupUIComponent/>
                        ) : (
                            <div>
                                <ConnectionStatus
                                    statusMessage={this.state.statusMessage}
                                    isConnected2Server={this.state.isConnected2Server}
                                    showErrorMessage={this.state.showErrorMessage}
                                    errorMessage={this.state.errorMessage}
                                    closeErrorMessage={this.closeErrorMessage.bind(this)}
                                />
                                <LoadingDiv loadingMessage={"Connecting to Gremlin Server"}
                                            loadingExtraText={"establishing connection to " + this.state.gremlinServerUrl}
                                            showLoading={this.state.showLoading}
                                            loadTimeCounter={this.state.loadTimeCounter}
                                />
                            </div>
                        )
                    }
                    <CopyRightInfo/>


                </div>
            )
        }
    }
}
