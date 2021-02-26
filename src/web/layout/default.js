import React from "react";
import {Button, FormControl, InputGroup, Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCog} from "@fortawesome/free-solid-svg-icons";
import BlankLayout from "./blank";
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
                    <NavLink to="/" className={"pl-3 navbar-brand"}>Invana Studio</NavLink>
                    <Nav className="mr-auto">
                        {
                            this.props.setShowQueryConsole ? <React.Fragment>
                                    {/*<Nav.Item className={"pl-2 pt-1"}>*/}
                                    {/*    <input type="text" placeholder={"Search (Ctrl + / )"}*/}
                                    {/*           onFocus={() => {*/}
                                    {/*               this.props.setShowQueryConsole(true)*/}
                                    {/*           }}*/}
                                    {/*        // style={{"width": "600px",}}*/}
                                    {/*           className={"form-control form-control-sm "}/>*/}

                                    {/*</Nav.Item>*/}
                                    {/*<Nav.Item className={"pl-2 pt-1"}>*/}
                                    {/*    <Button variant={"bg-link"} className={"pl-1 pr-1"} size={"md"} type={"button"}>*/}
                                    {/*        <FontAwesomeIcon icon={faPlay}/>*/}
                                    {/*    </Button>*/}
                                    {/*</Nav.Item>*/}


                                    <Nav.Item className={"pt-1 pl-2"}>
                                        <InputGroup className={"nav-search"}>
                                            <FormControl placeholder="Start a Gremlin Query here  " size={"sm"}
                                                         onFocus={() => {
                                                             this.props.setShowQueryConsole(true)
                                                         }}
                                                         style={{"width": "400px",}}

                                            />
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary" size={"sm"}
                                                        onClick={() => {
                                                            this.props.setShowQueryConsole(true)
                                                        }}
                                                >
                                                    <FontAwesomeIcon icon={faAngleDown}/>
                                                </Button>
                                                {/*<Button variant="outline-secondary" size={"md"}>*/}
                                                {/*    <FontAwesomeIcon icon={faPlay}/>*/}
                                                {/*</Button>*/}
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Nav.Item>
                                    {/*<Nav.Item className={"ml-3 pt-2 mr-3"}>*/}
                                    {/*    |*/}
                                    {/*</Nav.Item>*/}
                                </React.Fragment>
                                : <React.Fragment/>
                        }


                    </Nav>
                    <Nav className="ml-auto">

                        <Nav.Item>
                            <NavLink to="/explorer" className={"nav-link"} activeClassName="active">Explorer</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="/data" className={"nav-link"} activeClassName="active">Data</NavLink>
                        </Nav.Item>


                        <Nav.Item onClick={() => this.props.setModalContentName("settings")}>
                            {/*<NavLink href={"#"} activeClassName="active">*/}
                            <span className={"nav-link"}>
                                <FontAwesomeIcon icon={faCog}/>
                            </span>
                            {/*</NavLink>*/}
                        </Nav.Item>

                        {/*<Nav.Item>*/}
                        {/*    <NavDropdown title={<span> <FontAwesomeIcon icon={faCog}/> New</span>}>*/}
                        {/*        <NavDropdown.Item href="#action/3.1">Vertex Label</NavDropdown.Item>*/}
                        {/*        <NavDropdown.Item href="#action/3.2">Edge Label</NavDropdown.Item>*/}
                        {/*        <NavDropdown.Item href="#action/3a.3">Function</NavDropdown.Item>*/}
                        {/*        <NavDropdown.Divider/>*/}
                        {/*        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                        {/*    </NavDropdown>*/}

                        {/*</Nav.Item>*/}
                    </Nav>
                </Navbar>
                {this.props.children}
            </BlankLayout>
        )
    }
}
