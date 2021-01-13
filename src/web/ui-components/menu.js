import React from "react";
import {Col, Row, Navbar} from "react-bootstrap";
import PropTypes from "prop-types";
import "./menu.scss";


export default class MenuComponent extends React.Component {

    static propTypes = {
        setShowVertexOptions: PropTypes.func,
        parentElem: PropTypes.object,
        className: PropTypes.string,
        size: PropTypes.string,
    };


    render() {
        const size = this.props.size || "md";
        const className = size + "-menu " + this.props.className;
        return (
            <Row className={className}>
                <Col md={12}>
                    <Navbar bg="transparent" className={"border-bottom menu-component"} expand="lg">
                        {this.props.children}
                    </Navbar>
                </Col>
            </Row>

        )
    }
}
