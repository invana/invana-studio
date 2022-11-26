import DefaultRemoteComponent from "./default-remote";
import React from "react";
import {Container} from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom"

export default class DefaultRemoteRoutableComponent extends DefaultRemoteComponent {

    /*
        export default class IndexView extends DefaultRemoteRoutableComponent{

            static defaultProps = {
                connectionUrl: STUDIO_SETTINGS.CONNECTION_URL,
            }

            constructor(props) {
                super(props);
                this.state = {
                    ...this.state,
                    ownStateVariable: null,
                }
            }

            componentDidMount() {
                super.componentDidMount(); // this will create the this.connector
            }

        }

    */
    // navigate = useNavigate();
    constructor(props) {
        super(props);
        this.state = {
            // redirectUrl: null,
            ...this.state,
        };
        // this.child = React.createRef();
    }


    routeToExplorer() {
        return this.setRedirectToRoute("/explorer");
    }

    setRedirectToRoute(routeString) {
        console.log("setRedirectToRoute", routeString);
        // this.setState({redirectUrl: routeString})
        const u  = new URL(location.href);
        const s = decodeURI(u.pathname + u.search)
        console.log("=====",routeString, s )
        if (routeString !== s){
           // window.location.href =  routeString;
        }

        // this.navigate(routeString);
    }

    routeToConnect(transporterStatusCode) {
        const url = "/connect?error=Failed to connect&transporterStatus=" + transporterStatusCode;
        this.setRedirectToRoute(url);
    }

    componentDidMount() {
        super.componentDidMount();
        if (!this.checkIfConnectionUrlIsValid()) {
            this.routeToConnect(0);
        }
    }


    render() {

        console.log("=====redirectUrl", this.state.redirectUrl)
        return (
            <Container fluid>
                {this.props.children}


            </Container>
        )
    }
}
