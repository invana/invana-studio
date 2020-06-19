import React from "react";
import "./top-secondary.scss";

export default class SecondaryHeaderBase extends React.Component {



    render() {
        return (
            <div className={"secondaryHeader"}>
                {this.props.children}
            </div>
        )
    }

}
