import React from "react";
import "./main-content.scss";
import PropTypes from "prop-types";

export default class MainContent extends React.Component {
    static propTypes = {
        children: PropTypes.any,
        leftContentName: PropTypes.string
    }

    render() {
        return <div
            className={!this.props.leftContentName ? "main-content " : "main-content left-content-opened "}>{this.props.children}</div>;
    }
}
