import { Content, Nav, Navbar, Row, Col, Divider } from 'rsuite';
import * as BsIcon from "react-bootstrap-icons"
import React from 'react';


const DefaultHeader = ({canvasMenu }: {canvasMenu?: any}) => {
    return <Navbar>
        {/* <Navbar.Brand href="#">RSUITE</Navbar.Brand> */}
        <Row gutter={0}>
            <Col xs={6}>
                <Nav  >
                    <Nav.Item ><h4>twitter-data</h4></Nav.Item>
                </Nav>
            </Col>
            <Col xs={18}>
                {canvasMenu}
                <Nav pullRight>
                    <Nav.Item icon={<BsIcon.Sliders2Vertical />}></Nav.Item>
                </Nav>
            </Col>
        </Row>
    </Navbar>
}


export default DefaultHeader