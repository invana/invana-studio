import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

export default class SchemaViewlet extends React.Component {
    render() {
        return (
            <Row>
                <Col size={"12"}>

                    <Row className={" pl-2 pr-2 pb-2"}>
                        <Col md={"3"} className={"pr-3"}>
                            type
                        </Col>
                        <Col md={"3"} className={"pr-3"}>

                            <Form.Group>
                                {/*<Form.Label>Custom select Large</Form.Label>*/}
                                <Form.Control as="select" size="sm" custom>
                                    <option>String</option>
                                    <option>Character</option>
                                    <option>Boolean</option>
                                    <option>Byte</option>
                                    <option>Short</option>
                                    <option>Integer</option>
                                    <option>Long</option>
                                    <option>Float</option>
                                    <option>Double</option>
                                    <option>Date</option>
                                    <option>Geoshape</option>
                                    <option>UUID</option>
                                </Form.Control>
                            </Form.Group>

                        </Col>
                    </Row>

                </Col>
            </Row>
        );
    }
}
