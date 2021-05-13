import React from "react";
import {Col} from "react-bootstrap";
import DefaultLayout from "../layouts/default";
import DefaultRemoteRoutableComponent from "../layouts/default-remote-routable";

export default class SettingsView extends DefaultRemoteRoutableComponent {


    render() {
        return (
            <DefaultLayout {...this.props}>

                <Col className={"p-3"}>
                    <h1>Hello settings Here</h1>
                </Col>

            </DefaultLayout>
        );
    }
}
