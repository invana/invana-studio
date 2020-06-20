import MainTopNav from "../ui/structure/top";
import React from "react";
import {VERSION} from "../../config";
import QueryInputForm from "../ui/form/query-forms";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook} from "@fortawesome/free-solid-svg-icons";

export default class Header extends React.Component {

    static defaultProps = {
        canvasQuery: null,
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
                            {/*{*/}
                            {/*    (this.props.canvasQuery)*/}
                            {/*        ?*/}
                                    <ul>
                                        <li><a onClick={() => this.props.switchCanvasTo("graph")}>Graph</a></li>
                                        {/*<li><a onClick={() => this.props.switchCanvasTo("table")}>Table</a></li>*/}
                                        <li><a onClick={() => this.props.switchCanvasTo("json")}>JSON</a></li>
                                    </ul>
                            {/*        : <span style={{"paddingLeft": "10px"}}> Welcome to Graph Explorer. </span>*/}
                            {/*}*/}
                        </li>
                        <li>
                            <QueryInputForm canvasQuery={this.props.canvasQuery}
                                            onQuerySubmit={this.props.onQuerySubmit}/>
                        </li>
                        <li>
                            <a onClick={() => this.props.setRightFlyOut("learn")}>
                                <FontAwesomeIcon icon={faBook}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </MainTopNav>
        );
    }
}
