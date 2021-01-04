import React from "react";
import {Col, Row, Navbar} from "react-bootstrap";
import PropTypes from "prop-types";
import "./menu.scss";


export default class MenuComponent extends React.Component {

    static propTypes = {
        setShowVertexOptions: PropTypes.func,
        parentElem: PropTypes.object
    };


    render() {
        const cls = this.props.className || "md";
        return (
            <Row className={cls + "-menu"}>
                <Col md={12}>
                    <Navbar bg="transparent" className={"border-bottom menu-component"} expand="lg">
                        {this.props.children}
                    </Navbar>
                </Col>
            </Row>

        )
    }
}
