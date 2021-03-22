import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faEyeSlash, faVectorSquare} from "@fortawesome/free-solid-svg-icons";
import "./sidebar-list.scss";
import {STUDIO_SETTINGS} from "../../../settings";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import VisJsGraphCanvasUtils from "../../views/explorer/canvas-utils";
// import HoverMenuContainer from "../canvas/hoverMenuContainer";
import LabelHoverOptions from "../canvas/label-hover-options";
// import Button from "react-bootstrap/Button";

export default class SidebarListBase extends React.Component {

    static propTypes = {
        statsData: PropTypes.array,
        onItemClick: PropTypes.func,
        startNewQueryInConsole: PropTypes.func,
        showLabelMenu: PropTypes.bool,
        hiddenEdgeLabels: PropTypes.array,
        hiddenNodeLabels: PropTypes.array,
    }

    constructor(props) {
        super(props);
        this.canvasUtils = new VisJsGraphCanvasUtils();
        this.state = {
            hoveredLabelName: null,
            hoveredLabelType: null,
            hoveredEvent: null
        }
    }

    getLabelType() {
        //
    }

    onLabelHover(hoveredLabelName, hoveredLabelType, hoveredEvent) {
        this.setState({
            hoveredLabelName,
            hoveredLabelType,
            hoveredEvent
        });
        // if(event){
        // console.log("mouseEvent", hoveredLabelName, hoveredLabelType, event)
        //
        // }

    }

    checkIfLabelAlreadyHidden(hoveredLabelName, hoveredLabelType) {
        if (this.props.hiddenEdgeLabels) {
            if (hoveredLabelType === "edge") {
                return this.props.hiddenEdgeLabels.includes(hoveredLabelName);
            } else if (hoveredLabelType === "vertex") {
                return this.props.hiddenNodeLabels.includes(hoveredLabelName);
            }
        }
        return false
    }

    render() {
        let listIcon = faCircle;
        if (this.getLabelType() === "edge") {
            listIcon = faVectorSquare;
        }


        return (
            <div>
                {/*{*/}
                {/*    this.state.hoveredLabelName ?*/}
                {/*        <HoverMenuContainer hoveredEvent={this.state.hoveredEvent}*/}
                {/*                            hoveredLabelName={this.state.hoveredLabelName}>*/}
                {/*            <LabelHoverOptions/>*/}
                {/*        </HoverMenuContainer>*/}
                {/*        : <React.Fragment/>*/}
                {/*}*/}
                <ListGroup variant="flush">
                    {
                        this.props.statsData.length === 0
                            ? <ListGroup.Item className={"text-muted pt-0 pb-1"}>No {this.getLabelType()}s labels data
                                found</ListGroup.Item>
                            : <React.Fragment/>
                    }
                    {
                        this.props.statsData.filter((label) => {
                            return label.label !== STUDIO_SETTINGS.MANAGEMENT_VERTEX_LABEL
                        }).map((elementLabel, index) => {

                            let itemProps = {};
                            if (this.props.showLabelMenu === true) {
                                itemProps = {
                                    onMouseEnter: (event) => this.onLabelHover(elementLabel.label, this.getLabelType(), event),
                                    onMouseLeave: () => this.onLabelHover(null, null)
                                }

                            } else {
                                itemProps = {
                                    onClick: () => this.props.onItemClick(elementLabel.label, this.getLabelType())
                                }
                            }
                            return (
                                <ListGroup.Item
                                    action key={index}
                                    className={"pl-3 pb-1 pt-1"}
                                    title={"Show connected edges and vertices"}
                                    variant={"link"}
                                    {...itemProps}

                                >
                                    <FontAwesomeIcon
                                        className={"mr-1"}
                                        style={{
                                            'color': this.canvasUtils.getElementColor(elementLabel.label),
                                            'fontSize': '.6rem',
                                            'position': 'relative',
                                            'top': '-2px'

                                        }}
                                        icon={listIcon}/>
                                    <span
                                        style={{"color": this.checkIfLabelAlreadyHidden(elementLabel.label, this.getLabelType()) ? "#c9c9c9" : "inherit"}}>
                                    {elementLabel.label}

                                        </span>
                                    <span style={{

                                        "color": this.checkIfLabelAlreadyHidden(elementLabel.label, this.getLabelType()) ? "#c9c9c9" : "#656565",
                                        "fontSize": "12px"
                                    }}>({elementLabel.count} entries)


                                    </span>
                                    <span className={"float-right"}>
                                         {
                                             this.checkIfLabelAlreadyHidden(elementLabel.label, this.getLabelType())
                                                 ? <FontAwesomeIcon icon={faEyeSlash}/>
                                                 : <React.Fragment/>
                                         }

                                    </span>

                                    {
                                        this.state.hoveredLabelName === elementLabel.label
                                            ? <LabelHoverOptions {...this.props}
                                                                 hoveredLabelName={this.state.hoveredLabelName}
                                                                 hoveredLabelType={this.getLabelType()}
                                                                 startNewQueryInConsole={this.props.startNewQueryInConsole}
                                                                 onClose={() => {
                                                                     this.setState({
                                                                         hoveredLabelName: null,
                                                                         hoveredLabelType: null
                                                                     })
                                                                 }
                                                                 }
                                            />
                                            : <React.Fragment/>
                                    }

                                </ListGroup.Item>)
                        })
                    }
                </ListGroup>
            </div>

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
