import { Sidebar, Sidenav, Nav } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faBezierCurve, faCompass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconRenderer } from '../icons/icons';
import {STUDIO_ROUTES} from "../../../settings";


const headerStyles = {
    // padding: 18,
    fontSize: 28,
    height: 55,
    background: 'green',
    color: ' #fff',
    // whiteSpace: 'nowrap',
    overflow: 'hidden'
  };

const DefaultLayoutSidebar = ({ expand }: { expand: boolean }) => {
    return <Sidebar
        className={'rs-sidebar'}
        style={{ display: 'flex', flexDirection: 'column' }}
        width={expand ? 260 : 56}
        collapsible
    >
        <Sidenav.Header>
            <div style={headerStyles}  >
                <a href="/">
                    <FontAwesomeIcon icon={faUserAstronaut} />
                    <div style={{ fontSize: 14, marginTop: -5 }}>Invana</div>
                </a>
            </div>
        </Sidenav.Header>
        <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
            <Sidenav.Body>
                <Nav>
                    <Nav.Item eventKey="1" href={STUDIO_ROUTES.EXPLORER} icon={<FontAwesomeIconRenderer icon={faCompass} />} >
                        Explorer
                    </Nav.Item>
                    <Nav.Item eventKey="2" href={STUDIO_ROUTES.MODELLER} active icon={<FontAwesomeIconRenderer icon={faBezierCurve} />}>
                        Modeller
                    </Nav.Item>
                </Nav>
            </Sidenav.Body>
        </Sidenav>
        {/* <NavToggle expand={expand} onChange={() => setExpand(!expand)} /> */}
    </Sidebar>

}

export default  DefaultLayoutSidebar