import React from "react";
import MainLeftNav from "../core/ui/structure/left";
import MainHeaderNav from "../core/ui/structure/header";
import MainContent from "../core/ui/main-content";
import JSONCanvas from "../core/ui/canvas/json";
import GraphCanvas from "../core/ui/canvas/graph/index";
import Welcome from "../core/components/welcome";
import SwitchConnection from "../core/components/switch";
import GremlinConnectorComponent from "../core/gremlin-connector";
import ErrorBoundary from "../core/ui/canvas/graph/error-boundary";
import FlyOutUI from "../core/ui/flyout";
import HistoryFlyOut from "../core/components/history";
import LearnFlyOut from "../core/components/learn";

export default class HomeView extends GremlinConnectorComponent {


    shallReRenderD3Canvas = true;

    constructor(props) {
        super(props);
        this.state = {
            responses: null,
            canvasType: "graph",
            canvasQuery: null,
            shallReRenderD3Canvas: true,
            leftFlyOutName: null,
            rightFlyOutName: null,
            centerModalName: "welcome"
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

    setLeftFlyOut(leftFlyOutName) {
        this.setState({
            leftFlyOutName: leftFlyOutName
        })
    }

    setRightFlyOut(leftFlyOutName) {
        this.setState({
            rightFlyOutName: leftFlyOutName
        })
    }

    onLeftFlyOutClose() {
        this.setState({
            leftFlyOutName: null
        })
    }

    onRightFlyOutClose() {
        this.setState({
            rightFlyOutName: null
        })
    }

    onCenterModalClose() {
        this.setState({
            centerModalName: null
        })
    }

    setCenterModal(modalName) {
        this.setState({
            centerModalName: modalName
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
                                if (!this.state.responses && this.state.centerModalName === "welcome") {
                                    return (
                                        <Welcome makeQuery={this.makeQuery.bind(this)}/>
                                    )
                                } else {
                                    return (
                                        <span>
                                            {
                                            (this.state.centerModalName === "switch-server") ?
                                                <SwitchConnection
                                                    gremlinUrl={this.props.gremlinUrl}
                                                    onClose={this.onCenterModalClose.bind(this)}/>
                                                : <span></span>
                                            }
                                        </span>
                                    )
                                }

                            }
                        })()}
                    </ErrorBoundary>
                </MainContent>
                {parentHTML}
                <MainLeftNav leftFlyOutName={this.state.leftFlyOutName}
                             onLeftFlyOutClose={this.onLeftFlyOutClose.bind(this)}
                             setLeftFlyOut={this.setLeftFlyOut.bind(this)}
                             setCenterModal={this.setCenterModal.bind(this)}
                />


                {
                    (this.state.rightFlyOutName === "learn") ?
                        <LearnFlyOut
                            onClose={this.onRightFlyOutClose.bind(this)}/>
                        : <span></span>
                }


            </div>
        )
    }
}
