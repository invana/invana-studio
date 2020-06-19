import React from "react";
import "./modal.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHistory, faWindowClose} from "@fortawesome/free-solid-svg-icons";

export default class Modal extends React.Component {
    static defaultProps = {
        size: "md",
        title: null,
        onClose: () => console.error("onClose prop not set for <Modal> component")
    }

    render() {
        let _className = "";
        if (this.props.size === "lg") {
            _className = "modalLg"
        } else {
            _className = "modalMd"
        }
        return (
            <div className={"modal " + _className}>
                {
                    this.props.title
                        ? <h2>{this.props.title}</h2>
                        : <span></span>
                }
                <div>
                    {this.props.children}

                        <a className={"close-btn"} onClick={() => this.props.onClose()}>
                            <FontAwesomeIcon icon={faWindowClose}/>

                        </a>

                </div>
            </div>
        )
    }

}
