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
import { Content, FlexboxGrid, Panel, Form, ButtonToolbar, Button, Row, Col  } from 'rsuite';
import { STUDIO_CONNECT_CONSTANTS, STUDIO_ROUTES, STUDIO_SETTINGS } from "../../settings";
import { setDataToLocalStorage } from "../../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import DefaultLayout from '../../components/layout/layout';


const ConnectView = () => {
    const [invanaEngineUrl, setInvanaEngineUrl] = React.useState("http://localhost:8200");
    const connect = () => {
        // TODO - validate url for connectivity
        window.location.href = STUDIO_ROUTES.HOME;
        setDataToLocalStorage(STUDIO_CONNECT_CONSTANTS.INVANA_ENGINE_URL, invanaEngineUrl)
    }
    return (
        <DefaultLayout>
            <Content style={{ "paddingTop": "16%" }}>
                <FlexboxGrid justify="center">
                    <FlexboxGrid.Item colspan={7}>
                        <Panel shaded bordered>
                            <Row >
                                <Col  xs={4}><FontAwesomeIcon icon={faUserAstronaut} style={{fontSize: 56}} /> </Col>
                                <Col>
                                    <h3>Invana Studio</h3>
                                    <p style={{ "marginBottom": "40px" }}>Connecting the data for finding problems and solutions</p>
                                </Col>
                            </Row>
                            <Form fluid >
                                <Form.Group>
                                    <Form.ControlLabel style={{ fontWeight: "bold" }}>Invana Engine URL</Form.ControlLabel>
                                    <Form.Control type={"url"} name="invanaEngineUrl" value={invanaEngineUrl}
                                        onChange={(d: any) => setInvanaEngineUrl(d)} />
                                </Form.Group>
                                <Form.Group>
                                    <ButtonToolbar>
                                        <Button appearance="primary" onClick={connect} size={"sm"}>Connect</Button>
                                        <Button appearance="link" target="_blank" href={STUDIO_SETTINGS.HELP_LINK}>Help?</Button>
                                    </ButtonToolbar>
                                </Form.Group>
                            </Form>
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </DefaultLayout>

    );
};

export default ConnectView;