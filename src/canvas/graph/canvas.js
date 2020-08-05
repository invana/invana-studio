import React from "react";
import "./graph.scss";
import CytoscapeEngine from "./cytoscape";
import PropTypes from "prop-types";

export default class GraphCanvas extends React.Component {

    htmlSelector = ".graph-canvas";

    static defaultProps = {
        queryGremlinServer: () => console.error("queryGremlinServer not set"),

        vertices: [],
        edges: [],
        shallReRenderD3Canvas: false,

        setSelectedElementData: (selectedData) => console.error("setSelectedElementData not set", selectedData),
        setMiddleBottomContentName: (contentName) => console.error("setMiddleBottomContentName not set", contentName),
    }

    static propTypes = {
        queryGremlinServer: PropTypes.func,

        edges: PropTypes.array,
        vertices: PropTypes.array,
        shallReRenderD3Canvas: PropTypes.bool,

        setSelectedElementData: PropTypes.func,
        setMiddleBottomContentName: PropTypes.func,
    }

    render() {
        return (
            <div className={"D3GraphCanvas"}>
                <CytoscapeEngine
                    edges={this.props.edges}
                    vertices={this.props.vertices}
                    htmlSelector={this.htmlSelector}
                    queryGremlinServer={this.props.queryGremlinServer}
                    setSelectedElementData={this.props.setSelectedElementData}
                    setMiddleBottomContentName={this.props.setMiddleBottomContentName}
                />
            </div>
        )

    }
}
