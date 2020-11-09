import React from "react";
import "./focus-node.scss";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDotCircle} from "@fortawesome/free-solid-svg-icons";
import GEPanel from "../../ui-components/panels/panel";

export default class FocusNode extends React.Component {

    static defaultProps = {
        onClose: () => console.log(""),
        dataStore: null,
        getGraphicsEngine: null
    }
    static propTypes = {
        onClose: PropTypes.func,
        dataStore: PropTypes.object,
        getGraphicsEngine: PropTypes.func
    }

    state = {
        nodeTextOrId: "",
        results: [], // the results returned when searched for node text.
        infoMessage: null,
        errorMessage: null
    }

    onQueryChange(e) {
        const searchWord = e.target.value;
        if (searchWord) {
            // find search results and
            // const results = this.dataStore.searchByNodeLabelTextOrId(
            this.setState({nodeTextOrId: searchWord})
        }
    }

    onFormSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.onFocusNodeClicked();
    }


    onFocusNodeClicked() {
        //
        const nodeLabel = this.state.nodeTextOrId;
        const nodeData = this.props.dataStore.getNodeByNodeLabelTextOrId(nodeLabel);
        console.log("======****nodeData", nodeData)
        console.log("======****nodeLabel", nodeLabel)
        if (nodeData) {
            const graphicsEngine = this.props.getGraphicsEngine();
            if (graphicsEngine) {
                graphicsEngine.zoom2Point(nodeData.x, nodeData.y);
                this.setInfoMessage("Centered and highlighted the node " + nodeLabel);
            }
        } else {
            this.setErrorMessage("Unable to find the node with label or text " + nodeLabel +
                ". NOTE: this search is case sensitive");
        }
    }

    setErrorMessage(message) {
        this.setState({errorMessage: message, infoMessage: null})
    }

    setInfoMessage(message) {
        this.setState({errorMessage: null, infoMessage: message})
    }

    render() {
        return (
            <div className={"focus-node"}>
                <GEPanel
                    title={"Find and Focus a node in canvas"}
                    onClickClose={() => this.props.onClose(null)}
                    showToggleBtn={false}
                >
                    <div className={"p-10"}>
                        <form id={"queryForm"}
                              onSubmit={(e) => this.onFormSubmit(e)}>

                            <label>Search for node by label to focus on</label>
                            <input type="text"
                                   spellCheck={false}
                                   autoFocus
                                   value={this.state.nodeTextOrId}
                                   onChange={this.onQueryChange.bind(this)}
                                   placeholder={"Node label text or Id"}
                            />
                            <button className={"focus-btn"} type={"submit"} onClick={() => this.onFocusNodeClicked()}>
                                <FontAwesomeIcon icon={faDotCircle}/> Focus
                            </button>
                        </form>
                        {/*<hr/>*/}
                        <br/>


                        {
                            this.state.errorMessage
                                ? <p className={"error-message small"}><strong>Error:</strong> {this.state.errorMessage}
                                </p> :
                                <span></span>
                        }

                        {
                            this.state.infoMessage
                                ? <p className={"info-message small"}><strong>Info:</strong> {this.state.infoMessage}
                                </p> :
                                <span></span>
                        }

                        {/*{*/}
                        {/*    this.state.results.map((result, index) => {*/}
                        {/*        return (*/}
                        {/*            <div key={index}>{result.id} - {result.title}</div>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}
                    </div>
                </GEPanel>
            </div>
        )
    }
}
