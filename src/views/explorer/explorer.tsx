/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *  
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import React from "react";
import { Content, Nav, Navbar, Row, Col, Divider } from 'rsuite';
import { STUDIO_CONNECT_CONSTANTS, STUDIO_ROUTES, STUDIO_SETTINGS } from "../../settings";
import { setDataToLocalStorage } from "../../utils";
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import DefaultLayout from '../../components/core-ui/layout/layout';
import * as BsIcon from "react-bootstrap-icons"
import { FlexboxGrid } from 'rsuite';


const ConnectView = () => {
    const [invanaEngineUrl, setInvanaEngineUrl] = React.useState("http://localhost:8200");
    const connect = () => {
        // TODO - validate url for connectivity
        window.location.href = STUDIO_ROUTES.HOME;
        setDataToLocalStorage(STUDIO_CONNECT_CONSTANTS.INVANA_ENGINE_URL, invanaEngineUrl)
    }
    return (
        <DefaultLayout>
            <Content >
                <Navbar>
                    {/* <Navbar.Brand href="#">RSUITE</Navbar.Brand> */}
                    <Row gutter={0}>
                        <Col xs={6}>
                            <Nav  >
                                <Nav.Item ><h4>twitter-data</h4></Nav.Item>
                            </Nav>
                        </Col>
                        <Col xs={18}>
                            <Nav justified appearance="default">
                                <Nav.Item icon={<BsIcon.ArrowLeft />} onClick={() => console.log("clicked")}></Nav.Item>
                                <Nav.Item icon={<BsIcon.ArrowClockwise />} onClick={() => console.log("clicked")}></Nav.Item>
                                <Nav.Item icon={<BsIcon.ArrowRight />} onClick={() => console.log("clicked")}></Nav.Item>
                                <Nav.Item as={'span'} ><Divider vertical /></Nav.Item>
                                <Nav.Item icon={<BsIcon.Search />} onClick={() => console.log("clicked")}></Nav.Item>
                                <Nav.Item icon={<BsIcon.Binoculars />} onClick={() => console.log("clicked")}></Nav.Item>
                                <Nav.Item icon={<BsIcon.Camera />} onClick={() => console.log("clicked")}></Nav.Item>
                                <Nav.Item icon={<BsIcon.Download />} onClick={() => console.log("clicked")}></Nav.Item>
                                <Nav.Item icon={<BsIcon.Cursor />} onClick={() => console.log("clicked")}></Nav.Item>
                                <Nav.Item icon={<BsIcon.Palette />} onClick={() => console.log("clicked")}></Nav.Item>
                                <Nav.Item as={'span'} ><Divider vertical /></Nav.Item>
                                <Nav.Item icon={<BsIcon.Trash />} onClick={() => console.log("clicked")}></Nav.Item>
                                <Nav.Item as={'span'} ><Divider vertical /></Nav.Item>
                                <Nav.Item icon={<BsIcon.Diagram3 />} onClick={() => console.log("clicked")}></Nav.Item>
                                <Nav.Item icon={<BsIcon.BoundingBoxCircles />} onClick={() => console.log("clicked")}></Nav.Item>

                            </Nav>
             
                            <Nav pullRight>
                                <Nav.Item icon={<BsIcon.Sliders2Vertical />}></Nav.Item>
                            </Nav>
                        </Col>
                    </Row>


                </Navbar>
            </Content>
        </DefaultLayout>

    );
};

export default ConnectView;