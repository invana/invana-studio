import PageComponentBase from "../core/base/page";
import MainContent from "../core/ui/main-content";
import ErrorBoundary from "../core/ui/canvas/graph/error-boundary";
import GraphCanvas from "../core/ui/canvas/graph";
import JSONCanvas from "../core/ui/canvas/json";
import Welcome from "../core/components/welcome";
import SwitchConnection from "../core/components/switch";
import React from "react";
import LearnFlyOut from "../core/components/learn";
import VertexOptions from "../core/components/vertex-options";

export default class ExplorerView extends PageComponentBase {


    constructor(props) {
        super(props);
        this.state = {
            showVertexOptions: false,
            canvasType: "graph",
            centerModalName: "welcome",
            selectedNode: null
        };
    }


    setShowVertexOptions(selectedNode) {
        this.setState({
            showVertexOptions: true,
            selectedNode: selectedNode
        })

    }

    reRenderCanvas() {
        // use this to rerender the data.
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

    render() {
        const superContent = super.render();
        return (
            <div>
                <MainContent>
                    <ErrorBoundary>
                        {(() => {
                            if (this.state.canvasType === "graph" && this.state.responses) {
                                return (
                                    <GraphCanvas
                                        setShowVertexOptions={this.setShowVertexOptions.bind(this)}
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
                {superContent}

            </div>
        )
    }

}
