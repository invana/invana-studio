import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faVectorSquare
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar-list.scss";
import {getColorForString} from "../../interface/utils";
import {STUDIO_SETTINGS} from "../../../settings";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import {Nav} from "react-bootstrap";
import RemoteEngine from "../../layout/remote";

export default class SidebarListBase extends RemoteEngine {


    static propTypes = {
        parentRemoteComponent: PropTypes.object,
    }

    state = {
        elementLabels: []
    }

    getUrlPrefix() {
        //
    }


    processResponse(response) {
        const lastResponse = response.getResponseResult();
        if (lastResponse) {
            this.setState({elementLabels: response.getResponseResult()})
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


        let listIcon = faCircle;
        if (this.getUrlPrefix() === "/edge") {
            listIcon = faVectorSquare;
        }
        return (

            <ListGroup variant="flush">
                {
                    this.state.elementLabels.length === 0
                        ? <ListGroup.Item className={"text-muted"}>No vertices data found</ListGroup.Item>
                        : <React.Fragment/>
                }
                {
                    this.state.elementLabels.filter((label) => {
                        return label.label !== STUDIO_SETTINGS.managementVertexLabel
                    }).map((elementLabel, index) => {
                        return (
                            <ListGroup.Item action key={index}>
                                <Nav.Link className={"management-icon-btn"}
                                          title={"Show connected edges and vertices"}
                                          style={{
                                              'color': this.getVertexColor(elementLabel.label, nodeLabels)
                                          }}
                                          href={this.getUrlPrefix() + "/label/" + elementLabel.label}
                                >
                                    <FontAwesomeIcon
                                        className={"mr-1"}
                                        style={{'color': this.getVertexColor(elementLabel.label, nodeLabels)}}
                                        icon={listIcon}/>{elementLabel.label}
                                    <h7 style={{"color": "#656565"}}>({elementLabel.count} entries)</h7>

                                </Nav.Link>


                            </ListGroup.Item>)
                    })
                }

            </ListGroup>

        );
    }
}

export class DataVertexManagement extends SidebarListBase {

    getUrlPrefix() {
        return "/vertex";
    }

    componentDidMount() {
        const queryPayload = this.connector.requestBuilder.getVerticesLabelStats();
        this.makeQuery(queryPayload);
    }

}

export class DataEdgeManagement extends SidebarListBase {

    getUrlPrefix() {
        return "/edge";
    }

    componentDidMount() {
        const queryPayload = this.connector.requestBuilder.getEdgesLabelStats();
        this.makeQuery(queryPayload);
    }

}
