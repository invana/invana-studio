import React from "react";
import "./modal-container.scss";

export default class ModalContainer extends React.Component{


    render() {
        return (
            <div className={"modal-container"}>
                {this.props.children}
            </div>
        )
    }
}
