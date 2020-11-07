import React from "react";
import "./filter-nodes.scss";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import GEPanel from "../../ui-components/panels/panel";

export default class FilterNodes extends React.Component {

    static defaultProps = {
        onClose: () => console.log("")
    }
    static propTypes = {
        onClose: PropTypes.func
    }

    render() {
        return (
            <div className={"filter-nodes"}>
                <GEPanel
                    title={"Filter data in canvas"}
                    onClickClose={() => this.props.onClose(null)}
                    showToggleBtn={false}
                >
                    <div className={"p-10"}>
                        <label>Filter Nodes and links</label>
                        {/*<input type="text"/>*/}
                        {/*<button className={"focus-btn"}><FontAwesomeIcon icon={faFilter}/> Filter</button>*/}
                        <br/>
                        <p style={{"color": "#b85f5f"}}>Still in design phase.</p>
                        {/*<small>*/}
                        {/*    <button style={{*/}
                        {/*        "color": "#4e4e4e",*/}
                        {/*        "marginTop": "5px"*/}
                        {/*    }} onClick={() => this.props.onClose()}>*/}
                        {/*        close this*/}
                        {/*    </button>*/}
                        {/*</small>*/}
                    </div>
                </GEPanel>
            </div>
        )
    }
}
