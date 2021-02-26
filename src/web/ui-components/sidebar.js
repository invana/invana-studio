import React from "react";
import "./sidebar.scss";
import PropTypes from "prop-types";

export default class Sidebar extends React.Component {

    static propTypes = {
        children: PropTypes.any
    }

    render() {
        return (
            <div className={"border-right aside"}>
                {this.props.children}
            </div>
        )
    }
}
