// left , right, top, bottom
import React from "react";
import "./flyout.scss";


export default class FlyOutUI extends React.Component {

    static defaultProps = {
        position: "right",
        display: "none",
        title: "Flyout title here",
        onClose: () => console.error("onClose not implemented for flyout")
    }

    render() {
        return (
            <div className={"flyout flyout-" + this.props.position} style={{display: this.props.display}}>
                <div className={+this.props.isWarning ? "flyoutHeader flyoutHeaderWarning" : "flyoutHeader"}>
                    {this.props.title}
                    <button onClick={this.props.onClose.bind(this)}>x</button>
                </div>
                <div className={"flyoutBody p-10"}>
                    {this.props.children}
                </div>
            </div>
        )
    }

}
