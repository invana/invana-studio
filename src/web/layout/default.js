import React from "react";
import BlankLayout from "./blank";
import { Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import Header from "../viewlets/header";


export default class DefaultLayout extends React.Component {


    static propTypes = {
        leftSideNav: PropTypes.any,

        primaryNav: PropTypes.any,
        secondaryNav: PropTypes.any,
        connectionUrl: PropTypes.string,
        history: PropTypes.object,
        setShowQueryConsole: PropTypes.func,
        setModalContentName: PropTypes.func,
        children : PropTypes.any
    };

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
                <Header
                    setShowQueryConsole={this.props.setShowQueryConsole}
                    setModalContentName={this.props.setModalContentName}
                />
                {this.props.children}
            </BlankLayout>
        )
    }
}
