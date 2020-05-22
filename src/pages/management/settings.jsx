import React from "react";
import "./management.css";
import LeftNav from "../../components/core/left-nav";
import HeaderNav from "../../components/core/header-nav";
import MainContent from "../../components/core/main-content";
import GremlinConnectorViewBase from "../../components/core/gremlin-connector";
import {ConnectionStatus, CopyRightInfo} from "../../components/visualizer/util-components";
import GremlinResponseSerializers from "../../components/visualizer/gremlin-serializer";
import LoadingDiv from "../../components/core/loading";

export default class ManagementSettingsView extends GremlinConnectorViewBase {
    gremlin_serializer = new GremlinResponseSerializers();


    constructor(props) {
        super(props);
        this.state = {
            "title": "Settings | Management",
            "links": []
        }
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
                        <ul className={"nav"}>
                            <li><a href="/management/nodes">Nodes</a></li>
                            <li><a href="/management/links">Links</a></li>
                            <li><a href="/management/settings">Settings</a></li>
                        </ul>
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
                    <LoadingDiv statusMessage={this.state.statusMessage}/>

                </MainContent>

            </div>
        );
    }


}

