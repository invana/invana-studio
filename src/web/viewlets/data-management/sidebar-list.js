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
import {Button, Nav} from "react-bootstrap";
import VisJsGraphCanvasUtils from "../../views/explorer/canvas-utils";

export default class SidebarListBase extends React.Component {


    static propTypes = {
        statsData: PropTypes.array,
        onItemClick: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.canvasUtils = new VisJsGraphCanvasUtils();
    }

    getLabelType() {
        //
    }



    render() {
        let listIcon = faCircle;
        if (this.getLabelType() === "edge") {
            listIcon = faVectorSquare;
        }
        return (

            <ListGroup variant="flush">
                {
                    this.props.statsData.length === 0
                        ? <ListGroup.Item className={"text-muted"}>No vertices data found</ListGroup.Item>
                        : <React.Fragment/>
                }
                {
                    this.props.statsData.filter((label) => {
                        return label.label !== STUDIO_SETTINGS.managementVertexLabel
                    }).map((elementLabel, index) => {
                        return (
                            <ListGroup.Item action key={index}

                                            className={"pl-3 pt-0 pb-2"}
                            // className={"management-icon-btn"}
                                        title={"Show connected edges and vertices"}
                                        variant={"link"}

                                        onClick={() => this.props.onItemClick(elementLabel.label, this.getLabelType())}
                            >
                                {/*<Nav.Link className={"management-icon-btn"}*/}
                                {/*          title={"Show connected edges and vertices"}*/}
                                {/*          style={{*/}
                                {/*              'color': this.getElementColor(elementLabel.label, nodeLabels)*/}
                                {/*          }}*/}
                                {/*          href={"/data/" + this.getLabelType() + "/" + elementLabel.label}*/}
                                {/*>*/}
                                {/*    <FontAwesomeIcon*/}
                                {/*        className={"mr-1"}*/}
                                {/*        style={{'color': this.getElementColor(elementLabel.label, nodeLabels)}}*/}
                                {/*        icon={listIcon}/>{elementLabel.label}*/}
                                {/*    <span style={{"color": "#656565", "fontSize": "12px"}}>({elementLabel.count} entries)</span>*/}
                                {/*</Nav.Link>*/}

                                <span
                                    // href={"/data/" + this.getLabelType() + "/" + elementLabel.label}
                                >

                                    <FontAwesomeIcon
                                        className={"mr-1"}
                                        style={{'color': this.canvasUtils.getElementColor(elementLabel.label)}}
                                        icon={listIcon}/>
                                        {elementLabel.label}
                                    <span style={{
                                        "color": "#656565",
                                        "fontSize": "12px"
                                    }}>({elementLabel.count} entries)</span>
                                </span>


                            </ListGroup.Item>)
                    })
                }

            </ListGroup>

        );
    }
}

export class DataVertexManagement extends SidebarListBase {

    getLabelType() {
        return "vertex";
    }

}

export class DataEdgeManagement extends SidebarListBase {

    getLabelType() {
        return "edge";
    }

}
