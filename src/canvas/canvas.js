import React from "react";
import PropTypes from "prop-types";
import List from "../ui-components/lists/list";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faSave, faSync, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import ErrorBoundary from "./error-boundary";
import PIXICanvasComponent from "./graph/component";
import JSONCanvas from "./json/json";
import TableCanvas from "./table/table";
import RawResponsesCanvas from "./raw-response/raw-responses";

export default class Canvas extends React.Component {

    static defaultProps = {
        setHideVertexOptions: () => console.error("setHideVertexOptions not set",),
        setSelectedElementData: (selectedData) => console.error("setSelectedElementData not set", selectedData),
        setRightContentName: (contentName) => console.error("setRightContentName not set", contentName),
        setMiddleBottomContentName: (contentName) => console.error("setMiddleBottomContentName not set", contentName),
        middleBottomContentName: null,
        selectedElementData: null,
        setStatusMessage: (message) => console.debug("setStatusMessage not set", message),
        showVertexOptions: (selectedLabel) => console.debug("this.showVertexOptions not set", selectedLabel),

        connector: false,
        dataStore: null,
        resetShallReRenderD3Canvas: () => console.log("resetShallReRenderD3Canvas"),
        shallReRenderD3Canvas: false,
        makeQuery: () => console.error("makeQuery not set"),

        // setFocusedNodes: (nodes) => console.error("setFocusedNodes not set"),
    }

    static propTypes = {
        setSelectedElementData: PropTypes.func,
        setMiddleBottomContentName: PropTypes.func,
        makeQuery: PropTypes.func,
        setHideVertexOptions: PropTypes.func,
        setRightContentName: PropTypes.func,
        requestBuilder: PropTypes.object,
        dataStore: PropTypes.object,
        connector: PropTypes.object,
        middleBottomContentName: PropTypes.string,

        showVertexOptions: PropTypes.func,
        shallReRenderD3Canvas: PropTypes.bool,
        resetShallReRenderD3Canvas: PropTypes.func,
        selectedElementData: PropTypes.object,
        setStatusMessage: PropTypes.func,

        // setFocusedNodes: PropTypes.func
    }

    state = {
        canvasType: "graph"
    }

    switchCanvasTo(canvasType) {
        this.setState({
            canvasType: canvasType,
        })
        this.props.setStatusMessage("Canvas switched to " + canvasType)
    }

    // setCanvasType(canvasType) {
    //     this.setState({canvasType: canvasType});
    // }

    render() {
        return (

            <div
                style={{
                    height: "inherit"
                }}
            >

                <div className={"main-content-nav"}>
                    <List type={"canvas-nav"}>
                        <li>
                            &nbsp;
                        </li>
                        <li>
                            <div className={"canvasToggle"}>
                                <button className={this.state.canvasType === "graph" ? "selected" : ""}
                                        onClick={() => this.switchCanvasTo("graph")}>Graph
                                </button>
                                <button className={this.state.canvasType === "table" ? "selected" : ""}
                                        onClick={() => this.switchCanvasTo("table")}>Table
                                </button>
                                <button className={this.state.canvasType === "json" ? "selected" : ""}
                                        onClick={() => this.switchCanvasTo("json")}>JSON
                                </button>
                                {/*<a className={this.canvasType === "raw" ? "selected" : ""}*/}
                                {/*   onClick={() => this.switchCanvasTo("raw")}>Raw</a>*/}

                            </div>
                        </li>
                        <li>
                            <button title={"clear the canvas"}
                                    onClick={() => this.confirmFlushCanvas()}>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </button>
                        </li>
                        <li>
                            <button title={"re render the canvas"}
                                    onClick={() => this.confirmRedrawCanvas()}>
                                <FontAwesomeIcon icon={faSync}/>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => alert("Still in the Design stage")}>
                                <FontAwesomeIcon icon={faSave}/>
                            </button>
                        </li>

                        <li>
                            <button onClick={() => alert("Still in the Design stage")}>
                                <FontAwesomeIcon icon={faFilter}/>
                            </button>
                        </li>

                        {/*<li>*/}
                        {/*    <button onClick={() => alert("Still in the Design stage")}>*/}
                        {/*        <FontAwesomeIcon icon={faExpand}/>*/}
                        {/*    </button>*/}
                        {/*</li>*/}

                    </List>
                </div>

                <div className={"main-content-body"}>

                    <ErrorBoundary>
                        {(() => {
                            if (this.state.canvasType === "graph" && this.props.connector.getLastResponse()) {
                                // return (
                                //     <GraphicsEngine
                                //         // setShowVertexOptions={this.setShowVertexOptions.bind(this)}
                                //         setHideVertexOptions={this.setHideVertexOptions.bind(this)}
                                //         responses={this.state.responses}
                                //         setSelectedElementData={this.setSelectedElementData.bind(this)}
                                //         vertices={this.state.vertices}
                                //         edges={this.state.edges}
                                //         setRightContentName={this.setRightContentName.bind(this)}
                                //         setMiddleBottomContentName={this.setMiddleBottomContentName.bind(this)}
                                //         middleBottomContentName={this.state.middleBottomContentName}
                                //         startQuery={this.startQuery.bind(this)}
                                //         requestBuilder={this.requestBuilder}
                                //         makeQuery={this.makeQuery.bind(this)}
                                //         resetShallReRenderD3Canvas={this.resetShallReRenderD3Canvas.bind(this)}
                                //         shallReRenderD3Canvas={this.state.shallReRenderD3Canvas}
                                //     />
                                // )
                                return (
                                    <div style={{"width": "100%", "height": "100%"}}>
                                        <PIXICanvasComponent
                                            // setShowVertexOptions={this.setShowVertexOptions.bind(this)}
                                            setHideVertexOptions={this.props.setHideVertexOptions}
                                            setSelectedElementData={this.props.setSelectedElementData}
                                            setRightContentName={this.props.setRightContentName}
                                            setMiddleBottomContentName={this.props.setMiddleBottomContentName}
                                            middleBottomContentName={this.props.middleBottomContentName}

                                            selectedElementData={this.props.selectedElementData}
                                            setStatusMessage={this.props.setStatusMessage}

                                            connector={this.props.connector}
                                            dataStore={this.props.dataStore}
                                            resetShallReRenderD3Canvas={this.props.resetShallReRenderD3Canvas}
                                            shallReRenderD3Canvas={this.props.shallReRenderD3Canvas}
                                            makeQuery={this.props.makeQuery}


                                            // startQuery={this.startQuery.bind(this)}
                                            // responses={this.props.connector.getLastResponse()}
                                            // vertices={this.state.vertices}
                                            // edges={this.state.edges}
                                            // requestBuilder={this.requestBuilder}
                                        />


                                    </div>
                                )
                            } else if (this.state.canvasType === "json" && this.props.connector.getLastResponse()) {
                                return (
                                    <JSONCanvas
                                        dataStore={this.props.dataStore}
                                    />
                                )
                            } else if (this.state.canvasType === "table" && this.props.connector.getLastResponse()) {
                                return (
                                    <TableCanvas
                                        dataStore={this.props.dataStore}
                                    />
                                )
                            } else if (this.state.canvasType === "raw" && this.props.connector.getLastResponse()) {
                                return (
                                    <RawResponsesCanvas
                                        connector={this.props.connector}
                                    />
                                )
                            } else {
                                return (
                                    <span></span>
                                )
                            }
                        })()}
                    </ErrorBoundary>


                </div>
            </div>

        )
    }
}
