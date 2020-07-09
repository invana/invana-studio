import React from "react";
import "./graph.scss";
import D3ForceDirectedCanvas from "./canvas";
import LegendCanvas from "./legend";
// import SelectedDataCanvas from "./selected-data";
// import GremlinResponseSerializers from "../../core/gremlin-serializer";

// const serializer = new GremlinResponseSerializers()

export default class GraphCanvas extends React.Component {

    static defaultProps = {
        responses: [],
        shallReRenderD3Canvas: null,
        queryGremlinServer: () => console.error("queryGremlinServer prop not set for GraphCanvas"),
        // setShowVertexOptions: (selectedNode) => console.error("setShowVertexOptions prop not set for GraphCanvas"),
        setHideVertexOptions: () => console.error("setHideVertexOptions prop not set for GraphCanvas"),
        setSelectedElementData: () => console.error("setSelectedElementData prop not set for GraphCanvas"),
        setRightContentName: () => console.error("setRightContentName prop not set for GraphCanvas"),
        setMiddleBottomContentName: () => console.error("setMiddleBottomContentName prop not set for GraphCanvas"),
        middleBottomContentName: () => console.error("middleBottomContentName prop not set for GraphCanvas"),
        vertices: [],
        startQuery: () => console.error("startQuery prop not set for GraphCanvas"),
        edges: []
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedData: null
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.shallReRenderD3Canvas === true) {
            this.props.resetShallReRenderD3Canvas()
        }
        this.render();
    }



    render() {
        return (
            <div className={"graphCanvas"}>
                  <LegendCanvas
                    nodes={this.props.vertices}
                    links={this.props.edges}
                    // nodeLabels={this.props.nodeLabels}
                    // linkLabels={this.props.linkLabels}
                />

                <D3ForceDirectedCanvas
                    vertices={this.props.vertices}
                    edges={this.props.edges}
                    shallReRenderD3Canvas={this.props.shallReRenderD3Canvas}
                    setSelectedElementData={this.props.setSelectedElementData}
                    queryGremlinServer={this.props.queryGremlinServer}
                    // setShowVertexOptions={this.props.setShowVertexOptions}
                    setHideVertexOptions={this.props.setHideVertexOptions}
                    setRightContentName={this.props.setRightContentName}
                    setMiddleBottomContentName={this.props.setMiddleBottomContentName}
                    middleBottomContentName={this.props.middleBottomContentName}
                    startQuery={this.props.startQuery}
                    setSelectedNode={this.props.setSelectedNode}
                />


            </div>


        )
    }
}
