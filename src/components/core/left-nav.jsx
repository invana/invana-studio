import React from "react";


const mainNavigationStyle = {
    position: 'fixed',
    left: '0',
    top: '10px',
    width: '40px',
    borderRight: '1px solid #1f2230',
    backgroundColor: '#1f2230',
    height: '100vh'
};
const mainNavLi = {
    "display": "block",
    "paddingTop": "2px",
    "paddingBottom": "2px",
}
const mainNavUl = {
    "paddingLeft": "0"
}
const mainNavLiA = {
    "color": "#efefef",
    "textDecoration": "none",
    "fontSize": "12px"

}
export default class LeftNav extends React.Component {


    render() {

        return (
            <div id="main-navigation" style={mainNavigationStyle}>
                <ul style={mainNavUl}>
                    <li style={mainNavLi}><a style={mainNavLiA} href="/">home</a></li>
                    <li style={mainNavLi}><a style={mainNavLiA} href="/management">settings</a></li>
                    <li style={mainNavLi}><a style={mainNavLiA} href="/console">Console</a></li>
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

