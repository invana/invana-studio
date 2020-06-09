import React from "react";
import "./management.css";
import LeftNav from "../../components/core/left-nav";
import HeaderNav from "../../components/core/header-nav";
import MainContent from "../../components/core/main-content";
import GremlinConnectorViewBase from "../../components/core/gremlin-connector";
import {ConnectionStatus, CopyRightInfo} from "../../components/visualizer/util-components";
import GremlinResponseSerializers from "../../components/visualizer/gremlin-serializer";
import LoadingDiv from "../../components/core/loading";
import ManagementNav from "./nav";

export default class IndexesSettingsView extends GremlinConnectorViewBase {
    gremlin_serializer = new GremlinResponseSerializers();


    constructor(props) {
        super(props);
        this.state = {
            "title": "Indexes | Management",
            "links": []
        }
    }


    processGremlinResponseEvent(event) {
        let _this = this;
        let response = JSON.parse(event.data);
        console.log("onmessage received", response);
        if (response.status.code >= 200 || response.status.code < 300) {
            _this.updateStatusMessage("Query Successfully Responded.");
            // create Management data needed if necessary.
            let _type = null;
            if (response.result.data) {
                _type = response.result.data['@value'][0]['@type'];
            }

            if (_type === "g:List") {
                let linkStats = this.serializeStatsData(response.result.data);
                this.checkIfExistOrCreate(linkStats)
            } else if (_type === "g:Vertex") {
                let serializedData = this.serializeManagementVerticesData(response);
                _this.updateStatusMessage("Query Successfully Responded.");
                _this.setState({
                    "errorMessage": null,
                    links: serializedData
                })
            }
        } else {

            _this.setState({
                "errorMessage": JSON.stringify(response,),
                "showErrorMessage": true,
                "statusMessage": "Query Successfully Responded." +
                    " But returned non 200 status[" + response.status.code + "]"
            })
        }
    }

    getIndexesData() {
        this.queryGremlinServer("links=g.E().label().groupCount().toList(); [ links]", false)
    }

    componentDidMount() {
        super.componentDidMount.apply(this);
    }


    render() {
        return (
            <div className="App">

                <LeftNav/>
                <MainContent>
                    <HeaderNav title={this.state.title}/>
                    <div className="" style={{"padding": "15px"}}>
                        <ManagementNav/>
                        <hr/>
                        <p>This view will be updated soon.</p>

                    </div>
                    <ConnectionStatus
                        statusMessage={this.state.statusMessage}
                        isConnected2Server={this.state.isConnected2Server}
                        showErrorMessage={this.state.showErrorMessage}
                        errorMessage={this.state.errorMessage}
                        closeErrorMessage={this.closeErrorMessage.bind(this)}

                    />
                    <CopyRightInfo/>
                    <LoadingDiv loadingMessage={"Loading"} showLoading={this.state.showLoading}/>

                </MainContent>

            </div>
        );
    }


}

