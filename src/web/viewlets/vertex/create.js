import RemoteEngine from "../../layout/remote";
import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";


export default class CreateVertexViewlet extends RemoteEngine {


    render() {
        return (
            <Row>
                <Col>
                    <Card className="mb-2">
                        <Card.Header>Create Vertex</Card.Header>
                        <Card.Body>
                            <Form inline onSubmit={this.onFormSubmit.bind(this)}>

                                <Form.Control
                                    className="mb-2 mr-sm-2"
                                    name="connectionUrl"
                                    placeholder="http://localhost:8000/graphql"
                                    style={{width: "320px"}}
                                />
                                <Form.Control name="graphEngineName" value={"invana-engine"} type={"hidden"}/>


                                <Button type="submit" className="">
                                    Connect
                                </Button>
                                <p>
                                    <button className={"extra-headers-btn small"} type={"button"}
                                            onClick={this.toggleMoreOptions.bind(this)}>
                                        http headers <FontAwesomeIcon icon={faAngleDown}/>
                                    </button>
                                </p>

                            </Form>

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        )
    }

}
