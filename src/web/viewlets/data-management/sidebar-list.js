import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faEye, faEyeSlash, faVectorSquare} from "@fortawesome/free-solid-svg-icons";
import "./sidebar-list.scss";
import {STUDIO_SETTINGS} from "../../../settings";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import VisJsGraphCanvasUtils from "../canvas/canvas-utils";
import LabelHoverOptions from "../../interface/label-hover-options";

// import HoverMenuContainer from "../canvas/hoverMenuContainer";

// import Button from "react-bootstrap/Button";

export default class SidebarListBase extends React.Component {

    static propTypes = {
        statsData: PropTypes.array,
        onItemClick: PropTypes.func,
        loadElementData: PropTypes.func,
        startNewQueryInConsole: PropTypes.func,
        showLabelMenu: PropTypes.bool,
        hiddenEdgeLabels: PropTypes.array,
        hiddenNodeLabels: PropTypes.array,
        canvasCtrl: PropTypes.object,
        edgeLabelsInCanvas: PropTypes.array,
        nodeLabelsInCanvas: PropTypes.array,


        showElementSettings: PropTypes.func,
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

    checkLabelDisplaySettings(hoveredLabelName, hoveredLabelType) {
        // "data-exist", "hidden", "data-doesnt-exist" about the label


        if (this.props.hiddenEdgeLabels) {
            if (hoveredLabelType === "edge") {
                if (this.props.hiddenEdgeLabels.includes(hoveredLabelName)) {
                    return "hidden";
                } else if (this.props.edgeLabelsInCanvas.includes(hoveredLabelName)) {
                    return "data-exist";
                } else {
                    return "data-doesnt-exist";
                }
            } else if (hoveredLabelType === "vertex") {
                if (this.props.hiddenNodeLabels.includes(hoveredLabelName)) {
                    return "hidden";
                } else if (this.props.nodeLabelsInCanvas.includes(hoveredLabelName)) {
                    return "data-exist";
                } else {
                    return "data-doesnt-exist";
                }
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
                <ListGroup variant="flush" as={"ul"}>
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
                            let listProps = {};
                            if (this.props.hiddenEdgeLabels) {
                                listProps = {as: "li"}
                            }

                            return (
                                <ListGroup.Item

                                    {...listProps}
                                    action key={index}
                                    className={"pl-3 pb-1 pt-1 border-bottom-0"}
                                    title={"Show connected edges and vertices"}
                                    // variant={"link"}
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
                                        style={{"color": this.checkLabelDisplaySettings(elementLabel.label, this.getLabelType() === "hidden") ? "#c9c9c9" : "inherit"}}>
                                    {elementLabel.label}

                                        </span>
                                    <span style={{

                                        "color": this.checkLabelDisplaySettings(elementLabel.label, this.getLabelType() === "hidden") ? "#c9c9c9" : "#656565",
                                        "fontSize": "12px"
                                    }}>({elementLabel.count} entries)                                    </span>
                                    <span className={"float-right"} style={{"position": "relative", "right": "-12px"}}>
                                        {
                                            this.checkLabelDisplaySettings(elementLabel.label, this.getLabelType()) === "hidden"
                                                ? <FontAwesomeIcon className={"text-light small"}
                                                                   icon={faEyeSlash}/>
                                                : <React.Fragment/>
                                        }
                                        {
                                            this.checkLabelDisplaySettings(elementLabel.label, this.getLabelType()) === "data-exist"
                                                ? <FontAwesomeIcon className={"text-light small"} icon={faEye}/>
                                                : <React.Fragment/>
                                        }
                                    </span>

                                    {
                                        this.state.hoveredLabelName === elementLabel.label
                                            // this.state.hoveredLabelName === null
                                            ?
                                            <LabelHoverOptions
                                                {...this.props}
                                                hoveredLabelName={this.state.hoveredLabelName}
                                                hoveredLabelType={this.getLabelType()}
                                                loadElementData={this.props.loadElementData}
                                                startNewQueryInConsole={this.props.startNewQueryInConsole}
                                                onClose={() => {
                                                    this.setState({
                                                        hoveredLabelName: null,
                                                        hoveredLabelType: null
                                                    })
                                                }}

                                                showElementSettings={this.props.showElementSettings}
                                                canvasCtrl={this.props.canvasCtrl}
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
