import React from "react";
import "./header.scss";
import {faBook} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import QueryInputForm from "../form/query-forms";
import {VERSION} from "../../../config";
import HistoryFlyOut from "../../components/history";

export default class MainHeaderNav extends React.Component {

    render() {
        return (
            <div className={"MainHeaderNav"}>
                <div className="left-side">
                    <a href="/" className={"logo"}><h1>Graph Explorer <small>{VERSION}</small></h1></a>
                </div>
                <div className="right-side">
                    <ul>
                        <li>
                            <QueryInputForm defaultQueryValue={this.props.canvasQuery}
                                            onQuerySubmit={this.props.onQuerySubmit}/>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}

