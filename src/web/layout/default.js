import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import BlankLayout from "./blank";
import RemoteEngine from "./remote";
import {STUDIO_SETTINGS} from "../../settings";


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
                <Navbar bg="transparent" className={"border-bottom"} expand="lg">
                    <Navbar.Brand href="/">Invana Studio</Navbar.Brand>
                    <Nav className="ml-auto">
                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link href="/connect"*/}
                        {/*              className={this.props.location.pathname === "/connect" ? "active" : ""}>*/}
                        {/*        Connect*/}
                        {/*    </Nav.Link>*/}
                        {/*</Nav.Item>*/}
                        <Nav.Item>
                            <Nav.Link href="/data"
                                      className={this.props.location.pathname === "/data" ? "active" : ""}>
                                Data</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>

                            <Nav.Link href={"/explorer"}
                                      className={this.props.location.pathname === "/explorer" ? "active" : ""}>

                                Explorer</Nav.Link>

                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="/schema"
                                      className={this.props.location.pathname === "/schema" ? "active" : ""}>
                                Functions</Nav.Link>
                        </Nav.Item>
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
