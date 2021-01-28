import React from "react";
import LabelDetailViewBase from "./base";
import DefaultLayout from "../../layout/default";
import {Row} from "react-bootstrap";
import Sidebar from "../../ui-components/sidebar";
import DataSidebarViewlet from "../../viewlets/data-management/data-sidebar";
import MainContent from "../../ui-components/main-content";
import LabelDetailHeader from "./includes/header";
// import LabelEntriesPagination from "./includes/pagination";
import Col from "react-bootstrap/Col";
import Page404Viewlet from "../page-404/page-404-viewlet";
import SchemaViewlet from "../../viewlets/vertex/schema";
import RelationshipsViewlet from "../../viewlets/vertex/relationships";
import SettingsViewlet from "../../viewlets/vertex/settings";
import IndexesViewlet from "../../viewlets/vertex/indexes";
import ReadListVertexViewlet from "../../viewlets/vertex/read-list";


export default class LabelDetailView extends LabelDetailViewBase {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,


            // renderType: "table", // ["table", "list", "graph"]

        }
    }


    renderViewTypeMainContent() {
        switch (this.state.viewType) {
            case 'entries':
                return <ReadListVertexViewlet {...this.props} dataStore={this.dataStore}/>;
            case 'schema':
                return <SchemaViewlet/>;
            case 'relationships':
                return <RelationshipsViewlet/>;
            case 'settings':
                return <SettingsViewlet/>;
            case 'indexes':
                return <IndexesViewlet/>;
            // case '4':
            //     return <ComponentFour/>;
            default:
                return <Page404Viewlet {...this.props}/>
        }

    }

    // renderViewTypeMenuContent() {
    //
    //
    //     switch (this.state.viewType) {
    //         case 'entries':
    //             return <LabelEntriesPagination
    //                 makeQuery={this.makeQuery.bind(this)}
    //                 connector={this.connector}
    //                 dataStore={this.dataStore}
    //                 {...this.state} {...this.props} />
    //         case 'schema':
    //             return <React.Fragment/>;
    //         case 'relationships':
    //             return <React.Fragment/>;
    //         case 'settings':
    //             return <React.Fragment/>;
    //         case 'indexes':
    //             return <React.Fragment/>;
    //         // case '4':
    //         //     return <ComponentFour/>;
    //         default:
    //             return <React.Fragment/>
    //     }
    //
    // }

    onItemClick(labelName, labelType) {
        window.location.href = "/data/" + labelType + "/" + labelName;
    }

    render() {
        return (<DefaultLayout {...this.props}>
                <Row>
                    <Sidebar>
                        <DataSidebarViewlet
                            onItemClick={this.onItemClick.bind(this)}

                            parentRemoteComponent={this}/>
                    </Sidebar>
                    <MainContent className={"main-content"}>
                        <LabelDetailHeader
                            {...this.state} {...this.props}
                            dataStore={this.dataStore}
                            // dynamicComponent={
                            //     this.renderViewTypeMenuContent()
                            // }
                        />
                        <Row>
                            <Col size={"12"} className={"p-2"}>
                                {this.renderViewTypeMainContent()}
                            </Col>
                        </Row>
                    </MainContent>
                </Row>

            </DefaultLayout>
        )
    }

}
