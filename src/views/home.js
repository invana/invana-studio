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


export default class HomeView extends GremlinConnectorComponent {


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data: null
    //     }
    // }
    shallReRenderD3Canvas = true;

    constructor(props) {
        super(props);
        this.state = {
            responses: null,
            canvasType: "graph"
        }
    }

    componentDidUpdate(prevProps) {
        this.shallReRenderD3Canvas = true;
    }


    onQuerySubmit(query) {
        console.log("Query is " + query);
        // make query to gremlin here
        this.makeQuery(query);
    }

    processResponse(responses) {
        this.shallReRenderD3Canvas = true;
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
                                return (
                                    <GraphCanvas
                                        responses={this.state.responses}
                                        queryGremlinServer={this.makeQuery.bind(this)}
                                        shallReRenderD3Canvas={this.shallReRenderD3Canvas}
                                    />
                                )
                            } else if (this.state.canvasType === "table" && this.state.responses) {
                                return (
                                    <div>table ui comes here</div>
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
