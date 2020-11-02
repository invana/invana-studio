import React from "react";
import {getDataFromLocalStorage} from "../core/utils";
import {historyLocalStorageKey} from "../config";
import "./history.scss";
import GEList from "../ui-components/lists/list";
import PropTypes from "prop-types";

export default class HistoryComponent extends React.Component {

    static defaultProps = {
        makeQuery: (query) => console.log("makeQuery prop not set to HistoryFlyOut", query),
        // connector: null,
        addQueryToConsole: (query) => console.log("addQueryToConsole prop not set to HistoryFlyOut", query),
        query: null
    }

    static propTypes = {
        makeQuery: PropTypes.func,
        // connector: PropTypes.func,
        addQueryToConsole: PropTypes.func,
        query: PropTypes.string
    };


    render() {
        const existingHistory = getDataFromLocalStorage(historyLocalStorageKey, true) || [];
        const historyToShow = existingHistory.filter(item => item.source !== "internal");
        return (
            <div>
                {historyToShow.length > 0
                    ?
                    <GEList type={"vertical"}>
                        {
                            historyToShow.filter(item => item.source !== "internal").map((existingHistoryItem, i) => {
                                return (
                                    <li className={"historyItem"} key={i}>
                                        <pre>{JSON.stringify(existingHistoryItem.query, null, 2)}</pre>
                                        <div>
                                            <button className={"small"}
                                                    onClick={() => this.props.makeQuery(existingHistoryItem.query, {source: 'canvas'})}>
                                                Run Again
                                            </button>
                                            <button className={"small"}
                                                    onClick={() => this.props.addQueryToConsole(existingHistoryItem.query)}>
                                                Edit Query in Console
                                            </button>
                                        </div>
                                        <div className={"small"}>
                                            Queried from {existingHistoryItem.source} at {existingHistoryItem.dt}
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </GEList>
                    : <p>Hm! No user query history found!.</p>
                }
            </div>
        )
    }
}
