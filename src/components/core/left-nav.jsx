import React from "react";
import {faHome, faTerminal, faCog, faQuestionCircle, faBug, faHistory, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const mainNavigationStyle = {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '40px',
    borderRight: '1px solid #1f2230',
    backgroundColor: '#222222',
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
    "bottom": "0",
    "width": "100%"
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
                    {/*<a style={mainNavLiA} href="/">*/}
                    {/*    <li style={mainNavLiA}>*/}
                    {/*        <FontAwesomeIcon icon={faHome}/>*/}
                    {/*    </li>*/}
                    {/*</a>*/}


                    <a style={mainNavLiA} href="/" title={"Graph Visualiser"}>
                        <li style={mainNavLi}>
                            <FontAwesomeIcon icon={faHome}/>
                        </li>
                    </a>
                    <a style={mainNavLiA} href="/console" title={"Query Console"}>
                        <li style={mainNavLi}>
                            <FontAwesomeIcon icon={faTerminal}/>
                        </li>
                    </a>
                    <a style={mainNavLiA} href="/history" title={"History"}>
                        <li style={mainNavLi}>
                            <FontAwesomeIcon icon={faHistory}/>
                        </li>
                    </a>
                    <a style={mainNavLiA} href="/management" title={"Management"}>
                        <li style={mainNavLi}>
                            <FontAwesomeIcon icon={faCog}/>
                        </li>
                    </a>

                </ul>
                <ul style={mainNavUlBottom}>

                    <a style={mainNavLiA} href="/about" title={"Support/Documentation"}>
                        <li style={mainNavLi}>
                            <FontAwesomeIcon icon={faQuestionCircle}/>
                        </li>
                    </a>
                    <a style={mainNavLiA}
                       target={"_new"} title={"Support / Report Issues"}
                       href="https://github.com/invanalabs/graph-explorer/issues">
                        <li style={mainNavLi}>
                            <FontAwesomeIcon icon={faBug}/>
                        </li>
                    </a>
                       <a style={mainNavLiA} href={"/switch-server"} title={"Switch Server"}>
                        <li style={mainNavLi}>
                            <FontAwesomeIcon icon={faSignInAlt}/>
                        </li>
                    </a>
                </ul>
            </div>
        )
    }
}

