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


import {Header, Nav, Navbar, Dropdown} from "rsuite";
import ProjectIcon from "@rsuite/icons/Project";
import GearIcon from "@rsuite/icons/Gear";
import ExploreIcon from "@rsuite/icons/Explore";
// import CodeIcon from '@rsuite/icons/Code';
import React from "react";
// import HistoryIcon from '@rsuite/icons/History';
import ScatterIcon from '@rsuite/icons/Scatter';
import {HelpOutline} from "@rsuite/icons";
import {STUDIO_ROUTES} from "../../settings";
import "./header.scss";


const StudioHeader = () => {

    return (
        <Header className={"top-header"}>
            <Navbar appearance="inverse">
                <Navbar.Header>
                    <a className="navbar-brand logo" href={STUDIO_ROUTES.HOME} style={{
                        padding: 8,
                        fontSize: 24,
                        fontWeight: 'bold',
                        width: 220,
                        // height: 56,

                        color: ' #fff',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        display: 'block',
                        borderRight: '1px solid #efefef'
                    }}>Invana Studio</a>
                </Navbar.Header>
                <Navbar.Body>
                    <Nav>
                        {/*<Nav.Item icon={<ProjectIcon/>}>Projects</Nav.Item>*/}
                        {/*<Nav.Item icon={<ExploreIcon/>}>Marketplace</Nav.Item>*/}
                        <Nav.Item href={"/explorer"} icon={<ExploreIcon/>}>Explorer</Nav.Item>
                        <Nav.Item href={"/modeller"} icon={<ScatterIcon/>}>Modeller</Nav.Item>

                        {/*<Nav.Item href={"/graphql"} icon={<CodeIcon/>}>GraphQL API</Nav.Item>*/}
                        {/*<Nav.Item icon={<HistoryIcon/>}>History</Nav.Item>*/}
                        {/*<Nav.Item icon={<HistoryIcon/>}>Functions</Nav.Item>*/}
                        {/*<Nav.Item icon={<HistoryIcon/>}>Views</Nav.Item>*/}

                    </Nav>
                    <Nav pullRight>
                        <Nav.Item href={"/settings"} icon={<GearIcon/>}></Nav.Item>
                    </Nav>
                    <Nav pullRight>
                        <Nav.Item target={"_blank"} href={"https://docs.invana.io"} icon={<HelpOutline/>}></Nav.Item>
                    </Nav>
                    <Nav pullRight>

                        <Dropdown icon={<ProjectIcon/>} title="publisher-knowledge-modelling">
                            <Dropdown.Item>publisher-knowledge-modelling</Dropdown.Item>
                            <Dropdown.Item>publisher-knowledge-modelling-2</Dropdown.Item>
                            <Dropdown.Item>publisher-knowledge-modelling-3</Dropdown.Item>
                        </Dropdown>
                    </Nav>

                </Navbar.Body>
            </Navbar>
        </Header>
    )
}

export default StudioHeader;