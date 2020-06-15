import React from "react";
import "./secondary-header.scss";

export default class SecondaryHeader extends React.Component{

    render() {
        return (
            <div className={"secondary-header"}>
                {this.props.children}
            </div>
        )
    }

}