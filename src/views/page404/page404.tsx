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
import {Container, Header, Content, Row, Col} from 'rsuite';
import StudioHeader from "../../layouts/header/header";
import StudioLeftNavSidebar from "../../layouts/sidebar-nav/sidebar-nav";
import {useLocation} from "react-router-dom";

const Page404 = () => {
    const [expand, setExpand] = React.useState(false);
    let location = useLocation();

    return (
        <div className="show-container">
            <Container>
                <StudioHeader/>
            </Container>
            <Container>
                <StudioLeftNavSidebar expand={expand} setExpand={setExpand}/>

                <Container>
                    <Row>
                        <Col>
                            <Header>
                                <h2>404:Page not found</h2>
                            </Header>
                            <Content><p>No match for <code>{location.pathname}</code></p></Content>

                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    );
};

export default Page404;