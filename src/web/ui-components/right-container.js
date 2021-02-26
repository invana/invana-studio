import React from "react";
import "./right-container.scss";
import PropTypes from "prop-types";

export default class RightContainer extends React.Component {

    static propTypes = {
        children: PropTypes.any
    }


    render() {
        return (
            <div className={"rightContainer"}>
                {this.props.children}
            </div>
        )
    }
}
