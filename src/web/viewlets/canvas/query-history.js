import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHistory} from "@fortawesome/free-solid-svg-icons";
import {getDataFromLocalStorage} from "../../../utils/localStorage";
import {HISTORY_SETTINGS} from "../../../settings/history";

export default class RequestHistoryView extends React.Component {

    static defaultProps = {
        // makeQuery: (query) => console.log("makeQuery prop not set to HistoryFlyOut", query),
        // connector: null,
        startNewQueryInConsole: (query) => console.log("startNewQueryInConsole prop not set to HistoryFlyOut", query),
        query: null,
        onClose: PropTypes.func,

    }

    static propTypes = {
        // makeQuery: PropTypes.func,
        // connector: PropTypes.func,
        startNewQueryInConsole: PropTypes.func,
        query: PropTypes.string,
        onClose: PropTypes.func
    };

    extractRawQuery(graphQLQuery) {
        try {
            return graphQLQuery.query.split("rawQuery(gremlin:")[1].split("){id,type,label,")[0].replace(/(^"|"$)/g, '').replace(/\\"/g, "\"").replace(/\n|\r/g, "");
        } catch (e) {
            return graphQLQuery.query;
        }
    }


    render() {
        const existingHistory = getDataFromLocalStorage(HISTORY_SETTINGS.HISTORY_LOCAL_STORAGE_KEY, true) || [];
        const historyToShow = existingHistory.filter(item => item.source === "console").slice(0, 5);
        console.log("====historyToShow", historyToShow)
        return (
            <div className={" position-absolute  d-flex"} style={this.props.style}>
                <div className={" flex-fill ml-3 border border-top-0 bg-white"}>

                    <Card className={" border-0 rounded-0"}>
                        <Card.Header className={"bg-secondary text-white pt-1 pb-1 rounded-0"}>
                            <FontAwesomeIcon icon={faHistory}/> Query History
                        </Card.Header>
                        <Card.Body className={"p-0"}>
                            <div>
                                {historyToShow.length > 0
                                    ?
                                    <ul className={"list-group"}>
                                        {
                                            historyToShow.map((existingHistoryItem, i) => {
                                                return (
                                                    <li className={"list-group-item border-bottom p-0"}
                                                        key={i}>
                                                        <pre className={" ml-2 mr-2 mt-2 p-3 mt-0 mb-0"}
                                                             style={{"backgroundColor": "#efefef"}}>
                                                            {this.extractRawQuery(existingHistoryItem.query)}
                                                        </pre>
                                                        {/*<pre className={"mb-0"}>{JSON.stringify(existingHistoryItem.query, null, 2)}</pre>*/}

                                                        <div className={"pr-2 pl-2 pt-1 pb-1"}>
                                                            {/*<button className={"btn btn-dark btn-sm  small "}*/}
                                                            {/*        onClick={() => this.props.makeQuery(this.extractRawQuery(existingHistoryItem.query), {source: 'console'})}>*/}
                                                            {/*    Run Again*/}
                                                            {/*</button>*/}
                                                            <button className={"btn btn-link mt-0 " +
                                                            "font-weight-bold btn-sm p-0 display-inline"}
                                                                    onClick={() => this.props.startNewQueryInConsole(this.extractRawQuery(existingHistoryItem.query))}>
                                                                Start Query
                                                            </button>
                                                            <small className={"ml-3"}>
                                                                queried at {existingHistoryItem.dt}
                                                            </small>
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
                </div>
            </div>


        )
    }
}
