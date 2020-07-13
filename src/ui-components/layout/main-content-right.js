import React from "react";
import "./main-content-right.scss";
import PropTypes from "prop-types";

export default class MainContentRight extends React.Component {
    static defaultProps = {
        extraClass: ""
    };
    static propTypes = {
        extraClass: PropTypes.string,
        secondaryChild: PropTypes.any,
        children: PropTypes.any
    }

    render() {
        return (
            <div className={"main-content-right " + this.props.extraClass}>
                {this.props.children}
                <div>{this.props.secondaryChild}</div>
            </div>
        );
    }
}
