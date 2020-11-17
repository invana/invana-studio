import React from "react";
import "./focus-node.scss";
import PropTypes from "prop-types";
import GEPanel from "../../ui-components/panels/panel";

export default class FocusNode extends React.Component {

    static defaultProps = {
        onClose: () => console.log(""),
        dataStore: null,
        getGraphicsEngine: null,
        setFocusedNodes: null
    }
    static propTypes = {
        onClose: PropTypes.func,
        dataStore: PropTypes.object,
        getGraphicsEngine: PropTypes.func,
        setFocusedNodes: PropTypes.func
    }

    state = {
        nodeTextOrId: "",
        queryResults: [], // the results returned when searched for node text.
        infoMessage: null,
        errorMessage: null
    }

    onQueryChange(e) {
        const searchWord = e.target.value;
        let queryResults = []
        if (searchWord) {
            queryResults = this.props.dataStore.searchNodeByNodeLabelTextOrId(searchWord);
        }else {
            this.setState({infoMessage: null, errorMessage: null });
        }
        // if (searchWord) {
        // find search results and
        // const results = this.dataStore.searchByNodeLabelTextOrId(
        this.setState({
            nodeTextOrId: searchWord,
            queryResults: queryResults
        });
        // }
    }

    onFormSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.onFocusNodeClicked();
    }


    onFocusNodeClicked(nodeData) {
        //
        const nodeLabel = this.state.nodeTextOrId;
        // const nodeData = this.props.dataStore.getNodeByNodeLabelTextOrId(nodeLabel);
        console.log("======****nodeData", nodeData)
        console.log("======****nodeLabel", nodeLabel)
        if (nodeData) {
            // const graphicsEngine = this.props.getGraphicsEngine();
            if (this.props.getGraphicsEngine()) {
                // graphicsEngine.focusedNodes
                this.props.getGraphicsEngine().dataStore.addNode2Focus(nodeData)

                const uniqueNodes = Object.assign([],
                    this.props.getGraphicsEngine().dataStore.getUniqueFocusedNodes());
                this.props.getGraphicsEngine().graphicsStore.focusOnNodes(uniqueNodes);
                console.log("======uniqueNodes", uniqueNodes)
                this.props.setFocusedNodes(uniqueNodes)
                this.props.getGraphicsEngine().zoom2Point(nodeData.x, nodeData.y);
                this.setInfoMessage("Centered and highlighted the node '" + nodeLabel + "'");
            }
        } else {
            this.setErrorMessage("Unable to find the node with label or text '" + nodeLabel +
                "'. NOTE: this search is case sensitive");
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

                            <label>Search for node by label or Id to focus on</label>
                            <input type="text"
                                   spellCheck={false}
                                   autoFocus
                                   value={this.state.nodeTextOrId}
                                   onChange={this.onQueryChange.bind(this)}
                                   placeholder={"Node label text or Id"}
                            />
                            {/*<button className={"focus-btn"} type={"submit"} onClick={() => this.onFocusNodeClicked()}>*/}
                            {/*    <FontAwesomeIcon icon={faDotCircle}/> Focus*/}
                            {/*</button>*/}
                        </form>
                        {/*<hr/>*/}
                        <br/>


                        {
                            this.state.queryResults
                                ? <ul className={"focus-results"}>
                                    {
                                        this.state.queryResults.map((result, index) => {
                                            return (
                                                <li onClick={() => this.onFocusNodeClicked(result)}
                                                    key={index}>
                                                    <span style={{"backgroundColor": result.meta.shapeOptions.fillColorHex}}>.</span>
                                                    {result.meta.labelOptions.labelText}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                : <span></span>
                        }

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

                    </div>
                </GEPanel>
            </div>
        )
    }
}
