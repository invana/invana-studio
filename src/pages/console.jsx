import React from "react";
import LeftNav from "../components/core/left-nav";
import HeaderNav from "../components/core/header-nav";
import MainContent from "../components/core/main-content";
import GremlinConnectorViewBase from "../components/core/gremlin-connector";
import {ConnectionStatus, CopyRightInfo} from "../components/visualizer/util-components";


const textAreaDiv = {
    "width": "calc(50% - 30px)",
    "float": "left",
    "height": "calc(100vh - 60px)"
}
const textAreaCls = {
    "width": "calc(100% - 30px)",
    "height": "calc(100% - 54px)",
    "background": "#212427",
    "border": "1px solid #2f2f2f",
    "resize": "none",
    "color": "#efefef",
    "padding": "15px",
    "fontSize": "16px"
}

const ResponseDiv = {
    "width": "50%",
    "height": "calc(100vh - 42px)",
    "float": "left",
    "padding": "15px",
    "overflow": "scroll"
}

const codeDiv = {
    "fontSize": "12px"
}

const submitButtonCls = {
    float: "right"
}
export default class ConsoleView extends GremlinConnectorViewBase {

    constructor(props) {
        super(props);
        this.state = {
            "title": "Console",
            "result": null
        }
    }

    onFormSubmit(e) {
        e.preventDefault();
        let query = e.target.query.value;
        if (query && this.ws) {
            this.queryGremlinServer(query, true);
        }
    }

    updateQueryInput(query) {
        document.querySelector('textarea').value = query;
    }

    processGremlinResponseEvent(event) {
        let _this = this;
        let response = JSON.parse(event.data);

        console.log("onmessage received", response);

        if (response.status.code) {
            _this.updateStatusMessage("Query Successfully Responded.");
            _this.setState({
                "errorMessage": null,
                result: JSON.stringify(response.result, null, 2)

            })


        } else {

            _this.setState({
                "errorMessage": JSON.stringify(response,),
                "showErrorMessage": true,
                "statusMessage": "Query Successfully Responded." +
                    " But returned non 200 status[" + response.status.code + "]"
            })
        }


    }

    render() {
        return (
            <div className="App">
                <LeftNav/>
                <MainContent>
                    <HeaderNav title={this.state.title}/>
                    <div>
                        <div style={textAreaDiv}>
                            <form style={{"height": "100%"}} action="" onSubmit={this.onFormSubmit.bind(this)}>
                               <textarea style={textAreaCls} name="query"
                                         id="" cols="30" rows="10">
                               </textarea>
                                <button style={submitButtonCls} type={"sumbit"}>Submit</button>

                            </form>

                        </div>
                        <div style={ResponseDiv}>
                            <pre style={codeDiv}>

                                {this.state.result}

                            </pre>
                        </div>

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

