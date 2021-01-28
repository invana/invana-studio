import React from "react";
import TableInterface from "../../interface/tables";
import RemoteEngine from "../../layout/remote";
import {Button, ButtonGroup, Nav, Row, Col, Modal} from "react-bootstrap";
import MenuComponent from "../../ui-components/menu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faPlus} from "@fortawesome/free-solid-svg-icons";
import CreateVertexViewlet from "./create";


export default class ReadListVertexViewlet extends RemoteEngine {

    constructor(props) {
        super(props);
        this.state = {
            elementsData: [],
            totalCount: "NA",
            pageSize: 20,
            pageNumber: 1,

            showModal: false
        }
    }


    skipCount(pageNumber) {
        return (pageNumber - 1) * this.state.pageSize;
    }

    paginationFromCount(pageNumber) {
        return this.skipCount(pageNumber);
    }

    paginationToCount(pageNumber) {
        return this.skipCount(pageNumber) + this.state.elementsData.length;
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
        } else if (this.props.match.params.labelType === "edge") {
            return this.connector.requestBuilder.filterEdges(
                this.props.match.params.labelName,
                this.state.pageSize,
                skipCount);
        } else {
            return null;
        }
    }

    getQueryKey() {
        if (this.props.match.params.labelType === "vertex") {
            return this.connector.requestBuilder.filterVertices().queryKey;
        } else if (this.props.match.params.labelType === "edge") {
            return this.connector.requestBuilder.filterEdges().queryKey;
        } else {
            return null;
        }
    }

    getTotalCountKey() {
        return this.connector.requestBuilder.getLabelTotalCount(
            this.props.match.params.labelName,
            this.props.match.params.labelType
        ).queryKey;
    }


    queryListOfItems(skipCount) {
        const query = this.getPaginationQuery(skipCount);
        const query2 = this.connector.requestBuilder.getLabelTotalCount(
            this.props.match.params.labelName,
            this.props.match.params.labelType);
        console.log("======query", query);
        console.log("======query2", query2);
        const queryPayload = this.connector.requestBuilder.combineQueries(
            query, query2);
        console.log("======queryPayload", queryPayload);
        this.makeQuery(queryPayload);
    }

    componentDidMount() {
        this.queryListOfItems(0);
    }

    processResponse(response) {
        const lastResponse = response.getResponseResult();
        console.log("lastResponse", this.getQueryKey(),
            this.props.match.params.labelType, lastResponse);
        if (lastResponse) {
            this.setState({
                elementsData: response.getResponseResult(this.getQueryKey()),
                totalCount: response.getResponseResult(this.getTotalCountKey()).count
            })
        }
    }


    handleClose() {
        this.setState({showModal: false});
    }

    showModal() {
        this.setState({showModal: true,})
    }


    render() {
        return (

            <React.Fragment>
                <Row>
                    <Col size={"12"} className={"pb-1 "}>
                        <MenuComponent className={"p-0"}>
                            <Nav className="mr-auto">
                                <Nav.Item>
                                    {/*<Button variant="outline-primary" className={"mr-1"} size={"sm"}*/}
                                    {/*        onClick={() => this.showModal()}*/}
                                    {/*>*/}
                                    {/*    <FontAwesomeIcon icon={faPlus}/> New*/}
                                    {/*</Button>*/}
                                </Nav.Item>
                            </Nav>
                            <Nav className="ml-auto">
                                <Nav.Item className={"mr-3"}>
                                    Displaying <strong>{this.paginationFromCount(this.state.pageNumber)}</strong>
                                    &nbsp;-&nbsp;<strong>{this.paginationToCount(this.state.pageNumber)}</strong> of
                                    {/*<strong>{this.props.totalCount}</strong>.*/}
                                    {this.dataStore.verticesStats.get(this.props.labelName)}&nbsp;
                                    <strong>{this.state.totalCount}</strong>.
                                </Nav.Item>
                                <Nav.Item className={"mr-2"}>
                                    <ButtonGroup>
                                        {
                                            this.state.pageNumber > 1
                                                ? <Button variant="secondary" size={"sm"}
                                                          onClick={() => this.goToPrevPage()}><FontAwesomeIcon
                                                    icon={faChevronLeft}/></Button>
                                                : <Button variant="secondary" size={"sm"} disabled={"disabled"}>
                                                    <FontAwesomeIcon icon={faChevronLeft}/>
                                                </Button>
                                        }
                                        {
                                            this.paginationToCount(this.state.pageNumber) < this.state.totalCount
                                                ? <Button variant="secondary" size={"sm"}
                                                    // disabled={!this.paginationToCount(this.state.pageNumber) < this.state.totalCount}
                                                          onClick={() => this.goToNextPage()}><FontAwesomeIcon
                                                    icon={faChevronRight}/></Button>
                                                : <Button variant="secondary" size={"sm"} disabled={"disabled"}>
                                                    <FontAwesomeIcon icon={faChevronRight}/>
                                                </Button>
                                        }

                                    </ButtonGroup>
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
                                    elementsType={this.props.match.params.labelType}
                                    showLabel={false}/>
                                : <p className={"text-muted mt-5"}>No data exist for this Label.</p>
                        }
                    </Col>
                </Row>

                <Modal show={this.state.showModal} onHide={this.handleClose.bind(this)} size="lg" centered>
                    {/*{<CreateVertexViewlet/>}*/}
                    <Modal.Header closeButton>
                        <Modal.Title>Create `{this.props.match.params.labelName}` Entry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {<CreateVertexViewlet vertexLabel={this.props.match.params.labelName}/>}
                    </Modal.Body>
                </Modal>

            </React.Fragment>


        );
    }
}
