import React from 'react';
import DefaultLayout from "../layout/default";
import {Col, Row, Nav} from "react-bootstrap";
import MenuComponent from "../ui-components/menu";
import CanvasComponent from "../ui-components/canvas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCode, faCog, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../ui-components/sidebar";
import ListGroup from "react-bootstrap/ListGroup";


export default class ExplorerView extends React.Component {

    render() {
        console.log("this.props", this.props.location);
        return (<DefaultLayout {...this.props}>

            <Row>
                <Col className={"aside"}>
                    <Sidebar>
                        <ListGroup defaultActiveKey="#link1">
                            <ListGroup.Item action href="#link1">
                                collection 1
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                  collection 1
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                This one is a button
                            </ListGroup.Item>
                        </ListGroup>,
                    </Sidebar>
                </Col>
                <Col md={9}>
                    <MenuComponent>
                        <Nav className="mr-auto">
                            <Nav.Item>
                                <Nav.Link>
                                    Graph Canvas
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Item>
                                <button className={"nav-link"}>
                                    <FontAwesomeIcon icon={faUserAstronaut}/>
                                </button>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/connect">
                                    <FontAwesomeIcon icon={faUserAstronaut}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/graph">
                                    <FontAwesomeIcon icon={faCode}/>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/table">
                                    <FontAwesomeIcon icon={faCog}/>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </MenuComponent>
                    <CanvasComponent>

                    </CanvasComponent>
                    <MenuComponent className={"sm"}>
                        <Nav className="mr-auto">
                            <Nav.Item>
                                <Nav.Link href="/connect">
                                    Query successfull
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Item>
                                <Nav.Link href="/connect">
                                    200 response
                                </Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </MenuComponent>
                </Col>
            </Row>

        </DefaultLayout>)
    }

}
