import React, {ReactPropTypes as PropTypes} from "react";
import {Nav, Navbar, Container} from "react-bootstrap";

export default class DefaultLayout extends React.Component {

    // static propTypes = {
    //     children: PropTypes.any,
    //     leftSideNav: PropTypes.any,
    //
    //     primaryNav: PropTypes.any,
    //     secondaryNav: PropTypes.any,
    // };

    render() {
        return (
            <Container fluid>
                <Navbar bg="transparent" className={"border-bottom"} expand="lg">
                    <Navbar.Brand href="/">Graph Explorer</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link href="/connect">Connect</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/graph">Graph</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/table">Table</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/schema">Schema</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                {this.props.children}
            </Container>
        )
    }
}
