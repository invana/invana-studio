import React from "react";
import {Nav, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import MenuComponent from "../../../ui-components/menu";
// import LabelMenu from "./secondary-menu";
import PropTypes from "prop-types";

export default class LabelDetailHeader extends React.Component {

    static propTypes = {
        dataStore: PropTypes.object,
        dynamicComponent: PropTypes.any,
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col size={"12"} className={"p-2 bg-light"}>
                        <MenuComponent className={"p-1"}>
                            <Nav className="mr-auto">
                                <Nav.Item>
                                    <h2 style={{"fontSize": "1.3rem"}}
                                        className={" mb-0 mr-3 mt-4"}><strong>{this.props.match.params.labelName}</strong></h2>
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
                                <Nav.Item>
                                        {/*{this.props.totalCount} entries*/}
                                </Nav.Item>
                            </Nav>
                        </MenuComponent>
                    </Col>
                </Row>
                <Row>
                    <Col size={"12"} className={"pr-2 bg-light"}>
                        <MenuComponent className={"p-1"}>
                            <Nav className="mr-auto">
                                {/*<LabelMenu {...this.props}  />*/}
                            </Nav>
                            <Nav className="ml-auto">
                                {
                                    this.props.dynamicComponent
                                        ? this.props.dynamicComponent
                                        : <React.Fragment/>
                                }
                            </Nav>
                        </MenuComponent>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}
