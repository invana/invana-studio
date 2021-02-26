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
            noVerticesExist: null
            // renderType: "table", // ["table", "list", "graph"]
            // elementsData: VERTICES_EXAMPLE_DATA,
        }

        this.child = React.createRef();

    }

    onItemClick(labelName, labelType) {
        this.child.current.setRedirectToRoute("/data/" + labelType + "/" + labelName);
        // window.location.href= "/data/" + labelType + "/" + labelName;
    }

    onSideBarLoadedCallBack(verticesStats) {
        console.log("verticesStats", verticesStats)
        if (verticesStats.length > 0) {
            this.setRedirectToRoute("/data/vertex/" + verticesStats[0].label);

        } else {
            this.setState({noVerticesExist: true});
        }
    }

    render() {
        return (<DefaultLayout {...this.props}
                               ref={this.child}
                               setModalContentName={this.setModalContentName.bind(this)}>
                {super.render()}
                <Row>
                    <Sidebar>
                        <DataSidebarViewlet
                            onItemClick={this.onItemClick.bind(this)}
                            dataStore={this.dataStore}
                            onSideBarLoadedCallBack={this.onSideBarLoadedCallBack.bind(this)}
                        />
                    </Sidebar>
                    <MainContent className={"main-content"}>
                        {
                            this.state.noVerticesExist === true
                                ? <p className={"text-muted mt-5"}>No Data Exist</p>
                                : <React.Fragment/>
                        }
                    </MainContent>
                </Row>
            </DefaultLayout>
        )
    }

}
