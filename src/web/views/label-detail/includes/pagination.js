import React from "react";
import {Nav} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faEllipsisV, faPlus} from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";


export default class LabelEntriesPagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
        const nextPageNumber = this.state.pageNumber + 1
        this.setState({pageNumber: nextPageNumber})
        const showVerticesQuery = this.props.connector.requestBuilder.filterVertices(
            this.state.labelName,
            this.state.pageSize,
            this.skipCount(nextPageNumber));
        const queryPayload = this.props.connector.requestBuilder.combineQueries(showVerticesQuery, null)
        this.props.makeQuery(queryPayload);
    }

    goToPrevPage() {
        const prevPageNumber = this.state.pageNumber - 1;
        this.setState({pageNumber: prevPageNumber})
        const showVerticesQuery = this.props.connector.requestBuilder.filterVertices(
            this.state.labelName,
            this.state.pageSize,
            this.skipCount(prevPageNumber));
        const queryPayload = this.props.connector.requestBuilder.combineQueries(showVerticesQuery, null)
        this.props.makeQuery(queryPayload);
    }

    render() {
        return (
            <React.Fragment>
                <Nav.Item className={"mr-3"}>
                    Displaying <strong>{this.paginationFromCount(this.state.pageNumber)}</strong>
                    - <strong>{this.paginationToCount(this.state.pageNumber)}</strong> of
                    {/*<strong>{this.props.totalCount}</strong>.*/}
                    {this.props.dataStore.verticesStats.get(this.props.labelName)}&nbsp;
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
                <Nav.Item>
                    <Button variant="outline-primary" className={"mr-1"} size={"sm"}>
                        <FontAwesomeIcon icon={faPlus}/> New
                    </Button>
                </Nav.Item>
                {/*<Nav.Item className={"ml-3"}>*/}
                {/*    <DropdownButton*/}
                {/*        as={ButtonGroup}*/}
                {/*        menuAlign="right"*/}
                {/*        variant="link"*/}
                {/*        title={<FontAwesomeIcon icon={faEllipsisV}/>}*/}
                {/*        className={"pb-0"}*/}
                {/*    >*/}
                {/*        <Dropdown.Item eventKey="1">Schema</Dropdown.Item>*/}
                {/*        <Dropdown.Item eventKey="2">Indexes</Dropdown.Item>*/}
                {/*        <Dropdown.Divider/>*/}
                {/*        <Dropdown.Item eventKey="4">Stats</Dropdown.Item>*/}
                {/*    </DropdownButton>*/}
                {/*</Nav.Item>*/}
            </React.Fragment>
        );
    }
}
