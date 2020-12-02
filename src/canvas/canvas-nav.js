import React, {Fragment} from "react";
import List from "../ui-components/lists/list";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCamera, faFilter, faSearch, faSync,
    faTerminal, faTrashAlt, faTable, faProjectDiagram, faInfoCircle, faLifeRing
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import FilterNodes from "./nav-ui-components/filter-nodes";
import FocusNode from "./nav-ui-components/focus-node";
import QueryConsole from "./nav-ui-components/query-console";


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
        setRightContentName: () => console.log("setRightContentName")

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
        setRightContentName: PropTypes.func

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

    componentDidUpdate(prevProps) {
        if (prevProps.defaultQuery !== this.props.defaultQuery && this.props.defaultQuery) {
            this.switchToCanvasMenu("query-console");
        }
    }


    render() {
        return (
            <div className={"main-content-nav-left"}>
                <List type={"aside-nav"}>
                    {/*<li>*/}
                    {/*    /!*<div className={"canvasToggle"}>*!/*/}
                    {/*    <button onClick={() => this.switchToCanvasMenu("query-console")}*/}
                    {/*            style={{"padding": "11px 9.5px"}}*/}
                    {/*    >*/}
                    {/*        <FontAwesomeIcon icon={faTerminal}/>*/}
                    {/*    </button>*/}
                    {/*    /!*</div>*!/*/}
                    {/*</li>*/}
                    <li>
                        <div className={"canvasToggle"}>
                            <button className={this.props.canvasType === "graph" ? "selected" : ""}
                                    style={{"padding": "11px 11px", 'fontSize': "11px"}}
                                    onClick={() => this.props.canvasCtrl.switchCanvasTo("graph")}>
                                <FontAwesomeIcon icon={faProjectDiagram}/>
                            </button>
                            <button className={this.props.canvasType === "table" ? "selected" : ""}
                                    onClick={() => this.props.canvasCtrl.switchCanvasTo("table")}>
                                <FontAwesomeIcon icon={faTable}/>
                            </button>
                            {/*<button className={this.props.canvasType === "json" ? "selected" : ""}*/}
                            {/*        onClick={() => this.props.canvasCtrl.switchCanvasTo("json")}>JSON*/}
                            {/*</button>*/}
                            {/*<a className={this.canvasType === "raw" ? "selected" : ""}*/}
                            {/*   onClick={() => this.props.switchCanvasTo("raw")}>Raw</a>*/}

                        </div>
                    </li>


                    {/*<li>*/}
                    {/*    <button onClick={() => alert("Still in the Design stage")}>*/}
                    {/*        <FontAwesomeIcon icon={faSave}/>*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    <li>
                        <button title={"clear the canvas"}
                                onClick={() => this.props.canvasCtrl.confirmFlushCanvas()}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                    </li>
                    <li style={{"display": this.props.canvasType === "graph" ? "" : "none"}}>
                        <button title={"re render the canvas"}
                                a onClick={() => this.props.canvasCtrl.confirmRedrawCanvas()}>
                            <FontAwesomeIcon icon={faSync}/>
                        </button>
                    </li>
                    <li style={{"display": this.props.canvasType === "graph" ? "" : "none"}}>
                        <button onClick={() => this.props.canvasCtrl.downloadCanvasImage()}>
                            <FontAwesomeIcon icon={faCamera}/>
                        </button>
                    </li>
                    <li style={{"display": this.props.canvasType === "graph" ? "" : "none"}}>
                        <button onClick={() => this.switchToCanvasMenu("focus-node")}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </li>
                    <li style={{"display": "none"}}>
                        <button onClick={() => this.switchToCanvasMenu("filter-nodes")}>
                            <FontAwesomeIcon icon={faFilter}/>
                        </button>
                    </li>
                </List>
                <List type={"aside-nav"}>


                    {/*<li>*/}
                    {/*    <button onClick={() => this.props.setRightContentName("support")}>*/}
                    {/*        <FontAwesomeIcon icon={faLifeRing}/>*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <button onClick={() => this.props.setRightContentName("about")}>*/}
                    {/*        <FontAwesomeIcon icon={faInfoCircle}/>*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                </List>

                {
                    this.state.canvasMenuType === "filter-nodes"
                        ? (<FilterNodes onClose={this.switchToCanvasMenu.bind(this)}/>)
                        // : this.state.canvasMenuType === "query-console"
                        // // && (this.props.defaultQuery && !this.props.defaultQuery.query)
                        // ? (
                        //     <QueryConsole
                        //         makeQuery={this.props.makeQuery}
                        //         connector={this.props.connector}
                        //         defaultQuery={this.props.defaultQuery}
                        //         // value={this.state.defaultQuery}
                        //         onClose={() => {
                        //             this.switchToCanvasMenu(null);
                        //             this.props.setDefaultQuery("");
                        //         }}
                        //     />
                        // )
                        : this.state.canvasMenuType === "focus-node"
                            ? (<FocusNode
                                onClose={this.switchToCanvasMenu.bind(this)}
                                dataStore={this.props.dataStore}
                                getGraphicsEngine={this.props.getGraphicsEngine}
                                setFocusedNodes={this.props.setFocusedNodes}
                            />)
                            : (<Fragment/>)
                }
            </div>
        );
    }

}
