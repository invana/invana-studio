import React from "react";
import LeftNav from "../components/core/left-nav";
import HeaderNav from "../components/core/header-nav";
import MainContent from "../components/core/main-content";
import GremlinConnectorViewBase from "../components/core/gremlin-connector";
import {ConnectionStatus, CopyRightInfo} from "../components/visualizer/util-components";



export default class HistoryView extends GremlinConnectorViewBase {

    constructor(props) {
        super(props);
        this.state = {
            "title": "History",
            "result": null
        }
    }





    render() {
        return (
            <div className="App">
                <LeftNav/>
                <MainContent>
                    <HeaderNav title={this.state.title}/>
                    <div>
                        <p style={{"padding": "10px"}}>Not yet Implemented</p>

                    </div>
                    <ConnectionStatus
                        statusMessage={this.state.statusMessage}
                        isConnected2Server={this.state.isConnected2Server}
                        showErrorMessage={this.state.showErrorMessage}
                        errorMessage={this.state.errorMessage}
                        closeErrorMessage={this.closeErrorMessage.bind(this)}
                    />
                    <CopyRightInfo/>
                </MainContent>
            </div>
        );
    }


}

