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
        let existingHistory = getDataFromLocalStorage(historyLocalStorageKey, true) || [];

        return (
            <FlyOutUI title={"Query History"}
                      display={"block"}
                      position={"left"}
                      onClose={this.props.onClose}>
                <ul className={"vertical historyList"}>
                    {
                        existingHistory.map((existingHistoryItem, i) => {
                            return (
                                <li className={"historyItem"} key={i}>

                                        <pre>
                                            {existingHistoryItem.query}
                                        </pre>

                                    <p>
                                        <a className={"small"}
                                           onClick={() => this.props.makeQuery(existingHistoryItem.query)}>
                                            Run Again
                                        </a>
                                        <a className={"small"}
                                           onClick={() => this.props.addQueryToConsole(existingHistoryItem.query)}>
                                            Edit to Console
                                        </a>
                                        <span className={"small"}>Queried at {existingHistoryItem.dt}</span>
                                    </p>

                                </li>
                            )
                        })
                    }
                </ul>
                {/*Query history will come here*/}
            </FlyOutUI>
        )
    }

}
