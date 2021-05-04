import React from "react";
import {Row, Col} from "react-bootstrap";
import DefaultLayout from "../ui-components/layout/default-layout";

export default class IndexView extends React.Component {


    render() {


        return (
            <DefaultLayout>

                <Col col={2}>
                    <h1>Index View</h1>
                </Col>

            </DefaultLayout>
        );
    }
}