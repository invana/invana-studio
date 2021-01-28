import React from "react";
import {Col, Row} from "react-bootstrap";
import "./canvas.scss";

export default class CanvasComponent extends React.Component {

    render() {
        return (
            <Row className={"canvas border-bottom"}>
                <Col md={12}>
                    {this.props.children}
                </Col>
            </Row>

        )
    }
}
