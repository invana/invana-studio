import React from "react";
import "./aside-top.scss";
import PropTypes from "prop-types"

export default class AsideTop extends React.Component {
    static defaultProps = {
        extraClass: ""
    };

    static propTypes = {
        extraClass: PropTypes.string,
        children: PropTypes.any
    }

    render() {
        return (
            <div className={"aside-top " + this.props.extraClass}>
                {this.props.children}
            </div>
        );
    }
}
