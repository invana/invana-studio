import React from "react";
import {Form, FormControl, InputGroup, Nav} from "react-bootstrap";
import MenuComponent from "../../ui-components/menu";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from "prop-types";
import {DataEdgeManagement, DataVertexManagement} from "./sidebar-list";


export default class DataSidebarViewlet extends React.Component {

    static propTypes = {
        dataStore: PropTypes.object,
    }
     state = {

        }
    constructor() {
        super();

    }

    render() {
        const exampleVerticesCount = [...Array(10).keys()];

        return (
            <div>
                <Form className={"mb-1 mt-2"}>
                    <InputGroup>
                        <FormControl
                            className={"mt-0 ml-3 mr-3"} size={"sm"}
                            placeholder="Search nodes and edges ..."/>
                    </InputGroup>
                </Form>
                <MenuComponent className={"pb-2 mt-2"}>
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Button variant="link" className={"ml-2 align-middle"} size={"sm"}>
                                <strong>12</strong> Vertices
                            </Button>
                        </Nav.Item>
                        <Nav.Item>
                            <Button variant="link" className={"ml-1 align-middle"} size={"sm"}>
                                <strong>17</strong> Edges
                            </Button>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ml-auto">
                    </Nav>
                </MenuComponent>

                <DataVertexManagement dataStore={this.props.dataStore}/>
                <DataEdgeManagement dataStore={this.props.dataStore}/>
            </div>
        )
    }

}
