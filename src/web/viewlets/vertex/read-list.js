import React from "react";
import TableInterface from "../../interface/tables";
import RemoteEngine from "../../layout/remote";
import {Button, ButtonGroup, Form, Nav, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MenuComponent from "../../ui-components/menu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faChevronLeft, faChevronRight, faPlus} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";


export default class ReadListVertexViewlet extends RemoteEngine {

    constructor(props) {
        super(props);
        this.state = {
            elementsData: [],
            pageSize: 20,
            pageNumber: 1
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

    goToNextPage() {
        const nextPageNumber = this.state.pageNumber + 1;
        this.queryListOfItems(this.skipCount(nextPageNumber));
        this.setState({pageNumber: nextPageNumber})
    }

    goToPrevPage() {
        const prevPageNumber = this.state.pageNumber - 1;
        this.queryListOfItems(this.skipCount(prevPageNumber));
        this.setState({pageNumber: prevPageNumber})
    }

    getPaginationQuery(skipCount) {
        if (this.props.match.params.labelType === "vertex") {
            return this.connector.requestBuilder.filterVertices(
                this.props.match.params.labelName,
                this.state.pageSize,
                skipCount);
        } else if (this.props.labelType === "edge") {
            return this.connector.requestBuilder.filterEdges(
                this.props.match.params.labelName,
                this.state.pageSize,
                skipCount);
        } else {
            return null;
        }
    }


    queryListOfItems(skipCount) {
        const query = this.getPaginationQuery(skipCount);
        const queryPayload = this.connector.requestBuilder.combineQueries(query,
            null)
        this.makeQuery(queryPayload);
    }

    componentDidMount() {
        this.queryListOfItems(0);
    }

    processResponse(response) {
        const lastResponse = response.getResponseResult();
        console.log("lastResponse", lastResponse)
        if (lastResponse) {
            this.setState({
                elementsData: response.getResponseResult(
                    this.connector.requestBuilder.filterVertices().queryKey
                )
            })
        }
    }


    render() {
        return (

            <React.Fragment>
                <Row>
                    <Col size={"12"} className={"p-2 "}>
                        <MenuComponent className={"p-0"}>
                            <Nav className="mr-auto">
                                <Nav.Item className={"mr-3"}>
                                    Displaying <strong>{this.paginationFromCount(this.state.pageNumber)}</strong>
                                    - <strong>{this.paginationToCount(this.state.pageNumber)}</strong> of
                                    {/*<strong>{this.props.totalCount}</strong>.*/}
                                    {this.dataStore.verticesStats.get(this.props.labelName)}&nbsp;
                                    <strong>{this.props.totalCount}</strong>.
                                </Nav.Item>
                                <Nav.Item className={"mr-3"}>
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
                            </Nav>
                            <Nav className="ml-auto">
                                <Nav.Item>
                                    <Button variant="outline-primary" className={"mr-1"} size={"sm"}>
                                        <FontAwesomeIcon icon={faPlus}/> New
                                    </Button>
                                </Nav.Item>
                            </Nav>
                        </MenuComponent>
                    </Col>
                </Row>
                <Row>
                    <Col className={"pl-1"}>
                        {
                            this.state.elementsData.length > 0
                                ? <TableInterface
                                    elementsData={this.state.elementsData}
                                    elementsType={this.state.labelType}
                                    showLabel={false}/>
                                : <p className={"text-muted mt-5"}>No data exist for this Label.</p>
                        }
                    </Col>
                </Row>
            </React.Fragment>


        );
    }
}
