import React from "react";
import {faExternalLinkAlt, faExternalLinkSquareAlt, faSync, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {q1CreateData, q3, q4} from "./learn-queries";
import PropTypes from "prop-types";
import {Button, Card, ListGroup} from "react-bootstrap";
import {STUDIO_SETTINGS} from "../../../settings";

export default class Learn extends React.Component {


    static defaultProps = {
        startNewQueryInConsole: () => console.error("startNewQueryInConsole not implemented"),
        onClose: () => console.error("onClose not implemented")
    }
    static propTypes = {
        onClose: PropTypes.func,
        startNewQueryInConsole: PropTypes.func
    };


    render() {
        return (
            <Card className={"p-10 border-0"}>
                <Card.Body>
                    <h6 className={"border-bottom pb-1"}>Build a simple graph</h6>
                    <p>Learn how to use gremlin queries to create a simple graph.
                        I will illustrate simple data story of myself and this project using
                        a simple graph for a start.</p>
                    <ListGroup>
                        <ListGroup.Item className={"p-0 mb-1"}>
                            <Button className={"text-left p-0"} variant={"link"}
                                    onClick={() => this.props.startNewQueryInConsole(q1CreateData)}>
                                1. Add a <strong>Person</strong> and <strong>GitHubProject</strong> nodes
                            </Button>
                        </ListGroup.Item>
                        <ListGroup.Item className={"p-0 mb-1"}>
                            <Button className={"text-left p-0"} variant={"link"}
                                    onClick={() => this.props.startNewQueryInConsole(q3)}>
                                2. Update properties of the Node
                            </Button>
                        </ListGroup.Item>
                        <ListGroup.Item className={"p-0 mb-1"}>
                            <Button className={"text-left p-0"} variant={"link"}
                                    onClick={() => this.props.startNewQueryInConsole(q4)}>
                                3. Add a relation between both the nodes.
                            </Button>
                        </ListGroup.Item>


                    </ListGroup>
                    <p>Awesome! <span className={"p-0 cursor"}

                                      onClick={() => this.props.onClose()}><u> Close this tour </u></span> and start
                        exploring
                        your graph data.
                    </p>

                    <a className={"btn btn-outline-success btn-sm mr-2"} target={"_new"}
                       href={STUDIO_SETTINGS.SUPPORT_URL}>
                        Find more support <FontAwesomeIcon icon={faExternalLinkAlt}/>

                    </a>
                    <Button variant={"outline-secondary"} size={"sm"}
                            onClick={() => this.props.onClose()}>close
                        {/*<FontAwesomeIcon icon={faWindowClose}/>*/}
                    </Button>
                    {/*<h3 style={{"marginTop": "30px"}}>More Resources</h3>*/}
                    {/*<ListGroup>*/}
                    {/*    <ListGroup.Item className={"p-0"}>*/}
                    {/*        <a target={"_blank"} rel="noopener noreferrer"*/}
                    {/*           href="https://medium.com/invanalabs/crud-cheatsheet-to-apache-tinkerpop-gremlin-393540cd46ae?source=collection_home---4------1-----------------------">*/}
                    {/*            1. CRUD CheatSheet to Apache TinkerPop Gremlin. <FontAwesomeIcon className={"small"}*/}
                    {/*                                                                             icon={faExternalLinkSquareAlt}/>*/}
                    {/*        </a>*/}
                    {/*    </ListGroup.Item>*/}
                    {/*    <ListGroup.Item className={"p-0"}>*/}
                    {/*        <a target={"_blank"} rel="noopener noreferrer"*/}
                    {/*           href="https://tinkerpop.apache.org/docs/current/reference/">*/}
                    {/*            2. Apache Tinkerpop Documentation <FontAwesomeIcon className={"small"}*/}
                    {/*                                                               icon={faExternalLinkSquareAlt}/>*/}
                    {/*        </a>*/}
                    {/*    </ListGroup.Item>*/}
                    {/*</ListGroup>*/}
                </Card.Body>

            </Card>
        )
    }

}
