import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight, faCog,
    faDotCircle,
    faMinusCircle, faTerminal, faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import SelectedData from "../viewlets/selected-data";
import "./node-menu.scss";
import {Button} from "react-bootstrap";

export default class NodeMenu extends React.Component {

    static defaultProps = {
        getFocusedNodes: () => console.log("getFocusedNodes"),
        addNodeToFocusedNodes: (nodes) => console.error("addNodeToFocusedNodes not set", nodes),
        connector: null,
        selectedElementData: null,
        makeQuery: () => console.error("makeQuery not set"),
        graphicsEngine: null,
        setQueryObject: (query) => console.log("setQueryObject", query),
        setRightContentName: (name) => console.log("setRightContentName not set", name),
        setSelectedElementData: (elementId) => console.log("setSelectedElementData not set", elementId)

    }
    static propTypes = {
        getFocusedNodes: PropTypes.func,
        addNodeToFocusedNodes: PropTypes.func,
        connector: PropTypes.object,
        // selectedElementData: PropTypes.object,
        makeQuery: PropTypes.func,
        graphicsEngine: PropTypes.object,
        setRightContentName: PropTypes.func,
        selectedElementData: PropTypes.object,


        menuPositionX: PropTypes.number,
        menuPositionY: PropTypes.number,

        getNetwork: PropTypes.func,
        canvasUtils: PropTypes.object,

        startNewQueryInConsole: PropTypes.func,
        // setNodeMenuPosition: PropTypes.func

    }

    // componentDidMount() {
    //     if (this.props.graphicsEngine) {
    //         this.onClickFocus();
    //     }
    // }

    getLastSelectedNodeData() {
        return this.props.selectedElementData
    }


    focusAndCenterNode(nodeData) {
        if (nodeData) {
            this.props.addNodeToFocusedNodes(nodeData);
            this.hideMenu();
        }
    }

    onClickFocus() {
        const lastSelectedNodeData = this.getLastSelectedNodeData();
        if (lastSelectedNodeData) {
            this.focusAndCenterNode(lastSelectedNodeData)
        }
    }

    onClickShowInV() {
        // alert("onClickShowInv clicked");
        const lastSelectedNodeData = this.getLastSelectedNodeData();
        if (lastSelectedNodeData) {
            this.focusAndCenterNode(lastSelectedNodeData)
            const queryString = this.props.connector.requestBuilder.getInEdgeVertices(lastSelectedNodeData.id);
            const queryPayload = this.props.connector.requestBuilder.combineQueries(queryString, null)
            this.props.makeQuery(queryPayload);
        }
    }

    onClickShowOutV() {
        // alert("onClickShowOutV clicked");
        const lastSelectedNodeData = this.getLastSelectedNodeData();
        if (lastSelectedNodeData) {
            this.focusAndCenterNode(lastSelectedNodeData)
            const queryString = this.props.connector.requestBuilder.getOutEdgeVertices(lastSelectedNodeData.id);
            const queryPayload = this.props.connector.requestBuilder.combineQueries(queryString, null)
            this.props.makeQuery(queryPayload);
        }
    }

    hideMenu() {
        // this.props.graphicsEngine.eventStore.hideMenu();
        // document.querySelector(".nodeMenuContainer").style.display = "none";
        this.props.setSelectedElementData(null);

    }

    // cleanGraph() {
    //     console.log("this.forceSimulator", this.forceSimulator);
    //     this.forceSimulator.forceSimulator.alphaTarget(0.8).restart();
    // }
    //
    // resetFocus() {
    //     this.props.graphicsEngine.dataStore.removeAllNodes2Focus();
    //     this.props.graphicsEngine.graphicsStore.resetFocus();
    //     this.props.graphicsEngine.resetViewport();
    // }

    getVerboseIdentifier() {
        const lastSelectedNodeData = this.getLastSelectedNodeData();
        if (lastSelectedNodeData) {
            const color = this.getElementColor();
            const elem = document.querySelector('.nodeMenuContainer h5');
            if (elem) {
                elem.style.color = color;
            }
            return lastSelectedNodeData.label;
        }
    }

    getIdentifier() {
        const lastSelectedNodeData = this.getLastSelectedNodeData();
        if (lastSelectedNodeData) {
            return lastSelectedNodeData.id;
        }
    }

    startNewQuery() {
        const lastSelectedNodeData = this.getLastSelectedNodeData();

        const elementId = lastSelectedNodeData.id;
        let queryString = "";
        if (Number.isInteger(elementId)) {
            queryString = "g.V(" + lastSelectedNodeData.id + ")";
        } else {
            queryString = "g.V(\"" + lastSelectedNodeData.id + "\")";
        }


        console.log("startNewQuery", queryString);
        // this.props.setRightContentName("query-console");
        this.props.startNewQueryInConsole(queryString);
    }

    getElementColor() {
        const elementData = this.getLastSelectedNodeData();
        return this.props.canvasUtils.getElementColor(elementData.group);
    }

    render() {
        // console.log("this.getLastSelectedNodeData()", this.getLastSelectedNodeData())
        const selectedElement = this.getLastSelectedNodeData();
        // console.log("=====selectedElement",selectedElement);
        return (
            <div className="nodeMenuContainer"
                 style={{"left": this.props.menuPositionX, "top": this.props.menuPositionY}}>

                {/*<Button size={"sm"}><FontAwesomeIcon icon={faCog}/></Button>*/}
                {/*<Button size={"sm"}><FontAwesomeIcon icon={faWindowClose}/></Button>*/}
                {selectedElement
                    ? <p style={{"color": this.getElementColor()}}>
                        {selectedElement.type.replace("g:", "")} / {selectedElement.label}</p>
                    : <React.Fragment/>
                }
                {selectedElement
                    ? <h5 className={"mb-0 font-weight-bold"}
                          style={{"color": this.getElementColor()}}>{this.getVerboseIdentifier()}</h5>
                    : <React.Fragment/>
                }
                <p className={"mb-0"}>ID: {this.getIdentifier()}</p>
                <ul className={"nodeMenu"}>
                    {selectedElement && selectedElement.type === "g:Vertex"
                        ? <li onClick={() => this.onClickFocus()}>
                            <FontAwesomeIcon icon={faDotCircle}/> <span>Focus</span>
                        </li>
                        : <span></span>
                    }
                    {selectedElement && selectedElement.type === "g:Vertex"
                        ? <li onClick={() => this.onClickShowInV()}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft}/> <span>InV</span>
                        </li> : <span></span>
                    }
                    {selectedElement && selectedElement.type === "g:Vertex"
                        ? <li onClick={() => this.onClickShowOutV()}>
                            <FontAwesomeIcon icon={faArrowAltCircleRight}/> <span>OutV</span>
                        </li> : <span></span>
                    }
                    <li onClick={() => this.startNewQuery()}>
                        <FontAwesomeIcon icon={faTerminal}/> <span>Query</span>
                    </li>
                    <li onClick={() => this.hideMenu()}>
                        <FontAwesomeIcon icon={faMinusCircle}/>
                    </li>
                </ul>
                <SelectedData
                    selectedData={this.props.selectedElementData}
                    canvasUtils={this.props.canvasUtils}
                    getNetwork={this.props.getNetwork}
                />
            </div>

        )
    }

}
