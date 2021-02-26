import React from "react";
import "./main-content.scss";
import PropTypes from "prop-types";

export default class MainContent extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.any
    }

    render() {
        return (
            <div className={" main-content " + this.props.className}>
                {this.props.children}
            </div>
        )
    }
}
