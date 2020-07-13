import React from "react";
import "./footer.scss";
import PropTypes from "prop-types";

export default class GEFooter extends React.Component {
    static propTypes = {
        children: PropTypes.any
    }

    render() {
        return <div className={"footer"}>{this.props.children}</div>;
    }
}
