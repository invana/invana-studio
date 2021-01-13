import React from "react";


export default class Sidebar extends React.Component {


    render() {
        return (
            <div style={{"minHeight": "calc(100vh - 43px)"}} className={"border-right"}>
                {this.props.children}
            </div>
        )
    }
}
