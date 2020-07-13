import React from "react";
import "./header.scss";
import PropTypes from "prop-types";

export default class GEHeader extends React.Component {

    static propTypes = {
        children: PropTypes.any
    }

    render() {
        return <div className={"header"}>{this.props.children}</div>;
    }
}
