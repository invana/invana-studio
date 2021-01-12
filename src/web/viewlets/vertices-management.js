import React from "react";
import RemoteGraphComponent from "../core/graph-component";
import GEList from "../ui-components/lists/list";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWrench, faCircle} from "@fortawesome/free-solid-svg-icons";
import "./management.scss";
import {managementVertexLabel} from "../config";
import {getColorForString} from "../canvas/canvas-utils";

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
        // if (this.props.selectedElementData) {
        //
        // }

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

        return (

            <div className={" p-10 pb-0"}>
                {
                    this.state.verticesLabels.length === 0
                        ? <span className={"text-muted"}>No vertices data found</span>
                        : <span></span>
                }
                <GEList type={"vertical-no-border"}>
                    {
                        this.state.verticesLabels.filter((label) => {
                            return label.label !== managementVertexLabel
                        }).map((vertexLabel, index) => {
                            return (
                                <li style={{"marginBottom": "5px",}} key={index}>
                                    <button className={"management-icon-btn"}
                                            title={"Show connected edges and vertices"}
                                            style={{
                                                'color': this.getVertexColor(vertexLabel.label, nodeLabels)
                                            }}
                                            onClick={() => this.props.parentGraphComponent.makeQuery(
                                                this.connector.requestBuilder.getNeighborEdgesAndVertices(
                                                    vertexLabel.label, 10, 0), {'source': 'canvas'})}>
                                        <FontAwesomeIcon
                                            style={{'color': this.getVertexColor(vertexLabel.label, nodeLabels)}}
                                            icon={faCircle}/>

                                        <span style={{
                                            'display': 'inline',
                                            // 'color': this.getVertexColor(vertexLabel.label, nodeLabels)
                                        }}>
                                    {vertexLabel.label} <small style={{"color": "#656565"}}>
                                            ({this.props.parentGraphComponent.dataStore.verticesStats.get(vertexLabel.label)
                                        || 0} of {vertexLabel.count})
                                        </small>
                                    </span>
                                    </button>
                                    {/*<button className={"management-icon-btn"} title={"Show "}*/}
                                    {/*        onClick={() => this.props.parentGraphComponent.makeQuery(*/}
                                    {/*            this.connector.requestBuilder.filterVertices(vertexLabel.label, 50, 0),*/}
                                    {/*            {'source': 'canvas'})}>*/}
                                    {/*    <FontAwesomeIcon icon={faCircle}/>*/}
                                    {/*</button>*/}
                                    <button
                                        className={"management-icon-btn management-icon-btn-right"}
                                        title={"Show the vertices options"}
                                        onClick={() => this.props.setShowVertexOptions(vertexLabel.label, "g:Vertex")}>
                                        <FontAwesomeIcon icon={faWrench}/>
                                    </button>


                                </li>)
                        })
                    }
                </GEList>
            </div>

        );
    }
}
