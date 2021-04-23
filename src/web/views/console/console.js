import React from "react";
import "./console.scss";
import RawResponsesCanvas from "../../viewlets/raw-response/raw-response";
import {STUDIO_SETTINGS} from "../../../settings";
import {Form} from "react-bootstrap";
import DefaultLayout from "../../layout/default";
import RoutableRemoteEngine from "../../layout/routable-remote";

export default class ConsoleView extends RoutableRemoteEngine{

    constructor(props) {
        super(props);
        this.state = {
            responses: []
        }
        let _this = this;
        const gremlinUrl = this.getGremlinUrl();
        this.socket = new WebSocket(gremlinUrl);

        this.socket.onopen = function (e) {
            console.log(e)
            console.log("[open] Connection established");
            console.log("Sending to server");
            // _this.socket.send("My name is John");
        };

        this.socket.onmessage = function (event) {
            console.log(`[message] Data received from server: ${event.data}`);
            let responses = _this.state.responses;
            responses.push(JSON.parse(event.data))
            _this.setState({responses: responses});
        };

        this.socket.onclose = function (event) {
            if (event.wasClean) {
                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                console.log('[close] Connection died');
            }
        };

        this.socket.onerror = function (error) {
            alert(`[error] ${error.message}`);
        };
    }

    componentDidMount() {

    }

    getGremlinUrl() {
        const __url = new URL(STUDIO_SETTINGS.CONNECTION_URL);
        return ((__url.protocol === "http:") ? 'ws' : 'wss') + "://" + __url.host + "/gremlin";
    }

    onFormSubmit(e) {
        console.log("onFormSubmit", e);
        e.preventDefault();
        const queryString = e.target.queryString.value;
        console.log("====queryString", queryString);
        this.socket.send(JSON.stringify({"gremlin": queryString}));
    }

    // g.V().limit(5).toList()

    render() {
        return (
            <DefaultLayout {...this.props}>

                <div className="row">
                    <div className="col-md-6" style={{"paddingLeft": "1rem !important"}}>
                        {/*<div className="pl-3 pr-0 pt-0 pb-0">*/}
                        <div className="p-3">
                            <Form onSubmit={this.onFormSubmit.bind(this)}>
                                <h6 className={"pb-2 border-bottom"}>Query Console</h6>
                                <textarea className={"form-control rounded-0"} name="queryString"
                                          placeholder={"g.V().limit(5).toList()"}
                                          rows="10"/>
                                <button type={"submit"} className={"btn btn-primary mt-2"}>Start Query</button>
                            </Form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div id="consoleResultDiv" className={"p-3 border-left"}>
                            <h6 className={"pb-2 border-bottom"}>Responses</h6>
                            {
                                this.state.responses.map((response, key) => {
                                    console.log("++++=====response", response);
                                    return <RawResponsesCanvas
                                        key={key}
                                        response={response}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        )
    }
}