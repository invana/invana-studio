import React from 'react';
import DefaultLayout from "../../layout/default";
import {Nav, Row} from "react-bootstrap";
import Sidebar from "../../ui-components/sidebar";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronLeft, faChevronRight,
    faEllipsisV, faPlus
} from "@fortawesome/free-solid-svg-icons";
import MainContent from "../../ui-components/main-content";
import MenuComponent from "../../ui-components/menu";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import TableInterface from "../../interface/tables";
import DataSidebarViewlet from "../../viewlets/data-management/data-sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import RemoteEngine from "../../layout/remote";


export default class LabelDetailViewBase extends RemoteEngine {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            totalCount: "NA",
            labelName: this.props.match.params.labelName,
            pageSize: 20,
            pageNumber: 1,
            // renderType: "table", // ["table", "list", "graph"]
            elementsData: [],
        }
    }

    skipCount(pageNumber) {
        return (pageNumber - 1) * this.state.pageSize;
    }

    paginationFromCount(pageNumber) {
        return this.skipCount(pageNumber);
    }

    paginationToCount(pageNumber) {
        return pageNumber * this.state.pageSize;
    }


    render() {
        console.log("this.props", this.props.location);
        return (<DefaultLayout {...this.props}>
                <Row>
                    <Sidebar>
                        <DataSidebarViewlet parentRemoteComponent={this}/>
                    </Sidebar>
                    <MainContent className={"main-content"}>
                        <Row>
                            <Col size={"12"} className={"p-2 bg-light"}>
                                <MenuComponent className={"p-1"}>
                                    <Nav className="mr-auto">
                                        <Nav.Item>
                                            <h2 style={{"fontSize": "1.3rem"}}
                                                className={" mb-0 mr-3"}>{this.state.labelName}</h2>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Button variant="outline-primary" className={"mr-1"} size={"sm"}>
                                                <FontAwesomeIcon icon={faPlus}/> Add New
                                            </Button>
                                        </Nav.Item>
                                        {/*<Nav.Item>*/}
                                        {/*    <ButtonGroup>*/}
                                        {/*        <Button variant="secondary" size={"sm"}><FontAwesomeIcon*/}
                                        {/*            icon={faTable}/></Button>*/}
                                        {/*        <Button variant="secondary" size={"sm"}><FontAwesomeIcon*/}
                                        {/*            icon={faList}/></Button>*/}
                                        {/*        /!*<Button variant="secondary" size={"sm"}><FontAwesomeIcon*!/*/}
                                        {/*        /!*    icon={faProjectDiagram}/></Button>*!/*/}
                                        {/*    </ButtonGroup>*/}
                                        {/*</Nav.Item>*/}

                                    </Nav>
                                    <Nav className="ml-auto">
                                        <Nav.Item className={"mr-3"}>
                                            Displaying <strong>{this.paginationFromCount(this.state.pageNumber)}</strong>
                                            - <strong>{this.paginationToCount(this.state.pageNumber)}</strong> of
                                            {/*<strong>{this.state.totalCount}</strong>.*/}
                                            {this.dataStore.verticesStats.get(this.state.labelName)}&nbsp;
                                            <strong>{this.state.totalCount}</strong>.
                                        </Nav.Item>
                                        <Nav.Item>
                                            <ButtonGroup>
                                                {
                                                    this.state.pageNumber > 1
                                                        ? <Button variant="secondary" size={"sm"}
                                                                  onClick={() => this.goToPrevPage()}><FontAwesomeIcon
                                                            icon={faChevronLeft}/></Button>
                                                        : <React.Fragment/>
                                                }

                                                <Button variant="secondary" size={"sm"}
                                                        onClick={() => this.goToNextPage()}><FontAwesomeIcon
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
                                <TableInterface
                                    elementsData={this.state.elementsData}
                                    elementsType={this.state.labelType}
                                    showLabel={false}/>
                            </Col>
                        </Row>
                    </MainContent>
                </Row>

            </DefaultLayout>
        )
    }

}
