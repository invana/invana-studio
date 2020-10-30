import React from "react";
// import "./query-console.scss";
import RemoteGraphComponent from "../core/graph-component";
import GEList from "../ui-components/lists/list";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faEye, faCircle, faWrench, faProjectDiagram} from "@fortawesome/free-solid-svg-icons";
import "./management.scss";
import {managementVertexLabel} from "../config";

export default class VerticesManagement extends RemoteGraphComponent {

    state = {
        verticesLabels: []
    }
    // static defaultProps = {
    //     setShowVertexOptions: (selectedLabel) => console.debug("this.setShowVertexOptions not set", selectedLabel),
    //
    // }

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
                        this.state.verticesLabels.filter((label)=> { return label.label !== managementVertexLabel} ).map((vertexLabel, index) => {
                            return (
                                <li style={{"marginBottom": "5px",}} key={index}>
                                    <button className={"management-icon-btn"}
                                            title={"Show connected edges and vertices"}
                                            onClick={() => this.props.parentGraphComponent.makeQuery(
                                                this.connector.requestBuilder.getNeighborEdgesAndVertices(vertexLabel.label, 10, 0), {'source': 'canvas'})}>
                                        <FontAwesomeIcon icon={faProjectDiagram}/>
                                    </button>
                                    <button className={"management-icon-btn"} title={"Show "}
                                            onClick={() => this.props.parentGraphComponent.makeQuery(
                                                this.connector.requestBuilder.filterVertices(vertexLabel.label, 10, 0),
                                                {'source': 'canvas'})}>
                                        <FontAwesomeIcon icon={faCircle}/>
                                    </button>
                                    <button className={"management-icon-btn"} title={"Show the vertices options"}
                                            onClick={() => this.props.setShowVertexOptions(vertexLabel.label)}>
                                        <FontAwesomeIcon icon={faWrench}/>
                                    </button>
                                    {vertexLabel.label} ({vertexLabel.count})

                                </li>)
                        })
                    }
                </GEList>
            </div>

        );
    }
}
