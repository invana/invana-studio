import React from "react";
import {Button, FormControl, InputGroup, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCog} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";


export default class Header extends React.Component {

    static propTypes = {
        setShowQueryConsole: PropTypes.func,
        setModalContentName: PropTypes.func
    };

    render() {

        return (
            <Navbar
                // bg="transparent"
                className={"border-bottom"} expand="lg">
                <NavLink to="/" className={"pl-3 navbar-brand"}>Invana Studio</NavLink>
                <Nav className="mr-auto">
                    {
                        this.props.setShowQueryConsole ? <React.Fragment>
                                <Nav.Item className={"pt-1 pl-2"}>
                                    <InputGroup className={"nav-search"}>
                                        <FormControl placeholder="Start a Gremlin Query here  " size={"sm"}
                                                     onFocus={() => {
                                                         this.props.setShowQueryConsole(true)
                                                     }}
                                                     style={{"width": "400px",}}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" size={"sm"}
                                                    onClick={() => {
                                                        this.props.setShowQueryConsole(true)
                                                    }}
                                            >
                                                <FontAwesomeIcon icon={faAngleDown}/>
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Nav.Item>
                            </React.Fragment>
                            : <React.Fragment/>
                    }
                </Nav>
                <Nav className="ml-auto">

                    <Nav.Item>
                        <NavLink to="/explorer" className={"nav-link"} activeClassName="active">Explorer</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/data" className={"nav-link"} activeClassName="active">Data</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/console" className={"nav-link"} activeClassName="active">Console</NavLink>
                    </Nav.Item>
                    {
                        this.props.setModalContentName ?
                            <Nav.Item onClick={() => this.props.setModalContentName("settings")}>
                                <span className={"nav-link"}>
                                <FontAwesomeIcon icon={faCog}/>
                            </span>
                            </Nav.Item>
                            : <React.Fragment/>
                    }
                    {/*<Nav.Item>*/}
                    {/*    <NavDropdown title={<span> <FontAwesomeIcon icon={faCog}/> New</span>}>*/}
                    {/*        <NavDropdown.Item href="#action/3.1">Vertex Label</NavDropdown.Item>*/}
                    {/*        <NavDropdown.Item href="#action/3.2">Edge Label</NavDropdown.Item>*/}
                    {/*        <NavDropdown.Item href="#action/3a.3">Function</NavDropdown.Item>*/}
                    {/*        <NavDropdown.Divider/>*/}
                    {/*        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                    {/*    </NavDropdown>*/}

                    {/*</Nav.Item>*/}
                </Nav>
            </Navbar>
        )
    }

}