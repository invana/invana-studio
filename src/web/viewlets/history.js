import React from "react";

// import {historyLocalStorageKey} from "../config";
// import "./history.scss";
import PropTypes from "prop-types";
import {getDataFromLocalStorage} from "../utils";
import {historyLocalStorageKey} from "../../config";
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop, faWindowClose} from "@fortawesome/free-solid-svg-icons";

export default class RequestHistoryView extends React.Component {

    static defaultProps = {
        makeQuery: (query) => console.log("makeQuery prop not set to HistoryFlyOut", query),
        // connector: null,
        startNewQueryInConsole: (query) => console.log("startNewQueryInConsole prop not set to HistoryFlyOut", query),
        query: null,
        onClose: PropTypes.func,

    }

    static propTypes = {
        makeQuery: PropTypes.func,
        // connector: PropTypes.func,
        startNewQueryInConsole: PropTypes.func,
        query: PropTypes.string,
        onClose: PropTypes.func
    };

    extractRawQuery(graphQLQuery) {
        return graphQLQuery.query.split("rawQuery(gremlin:")[1].split("){id,type,label,")[0].replace(/(^"|"$)/g, '');
    }



    render() {
        const existingHistory = getDataFromLocalStorage(historyLocalStorageKey, true) || [];
        const historyToShow = existingHistory.filter(item => item.source !== "internal");
        return (

            <Card className={"p-10 border-0"}>
                <Card.Header><FontAwesomeIcon icon={faDesktop}/> Query History
                    <button type="button" onClick={() => this.props.onClose()}
                            className={"btn btn-link p-0 border-0 fa-pull-right"}><FontAwesomeIcon
                        icon={faWindowClose}/></button>

                </Card.Header>
                <Card.Body className={"p-0"}>
                    <div>
                        {historyToShow.length > 0
                            ?
                            <ul className={"list-group"}>
                                {
                                    historyToShow.filter(item => item.query.queryKey === "rawQuery").map((existingHistoryItem, i) => {
                                        return (
                                            <li className={"list-group-item border-bottom pl-0 pr-0 pt-0"} key={i}>
                                                <pre className={"mb-0 p-2"} style={{
                                                    "backgroundColor": "#efefef",
                                                }}>{this.extractRawQuery(existingHistoryItem.query)}</pre>
                                                {/*<pre className={"mb-0"}>{JSON.stringify(existingHistoryItem.query, null, 2)}</pre>*/}

                                                <div>
                                                    {/*<button className={"btn btn-dark btn-sm  small "}*/}
                                                    {/*        onClick={() => this.props.makeQuery(this.extractRawQuery(existingHistoryItem.query), {source: 'console'})}>*/}
                                                    {/*    Run Again*/}
                                                    {/*</button>*/}
                                                    <button className={"btn btn-dark mt-1 btn-sm small"}
                                                            onClick={() => this.props.startNewQueryInConsole(this.extractRawQuery(existingHistoryItem.query))}>
                                                        Start Query in Console
                                                    </button>
                                                </div>
                                                <div className={"small"}>
                                                    Queried
                                                    from {existingHistoryItem.source} at {existingHistoryItem.dt}
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            : <p className={"p-3"}>Hm! No user query history found!.</p>
                        }
                    </div>

                </Card.Body>
            </Card>


        )
    }
}
