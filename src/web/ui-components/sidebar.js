import React from "react";
import "./sidebar.scss";

export default class Sidebar extends React.Component {


    render() {
        return (
            <div className={"border-right aside"}>
                {this.props.children}
            </div>
        )
    }
}
