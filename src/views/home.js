import React from "react";
import MainLeftNav from "../core/ui/structure/left";
import MainHeaderNav from "../core/ui/structure/header";
import MainContent from "../core/ui/main-content";
import JSONCanvas from "../core/ui/canvas/json";
import GraphCanvas from "../core/ui/canvas/graph/index";
import Welcome from "../core/ui/welcome";
import GremlinConnectorComponent from "../core/gremlin-connector";
import ErrorBoundary from "../core/ui/canvas/graph/error-boundary";
import GremlinResponseSerializers from "../core/gremlin-connector/gremlin-serializer";

const serializer = new GremlinResponseSerializers()

export default class HomeView extends GremlinConnectorComponent {


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data: null
    //     }
    // }
    isDataChanged = true;

    constructor(props) {
        super(props);
        this.state = {
            responses: null,
            canvasType: "graph"
        }
    }

    componentDidUpdate(prevProps) {
        this.isDataChanged = false;
    }

    getSelectedData() {

    }

    onQuerySubmit(query) {
        console.log("Query is " + query);
        // make query to gremlin here
        this.makeQuery(query);
    }

    processResponse(responses) {
        this.setState({
            responses: responses
        })
    }


    render() {

        const parentHTML = super.render();
        return (
            <div>
                <MainLeftNav/>
                <MainHeaderNav onQuerySubmit={this.onQuerySubmit.bind(this)}/>
                <MainContent>
                    <ErrorBoundary>
                        {(() => {
                            if (this.state.canvasType === "graph" && this.state.responses) {

                                let overallNodes = [];
                                let overallLinks = [];
                                this.state.responses.forEach(function (response) {
                                    const serializedData = serializer.process(response);
                                    const separatedData = serializer.seperateVerticesAndEdges(serializedData);
                                    overallNodes = overallNodes.concat(separatedData['nodes']);
                                    overallLinks = overallLinks.concat(separatedData['links']);
                                });
                                const uniqueNodes = [...new Map(overallNodes.map(item => [item.id, item])).values()];
                                const uniqueLinks = [...new Map(overallLinks.map(item => [item.id, item])).values()];
                                return (
                                    <GraphCanvas
                                        nodes={uniqueNodes}
                                        links={uniqueLinks}
                                        setSelectedData={this.getSelectedData.bind(this)}
                                        queryGremlinServer={this.makeQuery.bind(this)}
                                        isDataChanged={true}
                                    />
                                )
                            } else if (this.state.canvasType === "table" && this.state.responses) {
                                return (
                                    <div>table</div>
                                )
                            } else if (this.state.canvasType === "json" && this.state.responses) {
                                return (
                                    <JSONCanvas responses={this.state.responses}/>
                                )
                            } else {
                                return (
                                    <Welcome makeQuery={this.makeQuery.bind(this)}/>
                                )
                            }
                        })()}
                    </ErrorBoundary>

                </MainContent>
                {parentHTML}
            </div>
        )
    }
}
