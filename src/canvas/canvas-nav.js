import React from "react";
import List from "../ui-components/lists/list";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCamera, faFilter, faSearch, faSync,
    faTrashAlt, faTable, faProjectDiagram, faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
// import FilterNodes from "./nav-ui-components/filter-nodes";
// import FocusNode from "./nav-ui-components/focus-node";
// import GEHeader from "../ui-components/layout/header";
// import {faStickyNote} from "@fortawesome/free-regular-svg-icons";


export default class CanvasNav extends React.Component {


    static defaultProps = {
        canvasType: null,
        canvasCtrl: null,
        connector: null,
        dataStore: null,
        getGraphicsEngine: () => console.log("getGraphicsEngine not set"),
        makeQuery: (query) => console.log("makeQuery not set ", query),
        setFocusedNodes: (nodes) => console.log("setFocusedNodes not set ", nodes),
        defaultQuery: null,
        setDefaultQuery: (query) => console.log("setDefaultQuery", query),
        leftContentName: null,
        setRightContentName: () => console.log("setRightContentName not set"),
        setLeftContentName: (contentName) => console.log("setLeftContentName not set", contentName),

    }
    static propTypes = {
        canvasType: PropTypes.string,
        canvasCtrl: PropTypes.object,
        makeQuery: PropTypes.func,
        dataStore: PropTypes.object,
        getGraphicsEngine: PropTypes.func,
        // confirmFlushCanvas: PropTypes.func,
        connector: PropTypes.object,
        setFocusedNodes: PropTypes.func,
        defaultQuery: PropTypes.string,
        setDefaultQuery: PropTypes.func,
        switchToCanvasMenu: PropTypes.func,

        setRightContentName: PropTypes.func,
        rightContentName: PropTypes.string,
        
        leftContentName: PropTypes.string,
        setLeftContentName: PropTypes.func

        // confirmRedrawCanvas: PropTypes.func
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         canvasMenuType: null
    //     }
    // }


    componentDidUpdate(prevProps) {
        if (prevProps.defaultQuery !== this.props.defaultQuery && this.props.defaultQuery) {
            this.props.switchToCanvasMenu("query-console");
        }
    }


    render() {
        return (
            // <div className={"main-content-nav-left"}>
            <List type={"nav-right"}>
                {/*<li>*/}
                {/*    /!*<div className={"canvasToggle"}>*!/*/}
                {/*    <button onClick={() => this.switchToCanvasMenu("query-console")}*/}
                {/*            style={{"padding": "11px 9.5px"}}*/}
                {/*    >*/}
                {/*        <FontAwesomeIcon icon={faTerminal}/>*/}
                {/*    </button>*/}
                {/*    /!*</div>*!/*/}
                {/*</li>*/}


                {/*<li>*/}
                {/*    <button onClick={() => alert("Still in the Design stage")}>*/}
                {/*        <FontAwesomeIcon icon={faSave}/>*/}
                {/*    </button>*/}
                {/*</li>*/}
                <li style={{"display": this.props.canvasType === "graph" ? "" : "none"}}>
                    <button onClick={() => this.props.switchToCanvasMenu("focus-node")}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </li>
                <li style={{"display": "none"}}>
                    <button onClick={() => this.props.switchToCanvasMenu("filter-nodes")}>
                        <FontAwesomeIcon icon={faFilter}/>
                    </button>
                </li>
                <li style={{"display": this.props.canvasType === "graph" ? "" : "none"}}>
                    <button title={"re render the canvas"}
                            onClick={() => this.props.canvasCtrl.confirmRedrawCanvas()}>
                        <FontAwesomeIcon icon={faSync}/>
                    </button>
                </li>
                <li style={{"display": this.props.canvasType === "graph" ? "" : "none"}}>
                    <button onClick={() => this.props.canvasCtrl.downloadCanvasImage()}>
                        <FontAwesomeIcon icon={faCamera}/>
                    </button>
                </li>


                <li>
                    <button title={"clear the canvas"}
                            onClick={() => this.props.canvasCtrl.confirmFlushCanvas()}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </button>
                </li>

                <li>
                    <span>|</span>
                </li>


                <li>

                    <button className={this.props.canvasType === "graph" ? "selected" : ""}
                            style={{'fontSize': "11px"}}
                            onClick={() => this.props.canvasCtrl.switchCanvasTo("graph")}>
                        <FontAwesomeIcon icon={faProjectDiagram}/>
                    </button>

                    {/*<button className={this.props.canvasType === "json" ? "selected" : ""}*/}
                    {/*        onClick={() => this.props.canvasCtrl.switchCanvasTo("json")}>JSON*/}
                    {/*</button>*/}
                    {/*<a className={this.canvasType === "raw" ? "selected" : ""}*/}
                    {/*   onClick={() => this.props.switchCanvasTo("raw")}>Raw</a>*/}


                </li>
                <li>
                    <button className={this.props.canvasType === "table" ? "selected" : ""}
                            onClick={() => this.props.canvasCtrl.switchCanvasTo("table")}>
                        <FontAwesomeIcon icon={faTable}/>
                    </button>
                </li>
                <li>
                    <span>|</span>
                </li>
                {/*<li>*/}
                {/*    <button*/}
                {/*        className={this.props.leftContentName === "founder-note" ? "selected no-bg" : "no-bg"}*/}
                {/*        onClick={() => this.props.setLeftContentName("founder-note")}>*/}
                {/*        <FontAwesomeIcon icon={faMoon}/>*/}
                {/*    </button>*/}
                {/*</li>*/}
                <li>
                    <button
                        className={this.props.rightContentName === "founder-note" ? "selected no-bg" : "no-bg"}
                        onClick={() => this.props.setRightContentName("founder-note")}>
                        <FontAwesomeIcon icon={faStickyNote}/>
                    </button>
                </li>
                {/*<li>*/}
                {/*    <button title={"clear the canvas"}*/}
                {/*            onClick={() => alert("Hello World!")}>*/}
                {/*        <FontAwesomeIcon icon={faUserAstronaut}/>*/}
                {/*    </button>*/}
                {/*</li>*/}
            </List>



            // </div>
        );
    }

}
