import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faDotCircle,
    faMinusCircle, faTerminal
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import SelectedData from "../../viewlets/selected-data";


export default class NodeMenu extends React.Component {

    static defaultProps = {
        getFocusedNodes: () => console.log("getFocusedNodes"),
        setFocusedNodes: (nodes) => console.error("setFocusedNodes not set", nodes),
        connector: null,
        // selectedElementData: null,
        makeQuery: () => console.error("makeQuery not set"),
        graphicsEngine: null,
        setDefaultQuery: (query) => console.log("setDefaultQuery", query),
        setRightContentName: (name) => console.log("setRightContentName not set", name)

    }
    static propTypes = {
        getFocusedNodes: PropTypes.func,
        setFocusedNodes: PropTypes.func,
        connector: PropTypes.object,
        // selectedElementData: PropTypes.object,
        makeQuery: PropTypes.func,
        graphicsEngine: PropTypes.object,
        setDefaultQuery: PropTypes.func,
        setRightContentName: PropTypes.func,
        selectedElementData: PropTypes.object

    }

    componentDidMount() {
        if (this.props.graphicsEngine) {
            this.onClickFocus();
        }
    }

    getLastSelectedNodeData() {
        // return this.props.graphicsEngine
        //     ? this.props.graphicsEngine.eventStore.lastSelectedNodeData
        //     : null;
        //
        return this.props.selectedElementData
        // return this.props.selectedElementData;
    }


    focusAndCenterNode(nodeData) {
        if (nodeData) {
            this.props.graphicsEngine.dataStore.addNode2Focus(nodeData);
            this.props.graphicsEngine.zoom2Point(nodeData.x, nodeData.y);
            const focusedNodes = this.props.graphicsEngine.dataStore.getUniqueFocusedNodes();
            this.props.setFocusedNodes(focusedNodes);
            this.props.graphicsEngine.graphicsStore.focusOnElements(focusedNodes);
            // this.setState({focusedNodes: this.props.graphicsEngine.dataStore.getUniqueFocusedNodes()});
            this.hideMenu();
        }

    }

    onClickFocus() {
        const lastSelectedNodeData = this.getLastSelectedNodeData();
        console.log("onClickFocus========", lastSelectedNodeData)
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
            this.props.makeQuery(queryString);
        }
    }

    onClickShowOutV() {
        // alert("onClickShowOutV clicked");
            const lastSelectedNodeData = this.getLastSelectedNodeData();
        if (lastSelectedNodeData) {
            this.focusAndCenterNode(lastSelectedNodeData)
            const queryString = this.props.connector.requestBuilder.getOutEdgeVertices(lastSelectedNodeData.id);
            this.props.makeQuery(queryString);
        }
    }

    hideMenu() {
        this.props.graphicsEngine.eventStore.hideMenu();
    }

    cleanGraph() {
        console.log("this.forceSimulator", this.forceSimulator);
        this.forceSimulator.forceSimulator.alphaTarget(0.8).restart();
    }

    resetFocus() {
        this.props.graphicsEngine.dataStore.removeAllNodes2Focus();
        this.props.graphicsEngine.graphicsStore.resetFocus();
        this.props.graphicsEngine.resetViewport();
    }

    getVerboseIdentifier() {
        // const elementData = this.props.selectedElementData;
        const lastSelectedNodeData = this.getLastSelectedNodeData();
        console.log("=====lastSelectedNodeData", lastSelectedNodeData)
        if (lastSelectedNodeData) {
            const color = lastSelectedNodeData.meta.shapeOptions.fillColor;
            const elem = document.querySelector('.nodeMenuContainer h5');
            if (elem) {
                elem.style.color = color;
            }
            return lastSelectedNodeData.meta.labelOptions.labelText;
        }
    }

    getIdentifier() {
        const lastSelectedNodeData = this.getLastSelectedNodeData();
        console.log("=====lastSelectedNodeData", lastSelectedNodeData)
        if (lastSelectedNodeData) {
            return lastSelectedNodeData.id;
        }
    }

    checkIfAlreadyFocused() {
        const lastSelectedNodeData = this.getLastSelectedNodeData();
        if (lastSelectedNodeData) {
            this.props.getFocusedNodes().forEach((focusedNode) => {
                if (focusedNode.id === lastSelectedNodeData.id) {
                    return true;
                }
            });
        }

    }

    startNewQuery() {
        const lastSelectedNodeData = this.getLastSelectedNodeData();

        const elementId = lastSelectedNodeData.id;
        let query = "";
        if (Number.isInteger(elementId)) {
            query = "g.V(" + lastSelectedNodeData.id + ")";
        } else {
            query = "g.V(\"" + lastSelectedNodeData.id + "\")";
        }
        this.props.setRightContentName("query-console");
        this.props.setDefaultQuery(query);
    }

    getElementColor() {

        const elementData = this.getLastSelectedNodeData();
        console.log("getColor", elementData)
        if (elementData.type === "g:Vertex") {
            return elementData.meta.shapeOptions.fillColorHex;
        } else {
            return elementData.meta.shapeOptions.strokeColorHex;
        }
    }

    render() {
        console.log("this.getLastSelectedNodeData()", this.getLastSelectedNodeData())
        const selectedElement = this.getLastSelectedNodeData();
        return (
            <div className="nodeMenuContainer" style={{"display": "none"}}>
                {selectedElement
                    ?
                    <p style={{"color": this.getElementColor()}}>
                        {selectedElement.type.replace("g:", "")} / {selectedElement.label}</p>
                    : <span></span>
                }
                {selectedElement
                    ?
                    <h5 style={{"color": selectedElement.meta.shapeOptions.fillColorHex}}>{this.getVerboseIdentifier()}</h5>
                    : <span></span>
                }


                <p>ID: {this.getIdentifier()}</p>
                <ul className={"nodeMenu"}>

                    {/*{*/}
                    {/*    this.checkIfAlreadyFocused() ?*/}
                    {/*        (*/}
                    {/*            <li onClick={() => this.resetFocus()}>*/}
                    {/*                <span>Reset focus</span>*/}
                    {/*            </li>*/}
                    {/*        ) :*/}
                    {/*        (*/}
                    {/*            <li onClick={() => this.onClickFocus()}>*/}
                    {/*                <FontAwesomeIcon icon={faDotCircle}/> <span>Focus</span>*/}
                    {/*            </li>*/}
                    {/*        )*/}
                    {/*}*/}

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
                    {/*<li onClick={() => this.cleanGraph()}>*/}
                    {/*    <FontAwesomeIcon icon={faSync}/> Clean Graph*/}
                    {/*</li>*/}
                    <li onClick={() => this.hideMenu()}>
                        <FontAwesomeIcon icon={faMinusCircle}/>
                    </li>
                </ul>
                <SelectedData selectedData={this.props.selectedElementData}/>

            </div>

        )
    }

}
