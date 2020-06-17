import React from "react";
import MainLeftNav from "../core/ui/structure/left";
import MainHeaderNav from "../core/ui/structure/header";
import MainContent from "../core/ui/main-content";
import JSONCanvas from "../core/ui/canvas/json";
import GraphCanvas from "../core/ui/canvas/graph/index";
import Welcome from "../core/ui/welcome";
import GremlinConnectorComponent from "../core/gremlin-connector";
import ErrorBoundary from "../core/ui/canvas/graph/error-boundary";
import FlyOutUI from "../core/ui/flyout";

export default class HomeView extends GremlinConnectorComponent {


    shallReRenderD3Canvas = true;

    constructor(props) {
        super(props);
        this.state = {
            responses: null,
            canvasType: "graph",
            canvasQuery: null,
            shallReRenderD3Canvas: true,
            leftFlyOutName: null
        }
    }

    // componentDidUpdate(prevProps) {
    //     this.shallReRenderD3Canvas = true;
    // }


    getQueryFromUrl() {
        return new URLSearchParams(window.location.search).get("query");
    }


    loadQueryFromUrl() {
        const query = this.getQueryFromUrl();
        if (query && query !== "null") {
            this.makeQuery(query, true);
        }
    }

    componentDidMount() {
        super.componentDidMount();
        setTimeout(() => this.loadQueryFromUrl(), 300);
    }

    makeQuery(query, setUrl) {
        super.makeQuery(query, setUrl);
        this.setState({
            canvasQuery: query
        })
    }

    onQuerySubmit(query) {
        console.log("Query is " + query);
        this.makeQuery(query, true);
    }

    processResponse(responses) {
        this.setState({
            responses: responses,
            shallReRenderD3Canvas: true
        })
    }

    setLeftFlyOut(leftFlyOutName){
        this.setState({
            leftFlyOutName: leftFlyOutName
        })
    }

    onLeftFlyOutClose(leftFlyOutName){
        this.setState({
            leftFlyOutName: null
        })
    }

    render() {

        const parentHTML = super.render();
        return (
            <div>
                <MainHeaderNav canvasQuery={this.state.canvasQuery} onQuerySubmit={this.onQuerySubmit.bind(this)}/>
                <MainContent>
                    <ErrorBoundary>
                        {(() => {
                            if (this.state.canvasType === "graph" && this.state.responses) {
                                return (
                                    <GraphCanvas
                                        responses={this.state.responses}
                                        queryGremlinServer={this.makeQuery.bind(this)}
                                        shallReRenderD3Canvas={this.state.shallReRenderD3Canvas}
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
                <MainLeftNav leftFlyOutName={this.state.leftFlyOutName}
                             onLeftFlyOutClose={this.onLeftFlyOutClose.bind(this)} setLeftFlyOut={this.setLeftFlyOut.bind(this)}/>

            </div>
        )
    }
}
