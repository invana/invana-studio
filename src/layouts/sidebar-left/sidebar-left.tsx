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


import React, {FC} from "react";
import {Nav, Navbar, Sidebar, Sidenav, Row, Grid} from "rsuite";
import DashboardIcon from '@rsuite/icons/Dashboard';
import PcIcon from '@rsuite/icons/Pc';
import ExploreIcon from "@rsuite/icons/Explore";
import ArrowLeftIcon from "@rsuite/icons/ArrowLeft";
import ArrowRightIcon from "@rsuite/icons/ArrowRight";
import GearIcon from "@rsuite/icons/Gear";
import Input from 'rsuite/Input';
import List from 'rsuite/List';
import Col from 'rsuite/Col';


interface StudioLeftSidebarProps {
// any other props that come into the component, you don't have to explicitly define children.
    expand: boolean,
    setExpand: React.Dispatch<React.SetStateAction<boolean>>
}

interface NavToggleProps {
// any other props that come into the component, you don't have to explicitly define children.
    expand: boolean,
    onChange: React.MouseEventHandler<HTMLButtonElement>
}

const NavToggle: FC<NavToggleProps> = ({expand, onChange}) => {
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            <Navbar.Body>
                <Nav pullRight>
                    <Nav.Item onClick={onChange} style={{width: 56, textAlign: 'center'}}>
                        {expand ? <ArrowLeftIcon/> : <ArrowRightIcon/>}
                    </Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
};

const data = ['Roses are red', 'Violets are blue', 'Sugar is sweet', 'And so are you'];


const StudioLeftSidebar: FC<StudioLeftSidebarProps> = ({expand, setExpand}) => {
    return (
        <Sidebar
            style={{display: 'flex', flexDirection: 'column'}}
            width={expand ? 220 : 56}
            collapsible
        >
            <Sidenav.Header>
                {/*<div style={{*/}
                {/*    padding: 18,*/}
                {/*    fontSize: 16,*/}
                {/*    height: 56,*/}
                {/*    // background: '#34c3ff',*/}
                {/*    // color: ' #fff',*/}
                {/*    whiteSpace: 'nowrap',*/}
                {/*    overflow: 'hidden'*/}
                {/*}}>*/}
                {/*    <ExploreIcon style={{fontSize: 20}}/>*/}
                {/*    <span style={{marginLeft: 12}}> BRAND</span>*/}
                {/*</div>*/}

                <Input placeholder="Search Node/Relationship labels"/>


            </Sidenav.Header>
            <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                <Sidenav.Body>
                    {/*<List>*/}
                    {/*    {data.map((item, index) => (*/}
                    {/*        <List.Item key={index} index={index}>*/}
                    {/*            {item}*/}
                    {/*        </List.Item>*/}
                    {/*    ))}*/}
                    {/*</List>*/}
                    <Nav>
                        <Nav.Item eventKey="1" active icon={<ExploreIcon/>}>
                            Dashboard
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<ExploreIcon/>}>
                            Graphs
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<ExploreIcon/>}>
                            Functions
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<ExploreIcon/>}>
                            Management
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<GearIcon/>}>
                            Settings
                        </Nav.Item>

                    </Nav>
                </Sidenav.Body>
            </Sidenav>
            <NavToggle expand={expand} onChange={() => setExpand(!expand)}/>
        </Sidebar>
    )
}

export default StudioLeftSidebar;