import React from "react";
import "./query-console.scss";
// import PropTypes from "prop-types";
import RemoteGraphComponent from "../core/graph-component";

// const Mousetrap = require("mousetrap");

export default class VerticesManagement extends RemoteGraphComponent {

    state = {
        verticesLabels: []
    }




    componentDidMount() {
        // this.prop
        console.log("======", this.props, this.requestBuilder);
        const queryPayload = this.requestBuilder.getVerticesLabelStats();
        this.makeQuery(queryPayload);
    }

    processResponse(responses) {
        console.log("=====responses===", responses);
        const response = responses[0];
        // if (response.status.code !== 200) {
        //     // this.props.setErrorMessage(response.status);
        //     console.log("Failed to get the vertices labels");
        // }else {
        console.log("===>>", response.getResponseResult());
        this.setState({verticesLabels: response.getResponseResult()})
        // }
        // this.props.setStatusMessage("Updated options for label '" + this.props.selectedElementData.label + "'");
        // this.props.reRenderCanvas();
    }







    render() {
        console.log("=====this.state.verticesLabels", this.state.verticesLabels);
        return (

            <div className={" p-10"}>
                <ul>
                    {
                        this.state.verticesLabels.map((vertexLabel, index) => {
                            return (<li style={{"marginBottom": "5px", "cursor": "pointer"}} key={index} onClick={()=> this.props.parentGraphComponent.makeQuery(
                                this.requestBuilder.filterVertices(vertexLabel.label, 10, 0))}>{vertexLabel.label} ({vertexLabel.count})
                            </li>)
                        })
                    }
                </ul>
            </div>

        );
    }
}
