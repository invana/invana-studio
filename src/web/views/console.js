import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import DefaultLayout from "../layouts/default";
import DefaultRemoteRoutableComponent from "../layouts/default-remote-routable";
import RawResponsesCanvas from "../viewlets/raw-response";
import {STUDIO_SETTINGS} from "../../settings";
import {faTerminal} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getDataFromLocalStorage, setDataToLocalStorage} from "../../utils/localStorage";
import {HISTORY_SETTINGS} from "../../settings/history";

export default class ConsoleView extends DefaultRemoteRoutableComponent {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            responses: []
        }
        const gremlinUrl = this.getGremlinUrl();

        this.socket = new WebSocket(gremlinUrl);

    }

    componentDidMount() {
        super.componentDidMount();
        this.setupSocket();
    }

    setupSocket() {
        let _this = this;

        this.socket.onopen = function (e) {
            console.log(e)
            console.log("[open] Connection established");
            console.log("Sending to server");
            _this.setState({isConnected2Gremlin: true});
            // _this.socket.send("My name is John");
        };

        this.socket.onmessage = function (event) {
            // console.log(`[message] Data received from server: ${event.data}`);
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
            _this.setState({isConnected2Gremlin: false})
        };

        this.socket.onerror = function (error) {
            alert(`[error] ${error.message}`);
        };
    }


    getGremlinUrl() {
        const __url = new URL(STUDIO_SETTINGS.CONNECTION_URL);
        return ((__url.protocol === "http:") ? 'ws' : 'wss') + "://" + __url.host + "/gremlin";
    }

    onFormSubmit(_, e) {
        console.log("onFormSubmit", e);
        e.preventDefault();
        const queryString = e.target.canvasQueryString.value;
        console.log("====queryString", queryString);
        this.socket.send(JSON.stringify({"gremlin": queryString}));

        let queryObj = {
            query: queryString
        }
        this.addQueryToHistory(queryObj, "console")
    }


    onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === true) {
            e.preventDefault();
            e.stopPropagation();
            this.formRef.dispatchEvent(new Event('submit'));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        if (this.state.canvasQueryString !== prevState.canvasQueryString) {
            console.log("this.props.query", this.state.canvasQueryString)
            const canvasQueryString = this.state.canvasQueryString.replace(/\\n/g, String.fromCharCode(13, 10))
            this.setState({canvasQueryString: canvasQueryString});
        }
    }

    onQueryChange(e) {
        this.setState({canvasQueryString: e.target.value});
    }


    render() {

        let responsesToRender = [...this.state.responses].reverse();
        return (
            <DefaultLayout>

                <Row className={"p-0 m-0"}>
                    <Col className={"p-3 m-0"} md={"5"}>

                        <div className={"border"}>

                            <div className={"display-block pt-2 pb-2 pl-3" +
                            " font-weight-bold pr-3 bg-dark text-white"}>
                                <FontAwesomeIcon icon={faTerminal}/> Gremlin Query Console
                            </div>
                            <form ref={e => this.formRef = e} id={"queryForm"}
                                  onSubmit={(e) => this.onFormSubmit(this, e)}>
                                <Form.Control as={"textarea"}
                                              autoComplete={"off"}
                                              className=" ml-0 pl-3 pr-3 flex-fill rounded-0 border-0"
                                              type={"text"}
                                              name={"canvasQueryString"}
                                              style={{"minHeight": "420px"}}
                                              placeholder="start your gremlin query here"
                                              spellCheck={false}
                                              autoFocus
                                              onChange={this.onQueryChange.bind(this)}
                                              onKeyDown={this.onEnterPress.bind(this)}
                                              value={this.state.canvasQueryString || ''}
                                />
                                <div className={"pl-3  pt-2 pb-2 pr-3 bg-white border-top"}>
                                    <Button variant={"outline-primary position-relative pt-0 pb-0"} size="sm"
                                            type={"submit"}>Submit Query</Button>

                                    {this.state.isQuerying ? <span>Querying</span> : <React.Fragment/>}

                                    === {this.state.isConnected2Gremlin} {this.state.isQuerying} ===
                                </div>
                            </form>
                        </div>

                    </Col>

                    <Col className={"pl-0 pt-3 m-0"} size={"4"} style={{"width": 0}}>
                        <div id="consoleResultDiv" className={"pl-3 border-left"}
                             style={{"minHeight": "120px"}}>
                            <h6 className={"pb-2 pt-2 border-bottom"}>Responses</h6>
                            {
                                responsesToRender.map((response, key) => {
                                    console.log("++++=====response", response);
                                    return <RawResponsesCanvas
                                        key={key}
                                        response={response}/>
                                })
                            }
                            <div className="clearfix"/>
                        </div>
                    </Col>
                </Row>

            </DefaultLayout>
        );
    }
}
