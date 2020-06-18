import MainTopNav from "../ui/structure/top";
import React from "react";
import {VERSION} from "../../config";
import QueryInputForm from "../ui/form/query-forms";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook} from "@fortawesome/free-solid-svg-icons";
import SecondaryHeaderBase from "../ui/structure/top-secondary";
import LearnFlyOut from "../components/learn";

export default class SecondaryHeader extends React.Component {

    static defaultProps = {
        canvasQuery: null,
        setRightFlyOut: () => console.error("setRightFlyOut prop is missing for <SecondaryHeader />"),
        switchCanvasTo: (canvasType) => console.error("switchCanvasTo prop is missing for <SecondaryHeader />"),
    }

    render() {
        return (
            <SecondaryHeaderBase>
                <div className={"left-side"}>
                    {
                        (this.props.canvasQuery)
                            ?
                            <ul>
                                <li><a onClick={() => this.props.switchCanvasTo("graph")}>Graph</a></li>
                                {/*<li><a onClick={() => this.props.switchCanvasTo("table")}>Table</a></li>*/}
                                <li><a onClick={() => this.props.switchCanvasTo("json")}>JSON</a></li>
                            </ul>
                            : <span style={{"paddingLeft": "10px"}}> Welcome to Graph Explorer Beta. </span>
                    }
                </div>
                <div className={"right-side"}>
                    <ul>
                        <li><a onClick={() => this.props.setRightFlyOut("learn")}> <FontAwesomeIcon icon={faBook}/></a>
                        </li>
                    </ul>
                </div>

            </SecondaryHeaderBase>
        );
    }
}
