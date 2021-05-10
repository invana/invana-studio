import React from "react";
import MainNav from "../viewlets/main-nav";
import MainContent from "../viewlets/main-content";

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
