import React from "react";
import "./aside-right.scss";
import PropTypes from "prop-types";

export default class AsideRight extends React.Component {

    static propTypes = {
        children: PropTypes.any
    }

    render() {
        return <div className={"aside-right"}>{this.props.children}</div>;
    }
}
