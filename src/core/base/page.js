/*
To create new pages with full header, left nav etc ui components
 */
import React from "react";
import ComponentBase from "./base";
import Header from "./header";
import QueryInputForm from "../ui/form/query-forms";
import LeftNav from "./left-nav";
import SecondaryHeader from "./secondary-header";
import GremlinHeadlessComponent from "./gremlin";
import LearnFlyOut from "../components/learn";
import SecondaryHeaderBase from "../ui/structure/top-secondary";
import FlyOutUI from "../ui/flyout";
import MainContent from "../ui/main-content";
import ErrorBoundary from "../ui/canvas/graph/error-boundary";
import GraphCanvas from "../ui/canvas/graph";
import JSONCanvas from "../ui/canvas/json";
import Welcome from "../components/welcome";
import SwitchConnection from "../components/switch";

export default class PageComponentBase extends GremlinHeadlessComponent {

    constructor(props) {
        super(props);
        this.state = {
            canvasQuery: null,
            canvasType: "graph",

            leftFlyOutName: null,
            rightFlyOutName: null,
            centerModalName: "welcome"
        }
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

    processResponse(responses) {
        this.setState({
            responses: responses,
            shallReRenderD3Canvas: true
        })
    }

    render() {
        const superRender = super.render();
        return (
            <div>
                <Header canvasQuery={this.props.canvasQuery} onQuerySubmit={this.props.onQuerySubmit}/>


                <SecondaryHeader canvasQuery={this.state.canvasQuery}
                                 onRightFlyOutClose={this.onRightFlyOutClose.bind(this)}
                                 setRightFlyOut={this.setRightFlyOut.bind(this)}/>

                {superRender}
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
                <LeftNav leftFlyOutName={this.state.leftFlyOutName}
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
                {
                    this.state.errorMessage ?
                        <FlyOutUI position={"bottom"}
                                  display={this.state.errorMessage ? "block" : "none"}
                                  title={"Query failed(" + this.state.errorMessage.code + "): " + this.state.errorMessage.message}
                                  isWarning={true}
                                  padding={false}
                                  onClose={this.onErrorMessageFlyoutClose.bind(this)}
                        >
                            <div className={"errorMessage"}>
                                <pre>{JSON.stringify(this.state.errorMessage, null, 4)}</pre>
                            </div>
                        </FlyOutUI> : <span></span>
                }
            </div>
        )
    }
}
