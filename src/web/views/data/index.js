import React from 'react';
import DefaultLayout from "../../layout/default";
import {Form, FormControl, InputGroup, Nav, Row} from "react-bootstrap";
import Sidebar from "../../ui-components/sidebar";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronLeft, faChevronRight,
    faCircle, faEllipsisV,
    faList,
    faPlus, faProjectDiagram,
    faTable,
} from "@fortawesome/free-solid-svg-icons";
import MainContent from "../../ui-components/main-content";
import MenuComponent from "../../ui-components/menu";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {VERTICES_EXAMPLE_DATA} from "../../../example-data/data";
import TableInterface from "../../interface/tables";
import DataSidebarViewlet from "../../viewlets/data-management/data-sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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
