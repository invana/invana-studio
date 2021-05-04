import React from "react";
import MainNav from "./main-nav";
import MainContent from "./main-content";

export default class DefaultLayout extends React.Component {

    render() {
        return (
            <div className={"d-flex"}>
                <MainNav/>
                <MainContent children={this.props.children}/>
            </div>
        )
    }
}
