// left , right, top, bottom
import React from "react";
import "./flyout.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";


export default class FlyOutUI extends React.Component {

    static defaultProps = {
        position: "right",
        display: "none",
        title: null, // use non-null data to render header.
        onClose: () => console.error("onClose not implemented for flyout"),
        padding: true
    }

    render() {

        const padClass = this.props.padding === true ? "p-10" : "";
        return (
            <div className={"flyout flyout-" + this.props.position} style={{display: this.props.display}}>
                {
                    this.props.title
                        ? <div className={+this.props.isWarning ? "flyoutHeader flyoutHeaderWarning" : "flyoutHeader"}>
                            {this.props.title}
                        </div>
                        : <span></span>
                }
                <button className={"close"} onClick={this.props.onClose.bind(this)}>
                                                <FontAwesomeIcon icon={faWindowClose}/>
                </button>
                <div className={"flyoutBody " + padClass}>
                    {this.props.children}
                </div>
            </div>
        )
    }

}
