import React from "react";
import PropTypes from "prop-types";
import RemoteEngine from "./remote";
import {Container} from "react-bootstrap";
import ModalContainer from "../viewlets/modal-container";
import SettingsComponent from "../viewlets/settings";
import DefaultLayout from "./default";

export default class RoutableRemoteEngine extends RemoteEngine {

    static propTypes = {
        children: PropTypes.any,
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            leftContentName: null,
            modalContentName: null,
        };
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


    setLeftContentName(contentName) {
        this.setState({leftContentName: contentName});
    }

    setModalContentName(contentName) {
        this.setState({modalContentName: contentName});
    }


    render() {
        const _this = this;
        return (
            <Container fluid>
                {this.props.children}
                {
                    this.state.modalContentName === "settings"
                        ? <ModalContainer>
                            <SettingsComponent
                                setModalContentName={this.setModalContentName.bind(this)}
                                onClose={() => {
                                    _this.setModalContentName(null)
                                }}
                            />
                        </ModalContainer>

                        : <React.Fragment></React.Fragment>
                }
            </Container>
        )
    }
}
