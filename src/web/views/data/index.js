import React from 'react';
import DefaultLayout from "../../layout/default";
import {Row} from "react-bootstrap";
import Sidebar from "../../ui-components/sidebar";
import MainContent from "../../ui-components/main-content";
import DataSidebarViewlet from "../../viewlets/data-management/data-sidebar";
import RoutableRemoteEngine from "../../layout/routable-remote";


export default class DataView extends RoutableRemoteEngine {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            totalCount: "NA",
            // renderType: "table", // ["table", "list", "graph"]
            // elementsData: VERTICES_EXAMPLE_DATA
        }

        this.child = React.createRef();

    }

    onItemClick(labelName, labelType) {
        this.child.current.setRedirectToRoute("/data/" + labelType + "/" + labelName);
        // window.location.href= "/data/" + labelType + "/" + labelName;
    }

    render() {
        console.log("this.props", this.props.location);
        return (<DefaultLayout {...this.props}  ref={this.child}>
                <Row>
                    <Sidebar>
                        <DataSidebarViewlet
                            onItemClick={this.onItemClick.bind(this)}
                            dataStore={this.dataStore}/>
                    </Sidebar>
                    <MainContent className={"main-content"}>
                    </MainContent>
                </Row>
            </DefaultLayout>
        )
    }

}
