import LabelDetailViewBase from "./base";
import DefaultLayout from "../../layout/default";
import {Row} from "react-bootstrap";
import Sidebar from "../../ui-components/sidebar";
import DataSidebarViewlet from "../../viewlets/data-management/data-sidebar";
import MainContent from "../../ui-components/main-content";
import LabelDetailHeader from "./includes/header";
import LabelEntriesPagination from "./includes/pagination";
import Col from "react-bootstrap/Col";
import TableInterface from "../../interface/tables";
import React from "react";
import Page404View from "../page-404/page-404";
import Page404Viewlet from "../page-404/page-404-viewlet";
import SchemaViewlet from "../../viewlets/vertex/schema";
import RelationshipsViewlet from "../../viewlets/vertex/relationships";
import SettingsViewlet from "../../viewlets/vertex/settings";
import IndexesViewlet from "../../viewlets/vertex/indexes";


export default class LabelDetailView extends LabelDetailViewBase {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,


            // renderType: "table", // ["table", "list", "graph"]
            elementsData: [],

        }
    }


    componentDidMount() {
        console.log("====== this.connector", this.connector.requestBuilder);
        const showVerticesQuery = this.connector.requestBuilder.filterVertices(this.state.labelName,
            this.state.pageSize, 0);
        const queryPayload = this.connector.requestBuilder.combineQueries(showVerticesQuery, null)
        this.makeQuery(queryPayload);
    }

    processResponse(response) {
        const lastResponse = response.getResponseResult();
        console.log("lastResponse", lastResponse)
        if (lastResponse) {
            this.setState({
                elementsData: response.getResponseResult(
                    this.connector.requestBuilder.filterVertices().queryKey
                )
            })
        }
    }

    renderViewTypeComponent() {
        switch (this.state.viewType) {
            case 'entries':
                return this.state.elementsData.length > 0
                    ? <TableInterface
                        elementsData={this.state.elementsData}
                        elementsType={this.state.labelType}
                        showLabel={false}/>
                    : <p className={"text-muted mt-5"}>No data exist for this Label.</p>

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

    render() {
        return (<DefaultLayout {...this.props}>
                <Row>
                    <Sidebar>
                        <DataSidebarViewlet parentRemoteComponent={this}/>
                    </Sidebar>
                    <MainContent className={"main-content"}>
                        <LabelDetailHeader
                            {...this.state} {...this.props}
                            dataStore={this.dataStore}
                            dynamicComponent={
                                <LabelEntriesPagination
                                    makeQuery={this.makeQuery.bind(this)}
                                    connector={this.connector}
                                    dataStore={this.dataStore}
                                    {...this.state} {...this.props} />}
                        />
                        <Row>
                            <Col size={"12"} className={"p-2"}>
                                {this.renderViewTypeComponent()}
                            </Col>
                        </Row>
                    </MainContent>
                </Row>

            </DefaultLayout>
        )
    }

}
