import React from "react";
import "./filter-nodes.scss";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";

export default class FilterNodes extends React.Component {

    static defaultProps = {
        closeCanvasMenu: () => console.log("")
    }
    static propTypes = {
        closeCanvasMenu: PropTypes.func
    }

    render() {
        return (
            <div className={"filter-nodes"}>
                <label>Filter Nodes and links</label>
                {/*<input type="text"/>*/}
                {/*<button className={"focus-btn"}><FontAwesomeIcon icon={faFilter}/> Filter</button>*/}
                <br/>
                <p style={{"color": "#b85f5f"}}>Still in design phase.</p>
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
