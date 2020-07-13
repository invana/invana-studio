import React from "react";
import "./aside-left.scss";
import PropTypes from "prop-types"

export default class AsideLeft extends React.Component {
    static defaultProps = {
        extraClass: ""
    }

    static propTypes = {
        extraClass: PropTypes.string,
        children: PropTypes.any
    }

    render() {
        return (
            <div className={"aside-left " + this.props.extraClass}>
                {this.props.children}
            </div>
        );
    }
}
