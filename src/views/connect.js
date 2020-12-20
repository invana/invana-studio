import React from 'react';
import DefaultLayout from "../layout/default";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {VERSION, ABOUT_TEXT} from "../config";


export default class ConnectView extends React.Component {

    render() {
        return (<DefaultLayout>


            <Row className={"pl-3"} style={{paddingTop: "12rem"}}>
                <Col md={"1"} className={"mt-2 pl-3"} style={{"width": "4.5rem", "flex": "none"}}>
                    <FontAwesomeIcon icon={faUserAstronaut}
                                     className={"mt-2"}
                                     style={{"fontSize": "4rem"}}/>
                </Col>
                <Col md={"5"}>
                    <p className={"mb-0 font-weight-bold"}>INVANA</p>
                    <h1 className={"pb-0 mb-0"}>Graph Explorer <small>({VERSION})</small></h1>
                    <p>{ABOUT_TEXT}</p>
                </Col>
            </Row>


            <Row className={"pl-3"}>
                <Col md={"6"}>
                    <Card style={{marginTop: '1rem', width: "450px"}} className="mb-2">
                        <Card.Header>Connect to Invana Engine</Card.Header>
                        <Card.Body>
                            <Form inline>
                                <Form.Control
                                    className="mb-2 mr-sm-2"
                                    name="connectionUrl"
                                    placeholder="http://localhost:8000/graphql"
                                    style={{width: "320px"}}
                                />
                                <Button type="submit" className="mb-2">
                                    Connect
                                </Button>

                            </Form>
                            <p>
                                <a href="">Setup Instructions</a> | <a href="">Watch demo</a>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </DefaultLayout>)
    }
}
