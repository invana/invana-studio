import React from 'react';
import { Container, Header, Sidebar, Sidenav, Content, Navbar, Nav } from 'rsuite';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import NavToggle from '../nav/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut,faBezierCurve,  faCompass } from '@fortawesome/free-solid-svg-icons'
import { Bezier } from 'react-bootstrap-icons';
import { ArrowRight } from 'react-bootstrap-icons';
import { FontAwesomeIconRenderer } from '../icons/icons';
 


const headerStyles = {
    // padding: 18,
    fontSize: 28,
    height: 55,
    background: 'green',
    color: ' #fff',
    // whiteSpace: 'nowrap',
    overflow: 'hidden'
  };

const DefaultLayout = ({children} : {children: any}) => {
    const [expand, setExpand] = React.useState(false);
    return (
      <div className="show-fake-browser sidebar-page">
        <Container>
          <Sidebar
            className={'rs-sidebar'}
            style={{ display: 'flex', flexDirection: 'column' }}
            width={expand ? 260 : 56}
            collapsible
          >
            <Sidenav.Header>
              <div  style={headerStyles}  >
                <a href="/">
                 <FontAwesomeIcon icon={faUserAstronaut} /> 
                 <div style={{fontSize: 14, marginTop: -5}}>Invana</div>
                 </a>
              </div>
            </Sidenav.Header>
            <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
              <Sidenav.Body>
                <Nav>
                                      {/*
// @ts-ignore */}
                  <Nav.Item eventKey="1" active icon={<FontAwesomeIconRenderer  icon={faCompass} />} >
                    Explorer
                  </Nav.Item>
                    {/*
// @ts-ignore */}
                  <Nav.Item eventKey="2" active icon={<FontAwesomeIconRenderer icon={ faBezierCurve} /> }>                    
                    Modeller 

                    
                  </Nav.Item>
           
              
                </Nav>
              </Sidenav.Body>
            </Sidenav>
            {/* <NavToggle expand={expand} onChange={() => setExpand(!expand)} /> */}
          </Sidebar>
  
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