import MainTopNav from "../ui/structure/top";
import React from "react";
import {VERSION} from "../../config";
import "./header.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faLifeRing} from "@fortawesome/free-solid-svg-icons";

export default class Header extends React.Component {

    static defaultProps = {
        canvasType: "graph",
        rightFlyOutName: null,
        onQuerySubmit: () => console.error("onQuerySubmit prop is missing for <Header />"),
        setRightFlyOut: () => console.error("setRightFlyOut prop is missing for <Header />"),
        setLeftFlyOut: () => console.error("setLeftFlyOut prop is missing for <Header />"),
        switchCanvasTo: () => console.error("switchCanvasTo prop is missing for <Header />"),
    }


    render() {
        return (
            <MainTopNav>
                <div className="left-side">
                    <a href="/" className={"logo"}><h1>Graph Explorer <small>{VERSION}</small></h1></a>
                </div>
                <div className="right-side">
                    <ul>
                        <li>

                            <ul>
                                <li><a className={this.props.canvasType === "graph" ? "selected" : ""}
                                       onClick={() => this.props.switchCanvasTo("graph")}>Graph</a></li>
                                <li><a className={this.props.canvasType === "table" ? "selected" : ""}
                                       onClick={() => this.props.switchCanvasTo("table")}>Table</a></li>
                                <li><a className={this.props.canvasType === "json" ? "selected" : ""}
                                       onClick={() => this.props.switchCanvasTo("json")}>JSON</a></li>
                            </ul>

                        </li>
                        <li>
                            <a className={this.props.rightFlyOutName === "learn" ? "selected" : ""}
                               onClick={() => this.props.setRightFlyOut("learn")} title={"Learn"}>
                                <FontAwesomeIcon icon={faBook}/>
                            </a>
                        </li>
                        <li>
                            <a className={this.props.rightFlyOutName === "support" ? "selected" : ""}
                               onClick={() => this.props.setRightFlyOut("support")} title={"Support/Documentation"}>
                                <FontAwesomeIcon icon={faLifeRing}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </MainTopNav>
        );
    }
}
