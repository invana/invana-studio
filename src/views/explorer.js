import PageComponentBase from "../core/base/page";
import MainContent from "../core/ui/main-content";
import ErrorBoundary from "../core/ui/canvas/graph/error-boundary";
import GraphCanvas from "../core/ui/canvas/graph";
import JSONCanvas from "../core/ui/canvas/json";
import FounderNote from "../core/components/founder-note";
import SwitchConnection from "../core/components/switch";
import React from "react";
import VertexOptions from "../core/components/vertex-options";
import RawResponsesCanvas from "../core/ui/canvas/raw-responses";
import TableCanvas from "../core/ui/canvas/table";
import GremlinResponseSerializers from "../core/base/gremlin-serializer";
import AsideNav from "../core/base/aside";
import HistoryFlyOut from "../core/components/history";
import QueryConsole from "../core/components/console";
import SettingsFlyOut from "../core/ui/settings";
import SupportFlyOut from "../core/components/support";
import AboutComponent from "../core/components/about";

const serializer = new GremlinResponseSerializers();

export default class ExplorerView extends PageComponentBase {


    constructor(props) {
        super(props);
        this.state = {
            showVertexOptions: false,
            canvasType: "graph",
            rightFlyOutName: "welcome",
            selectedNode: null,
            query: "g.V().limit(5).toList()",
            vertices: [],
            edges: []
            // shallReRenderD3Canvas: false
        };
    }

    //


    extendGraph(responses) {
        let overallNodes = this.state.vertices || [];
        let overallLinks = this.state.edges || [];
        responses.forEach(function (response) {
            const serializedData = serializer.process(response);
            const separatedData = serializer.separateVerticesAndEdges(serializedData);
            overallNodes = overallNodes.concat(separatedData['nodes']);
            overallLinks = overallLinks.concat(separatedData['links']);
        });
        const uniqueNodes = [...new Map(overallNodes.map(item => [item.id, item])).values()];
        const uniqueLinks = [...new Map(overallLinks.map(item => [item.id, item])).values()];
        this.setState({
            vertices: uniqueNodes,
            edges: uniqueLinks,
            shallReRenderD3Canvas: true
        })
    }

    processResponse(responses) {
        super.processResponse(responses);
        this.extendGraph(responses);
    }

    onQuerySubmit(query, queryOptions) {
        super.onQuerySubmit(query, queryOptions)
        // this.updateVerticesAndEdges();
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

        let mainContentLeft = null;
        if (this.state.leftFlyOutName !== null) {
            mainContentLeft = "445px";
        } else {
            mainContentLeft = "45px";
        }

        return (
            <div>
                {
                    (this.state.leftFlyOutName)
                        ? <AsideNav>
                            {
                                (this.state.leftFlyOutName === "history") ?
                                    <HistoryFlyOut
                                        makeQuery={this.makeQuery.bind(this)}
                                        addQueryToConsole={this.addQueryToConsole.bind(this)}
                                        onClose={this.onLeftFlyOutClose.bind(this)}
                                    />
                                    : <span></span>
                            }
                            {
                                (this.state.leftFlyOutName === "query-console") ?
                                    <QueryConsole
                                        onQuerySubmit={this.onQuerySubmit.bind(this)}
                                        query={this.state.query}
                                        onClose={this.onLeftFlyOutClose.bind(this)}
                                    />
                                    : <span></span>
                            }
                            {
                                (this.state.leftFlyOutName === "settings") ?
                                    <SettingsFlyOut
                                        setLeftFlyOut={this.setLeftFlyOut.bind(this)}
                                        onClose={this.onLeftFlyOutClose.bind(this)}/>
                                    : <span></span>
                            }
                            {
                                (this.state.rightFlyOutName === "support") ?
                                    <SupportFlyOut
                                        setLeftFlyOut={this.setLeftFlyOut.bind(this)}
                                        onClose={this.onRightFlyOutClose.bind(this)}/>
                                    : <span></span>
                            }
                            {
                                (this.state.rightFlyOutName === "about") ?
                                    <AboutComponent
                                        setLeftFlyOut={this.setLeftFlyOut.bind(this)}
                                        onClose={this.onRightFlyOutClose.bind(this)}/>
                                    : <span></span>
                            }
                        </AsideNav>
                        : <span></span>
                }

                <MainContent style={{"left": mainContentLeft}}>
                    <ErrorBoundary>
                        {(() => {
                            if (this.state.canvasType === "graph" && this.state.responses) {
                                return (
                                    <GraphCanvas
                                        setShowVertexOptions={this.setShowVertexOptions.bind(this)}
                                        setHideVertexOptions={this.setHideVertexOptions.bind(this)}
                                        responses={this.state.responses}
                                        vertices={this.state.vertices}
                                        edges={this.state.edges}
                                        queryGremlinServer={this.makeQuery.bind(this)}
                                        resetShallReRenderD3Canvas={this.resetShallReRenderD3Canvas.bind(this)}
                                        shallReRenderD3Canvas={this.state.shallReRenderD3Canvas}
                                    />
                                )
                            } else if (this.state.canvasType === "json" && this.state.responses) {
                                return (
                                    <JSONCanvas
                                        vertices={this.state.vertices}
                                        edges={this.state.edges}
                                        responses={this.state.responses}/>
                                )
                            } else if (this.state.canvasType === "table" && this.state.responses) {
                                return (
                                    <TableCanvas
                                        vertices={this.state.vertices}
                                        edges={this.state.edges}
                                        responses={this.state.responses}/>
                                )
                            } else if (this.state.canvasType === "raw" && this.state.responses) {
                                return (
                                    <RawResponsesCanvas
                                        // vertices={this.state.vertices}
                                        // edges={this.state.edges}
                                        responses={this.state.responses}/>
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

                <div className="canvasStats">
                    {this.state.vertices.length} vertices, {this.state.edges.length} edges
                </div>

            </div>
        )
    }

}
