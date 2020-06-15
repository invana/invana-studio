import React from "react";
import {

    faCog,
    faBug,
    faStar,
    faHistory,
    faSignInAlt,
    faLifeRing
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./left.scss";


export default class MainLeftNav extends React.Component {


    render() {

        return (
            <div className={"mainLeftNav"}>
                <ul className={"vertical"}>
                    <li>
                        <a href="/" title={"Graph Visualiser"}>
                            <FontAwesomeIcon icon={faStar}/>
                        </a>
                    </li>
                    {/*<li>*/}
                    {/*    <a href="/console" title={"Query Console"}>*/}
                    {/*        <FontAwesomeIcon icon={faStar}/>*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                    <li>
                        <a href="/history" title={"History"}>

                            <FontAwesomeIcon icon={faHistory}/>
                        </a>
                    </li>
                    <li>
                        <a href="/management" title={"Management"}>
                            <FontAwesomeIcon icon={faCog}/>
                        </a>
                    </li>
                </ul>
                <ul className={"bottom vertical"}>
                    <li>
                        <a href="/about" title={"Support/Documentation"}>

                            {/*<FontAwesomeIcon icon={faQuestionCircle}/>*/}
                            <FontAwesomeIcon icon={faLifeRing}/>

                        </a>
                    </li>
                    <li>
                        <a
                            target={"_new"} title={"Support / Report Issues"}
                            href="https://github.com/invanalabs/graph-explorer/issues">

                            <FontAwesomeIcon icon={faBug}/>

                        </a>
                    </li>
                    <li>
                        <a href={"/switch-server"} title={"Switch Server"}>

                            <FontAwesomeIcon icon={faSignInAlt}/>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

