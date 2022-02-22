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
import {Nav, Navbar, Sidebar, Sidenav} from "rsuite";
import ExploreIcon from "@rsuite/icons/Explore";
import ScatterIcon from '@rsuite/icons/Scatter';
import BranchIcon from '@rsuite/icons/Branch';
import ArrowLeftIcon from "@rsuite/icons/ArrowLeft";
import ArrowRightIcon from "@rsuite/icons/ArrowRight";
import GearIcon from "@rsuite/icons/Gear";
import {useLocation} from "react-router-dom";
import {STUDIO_ROUTES} from "../../settings";


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


const StudioLeftNavSidebar: FC<StudioLeftSidebarProps> = ({expand, setExpand}) => {
    // const [activeMenu, setActiveMenu] = React.useState(STUDIO_ROUTES.MODELLER);
    let location = useLocation();

    return (
        <Sidebar
            style={{display: 'flex', flexDirection: 'column'}}
            width={expand ? 220 : 56}
            collapsible
        >
            <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item href={STUDIO_ROUTES.MODELLER} eventKey="1"
                                  active={location.pathname === STUDIO_ROUTES.MODELLER}
                                  icon={<BranchIcon/>}> Modeller
                        </Nav.Item>
                        <Nav.Item href={STUDIO_ROUTES.EXPLORER} eventKey="2"
                                  active={location.pathname === STUDIO_ROUTES.EXPLORER}
                                  icon={<ScatterIcon/>}> Explorer
                        </Nav.Item>
                        <Nav.Item href={STUDIO_ROUTES.GRAPHQL} eventKey="3"
                                  active={location.pathname === STUDIO_ROUTES.GRAPHQL}
                                  icon={<ExploreIcon/>}> APIs
                        </Nav.Item>
                        {/*<Nav.Item href={"/functions"} eventKey="2" active={location.pathname === "/functions"} icon={<ExploreIcon/>}>*/}
                        {/*    Functions*/}
                        {/*</Nav.Item>*/}
                        <Nav.Item href={STUDIO_ROUTES.SETTINGS} eventKey="4"
                                  active={location.pathname === STUDIO_ROUTES.SETTINGS}
                                  icon={<GearIcon/>}> Settings
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
            <NavToggle expand={expand} onChange={() => setExpand(!expand)}/>
        </Sidebar>
    )
}

export default StudioLeftNavSidebar;