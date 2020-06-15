import React from "react";
import "./graph.scss";
import D3ForceDirectedCanvas from "./canvas";

export default class GraphCanvas extends React.Component {

    static defaultProps = {
        nodes: [],
        links: [],
        isDataChanged: null,
        getSelectedElementDataFn: (selectedData) => console.error("getSelectedElementDataFn not set"),
        queryGremlinServer: () => console.error("queryGremlinServer not set"),
    }

    render() {


        return (
            <div className={"graphCanvas"}>
                <D3ForceDirectedCanvas
                nodes={this.props.nodes}
                links={this.props.links}
                isDataChanged={this.props.isDataChanged}
                getSelectedElementDataFn={this.props.getSelectedElementDataFn}
                queryGremlinServer={this.props.queryGremlinServer}
                />
            </div>


        )
    }
}
