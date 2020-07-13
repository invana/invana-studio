import React from "react";
import "./main-content-middle.scss";
import PropTypes from "prop-types";

export default class MainContentMiddle extends React.Component {

    static propTypes = {
        children: PropTypes.any
    }

    render() {
        return <div className={"main-content-middle"}>{this.props.children}</div>;
    }
}
