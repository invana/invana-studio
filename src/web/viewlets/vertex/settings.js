import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

export default class SettingsViewlet extends React.Component {
    render() {
        return (
            <Row>
                <Col size={"12"}>
                    <Form>
                        <Row className={" p-2"}>
                            <Col size={"12"}>
                                <h6 className={"heading mt-3 pb-2 mt-1"} style={{"border-bottom": "1px solid #ccc"}}>
                                    Graph Rendering Settings
                                </h6>
                            </Col>
                        </Row>
                        <Row className={" pl-2 pr-2 pb-2"}>
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
