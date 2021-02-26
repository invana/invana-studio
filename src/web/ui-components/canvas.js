import React from "react";
import {Col, Row} from "react-bootstrap";
import "./canvas.scss";
import PropTypes from "prop-types";

export default class CanvasComponent extends React.Component {
    static propTypes = {
        children: PropTypes.any
    };

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
