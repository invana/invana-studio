import React from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faHistory, faTrashAlt, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {
    getDataFromLocalStorage,
    removeHistoryFromStorageById,
} from "../../../utils/localStorage";
import {HISTORY_SETTINGS} from "../../../settings/history";
import {cleanQuery} from "../../../utils/core";

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
        onClose: PropTypes.func,
        cardBodyStyle: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            showStartCount: 0,
            showEndCount: 5,
            paginationCount: 5
        }
    }

    extractRawQuery(graphQLQuery) {
        try {
            const _ = cleanQuery(graphQLQuery.query.split("rawQuery(gremlin:")[1].split("){id,type,label,")[0]);
            console.log("extractRawQuery History", typeof _, _);
            return _;
        } catch (e) {
            console.log("===extractHistory e", e)
            return graphQLQuery.query;
        }
    }

    showNext() {
        this.setState({
            showStartCount: this.state.showStartCount + this.state.paginationCount,
            showEndCount: this.state.showEndCount + this.state.paginationCount,
        })
    }

    showPrev() {
        this.setState({
            showStartCount: this.state.showStartCount - this.state.paginationCount,
            showEndCount: this.state.showEndCount - this.state.paginationCount,
        })
    }


    render() {
        const _this = this;
        let existingHistory = getDataFromLocalStorage(HISTORY_SETTINGS.HISTORY_LOCAL_STORAGE_KEY, true);
        existingHistory = existingHistory.filter(item => item.source === "console") || [];
        const historyToShow = existingHistory.slice(this.state.showStartCount, this.state.showEndCount);
        console.log("====historyToShow", historyToShow)
        return (

            <Card className={" border-0 rounded-0 overflow-auto"}>
                <Card.Header className={"bg-secondary text-white pt-2 pb-2 rounded-0"}>
                    <FontAwesomeIcon icon={faHistory}/> Query History
                </Card.Header>
                <Card.Body className={"p-0 "}>
                    <div className={"pl-3 pr-3"}>
                        <div className="row">
                            <div className="col col-7">
                                <p className={" text-muted small mt-2 mb-0"}>
                                    showing {this.state.showStartCount} to {this.state.showEndCount} entries of {existingHistory.length}
                                </p>
                            </div>
                            <div className="col col-5">

                                <div className="float-right">
                                    <Button variant={"outline-secondary"} type={"button"}
                                            className={"pr-2 pl-2 mr-2 rounded-0 border-0"}
                                            disabled={!(this.state.showStartCount > 0)}
                                            onClick={() => this.showPrev()}>
                                        <FontAwesomeIcon icon={faChevronLeft}/>
                                    </Button>


                                    <Button variant={"outline-secondary"} type={"button"}
                                            className={"pr-2 pl-2 mr-2 rounded-0 border-0"}
                                            disabled={!(existingHistory.length > this.state.showEndCount)}

                                            onClick={() => this.showNext()}>
                                        <FontAwesomeIcon icon={faChevronRight}/>
                                    </Button>
                                    <Button variant={"outline-secondary "} type={"button"}
                                            className={"pr-2 pl-2 button-hover-bg-disable rounded-0 border-0"}
                                            onClick={() => this.props.onClose()}>
                                        <FontAwesomeIcon icon={faWindowClose}/>
                                    </Button>
                                </div>


                            </div>
                        </div>


                    </div>
                    <div style={this.props.cardBodyStyle} className={"pl-3 pr-3"}>
                        {historyToShow.length > 0
                            ?
                            <ul className={"list-group  rounded-0"}>
                                {
                                    historyToShow.map((existingHistoryItem, i) => {
                                        return (
                                            <li className={"list-group-item border-0 p-0"}
                                                key={i}>
                                                        <pre className={" mt-2 p-3 mt-0 mb-0"}
                                                             style={{"backgroundColor": "#efefef"}}>{this.extractRawQuery(existingHistoryItem.query)}
                                                        </pre>
                                                {/*<pre className={"mb-0"}>{JSON.stringify(existingHistoryItem.query, null, 2)}</pre>*/}

                                                <div className={" pt-1 pb-1"}>
                                                    {/*<button className={"btn btn-dark btn-sm  small "}*/}
                                                    {/*        onClick={() => this.props.makeQuery(this.extractRawQuery(existingHistoryItem.query), {source: 'console'})}>*/}
                                                    {/*    Run Again*/}
                                                    {/*</button>*/}
                                                    <button className={"btn btn-link small mt-0 " +
                                                    "font-weight-bold btn-sm p-0 display-inline"}
                                                            onClick={() => this.props.startNewQueryInConsole(this.extractRawQuery(existingHistoryItem.query))}>
                                                        Start Query
                                                    </button>
                                                    <button className={"btn btn-link text-muted small mt-0 ml-2 " +
                                                    "font-weight-bold btn-sm p-0 display-inline"}
                                                            onClick={() => {
                                                                if (confirm("Are you sure you want to remove this query from history ?")) {
                                                                    removeHistoryFromStorageById(existingHistoryItem.id);
                                                                    _this.setState(_this.state);
                                                                }
                                                            }}>
                                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                                    </button>
                                                    <small className={"ml-3"}>
                                                        queried at {existingHistoryItem.dt}
                                                    </small>
                                                    <div className="border-bottom mt-3"/>

                                                </div>

                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            : <p className={"p-3 text-muted"}>Hm! No query history found!.</p>
                        }
                    </div>
                </Card.Body>
            </Card>


        )
    }
}
