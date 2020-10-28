import React from "react";
import "./graph.scss";
import D3ForceDirectedCanvas from "./canvas";
import LegendCanvas from "./legend";
import PropTypes from "prop-types";

export default class GraphicsEngine extends React.Component {

    static defaultProps = {
        responses: [],
        shallReRenderD3Canvas: null,
        makeQuery: () => console.error("makeQuery prop not set for GraphicsEngine"),
        // setShowVertexOptions: (selectedNode) => console.error("setShowVertexOptions prop not set for GraphicsEngine"),
        // setHideVertexOptions: () => console.error("setHideVertexOptions prop not set for GraphicsEngine"),
        setSelectedElementData: () => console.error("setSelectedElementData prop not set for GraphicsEngine"),
        setRightContentName: () => console.error("setRightContentName prop not set for GraphicsEngine"),
        setMiddleBottomContentName: () => console.error("setMiddleBottomContentName prop not set for GraphicsEngine"),
        middleBottomContentName: () => console.error("middleBottomContentName prop not set for GraphicsEngine"),
        requestBuilder: () => console.error("requestBuilder prop not set for GraphicsEngine"),
        vertices: [],
        startQuery: () => console.error("startQuery prop not set for GraphicsEngine"),
        edges: []
    }

    static propTypes = {
        shallReRenderD3Canvas: PropTypes.bool,
        resetShallReRenderD3Canvas: PropTypes.func,
        setSelectedElementData: PropTypes.func,
        makeQuery: PropTypes.func,
        // TODO - check difference between makeQuery and startQuery
        startQuery: PropTypes.func,
        setSelectedNode: PropTypes.func,
        setHideVertexOptions: PropTypes.func,
        setRightContentName: PropTypes.func,
        setMiddleBottomContentName: PropTypes.func,
        requestBuilder: PropTypes.object,
        vertices: PropTypes.array,
        edges: PropTypes.array,
        middleBottomContentName: PropTypes.string,


    }

    constructor(props) {
        super(props);
        this.state = {
            selectedData: null
        }
    }

    componentDidUpdate() {
        if (this.props.shallReRenderD3Canvas === true) {
            this.props.resetShallReRenderD3Canvas()
        }
        this.render();
    }


    render() {
        return (
            <div className={"GraphicsEngine"}>
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
                    makeQuery={this.props.makeQuery}
                    // setShowVertexOptions={this.props.setShowVertexOptions}
                    setHideVertexOptions={this.props.setHideVertexOptions}
                    setRightContentName={this.props.setRightContentName}
                    setMiddleBottomContentName={this.props.setMiddleBottomContentName}
                    middleBottomContentName={this.props.middleBottomContentName}
                    startQuery={this.props.startQuery}
                    setSelectedNode={this.props.setSelectedNode}
                    requestBuilder={this.props.requestBuilder}
                />


            </div>


        )
    }
}
