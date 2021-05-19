import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import packageJson from '../../../../package.json';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkSquareAlt} from "@fortawesome/free-solid-svg-icons";
import {faPiedPiper} from "@fortawesome/free-brands-svg-icons";
import {getDataFromLocalStorage} from "../../../utils/localStorage";
import {HISTORY_SETTINGS} from "../../../settings/history";
import DefaultRemoteComponent from "../../layouts/default-remote";

export default class Welcome extends DefaultRemoteComponent {


    extractRawQuery(graphQLQuery) {
        try {
            return graphQLQuery.query.split("rawQuery(gremlin:")[1].split("){id,type,label,")[0].replace(/(^"|"$)/g, '').replace(/\\"/g, "\"").replace(/\n|\r/g, "");
        } catch (e) {
            return graphQLQuery.query;
        }
    }

    render() {

        const existingHistory = getDataFromLocalStorage(HISTORY_SETTINGS.HISTORY_LOCAL_STORAGE_KEY, true) || [];
        const historyToShow = existingHistory.filter(item => item.source === "console").slice(0, 2);

        return (
            <Card className={"ml-4"} style={{width: '820px', "borderRadius": 0, "top": "58px"}}>
                <Card.Body style={{"padding": "5rem 3rem 3rem 3rem"}}>
                    <Row>
                        <Col md={"6"}>
                            <FontAwesomeIcon icon={faPiedPiper} size={"5x"}/>
                            <Card.Title style={{"fontSize": "1.8rem"}}>Invana Studio
                                <small style={{"fontSize": "1rem"}}
                                       className={"ml-2"}>v{packageJson.version}</small></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Open source Graph Analytics
                                Platform</Card.Subtitle>
                            <hr/>
                            <Button variant={"outline-primary"} size={"sm"}
                                    onClick={() => this.props.setWelcome(false)}>
                                Start Exploring</Button>
                            <a className={"btn btn-outline-secondary btn-sm ml-2"}
                               href={"https://docs.invana.io"} target={"_new"}>
                                Documentation <FontAwesomeIcon icon={faExternalLinkSquareAlt}/>
                            </a>
                        </Col>
                        <Col md={"6"}>
                            <div className="border-left">
                                {historyToShow.length > 0
                                    ?
                                    <div>
                                        <p className={"font-weight-bold pl-2 pb-2 border-bottom text-uppercase"}>Recent
                                            queries :
                                        </p>
                                        <ul className={"list-group border-0 rounded-0"}>
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
                                    </div>
                                    : <p className={"p-3 text-muted"}>Hm! No user query history found!.</p>
                                }
                            </div>

                        </Col>
                    </Row>

                    {/*<Card.Text>*/}
                    {/*    Some quick example text to build on the card title and make up the bulk of*/}
                    {/*    the card's content.*/}
                    {/*</Card.Text>*/}

                    {/*<Card.Link href="https://invana.io" target={"_new"}>Why Invana</Card.Link>*/}
                    {/*<Card.Link href="https://docs.invana.io" target={"_new"}>documentation</Card.Link>*/}
                </Card.Body>
            </Card>
        )
    }

}
