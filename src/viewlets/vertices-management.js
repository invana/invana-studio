import React from "react";
// import "./query-console.scss";
import RemoteGraphComponent from "../core/graph-component";
import GEList from "../ui-components/lists/list";


export default class VerticesManagement extends RemoteGraphComponent {

    state = {
        verticesLabels: []
    }


    componentDidMount() {
        // this.prop
        console.log("======", this.props, this.requestBuilder);
        const queryPayload = this.connector.requestBuilder.getVerticesLabelStats();
        this.makeQuery(queryPayload);
    }

    processResponse(response) {
        console.log("=====responses===", response);
        // if (response.status.code !== 200) {
        //     // this.props.setErrorMessage(response.status);
        //     console.log("Failed to get the vertices labels");
        // }else {
        console.log("===>>", response.getResponseResult());
        const lastResponse = response.getResponseResult();
        if (lastResponse) {
            this.setState({verticesLabels: response.getResponseResult()})
        }
        // }
        // this.props.setStatusMessage("Updated options for label '" + this.props.selectedElementData.label + "'");
        // this.props.reRenderCanvas();
    }


    render() {
        return (

            <div className={" p-10"}>
                <GEList type={"vertical-no-border"}>
                    {
                        this.state.verticesLabels.map((vertexLabel, index) => {
                            return (<li style={{"marginBottom": "5px", "cursor": "pointer"}} key={index}
                                        onClick={() => this.props.parentGraphComponent.makeQuery(
                                            this.connector.requestBuilder.filterVertices(vertexLabel.label, 10, 0), {'source': 'canvas'})}>{vertexLabel.label} ({vertexLabel.count})
                            </li>)
                        })
                    }
                </GEList>
            </div>

        );
    }
}
