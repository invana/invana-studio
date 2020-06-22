import React from "react";
import FlyOutUI from "../ui/flyout";
import {getDataFromLocalStorage} from "../utils";
import {historyLocalStorageKey} from "../../config";
import "./history.scss";

export default class HistoryFlyOut extends React.Component {

    static defaultProps = {
        makeQuery: (query) => console.log("makeQuery prop not set to HistoryFlyOut"),
        addQueryToConsole: (query) => console.log("addQueryToConsole prop not set to HistoryFlyOut"),
    }

    render() {
        const existingHistory = getDataFromLocalStorage(historyLocalStorageKey, true) || [];

        const historyToShow = existingHistory.filter(item => item.source !== "internal");
        return (
            <FlyOutUI title={"Query History"}
                      display={"block"}
                      position={"left"}
                      onClose={this.props.onClose}>
                {historyToShow.length > 0
                    ?
                    <ul className={"vertical historyList"}>
                        {
                            historyToShow.filter(item => item.source !== "internal").map((existingHistoryItem, i) => {
                                return (
                                    <li className={"historyItem"} key={i}>
                                        <pre>{existingHistoryItem.query}</pre>
                                        <p>
                                            <a className={"small"}
                                               onClick={() => this.props.makeQuery(existingHistoryItem.query)}>
                                                Run Again
                                            </a>
                                            <a className={"small"}
                                               onClick={() => this.props.addQueryToConsole(existingHistoryItem.query)}>
                                                Edit Query in Console
                                            </a>
                                            <br/>
                                            <span
                                                className={"small"}>Queried from {existingHistoryItem.source} at {existingHistoryItem.dt}</span>
                                        </p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    : <p>Hm! No user query history found!.</p>
                }
            </FlyOutUI>
        )
    }
}
