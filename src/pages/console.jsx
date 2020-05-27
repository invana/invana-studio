import React from "react";
import LeftNav from "../components/core/left-nav";
import HeaderNav from "../components/core/header-nav";
import MainContent from "../components/core/main-content";
import GremlinConnectorViewBase from "../components/core/gremlin-connector";
import {ConnectionStatus, CopyRightInfo} from "../components/visualizer/util-components";
import ReactJson from 'react-json-view'


const textAreaDiv = {
    "width": "calc(50% - 30px)",
    "float": "left",
    "height": "calc(100vh - 60px)"
}
const textAreaCls = {
    "width": "calc(100% - 30px)",
    "height": "calc(100% - 84px)",
    "background": "#212427",
    "border": "1px solid #2f2f2f",
    "resize": "none",
    "color": "#efefef",
    "padding": "15px",
    "fontSize": "14px",
    fontFamily: "Courier"
}

const ResponseDiv = {
    "width": "50%",
    "height": "calc(100vh - 42px)",
    "float": "left",
    "padding": "15px",
    "overflow": "scroll"
}
const para = {
    margin: 0,
    width: "300px",
    fontSize: "12px",
    marginLeft: "10px"
}

const submitButtonCls = {
    float: "right",
    marginTop: "-15px"
}
export default class ConsoleView extends GremlinConnectorViewBase {

    constructor(props) {
        super(props);
        this.state = {
            "title": "Console",
            "result": {}
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && e.shiftKey) {
            document.querySelector('button[type="submit"]').click();
        }
    }

    onFormSubmit(e) {
        e.preventDefault();
        const query = e.target.query.value;
        if (query && this.ws) {
            this.queryGremlinServer(query, true);
        }
    }

    updateQueryInput(query) {
        document.querySelector('textarea').value = query;
    }

    processGremlinResponseEvent(event) {
        let _this = this;
        const response = JSON.parse(event.data);
        console.log("onmessage received", response);
        if (response.status.code) {
            _this.updateStatusMessage("Query Successfully Responded.");
            _this.setState({
                "errorMessage": null,
                result: response.result
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
                            <form style={{"height": "100%"}} action=""
                                  onSubmit={this.onFormSubmit.bind(this)}>
                               <textarea style={textAreaCls} name="query"
                                         onKeyUp={this.handleKeyPress}
                                         defaultValue={"g.V().limit(5).toList()"}
                                         id="" cols="30" rows="10">
                               </textarea>
                                <div>
                                    <p style={para}>Shift + Enter to submit. </p>
                                    <button style={submitButtonCls} type={"submit"}>Submit</button>

                                </div>
                            </form>
                        </div>
                        <div style={ResponseDiv}>


                            <ReactJson theme="monokai" style={{"backgroundColor": "transparent"}}
                                       src={this.state.result}></ReactJson>

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

