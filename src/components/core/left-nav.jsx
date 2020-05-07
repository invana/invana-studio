import React from "react";


const mainNavigationStyle = {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '40px',
    borderRight: '1px solid #1f2230',
    backgroundColor: '#1f2230',
    height: '100vh',
    boxShadow: "-2px 1px 6px 1px #1f2230"
};
const mainNavLi = {
    // "display": "block",
    "paddingTop": "2px",
    "paddingBottom": "2px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "height": "33px",
    "borderBottom": "1px solid #3b3e4c"

}
const mainNavUl = {
    "padding": "0",
    "margin": "0"
}
const mainNavUlBottom = {
    "padding": "0",
    "margin": "0",
    "position": "absolute",
    "bottom": "0"
}
const mainNavLiA = {
    "color": "#efefef",
    "textDecoration": "none",
    "fontSize": "12px"

}
const LogoCls = {
    "background": "red",
    // "display": "block",
    "height": "33px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center"
}
export default class LeftNav extends React.Component {


    render() {

        return (
            <div id="main-navigation" style={mainNavigationStyle}>
                <ul style={mainNavUl}>
                    <li style={LogoCls}><a style={mainNavLiA} href="/">home</a></li>
                    <li style={mainNavLi}><a style={mainNavLiA} href="/">home</a></li>
                    <li style={mainNavLi}><a style={mainNavLiA} href="/management">settings</a></li>
                    <li style={mainNavLi}><a style={mainNavLiA} href="/console">Console</a></li>

                </ul>
                <ul style={mainNavUlBottom}>

                    <li style={mainNavLi}><a style={mainNavLiA} href="/about">About</a></li>
                    <li style={mainNavLi}>
                        <a style={mainNavLiA}
                           target={"_new"}
                           href="https://github.com/invanalabs/graph-explorer/issues">Support</a></li>
                </ul>
            </div>
        )
    }
}

