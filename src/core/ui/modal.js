import React from "react";
import "./modal.scss";

export default class Modal extends React.Component {
    static defaultProps = {
        size: "md",
        title: "default title here"
    }

    render() {
        let _className = "";
        if (this.props.size === "lg") {
            _className = "modalLg"
        } else  {
            _className = "modalMd"
        }
        return (
            <div className={"modal " + _className}>
                <h2>{this.props.title}</h2>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }

}
