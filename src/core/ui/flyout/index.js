// left , right, top, bottom
import React from "react";
import "./flyout.scss";


export default class FlyOutUI extends React.Component {

    static defaultProps = {
        position: "right",
        display: "none"
    }

    render() {

        return (
            <div className={"flyout flyout-" + this.props.position} style={{display: this.props.display}}>
                {this.props.children}
            </div>
        )
    }

}
