import React from 'react';
import DefaultLayout from "../../layout/default";
import {Row} from "react-bootstrap";
import Sidebar from "../../ui-components/sidebar";
import MainContent from "../../ui-components/main-content";
import {VERTICES_EXAMPLE_DATA} from "../../../example-data/data";
import DataSidebarViewlet from "../../viewlets/data-management/data-sidebar";
import RemoteEngine from "../../layout/remote";


export default class DataView extends RemoteEngine {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            totalCount: 120312,
            // renderType: "table", // ["table", "list", "graph"]
            elementsData: VERTICES_EXAMPLE_DATA
        }

    }

    render() {
        console.log("this.props", this.props.location);
        return (<DefaultLayout {...this.props}>
                <Row>
                    <Sidebar>
                        <DataSidebarViewlet dataStore={this.dataStore}/>
                    </Sidebar>
                    <MainContent className={"main-content"}>
                    </MainContent>
                </Row>
            </DefaultLayout>
        )
    }

}
