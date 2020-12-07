import React from "react";
import "./main-content.scss";
import PropTypes from "prop-types";

export default class MainContent extends React.Component {
    static propTypes = {
        children: PropTypes.any,
        leftContentName: PropTypes.string,
        style: PropTypes.object,
    }

    render() {
        return <div style={this.props.style}
            className={!this.props.leftContentName ? "main-content " : "main-content left-content-opened "}>{this.props.children}</div>;
    }
}
