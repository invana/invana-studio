import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import {invertColor} from "./utils";
import "./focused-nodes-list.scss";

export default class FocusedNodesList extends React.Component {

    static defaultProps = {
        focusedNodes: [],
        canvasUtils: null,
        removeFocusedNode: (nodeId) => console.log("removedFocusedNode", nodeId)
    }

    static propTypes = {
        focusedNodes: PropTypes.array,
        removeFocusedNode: PropTypes.func,
        canvasUtils: PropTypes.object,
    }

    removeFocusedNode(nodeId) {
        console.log("removeFocusedNode", nodeId);
        this.props.removeFocusedNode(nodeId);
    }

    render() {
        return (
            <div className={"focused-nodes-list pl-3"}>
                <ul>
                    {
                        this.props.focusedNodes.map((focusedNode, index) => {
                            console.log("=====focusedNode", focusedNode);
                            const color = this.props.canvasUtils.getElementColor(focusedNode._label);
                            const colorInverted = invertColor(color, true);
                            return (
                                <li key={index} className={"focused-node"}
                                    style={{
                                        "backgroundColor": color,
                                        "color": colorInverted
                                    }}>
                                    {focusedNode.label}
                                    <span className={"close-btn"}
                                          style={{"color": colorInverted}}
                                          onClick={() => this.removeFocusedNode(focusedNode.id)}>
                                        <FontAwesomeIcon icon={faWindowClose}/>
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>
        )
    }
}
