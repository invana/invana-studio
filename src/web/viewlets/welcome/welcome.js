import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkSquareAlt, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import {getDataFromLocalStorage} from "../../../utils/localStorage";
import {HISTORY_SETTINGS} from "../../../settings/history";
import DefaultRemoteComponent from "../../layouts/default-remote";
import {STUDIO_SETTINGS} from "../../../settings";
import {cleanQuery} from "../../../utils/core";

export default class Welcome extends DefaultRemoteComponent {


    extractRawQuery(graphQLQuery) {
        try {
            return cleanQuery(graphQLQuery.query.split("rawQuery(gremlin:")[1].split("){id,type,label,")[0]);
        } catch (e) {
            return graphQLQuery.query;
        }
    }

    render() {

        const existingHistory = getDataFromLocalStorage(HISTORY_SETTINGS.HISTORY_LOCAL_STORAGE_KEY, true) || [];
        const historyToShow = existingHistory.filter(item => item.source === "console").slice(0, 2);

        return (
            <Card className={"ml-4 mr-4"} style={{
                "maxWidth": '820px',
                "minWidth": "420px",
                "borderRadius": 0, "top": "58px",
            }}>
                <Card.Body style={{"padding": "5rem 3rem 3rem 3rem"}}>
                    <Row>
                        <Col md={"5"}>
                            <FontAwesomeIcon icon={faUserAstronaut} size={"5x"}/>
                            <Card.Title style={{"fontSize": "1.8rem"}}>Invana Studio
                                <small style={{"fontSize": "1rem"}}
                                       className={"ml-2"}>v{STUDIO_SETTINGS.VERSION}</small></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{STUDIO_SETTINGS.ABOUT_TEXT}</Card.Subtitle>
                            <hr/>
                            <Button variant={"outline-primary"} size={"sm"}
                                    onClick={() => this.props.setWelcome(false)}>
                                Start Exploring</Button>
                            <a className={"btn btn-outline-secondary btn-sm ml-2"}
                               href={"https://docs.invana.io"} target={"_new"}>
                                Documentation <FontAwesomeIcon icon={faExternalLinkSquareAlt}/>
                            </a>
                            <p className={"mt-3 text-muted"}>For support, visit <a target={"_new"}
                                                                                   href={STUDIO_SETTINGS.SUPPORT_URL}>
                                {STUDIO_SETTINGS.SUPPORT_URL}
                            </a>
                            </p>
                        </Col>
                        <Col md={"7"}>
                            <div className="border-left" style={{"minHeight": "260px"}}>
                                <p className={"font-weight-bold pl-2 pb-2 border-bottom text-uppercase"}>Recent
                                    queries :
                                </p>
                                <div className={"overflow-auto"} style={{"maxHeight": "300px"}}>
                                    {historyToShow.length > 0
                                        ? <ul className={"list-group border-0 rounded-0"}>
                                            {
                                                historyToShow.map((existingHistoryItem, i) => {
                                                    return (
                                                        <li className={"list-group-item border-bottom border-0 p-0"}
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
                                                                        onClick={() => {
                                                                            this.props.setWelcome(false);
                                                                            this.props.startNewQueryInConsole(this.extractRawQuery(existingHistoryItem.query));
                                                                        }
                                                                        }>
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
                                        : <p className={"p-2 text-muted"}>Hm! No query history found!.</p>
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}
