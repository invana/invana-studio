import React from "react";
import "./modal-container.scss";
import PropTypes from "prop-types";

export default class ModalContainer extends React.Component {

    static propTypes = {
        children: PropTypes.any
    }

    render() {
        return (
            <div className={"modal-container"}>
                {this.props.children}
            </div>
        )
    }
}
