import React from "react";
import {Button, Col, Form, ListGroup, Row} from "react-bootstrap";

export default class SettingsViewlet extends React.Component {
    render() {
        return (
            <Row>
                <Col md={2} className={"border-right"}>
                    <ListGroup>
                        <ListGroup.Item className={"pl-2 pb-0"}>Rendering</ListGroup.Item>
                        <ListGroup.Item className={"pl-2 pb-0"}>Forms</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={10} className={"pl-3"}>
                    <Form>
                        <Row className={" p-2"}>
                            <Col md={"12"}>
                                <h6 className={"heading mt-3 pb-2 mt-1"} style={{"borderBottom": "1px solid #ccc"}}>
                                    Graph Rendering Settings
                                </h6>
                            </Col>

                            <Col md={"4"} className={"pr-3"}>
                                <Form.Group>
                                    <Form.Label>Element Color</Form.Label>
                                    <Form.Control size={"sm"} type="text" placeholder="ex: #efefef"/>
                                </Form.Group>
                            </Col>
                            <Col md={"4"} className={"pr-3"}>
                                <Form.Group>
                                    <Form.Label>Element Label Field</Form.Label>
                                    <Form.Control size={"sm"} type="text" placeholder="center"/>
                                </Form.Group>
                            </Col>
                            <Col md={"4"} className={"pr-3"}>
                                <Form.Group>
                                    <Form.Label>Element Label Position</Form.Label>
                                    <Form.Control size={"sm"} type="text" placeholder="center"/>
                                </Form.Group>
                            </Col>
                            <Col md={"4"}>
                                <Button variant={"primary"}>Submit</Button>
                            </Col>
                        </Row>
                        <Row className={" p-2"}>
                            <Col md={"12"}>
                                <h6 className={"heading mt-3 pb-2 mt-1"} style={{"borderBottom": "1px solid #ccc"}}>
                                    Form Rendering Settings
                                </h6>
                            </Col>

                            <Col md={"4"} className={"pr-3"}>
                                <Form.Group>
                                    <Form.Label>text</Form.Label>
                                    <Form.Group>
                                        {/*<Form.Label>Custom select Large</Form.Label>*/}
                                        <Form.Control as="select" size="sm" custom>
                                            <option>Text</option>
                                            <option>Number</option>
                                            <option>Float</option>
                                            <option>Date</option>
                                            <option>Time</option>
                                            <option>DateTime</option>
                                            <option>Password</option>
                                            <option>Email</option>
                                            <option>Tel</option>
                                            <option>Url</option>
                                        </Form.Control>
                                    </Form.Group>

                                </Form.Group>
                            </Col>
                            <Col md={"4"} className={"pr-3"}>
                                <Form.Group>
                                    <Form.Label>Element Label Field</Form.Label>
                                    <Form.Control size={"sm"} type="text" placeholder="center"/>
                                </Form.Group>
                            </Col>
                            <Col md={"4"} className={"pr-3"}>
                                <Form.Group>
                                    <Form.Label>Element Label Position</Form.Label>
                                    <Form.Control size={"sm"} type="text" placeholder="center"/>
                                </Form.Group>
                            </Col>
                            <Col md={"4"}>
                                <Button variant={"primary"}>Submit</Button>
                            </Col>
                        </Row>

                        {/*<Row className={"bg-light p-2 mt-2"}>*/}
                        {/*    <Col size={"12"}>*/}
                        {/*        <h6 className={"heading mt-3 pb-2"}*/}
                        {/*            style={{"border-bottom": "1px solid #ccc"}}>*/}
                        {/*            Template Rendering Settings</h6>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                        {/*<Row className={"bg-light pl-2 pr-2"}>*/}
                        {/*    <Col md={"4"} className={"pr-3"}>*/}
                        {/*        <Form.Group>*/}
                        {/*            <Form.Label>Image Field</Form.Label>*/}
                        {/*            <Form.Control size={"sm"} type="text" placeholder="Image field"/>*/}
                        {/*        </Form.Group>*/}
                        {/*    </Col>*/}
                        {/*    <Col md={"4"} className={"pr-3"}>*/}
                        {/*        <Form.Group>*/}
                        {/*            <Form.Label>Image Field</Form.Label>*/}
                        {/*            <Form.Control size={"sm"} type="text" placeholder="Image field"/>*/}
                        {/*        </Form.Group>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}

                    </Form>
                </Col>
            </Row>
        );
    }
}
