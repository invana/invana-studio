import React from "react";
import "./footer.scss";

export default class Footer extends React.Component {

    render() {
        return (
            <div className={"footer"}>{this.props.children}</div>
        )
    }
}
