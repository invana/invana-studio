import React from "react";
import RemoteGraphComponent from "../core/graph-component";
import GEList from "../ui-components/lists/list";
import {managementVertexLabel} from "../config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faProjectDiagram, faWrench} from "@fortawesome/free-solid-svg-icons";
import {getColorForString} from "../canvas/canvas-utils";

export default class EdgesManagement extends RemoteGraphComponent {

    state = {
        edgesLabels: []
    }

    componentDidMount() {
        const queryPayload = this.connector.requestBuilder.getEdgesLabelStats();
        this.makeQuery(queryPayload);
    }

    processResponse(response) {
        console.log("=====responses===", response);
        const result = response.getResponseResult();
        if (result) {
            this.setState({edgesLabels: response.getResponseResult()})
        }
    }

    getVertexColor(label, nodeLabels) {
        const nodeLabelOption = nodeLabels[label];
        if (nodeLabelOption && nodeLabelOption.bgColor) {
            return nodeLabelOption.bgColor;
        } else {
            return getColorForString(label);
        }
    }

    render() {
        const nodeLabels = Object.assign({}, JSON.parse(localStorage.getItem('nodeLabels')));
        console.log("=====this.state.edgesLabels", this.state.edgesLabels);
        return (

            <div className={" p-10"}>
                <GEList type={"vertical-no-border"}>
                    {
                        this.state.edgesLabels.filter((edgeLabel) => {
                            return edgeLabel.label !== managementVertexLabel
                        }).map((edgeLabel, index) => {
                            return (
                                <li style={{"marginBottom": "5px",}} key={index}>
                                    <button className={"management-icon-btn"}
                                            title={"Show connected edges and their vertices"}
                                            onClick={() => this.props.parentGraphComponent.makeQuery(
                                                this.connector.requestBuilder.filterEdgeAndGetNeighborVertices(
                                                    edgeLabel.label, 50, 0), {'source': 'canvas'})
                                            }>
                                        <FontAwesomeIcon icon={faProjectDiagram}/>
                                    </button>
                                    <button style={{"display": "none"}} className={"management-icon-btn"}
                                            title={"Show the vertices options"}
                                            onClick={() => this.props.setShowVertexOptions(edgeLabel.label, "g:Edge")}>
                                        <FontAwesomeIcon icon={faWrench}/>
                                    </button>
                                    <span style={{
                                        'display': 'inline',
                                        'color': this.getVertexColor(edgeLabel.label, nodeLabels)
                                    }}>
                                    {edgeLabel.label} ({edgeLabel.count})
                                        </span>
                                </li>)
                        })
                    }
                </GEList>
            </div>

        );
    }
}
