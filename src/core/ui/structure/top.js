import React from "react";
import "./top.scss";

export default class MainTopNav extends React.Component {

    render() {
        return (
            <div className={"MainTopNav"}>
                {this.props.children}
            </div>
        )
    }
}

