import React from "react";
import "./main-content.scss";


export default class MainContent extends React.Component{


    render() {


        return (
            <div className={"mainContent"}>{this.props.children}</div>
        )
    }

}
