import React from "react";
import {Row, Col} from "react-bootstrap";
import DefaultLayout from "../ui-components/layout/default-layout";

export default class DataManagementView extends React.Component {


    render() {
        return (
            <DefaultLayout>

                    <Col className={"p-3"}>
                        <h1>Hello data management Here</h1>
                    </Col>

            </DefaultLayout>
        );
    }
}