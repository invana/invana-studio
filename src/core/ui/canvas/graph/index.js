import React from "react";
import "./graph.scss";
import D3ForceDirectedCanvas from "./canvas";
import LegendCanvas from "./legend";
import SelectedDataCanvas from "./selected-data";
import GremlinResponseSerializers from "../../../base/gremlin-serializer";

const serializer = new GremlinResponseSerializers()

export default class GraphCanvas extends React.Component {

    static defaultProps = {
        responses: [],
        shallReRenderD3Canvas: null,
        queryGremlinServer: () => console.error("queryGremlinServer prop not set for GraphCanvas"),
        setShowVertexOptions: (selectedNode) => console.error("setShowVertexOptions prop not set for GraphCanvas"),
        setHideVertexOptions: () => console.error("setHideVertexOptions prop not set for GraphCanvas"),
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

    setSelectedData(selectedData) {
        // this.shallReRenderD3Canvas = false;
        this.setState({
            selectedData: selectedData
        })
    }

    onFlyOutSelectedDataClose() {
        this.setSelectedData(null);
    }


    render() {
        return (
            <div className={"graphCanvas"}>
                <D3ForceDirectedCanvas
                    vertices={this.props.vertices}
                    edges={this.props.edges}
                    shallReRenderD3Canvas={this.props.shallReRenderD3Canvas}
                    setSelectedData={this.setSelectedData.bind(this)}
                    queryGremlinServer={this.props.queryGremlinServer}
                    setShowVertexOptions={this.props.setShowVertexOptions}
                    setHideVertexOptions={this.props.setHideVertexOptions}
                    startQuery={this.props.startQuery}
                />

                <LegendCanvas
                    nodes={this.props.vertices}
                    links={this.props.edges}
                    // nodeLabels={this.props.nodeLabels}
                    // linkLabels={this.props.linkLabels}
                />
                <SelectedDataCanvas selectedData={this.state.selectedData}
                                    onClose={this.onFlyOutSelectedDataClose.bind(this)}/>

            </div>


        )
    }
}
