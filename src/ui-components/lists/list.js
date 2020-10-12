import React from "react";
import "./list.scss";
import PropTypes from "prop-types";

export default class GEList extends React.Component {
    /*

      type can be "default" or "nav"
    */
    static defaultProps = {
        type: "default"
    };

    static propTypes = {
        type: PropTypes.string,
        children: PropTypes.any
    }

    render() {
        return (
            <ul className={this.props.type + "-list list"}>{this.props.children}</ul>
        );
    }
}


