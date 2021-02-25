import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight, faCog,
    faDotCircle,
    faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import SelectedData from "../viewlets/selected-data";
import "./node-menu.scss";

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
        setSelectedElementData: (elementId) => console.log("setSelectedElementData not set", elementId),


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
        // setNodeMenuPosition: PropTypes.func,
        setModalContentName: PropTypes.func

    }

    getLastSelectedNodeData() {
        return this.props.selectedElementData
    }

    focusAndCenterNode(nodeData) {
        if (nodeData) {
            const network = this.props.getNetwork();
            network.focus(nodeData.id);
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
        this.props.setSelectedElementData(null);
    }

    openElementSettings() {
        this.props.setModalContentName("element-options");
    }

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
        console.log("elementData", elementData);
        return this.props.canvasUtils.getElementColor(elementData._label);
    }

    render() {
        // console.log("this.getLastSelectedNodeData()", this.getLastSelectedNodeData())
        const selectedElement = this.getLastSelectedNodeData();
        console.log("=====selectedElement",selectedElement);
        return (
            <div className="nodeMenuContainer"
                 style={{"left": this.props.menuPositionX + 5, "top": this.props.menuPositionY + 5}}>

                {/*<Button size={"sm"}><FontAwesomeIcon icon={faCog}/></Button>*/}
                {/*<Button size={"sm"}><FontAwesomeIcon icon={faWindowClose}/></Button>*/}
                {/*{selectedElement*/}
                {/*    ? <p style={{"color": this.getElementColor()}}>*/}
                {/*        {selectedElement.type.replace("g:", "")} id: {selectedElement.label}</p>*/}
                {/*    : <React.Fragment/>*/}
                {/*}*/}
                {selectedElement
                    ? <h5 className={"mb-0 pt-2 font-weight-bold"}
                          style={{"color": this.getElementColor()}}>{this.getVerboseIdentifier()}</h5>
                    : <React.Fragment/>
                }
                <p className={"mb-0 pb-0"} style={{"color": this.getElementColor()}}>Label: {selectedElement.label}</p>
                <p className={"mb-1 border-bottom "}>{selectedElement.type.replace("g:", "")} id: {this.getIdentifier()}</p>

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
                    {/*<li onClick={() => this.hideMenu()}>*/}
                    {/*    <FontAwesomeIcon icon={faMinusCircle}/>*/}
                    {/*</li>*/}
                    <li onClick={() => this.openElementSettings()}>
                        <FontAwesomeIcon icon={faCog}/>
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
