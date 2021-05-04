import React from "react";
import {Col} from "react-bootstrap";
import DefaultLayout from "../ui-components/layout/default-layout";

export default class Explorer extends React.Component {


    render() {


        return (
            <DefaultLayout>

                    <Col className={"p-3"}>
                      <h1>Hello Explorer Here</h1>
                    </Col>

            </DefaultLayout>
        );
    }
}
