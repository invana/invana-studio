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
        graphicsEngine: null
    }
    static propTypes = {
        onClose: PropTypes.func,
        dataStore: PropTypes.object,
        graphicsEngine: PropTypes.object
    }

    state = {
        nodeTextOrId: "",
        selectedNodeLabel: null,
        results: [
            {title: "Node 1", id: 1},
            {title: "Node 2", id: 2},
        ]
    }

    onQueryChange(e) {
        const searchWord = e.target.value;
        if (searchWord) {
            // find search results and
            const results = []; // this.dataStore.searchByNodeLabelTextOrId
            this.setState({results: results, nodeTextOrId: searchWord})


        }
    }

    onFocusNodeClicked() {
        //
        const nodeLabel = this.state.nodeTextOrId;
        const nodeData = this.props.dataStore.getNodeByNodeLabelTextOrId(nodeLabel);

        console.log("======****nodeData", nodeData)
        console.log("======****nodeLabel", nodeLabel)

        if (nodeData) {
            // const nodeContainer = this.graphicsStore.nodeDataToNodeGfx.get(nodeData.id);
            // if (nodeContainer) {
            //
            // }
                    this.graphicsEngine.zoom2Point(nodeData.x, nodeData.y);

        }


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
                        <label>Search for node by label to focus on</label>
                        <input type="text"
                               spellCheck={false}
                               autoFocus
                               value={this.state.nodeTextOrId}
                               onChange={this.onQueryChange.bind(this)}
                        />
                        <button className={"focus-btn"} onClick={() => this.onFocusNodeClicked()}>
                            <FontAwesomeIcon icon={faDotCircle}/> Focus
                        </button>
                        {/*<br/>*/}
                        {/*<small>*/}
                        {/*    <button style={{*/}
                        {/*        "color": "#4e4e4e",*/}
                        {/*        "marginTop": "5px"*/}
                        {/*    }} onClick={() => this.props.onClose()}>*/}
                        {/*        close this*/}
                        {/*    </button>*/}
                        {/*</small>*/}
                        <hr/>


                        {
                            this.state.results.map((result, index) => {
                                return (
                                    <div key={index}>{result.id} - {result.title}</div>
                                )
                            })
                        }
                    </div>
                </GEPanel>
            </div>
        )
    }
}
