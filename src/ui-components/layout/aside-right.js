import React from "react";
import "./aside-right.scss";
import PropTypes from "prop-types";

export default class AsideRight extends React.Component {

    static propTypes = {
        children: PropTypes.any,
        size: PropTypes.string
    }

    render() {
        // let clsName = (this.props.size === "lg"? "aside-right aside-right-lg" : "aside-right");
        return <div className={this.props.size === "lg"? "aside-right aside-right-lg" : "aside-right"}>{this.props.children}</div>;
    }
}
