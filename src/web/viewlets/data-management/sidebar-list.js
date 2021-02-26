import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faVectorSquare} from "@fortawesome/free-solid-svg-icons";
import "./sidebar-list.scss";
import {STUDIO_SETTINGS} from "../../../settings";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
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
                        ? <ListGroup.Item className={"text-muted pt-0 pb-1"}>No vertices data found</ListGroup.Item>
                        : <React.Fragment/>
                }
                {
                    this.props.statsData.filter((label) => {
                        return label.label !== STUDIO_SETTINGS.MANAGEMENT_VERTEX_LABEL
                    }).map((elementLabel, index) => {
                        return (
                            <ListGroup.Item
                                action key={index}
                                className={"pl-3 pb-1 pt-1"}
                                title={"Show connected edges and vertices"}
                                variant={"link"}
                                onClick={() => this.props.onItemClick(elementLabel.label, this.getLabelType())}
                            >
                                <FontAwesomeIcon
                                    className={"mr-1"}
                                    style={{
                                        'color': this.canvasUtils.getElementColor(elementLabel.label),
                                        'font-size': '.6rem',
                                        'position': 'relative',
                                        'top': '-2px'

                                    }}
                                    icon={listIcon}/>
                                {elementLabel.label}
                                <span style={{
                                    "color": "#656565",
                                    "fontSize": "12px"
                                }}>({elementLabel.count} entries)</span>
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

export class DataEdgeManagement extends SidebarListBase
{

    getLabelType()
    {
        return "edge";
    }

}
