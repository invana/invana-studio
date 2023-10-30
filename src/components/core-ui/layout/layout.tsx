import React from 'react';
import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import NavToggle from '../nav/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faBezierCurve, faCompass } from '@fortawesome/free-solid-svg-icons'
import { Bezier } from 'react-bootstrap-icons';
import { ArrowRight } from 'react-bootstrap-icons';
import { FontAwesomeIconRenderer } from '../icons/icons';
import DefaultLayoutSidebar from '../sidebar/sidebar';


const DefaultLayout = ({ children }: { children: any }) => {
  const [expand, setExpand] = React.useState(false);
  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <DefaultLayoutSidebar expand={expand} />

        <Container>
          {/* <Header> */}
          {/* <h2>Page Title</h2> */}
          {/* </Header> */}
          <Content>{children}</Content>
        </Container>
      </Container>
    </div>
  );
};


export default DefaultLayout;