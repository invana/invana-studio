import React from "react";
import "./aside.scss";

export default class AsideNav extends React.Component{
    render() {
        return (
            <div className={"aside"}>{this.props.children}</div>
        );
    }
}
