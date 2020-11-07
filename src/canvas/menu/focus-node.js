import React from "react";
import "./focus-node.scss";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDotCircle} from "@fortawesome/free-solid-svg-icons";

export default class FocusNode extends React.Component {

    static defaultProps = {
        closeCanvasMenu: () => console.log("")
    }
    static propTypes = {
        closeCanvasMenu: PropTypes.func
    }

    render() {
        return (
            <div className={"focus-node"}>
                <label>Search for node by label to focus on</label>
                <input type="text"/>
                <button className={"focus-btn"}><FontAwesomeIcon icon={faDotCircle}/> Focus</button>
                <br/>
                <small>
                    <button style={{
                        "color": "#4e4e4e",
                        "marginTop": "5px"
                    }} onClick={() => this.props.closeCanvasMenu()}>
                        close this
                    </button>
                </small>
            </div>
        )
    }
}
