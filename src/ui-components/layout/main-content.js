import React from "react";
import "./main-content.scss";
import PropTypes from "prop-types";

export default class MainContent extends React.Component {
    static propTypes = {
        children: PropTypes.any
    }

    render() {
        return <div className={"main-content"}>{this.props.children}</div>;
    }
}
