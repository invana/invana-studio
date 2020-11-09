import React, {Fragment} from "react";
import List from "../ui-components/lists/list";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCamera, faDotCircle, faFilter, faSave, faSync,
    faTerminal, faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import FilterNodes from "./menu-ui-components/filter-nodes";
import FocusNode from "./menu-ui-components/focus-node";
import QueryConsole from "./menu-ui-components/query-console";
// import GEPanel from "../ui-components/panels/panel";
// import HistoryComponent from "../viewlets/history";


export default class CanvasNav extends React.Component {


    static defaultProps = {
        canvasType: null,
        canvasCtrl: null,
        connector: null,
        dataStore: null,
        getGraphicsEngine: ()=>console.log("getGraphicsEngine not set"),
        makeQuery: (query) => console.log("makeQuery not set ", query),
    }
    static propTypes = {
        canvasType: PropTypes.string,
        canvasCtrl: PropTypes.object,
        makeQuery: PropTypes.func,
        dataStore: PropTypes.object,
        getGraphicsEngine: PropTypes.func,
        // confirmFlushCanvas: PropTypes.func,
        connector: PropTypes.object
        // confirmRedrawCanvas: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            canvasMenuType: null
        }
    }

    switchToCanvasMenu(canvasMenuType) {
        console.log("updating canvasMenuType", canvasMenuType);
        this.setState({
            canvasMenuType: canvasMenuType
        });
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
                                    onClick={() => this.props.canvasCtrl.switchCanvasTo("graph")}>Graph
                            </button>
                            <button className={this.props.canvasType === "table" ? "selected" : ""}
                                    onClick={() => this.props.canvasCtrl.switchCanvasTo("table")}>Table
                            </button>
                            <button className={this.props.canvasType === "json" ? "selected" : ""}
                                    onClick={() => this.props.canvasCtrl.switchCanvasTo("json")}>JSON
                            </button>
                            {/*<a className={this.canvasType === "raw" ? "selected" : ""}*/}
                            {/*   onClick={() => this.props.switchCanvasTo("raw")}>Raw</a>*/}

                        </div>
                    </li>

                    <li>
                        <button title={"re render the canvas"}
                                onClick={() => this.props.canvasCtrl.confirmRedrawCanvas()}>
                            <FontAwesomeIcon icon={faSync}/>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => alert("Still in the Design stage")}>
                            <FontAwesomeIcon icon={faSave}/>
                        </button>
                    </li>
                    <li>
                        <button title={"clear the canvas"}
                                onClick={() => this.props.canvasCtrl.confirmFlushCanvas()}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                    </li>

                </List>
                <List type={"canvas-nav"} style={{"float": "right"}}>
                    <li>
                        <button onClick={() => alert("Still in the Design stage")}>
                            <FontAwesomeIcon icon={faCamera}/>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => this.switchToCanvasMenu("focus-node")}>
                            <FontAwesomeIcon icon={faDotCircle}/>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => this.switchToCanvasMenu("filter-nodes")}>
                            <FontAwesomeIcon icon={faFilter}/>
                        </button>
                    </li>
                    <li>
                        {/*<div className={"canvasToggle"}>*/}
                        <button onClick={() => this.switchToCanvasMenu("query-console")}>
                            <FontAwesomeIcon icon={faTerminal}/> <strong>Query Console</strong>
                        </button>
                        {/*</div>*/}
                    </li>
                </List>

                {
                    this.state.canvasMenuType === "filter-nodes"
                        ? (<FilterNodes onClose={this.switchToCanvasMenu.bind(this)}/>)
                        : this.state.canvasMenuType === "query-console"
                        ? (
                            <QueryConsole
                                makeQuery={this.props.makeQuery}
                                connector={this.props.connector}
                                onClose={()=>this.switchToCanvasMenu(null)}
                            />
                        )
                        : this.state.canvasMenuType === "focus-node"
                            ? (<FocusNode
                                onClose={this.switchToCanvasMenu.bind(this)}
                                dataStore={this.props.dataStore}
                                getGraphicsEngine={this.props.getGraphicsEngine}
                            />)
                            : (<Fragment/>)
                }
            </div>
        );
    }

}
