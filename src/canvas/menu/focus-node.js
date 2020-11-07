import React from "react";
import "./focus-node.scss";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDotCircle} from "@fortawesome/free-solid-svg-icons";
import GEPanel from "../../ui-components/panels/panel";

export default class FocusNode extends React.Component {

    static defaultProps = {
        onClose: () => console.log("")
    }
    static propTypes = {
        onClose: PropTypes.func
    }

    render() {
        return (
            <div className={"focus-node"}>
                <GEPanel
                    title={"Find and Focus a node"}
                    onClickClose={() => this.props.onClose(null)}
                    showToggleBtn={false}
                >
                    <div className={"p-10"}>
                        <label>Search for node by label to focus on</label>
                        <input type="text"/>
                        <button className={"focus-btn"}><FontAwesomeIcon icon={faDotCircle}/> Focus</button>
                        <br/>
                        <small>
                            <button style={{
                                "color": "#4e4e4e",
                                "marginTop": "5px"
                            }} onClick={() => this.props.onClose()}>
                                close this
                            </button>
                        </small>
                    </div>
                </GEPanel>
            </div>
        )
    }
}
