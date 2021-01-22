import React from "react";
import {Form, FormControl, InputGroup, Nav} from "react-bootstrap";
import MenuComponent from "../../ui-components/menu";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import {DataEdgeManagement, DataVertexManagement} from "./sidebar-list";
import RemoteEngine from "../../layout/remote";


export default class DataSidebarViewlet extends RemoteEngine {

    static propTypes = {
        parentRemoteComponent: PropTypes.object,
    }

    state = {
        verticesStats: [],
        edgeStats: []
    }

    processResponse(response) {
        const lastResponse = response.getResponseResult();
        if (lastResponse) {
            this.setState({
                verticesStats: response.getResponseResult(this.connector.requestBuilder.getVerticesLabelStats().queryKey),
                edgeStats: response.getResponseResult(this.connector.requestBuilder.getEdgesLabelStats().queryKey),
            })
        }
    }

    componentDidMount() {
        const verticesStateQuery = this.connector.requestBuilder.getVerticesLabelStats();
        const edgesStatsQuery = this.connector.requestBuilder.getEdgesLabelStats();
        const queryPayload = this.connector.requestBuilder.combineQueries(verticesStateQuery, edgesStatsQuery);
        this.makeQuery(queryPayload);
    }

    render() {
        // const exampleVerticesCount = [...Array(10).keys()];

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
                                <strong>{this.state.verticesStats.length}</strong> Vertices
                            </Button>
                        </Nav.Item>
                        <Nav.Item>
                            <Button variant="link" className={"ml-1 align-middle"} size={"sm"}>
                                <strong>{this.state.edgeStats.length}</strong> Edges
                            </Button>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ml-auto">
                    </Nav>
                </MenuComponent>

                <DataVertexManagement statsData={this.state.verticesStats}/>
                <DataEdgeManagement statsData={this.state.edgeStats}/>
            </div>
        )
    }

}
