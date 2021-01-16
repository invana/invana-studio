import React from 'react';
import DefaultLayout from "../../layout/default";
import {Form, FormControl, InputGroup, Nav, Row} from "react-bootstrap";
import Sidebar from "../../ui-components/sidebar";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronLeft, faChevronRight,
    faCircle, faEllipsisV,
    faList,
    faPlus, faProjectDiagram,
    faTable,
} from "@fortawesome/free-solid-svg-icons";
import MainContent from "../../ui-components/main-content";
import MenuComponent from "../../ui-components/menu";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {VERTICES_EXAMPLE_DATA} from "../../../example-data/data";
import TableInterface from "../../interface/tables";
import DataSidebarViewlet from "../../viewlets/data-management/data-sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import RemoteEngine from "../../layout/remote";


export default class LabelDetailView extends RemoteEngine {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            totalCount: 120312,
            // renderType: "table", // ["table", "list", "graph"]
            elementsData: VERTICES_EXAMPLE_DATA
        }

    }

    render() {
        console.log("this.props", this.props.location);
        return (<DefaultLayout {...this.props}>

                <Row>
                    <Sidebar>
                        <DataSidebarViewlet dataStore={this.dataStore}/>
                    </Sidebar>
                    <MainContent className={"main-content"}>
                        <Row>
                            <Col size={"12"} className={"p-2 bg-light"}>


                                {/*<MenuComponent>*/}
                                {/*    <Nav className="mr-auto">*/}
                                {/*        <Nav.Item>*/}
                                {/*            <h2 style={{"fontSize": "1.3rem"}}*/}
                                {/*                className={"mt-1"}>{this.props.match.params.labelName}</h2>*/}
                                {/*        </Nav.Item>*/}
                                {/*    </Nav>*/}
                                {/*    <Nav className="ml-auto">*/}
                                {/*        <Nav.Item><strong>{this.state.totalCount}</strong> entries</Nav.Item>*/}

                                {/*        <Nav.Item className={"ml-3"}>*/}
                                {/*            <DropdownButton*/}
                                {/*                as={ButtonGroup}*/}
                                {/*                menuAlign="right"*/}
                                {/*                variant="link"*/}
                                {/*                title={<FontAwesomeIcon icon={faEllipsisV}/>}*/}
                                {/*                className={"pb-0"}*/}
                                {/*            >*/}
                                {/*                <Dropdown.Item eventKey="1">Schema</Dropdown.Item>*/}
                                {/*                <Dropdown.Item eventKey="2">Indexes</Dropdown.Item>*/}
                                {/*                <Dropdown.Divider/>*/}
                                {/*                <Dropdown.Item eventKey="4">Stats</Dropdown.Item>*/}
                                {/*            </DropdownButton>*/}
                                {/*        </Nav.Item>*/}
                                {/*    </Nav>*/}
                                {/*</MenuComponent>*/}


                                <MenuComponent className={"p-1"}>
                                    <Nav className="mr-auto">
                                        <Nav.Item>
                                            <h2 style={{"fontSize": "1.3rem"}}
                                                className={" mb-0 mr-3"}>{this.props.match.params.labelName}</h2>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Button variant="outline-primary" className={"mr-1"} size={"sm"}>
                                                <FontAwesomeIcon icon={faPlus}/> Add New
                                            </Button>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <ButtonGroup>
                                                <Button variant="secondary" size={"sm"}><FontAwesomeIcon
                                                    icon={faTable}/></Button>
                                                <Button variant="secondary" size={"sm"}><FontAwesomeIcon
                                                    icon={faList}/></Button>
                                                {/*<Button variant="secondary" size={"sm"}><FontAwesomeIcon*/}
                                                {/*    icon={faProjectDiagram}/></Button>*/}
                                            </ButtonGroup>
                                        </Nav.Item>

                                    </Nav>
                                    <Nav className="ml-auto">
                                        <Nav.Item className={"mr-3"}>
                                            Displaying <strong>1</strong> - <strong>100</strong> of <strong>{this.state.totalCount}</strong>.
                                        </Nav.Item>
                                        <Nav.Item>
                                            <ButtonGroup>
                                                <Button variant="secondary" size={"sm"}><FontAwesomeIcon
                                                    icon={faChevronLeft}/></Button>
                                                <Button variant="secondary" size={"sm"}><FontAwesomeIcon
                                                    icon={faChevronRight}/></Button>
                                            </ButtonGroup>
                                        </Nav.Item>
                                        <Nav.Item className={"ml-3"}>
                                            <DropdownButton
                                                as={ButtonGroup}
                                                menuAlign="right"
                                                variant="link"
                                                title={<FontAwesomeIcon icon={faEllipsisV}/>}
                                                className={"pb-0"}
                                            >
                                                <Dropdown.Item eventKey="1">Schema</Dropdown.Item>
                                                <Dropdown.Item eventKey="2">Indexes</Dropdown.Item>
                                                <Dropdown.Divider/>
                                                <Dropdown.Item eventKey="4">Stats</Dropdown.Item>
                                            </DropdownButton>
                                        </Nav.Item>
                                    </Nav>
                                </MenuComponent>

                            </Col>

                        </Row>
                        <Row>
                            <Col size={"12"} className={"p-2"}>
                                <TableInterface elementsData={this.state.elementsData} showLabel={false}/>
                            </Col>
                        </Row>
                    </MainContent>
                </Row>

            </DefaultLayout>
        )
    }

}
