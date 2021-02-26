import React from "react";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";

export default class BlankLayout extends React.Component {

    static propTypes = {
        children: PropTypes.any,
    }

    render() {
        return (
            <Container fluid>{this.props.children}</Container>
        )
    }
}
