import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import DefaultLayout from "../layouts/default";
import DefaultRemoteRoutableComponent from "../layouts/default-remote-routable";
import RawResponsesCanvas from "../viewlets/raw-response";
import {STUDIO_SETTINGS} from "../../settings";
import {faHistory, faTerminal} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RequestHistoryView from "../viewlets/canvas/query-history";
import Modal from 'react-bootstrap/Modal'
import QueryTextarea from "../query-textarea/query-textarea";

export default class ConsoleView extends DefaultRemoteRoutableComponent {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            responses: [],
            showHistory: false
        }

    }

    componentDidMount() {
        super.componentDidMount();
        try {
            this.setupSocket();

        } catch (e) {

        }
    }

    setShowHistory(status) {
        console.log("=====setShowHistory", status)
        this.setState({showHistory: status});
    }

    setupSocket() {
        let _this = this;
        const gremlinUrl = this.getGremlinUrl();
        this.socket = new WebSocket(gremlinUrl);

        this.socket.onopen = function (e) {
            console.log(e)
            console.log("[open] Connection established");
            console.log("Sending to server");
            _this.setState({isConnected2Gremlin: true});
        };


        this.socket.onmessage = function (event) {
            // console.log(`[message] Data received from server: ${event.data}`);
            let responses = _this.state.responses;
            responses.push(JSON.parse(event.data))
            _this.setState({responses: responses});
            _this.setState({isQuerying: false});

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
        try {
            const __url = new URL(STUDIO_SETTINGS.CONNECTION_URL);
            return ((__url.protocol === "http:") ? 'ws' : 'wss') + "://" + __url.host + "/gremlin";
        } catch (e) {
            return null
        }
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
        this.setState({isQuerying: true});

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

    startNewQueryInConsole(queryString) {
        this.setState({canvasQueryString: queryString});
        this.setShowHistory(false);
    }


    render() {
        let _this = this;
        let responsesToRender = [...this.state.responses].reverse();
        return (
            <DefaultLayout {...this.props}>
                <Container className={"d-flex  flex-column p-0"} fluid style={{"height": "100%"}}>

                    {
                        this.state.showHistory === true
                            ? <Modal className={"border-0 "}
                                     size="lg"
                                     show={true}
                                     dialogClassName="modal-90w"
                                     backdrop={true}
                                // aria-labelledby="contained-modal-title-vcenter"
                                     centered
                            >
                                <Modal.Body className={"p-2 border-0"}>
                                    <RequestHistoryView
                                        onClose={() => _this.setShowHistory(false)}
                                        makeQuery={this.makeQuery.bind(this)}
                                        startNewQueryInConsole={this.startNewQueryInConsole.bind(this)}
                                    />
                                </Modal.Body>
                            </Modal>
                            : <React.Fragment/>
                    }

                    <Row className={"p-0 m-0"}>
                        <Col className={"p-3 m-0"} md={"5"}>

                            <div className={"border"}>

                                <div className={"display-block pt-2 pb-2 pl-3" +
                                " font-weight-bold pr-3 bg-dark text-white"}>
                                    <FontAwesomeIcon icon={faTerminal}/> Gremlin Query Console
                                </div>
                                <form ref={e => this.formRef = e} id={"queryForm"}
                                      onSubmit={(e) => this.onFormSubmit(this, e)}>
                                    <QueryTextarea
                                        onChange={this.onQueryChange.bind(this)}
                                        onKeyDown={this.onEnterPress.bind(this)}
                                        canvasQueryString={this.state.canvasQueryString || ''}
                                    />
                                    <div className={"pl-3  pt-2 pb-2 pr-3 bg-white border-top"}>
                                        <Button variant={"outline-primary position-relative pt-0 pb-0"} size="sm"
                                                type={"submit"}>Submit Query </Button>
                                        <Button variant={"outline-secondary position-relative pt-0 pb-0 ml-3"}
                                                onClick={() => this.setShowHistory(true)}
                                                size="sm"
                                                type={"button"}>
                                            <FontAwesomeIcon icon={faHistory}/> history</Button>

                                    </div>

                                    <div className={" bg-white"}>
                                    <span className={"ml-3 pb-2"}>
                                        {this.state.isConnected2Gremlin ?
                                            <span>connected to server.</span> :
                                            <span>not connected to server.</span>}</span>
                                        <span className={"ml-5"}>{
                                            this.state.isQuerying ?
                                                <span>querying server...</span> :
                                                <React.Fragment/>}</span>

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


                </Container>
            </DefaultLayout>
        );
    }
}
