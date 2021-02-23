import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faPlus} from "@fortawesome/free-solid-svg-icons";
import BlankLayout from "./blank";
import NavDropdown from "react-bootstrap/NavDropdown";
import {NavLink, Redirect} from "react-router-dom";


export default class DefaultLayout extends React.Component {


    // static propTypes = {
    //     children: PropTypes.any,
    //     leftSideNav: PropTypes.any,
    //
    //     primaryNav: PropTypes.any,
    //     secondaryNav: PropTypes.any,
    // };

    // static defaultProp = {
    //     connectionUrl: STUDIO_SETTINGS.CONNECTION_URL
    // }
    constructor(props) {
        super(props);
        this.state = {
            routeToRedirect: null
        }
        let shallRedirectToConnect = this.redirectForConnectionUrlIfNeeded(this.props.connectionUrl);
        console.log("shallRedirectToConnect", shallRedirectToConnect);
        if (shallRedirectToConnect === true) {
            this.routeToConnect();
        } else {
            // const protocol = this.getProtocol();
            // console.log("We will be using " + protocol + " protocol");
            // return shallConnect;
        }
    }

    routeToExplorer() {
        return this.setRedirectToRoute("/explorer");
    }

    setRedirectToRoute(routeString) {
        console.log("setRedirectToRoute", routeString);
        // this.setState({routeToRedirect: routeString});
        this.props.history.push(routeString);
    }

    routeToConnect(transporterStatusCode) {
        const url = "/connect?error=Failed to connect&transporterStatus=" + transporterStatusCode;
        this.setRedirectToRoute(url);
    }


    redirectForConnectionUrlIfNeeded(connectionUrl) {
        console.log("redirectForConnectionUrlIfNeeded", connectionUrl);
        const u = new URL(window.location.href)
        if (u.pathname === "/connect") {
            return false; // ignore redirection
        }
        return !connectionUrl;

    }


    render() {

        if (this.state.routeToRedirect) {
            return (<Redirect push to={this.state.routeToRedirect}/>)
        }
        return (
            <BlankLayout>
                <Navbar
                    // bg="transparent"
                    className={"border-bottom"} expand="lg">
                    <NavLink to="/" className={"ml-3 navbar-brand"}>Invana Studio</NavLink>
                    <Nav className="ml-auto">
                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link href="/connect"*/}
                        {/*              className={this.props.location.pathname === "/connect" ? "active" : ""}>*/}
                        {/*        Connect*/}
                        {/*    </Nav.Link>*/}
                        {/*</Nav.Item>*/}
                        <Nav.Item>
                            <NavDropdown title={<span> <FontAwesomeIcon icon={faPlus}/> New</span>}>
                                <NavDropdown.Item href="#action/3.1">Vertex Label</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Edge Label</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Function</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>

                        </Nav.Item>
                        {this.props.setShowQueryConsole ? <Nav.Item>
                            <input type="text" placeholder={"Search (Ctrl + / )"}
                                   onFocus={() => {
                                       this.props.setShowQueryConsole(true)
                                   }}
                                   className={"form-control form-control-sm mt-1"}/>
                        </Nav.Item> : <React.Fragment/>}
                        <Nav.Item>
                            <NavLink to="/explorer" className={"nav-link"} activeClassName="active">Explorer</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="/data" className={"nav-link"} activeClassName="active">Data</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="/settings" className={"nav-link"} activeClassName="active"><FontAwesomeIcon
                                icon={faCog}/></NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                {this.props.children}
            </BlankLayout>
        )
    }
}
