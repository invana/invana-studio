import React from "react";
import {Col} from "react-bootstrap";
import DefaultLayout from "../layouts/default";

export default class DataManagementView extends React.Component {


    render() {
        return (
<DefaultLayout {...this.props}>
                    <Col className={"p-3"}>
                        <h1>Hello data management Here</h1>
                    </Col>

            </DefaultLayout>
        );
    }
}
