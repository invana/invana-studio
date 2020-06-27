// left , right, top, bottom
import React from "react";
import "./flyout.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose, faWindowRestore} from "@fortawesome/free-solid-svg-icons";


export default class FlyOutUI extends React.Component {

    static defaultProps = {
        position: "right",
        display: "none",
        title: null, // use non-null data to render header.
        onClose: () => console.error("onClose not implemented for flyout"),
        padding: true,
    }
    state = {
        size: "md"
    }

    toggleSize() {
        let newSize = "";
        if (this.state.size === "md") {
            newSize = "lg"
        } else {
            newSize = "md"
        }
        this.setState({
            size: newSize
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        const padClass = this.props.padding === true ? "p-5" : "";
        return (
            <div className={"flyout flyout-" + this.state.size + " flyout-" + this.props.position}
                 style={{display: this.props.display}}>
                {
                    this.props.title
                        ? <div className={+this.props.isWarning ? "flyoutHeader flyoutHeaderWarning" : "flyoutHeader"}>
                            {this.props.title}
                        </div>
                        : <span></span>
                }
                <div className="close">

                    {
                        this.props.position !== "bottom"
                            ? <button className={"button"} onClick={() => this.toggleSize()}>
                                <FontAwesomeIcon icon={faWindowRestore}/>
                            </button>
                            : <span></span>
                    }

                    <button className={"button"} onClick={this.props.onClose.bind(this)}>
                        <FontAwesomeIcon icon={faWindowClose}/>
                    </button>
                </div>

                <div className={"flyoutBody "}>
                    <div className={padClass}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }

}
