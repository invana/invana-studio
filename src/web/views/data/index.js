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
import DataSidebarViewlet from "../../viewlets/data-sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";


export default class DataView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            totalCount: 120312,
            elementsData: VERTICES_EXAMPLE_DATA
        }

    }

    render() {
        console.log("this.props", this.props.location);
        return (<DefaultLayout {...this.props}>

                <Row>
                    <Sidebar>
                        <DataSidebarViewlet/>
                    </Sidebar>
                    <MainContent className={"main-content"}>
                        <Row className={"mt-1"}>
                            <Col size={"12"} className={"p-2"}>


                                <MenuComponent>
                                    <Nav className="mr-auto">
                                        <Nav.Item>
                                            <h2 style={{"fontSize": "1.3rem"}} className={"mt-1"}>Collection 1</h2>
                                        </Nav.Item>
                                    </Nav>
                                    <Nav className="ml-auto">
                                        <Nav.Item><strong>{this.state.totalCount}</strong> entries</Nav.Item>

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

                                {/*<Nav variant="pills" className={"mb-2"} size={"sm"} defaultActiveKey="entries">*/}
                                {/*    <Nav.Item>*/}

                                {/*    </Nav.Item>*/}
                                {/*    <Nav.Item>*/}
                                {/*        <Button variant="link" eventKey={"schema"}*/}
                                {/*                className={"pt-0 pb-0 align-middle"}*/}
                                {/*        >Schema</Button>*/}
                                {/*    </Nav.Item>*/}
                                {/*    <Nav.Item>*/}
                                {/*        <Button variant="link" eventKey={"indexes"}*/}
                                {/*                className={"pt-0 pb-0 align-middle"}*/}
                                {/*        >Indexes</Button>*/}
                                {/*    </Nav.Item>*/}
                                {/*</Nav>*/}

                                <MenuComponent className={"p-1 bg-light"}>
                                    <Nav className="mr-auto">
                                        <Nav.Item>
                                            <Button variant="outline-primary" className={"mr-1"} size={"sm"}>
                                                <FontAwesomeIcon icon={faPlus}/> Add New
                                            </Button>
                                        </Nav.Item>
                                        <Nav.Item>
                                            {/*<span className={"vertical-align"}>view </span>*/}

                                            <ButtonGroup>
                                                {/*<Button variant="secondary">Left</Button>*/}
                                                <Button variant="link"><FontAwesomeIcon
                                                    icon={faTable}/></Button>
                                                <Button variant="link"><FontAwesomeIcon
                                                    icon={faList}/></Button>
                                                <Button variant="link"><FontAwesomeIcon
                                                    icon={faProjectDiagram}/></Button>
                                            </ButtonGroup>


                                            {/*<Button variant="link" className={"mr-3 ml-2 p-0"}*/}
                                            {/*        size={"sm"}>*/}
                                            {/*    <Button variant="link" className={"p-0"} size={"sm"}></Button>*/}
                                        </Nav.Item>

                                    </Nav>
                                    <Nav className="ml-auto">
                                        <Nav.Item className={"mr-3"}>
                                            Displaying
                                            entries <strong>1</strong> - <strong>100</strong> of <strong>{this.state.totalCount}</strong>
                                        </Nav.Item>
                                        <Nav.Item>
                                            {/*<Button variant="link" className={"mr-3 p-0 align-middle"} size={"sm"}>*/}

                                            {/*</Button>*/}
                                            {/*<Button variant="link" className={"p-0 align-middle"}*/}
                                            {/*        size={"sm"}>*/}

                                            {/*</Button>*/}

                                            <ButtonGroup>
                                                <Button variant="link"
                                                        className={"pt-0 pb-0"}><FontAwesomeIcon
                                                    icon={faChevronLeft}/></Button>
                                                <Button variant="link"
                                                        className={"pt-0 pb-0"}><FontAwesomeIcon
                                                    icon={faChevronRight}/></Button>
                                            </ButtonGroup>
                                        </Nav.Item>
                                        {/*<Nav.Item className={""}>*/}
                                        {/*    <Button variant="link" className={" p-0 align-middle"} size={"sm"}>*/}
                                        {/*        <FontAwesomeIcon icon={faSyncAlt}/> Refresh*/}
                                        {/*    </Button>*/}

                                        {/*</Nav.Item>*/}
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
