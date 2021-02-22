import React from "react";
import PropTypes from "prop-types";
import RemoteEngine from "./remote";
import {Container} from "react-bootstrap";

export default class RoutableRemoteEngine extends RemoteEngine {

    static propTypes = {
        children: PropTypes.any,
    }

    constructor(props) {
        super(props);
        this.state = {...this.state};
        this.child = React.createRef();
    }

    routeToExplorer() {
        this.child.current.routeToExplorer();
    }

    routeToConnect(statusCode) {
        this.child.current.routeToConnect(statusCode);
    }

    setRedirectToRoute(url) {
        this.child.current.setRedirectToRoute(url);
    }


    render() {
        return (
            <Container fluid>{this.props.children}</Container>
        )
    }
}