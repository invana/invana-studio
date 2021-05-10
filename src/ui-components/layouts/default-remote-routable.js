import DefaultRemoteComponent from "./default-remote";
import React from "react";
import {Container} from "react-bootstrap";

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

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
        };
        // this.child = React.createRef();
    }


    routeToExplorer() {
        return this.setRedirectToRoute("/explorer");
    }

    setRedirectToRoute(routeString) {
        console.log("setRedirectToRoute", routeString);
        this.props.history.push(routeString);
    }

    routeToConnect(transporterStatusCode) {
        const url = "/connect?error=Failed to connect&transporterStatus=" + transporterStatusCode;
        this.setRedirectToRoute(url);
    }


    render() {
        return (
            <Container fluid>
                {this.props.children}
            </Container>
        )
    }
}