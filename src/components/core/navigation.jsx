import React from "react";


const mainNavigationStyle = {
    position: 'fixed',
    bottom: '40px',
    left: '10px'
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
export default class Navigation extends React.Component {


    render() {

        return (
            <div id="main-navigation" style={mainNavigationStyle}>
                <ul style={mainNavUl}>
                    <li style={mainNavLi}><a style={mainNavLiA} href="/">hom</a></li>
                    <li style={mainNavLi}><a style={mainNavLiA} href="/management">set</a></li>
                    <li style={mainNavLi}><a style={mainNavLiA} href="/about">About</a></li>
                    <li style={mainNavLi}>
                        <a style={mainNavLiA} target={"_blank"}
                                             href="https://github.com/invanalabs/graph-explorer">Bug</a></li>
                </ul>
            </div>
        )
    }
}

