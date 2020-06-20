import PageComponentBase from "../core/base/page";
import MainContent from "../core/ui/main-content";
import ErrorBoundary from "../core/ui/canvas/graph/error-boundary";
import GraphCanvas from "../core/ui/canvas/graph";
import JSONCanvas from "../core/ui/canvas/json";
import FounderNote from "../core/components/founder-note";
import SwitchConnection from "../core/components/switch";
import React from "react";
import VertexOptions from "../core/components/vertex-options";
import SelectedDataCanvas from "../core/ui/canvas/graph/selected-data";
import Header from "../core/base/header";

export default class ExplorerView extends PageComponentBase {


    constructor(props) {
        super(props);
        this.state = {
            showVertexOptions: false,
            canvasType: "graph",
            rightFlyOutName: "welcome",
            selectedNode: null,
            // shallReRenderD3Canvas: false
        };
    }


    setShowVertexOptions(selectedNode) {
        this.setState({
            showVertexOptions: true,
            selectedNode: selectedNode
        })
    }

    reRenderCanvas() {
        this.setState({
            shallReRenderD3Canvas: true
        })
    }

    setHideVertexOptions() {
        this.setState({
            showVertexOptions: false,
            selectedNode: null
        })
    }

    componentDidMount() {
        super.componentDidMount();
    }

    resetShallReRenderD3Canvas() {
        this.setState({
            shallReRenderD3Canvas: false
        })
    }

    render() {
        const superContent = super.render();
        const _this = this;
        return (
            <div>
                <MainContent>
                    <ErrorBoundary>
                        {(() => {
                            if (this.state.canvasType === "graph" && this.state.responses) {
                                return (
                                    <GraphCanvas
                                        setShowVertexOptions={this.setShowVertexOptions.bind(this)}
                                        setHideVertexOptions={this.setHideVertexOptions.bind(this)}
                                        responses={this.state.responses}
                                        queryGremlinServer={this.makeQuery.bind(this)}
                                        resetShallReRenderD3Canvas={this.resetShallReRenderD3Canvas.bind(this)}
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
                                    <span></span>
                                )
                            }
                        })()}
                    </ErrorBoundary>
                </MainContent>

                {superContent}
                {
                    (this.state.rightFlyOutName === "switch-server") ?
                        <SwitchConnection
                            gremlinUrl={this.props.gremlinUrl}
                            onClose={this.onRightFlyOutClose.bind(this)}/>
                        : <span></span>
                }
                {
                    (this.state.rightFlyOutName === "welcome") ?
                        <FounderNote makeQuery={this.makeQuery.bind(this)}
                                     setRightFlyOut={this.setRightFlyOut.bind(this)}

                                     addQueryToConsole={this.addQueryToConsole.bind(this)}
                                     onClose={this.onRightFlyOutClose.bind(this)}/>
                        : <span></span>
                }
                {
                    this.state.showVertexOptions
                        ? <VertexOptions selectedNode={this.state.selectedNode}
                                         setStatusMessage={this.setStatusMessage.bind(this)}
                                         setErrorMessage={this.setErrorMessage.bind(this)}
                                         onClose={this.setHideVertexOptions.bind(this)}
                                         reRenderCanvas={this.reRenderCanvas.bind(this)}
                        />
                        : <span></span>
                }

            </div>
        )
    }

}
