import React from "react";
import List from "../ui-components/lists/list";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faSave, faSearch, faSync, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";


export default class CanvasNav extends React.Component {

    static defaultProps = {
        canvasType: null,
        switchCanvasTo: (canvasType) => console.log("switchCanvasTo not set", canvasType),
        confirmFlushCanvas: () => console.log("confirmFlushCanvas not set"),
        confirmRedrawCanvas: () => console.log("confirmRedrawCanvas not set")
    }
    static propTypes = {
        canvasType: PropTypes.string,
        switchCanvasTo: PropTypes.func,
        confirmFlushCanvas: PropTypes.func,
        confirmRedrawCanvas: PropTypes.func
    }

    render() {
        return (
            <div className={"main-content-nav"}>
                <List type={"canvas-nav"} style={{"float": "left"}}>
                    <li>
                        &nbsp;
                    </li>
                    <li>
                        <div className={"canvasToggle"}>
                            <button className={this.props.canvasType === "graph" ? "selected" : ""}
                                    onClick={() => this.props.switchCanvasTo("graph")}>Graph
                            </button>
                            <button className={this.props.canvasType === "table" ? "selected" : ""}
                                    onClick={() => this.props.switchCanvasTo("table")}>Table
                            </button>
                            <button className={this.props.canvasType === "json" ? "selected" : ""}
                                    onClick={() => this.props.switchCanvasTo("json")}>JSON
                            </button>
                            {/*<a className={this.canvasType === "raw" ? "selected" : ""}*/}
                            {/*   onClick={() => this.props.switchCanvasTo("raw")}>Raw</a>*/}

                        </div>
                    </li>
                    <li>
                        <button title={"clear the canvas"}
                                onClick={() => this.props.confirmFlushCanvas()}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                    </li>
                    <li>
                        <button title={"re render the canvas"}
                                onClick={() => this.props.confirmRedrawCanvas()}>
                            <FontAwesomeIcon icon={faSync}/>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => alert("Still in the Design stage")}>
                            <FontAwesomeIcon icon={faSave}/>
                        </button>
                    </li>


                </List>

                <List type={"canvas-nav"} style={{"float": "right"}}>
                    <li>
                        <button onClick={() => alert("Still in the Design stage")}>
                            <FontAwesomeIcon icon={faFilter}/>
                        </button>
                    </li>

                    <li>
                        <button onClick={() => alert("Still in the Design stage")}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </li>
                </List>
            </div>
        );
    }

}
