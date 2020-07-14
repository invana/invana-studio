import React from "react";
import "./aside-nav.scss";
import PropTypes from "prop-types";

export default class AsideNav extends React.Component {
    static propTypes = {
        children: PropTypes.any
    }

    render() {
        return <div className={"aside-nav"}>{this.props.children}</div>;
    }
}
