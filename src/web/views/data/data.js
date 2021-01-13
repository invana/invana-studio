import React from 'react';
import DefaultLayout from "../../layout/default";
import {Form, FormControl, InputGroup, Nav, Row} from "react-bootstrap";
import Sidebar from "../../ui-components/sidebar";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronLeft, faChevronRight,
    faCircle,
    faCode,
    faCog,
    faList,
    faPlus, faSyncAlt,
    faTable,
    faUserAstronaut
} from "@fortawesome/free-solid-svg-icons";
import ListGroup from "react-bootstrap/ListGroup";
import MainContent from "../../ui-components/main-content";
import MenuComponent from "../../ui-components/menu";
import CanvasComponent from "../../ui-components/canvas";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
// import {Col, Row, Nav} from "react-bootstrap";
// import MenuComponent from "../../ui-components/menu";
// import CanvasComponent from "../../ui-components/canvas";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faCode, faCog, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
// import Sidebar from "../../ui-components/sidebar";
// import MainContent from "../../ui-components/main-content";
//

export default class DataView extends React.Component {

    render() {
        console.log("this.props", this.props.location);
        const exampleVerticesCount = [...Array(10).keys()];
        return (<DefaultLayout {...this.props}>

                <Row>
                    <Sidebar>
                        <Form inline className={"mt-3 mb-1"}>
                            <InputGroup>
                                <FormControl style={{"width": "210px"}}
                                             className={"mt-0 ml-3 mr-2"} size={"sm"}
                                             placeholder="Search nodes and edges ..."/>
                                <InputGroup.Append>
                                    <Button size={"sm"} variant="outline-secondary rounded">
                                        <FontAwesomeIcon className={"small"} icon={faPlus}/>
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                        {/*<Button*/}
                        {/*    // block*/}
                        {/*    variant="outline-primary"*/}
                        {/*    size={"sm"}*/}
                        {/*    className={"ml-3 mt-2 mb-2"}*/}
                        {/*    // disabled={isLoading}*/}
                        {/*    // onClick={!isLoading ? handleClick : null}*/}
                        {/*>*/}
                        {/*    <FontAwesomeIcon className={"small"} icon={faPlus}/> Create Element*/}
                        {/*</Button>*/}
                        <ListGroup defaultActiveKey="#link1" variant="flush">


                            {
                                exampleVerticesCount.map((item, index) => (
                                    <ListGroup.Item action>
                                        <FontAwesomeIcon icon={faCircle}/> collection {index}
                                    </ListGroup.Item>
                                ))
                            }

                        </ListGroup>
                    </Sidebar>
                    <MainContent className={"main-content"}>
                        <Row>
                            <Col size={"12"} className={"p-2"}>
                                <h1 className={"mt-1"}>Collection 1</h1>


                                <MenuComponent>
                                    <Nav className="mr-auto">
                                        <Nav.Item>
                                            <Button variant="link" className={"mr-3 p-0"} size={"sm"}>
                                                <FontAwesomeIcon icon={faPlus}/> Add New
                                            </Button>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <span className={"vertical-align"}>view </span>
                                            <Button variant="link" className={"mr-3 p-0"} size={"sm"}><FontAwesomeIcon
                                                icon={faTable}/></Button>
                                            <Button variant="link" className={"p-0"} size={"sm"}><FontAwesomeIcon
                                                icon={faList}/></Button>
                                        </Nav.Item>

                                    </Nav>
                                    <Nav className="ml-auto">
                                        <Nav.Item className={"mr-3"}>
                                            Displaying
                                            entries <strong>1</strong> - <strong>100</strong> of <strong>100,121</strong>
                                        </Nav.Item>
                                        <Nav.Item className={"mr-4"}>
                                            <Button variant="link" className={"mr-3 p-0 align-middle"} size={"sm"}>
                                                <FontAwesomeIcon  icon={faChevronLeft}/>
                                            </Button>
                                            <Button variant="link" className={"p-0 align-middle"}
                                                    size={"sm"}>
                                                <FontAwesomeIcon icon={faChevronRight}/>
                                            </Button>
                                        </Nav.Item>
                                        <Nav.Item className={""}>
                                            <Button variant="link" className={" p-0 align-middle"} size={"sm"}>
                                                <FontAwesomeIcon  icon={faSyncAlt}/> Refresh
                                            </Button>

                                        </Nav.Item>
                                    </Nav>
                                </MenuComponent>

                            </Col>

                        </Row>
                        <Row>
                            <Col size={"12"} className={"p-2"}>
                                <Table striped bordered hover size={"sm"}>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>

                                    </tbody>
                                </Table>

                            </Col>
                        </Row>
                    </MainContent>
                </Row>

            </DefaultLayout>
        )
    }

}
