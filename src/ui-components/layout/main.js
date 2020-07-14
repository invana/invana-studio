import React from "react";
import "./main.scss";
import PropTypes from "prop-types";

export default class Main extends React.Component {
    static propTypes = {
        children: PropTypes.any
    }

    render() {
        return <div className={"main"}>{this.props.children}</div>;
    }
}
