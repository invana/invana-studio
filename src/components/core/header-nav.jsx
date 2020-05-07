import React from "react";

const headerNavigation = {
    "background": "#1f222f",
    "padding": "10px 1rem",
    "boxShadow": "0 2px 1px 0 rgb(58, 58, 58)"
}
const headerNavigationH1 = {
    "margin": "0",
    "fontSize": "1rem",
    "fontWeight": "bold",
    "color": "#dfdfdf"
}

export default class HeaderNav extends React.Component {


    render() {

        return (
            <div id="header-navigation" style={headerNavigation}>
                <h1 style={headerNavigationH1}>{this.props.title}</h1>
            </div>
        )
    }
}

