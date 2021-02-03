import React from "react";
import PropTypes from "prop-types";
import "./left-container.scss";
import {Button, Modal} from "react-bootstrap";

export default class LeftContainer extends React.Component {

    // static propTypes = {
    //     onClose: PropTypes.func,
    // }

    render() {
        return (
            <div className={"leftContainer"}>
                {this.props.children}
            </div>
        )
    }
}
