import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faPlus} from "@fortawesome/free-solid-svg-icons";
import BlankLayout from "./blank";
import RemoteEngine from "./remote";
import NavDropdown from "react-bootstrap/NavDropdown";


export default class DefaultLayout extends RemoteEngine {


    // static propTypes = {
    //     children: PropTypes.any,
    //     leftSideNav: PropTypes.any,
    //
    //     primaryNav: PropTypes.any,
    //     secondaryNav: PropTypes.any,
    // };

    // static defaultProp = {
    //     connectionUrl: STUDIO_SETTINGS.CONNECTION_URL
    // }

    render() {
        return (
            <BlankLayout>
                <Navbar
                    // bg="transparent"
                    className={"border-bottom"} expand="lg">
                    <Navbar.Brand href="/" className={"ml-3"}>Invana Studio</Navbar.Brand>
                    <Nav className="ml-auto">
                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link href="/connect"*/}
                        {/*              className={this.props.location.pathname === "/connect" ? "active" : ""}>*/}
                        {/*        Connect*/}
                        {/*    </Nav.Link>*/}
                        {/*</Nav.Item>*/}
                        <Nav.Item>


                            <NavDropdown title={<span> <FontAwesomeIcon icon={faPlus}/> New</span>}>
                                <NavDropdown.Item href="#action/3.1">Vertex Label</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Edge Label</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Function</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>

                        </Nav.Item>
                        <Nav.Item>

                            <Nav.Link href={"/explorer"}
                                      className={this.props.location.pathname === "/explorer" ? "active" : ""}>
                                Explorer</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/data"
                                      className={this.props.location.pathname === "/data" ? "active" : ""}>
                                Data</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/functions"
                                      className={this.props.location.pathname === "/functions" ? "active" : ""}>
                                Functions</Nav.Link>
                        </Nav.Item>
                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link href="/schema"*/}
                        {/*              className={this.props.location.pathname === "/schema" ? "active" : ""}>*/}
                        {/*        Schema</Nav.Link>*/}
                        {/*</Nav.Item>*/}
                        <Nav.Item>
                            <Nav.Link href="/settings"
                                      className={this.props.location.pathname === "/settings" ? "active" : ""}>
                                <FontAwesomeIcon icon={faCog}
                                />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                {this.props.children}
            </BlankLayout>
        )
    }
}
