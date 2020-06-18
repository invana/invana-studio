import React from "react";
import {
    UUIDGenerator,
    DefaultConnectionRetryTimeout,
    DefaultMaxTimeElapsedWarningInSeconds, GREMLIN_SERVER_URL
} from "../../config";
import {ConnectionStatusComponent} from "./index";
import Footer from "../ui/footer";
import SecondaryHeader from "../ui/structure/secondary-header";
import FlyOutUI from "../ui/flyout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook} from "@fortawesome/free-solid-svg-icons";
import HistoryFlyOut from "../components/history";

export default class GremlinConnectorComponent extends React.Component {

    /*
    Use this component when you need gremlin server connect and query feature.
    Usage:

            export default class ConsoleView extends GremlinConnectorComponent{

                componentDidMount() {
                    super.componentDidMount();
                }

                // to make query
                makeQuery(query);

                // to get the list of responses of the query
                processResponse(responses);

            }




     */


    ws = this.createWebSocket();

    createWebSocket() {
        return new WebSocket(this.props.gremlinUrl);
    }

    static defaultProps = {
        gremlinUrl: GREMLIN_SERVER_URL
    }
    responses = [];

    eventHandler = (eventData) => console.log("hello");

    constructor(props) {
        super(props);
        this.state = {
            reconnectingTimer: 0,
            queryElapsedTimeCounter: 0,
            isQuerying: false,
            isConnected2Gremlin: false,
            statusMessage: null,
            canvasType: "graph",
            errorMessage: null
        }
    }

    connect() {
        this.setupWebSocket();
    }

    reconnect() {
        this.ws = this.createWebSocket();
        this.connect();
    }

    setIsConnected2Gremlin(status) {
        // this.props.eventHandler({isConnected2Gremlin: status});
        console.log("setIsConnected2Gremlin", status)
        this.setState({isConnected2Gremlin: status});
    }

    setIsStreaming(status) {
        // this.props.eventHandler({isStreaming: status});
        this.setState({isStreaming: status});
    }

    setIsQuerying(status) {
        this.setState({isQuerying: status})
        // this.props.eventHandler({isQuerying: status});
    }

    setQueryElapsedTimeCounter(count) {
        // this.props.eventHandler({queryElapsedTimeCounter: count});
        this.setState({queryElapsedTimeCounter: count});
    }

    setStatusMessage(messageText) {
        this.setState({statusMessage: messageText});
    }

    flushResponsesData = () => this.responses = [];

    processResponse(responses) {
        console.log("Attention response handler is not set for this component :(. " +
            "This method will return responses list(list of responses to support stream of responses )" +
            " for the query.", responses);
    }

    updateTimer(timerCount, isMaxTimeElapsed) {
        this.setState({queryElapsedTimeCounter: timerCount, maxTimeElapsedError: isMaxTimeElapsed});
    }

    gatherDataFromStream(response) {
        console.log("onmessage received", response);
        if (response.status.code >= 200 && response.status.code < 300) {
            this.setState({
                errorMessage: null
            })
            if (response.status.code === 206) {
                this.setIsStreaming(true);
                this.setStatusMessage("Gathering data from the stream");
                this.responses.push(response);
            } else {
                this.setIsStreaming(false);
                this.responses.push(response);
                this.setStatusMessage("Responded to the Query Successfully");
                const responses = Object.assign(this.responses);
                this.flushResponsesData();
                this.setIsQuerying(false);
                this.processResponse(responses);
            }
        } else {
            this.setIsStreaming(false);
            this.setIsQuerying(false);
            const responses = Object.assign(this.responses);
            this.processResponse(responses);
            this.setState({
                errorMessage: response.status
            })
            this.setStatusMessage("Query Failed with " + response.status.code + " error.");

        }
    }

    // waitTillSocketConnect(){
    //     if (this.ws.readyState !== 1){
    //         setTimeout(function () {
    //
    //         })
    //     }
    // }


    setupWebSocket() {
        let _this = this;
        console.log("setupWebSocket triggered===========================")

        // while(this.ws.readyState !== 1){
        //
        // }
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
            _this.setIsConnected2Gremlin(true);
            _this.setStatusMessage("Connected");
        }

        this.ws.onmessage = event => {
            // listen to data sent from the websocket server
            const response = JSON.parse(event.data)
            console.log("onmessage", response);
            _this.gatherDataFromStream(response);
        }

        this.ws.onclose = () => {
            console.log('disConnected2Gremlin')
            // automatically try to reconnect on connection loss
            _this.setIsConnected2Gremlin(false);

            let i = 0;
            let timer = setInterval((function () {
                    i += 1;
                    console.log(i)
                    _this.setStatusMessage("Reconnecting... waiting for " + DefaultConnectionRetryTimeout + "s. (" + i + "s elapsed)");
                    if (i >= DefaultConnectionRetryTimeout) {
                        clearInterval(timer);
                        _this.reconnect();
                    }
                }
            ), 1000); // retry in 5 seconds

        }
    }

    startTimer() {
        console.log("Timer started")
        this.setQueryElapsedTimeCounter(0);
        let _this = this;
        let timer = setInterval((function () {
                console.log("Timer started xyx", _this.state.queryElapsedTimeCounter);
                if (_this.state.isQuerying === false) {
                    clearInterval(timer);
                }
                _this.updateTimer(_this.state.queryElapsedTimeCounter + 1, false);
                if (_this.state.queryElapsedTimeCounter >= DefaultMaxTimeElapsedWarningInSeconds) {
                    _this.updateTimer(_this.state.queryElapsedTimeCounter + 1, true);
                }
            }
        ), 1000); // check every second.
    }

    generateQueryPayload(query) {
        return {
            "requestId": UUIDGenerator(),
            "op": "eval",
            "processor": "",
            "args": {
                "gremlin": query,
                "bindings": {},
                "language": "gremlin-groovy"
            }
        };
    }

    setQueryToUrl(query) {
        console.log("===setQueryToUrl", query);
        let u = new URL(window.location.href);
        let searchParams = new URLSearchParams(window.location.search);
        if (query && query !== "null") {
            searchParams.set("query", query);
            window.history.pushState({}, null, u.origin + u.pathname + "?" + searchParams.toString());
        }
    }


    makeQuery(query, setUrl) {

        // TODO - add logic to wait till server connects.
        if (typeof setUrl === "undefined") {
            setUrl = false;
        }
        if (setUrl) {
            this.setQueryToUrl(query);
        }
        let _this = this;
        console.log("queryGremlinServer :::  query", query);
        this.flushResponsesData();
        if (query) {
            this.startTimer();
            let msg = this.generateQueryPayload(query);
            let data = JSON.stringify(msg);
            console.log("Query long one", data);
            if (this.ws) {
                if (this.ws.readyState === 1) {
                    _this.ws.send(data, {mask: true});
                    _this.setIsQuerying(true);
                    _this.setStatusMessage("Sending Query..")
                } else {
                    _this.ws.onopen = function () {
                        _this.ws.send(data, {mask: true});
                        _this.setIsQuerying(true)
                        _this.setStatusMessage("Sending Query..")
                    };
                }
            }
        }
    }

    onErrorMessageFlyoutClose() {
        this.setState({
            "errorMessage": null
        })
    }


    componentDidMount() {

        this.connect();
    }

    switchCanvasTo(canvasType) {
        this.setState({
            canvasType: canvasType
        })
    }

    render() {
        console.log("this.state.errorMessage", this.state.errorMessage)
        return (
            <div>
                <Footer>
                    <ConnectionStatusComponent
                        statusMessage={this.state.statusMessage}
                        isConnected2Gremlin={this.state.isConnected2Gremlin}
                    />
                </Footer>

                <SecondaryHeader>

                    <div className={"left-side"}>
                        {
                            (this.state.responses)
                                ?
                                <ul>
                                    <li><a onClick={() => this.switchCanvasTo("graph")}>Graph</a></li>
                                    <li><a onClick={() => this.switchCanvasTo("table")}>Table</a></li>
                                    <li><a onClick={() => this.switchCanvasTo("json")}>JSON</a></li>
                                </ul>
                                : <span style={{"paddingLeft": "10px"}}> Welcome to Graph Explorer Beta. </span>
                        }
                    </div>
                    <div className={"right-side"}>
                        <ul>
                            <li><a onClick={() => this.setRightFlyOut("learn")}> <FontAwesomeIcon icon={faBook}/></a>
                            </li>
                        </ul>
                    </div>


                </SecondaryHeader>


                {
                    this.state.errorMessage ?
                        <FlyOutUI position={"bottom"}
                                  display={this.state.errorMessage ? "block" : "none"}
                                  title={"Query failed(" + this.state.errorMessage.code + "): " + this.state.errorMessage.message}
                                  isWarning={true}
                                  padding={false}
                                  onClose={this.onErrorMessageFlyoutClose.bind(this)}
                        >
                            <div className={"errorMessage"}>
                                <pre>{JSON.stringify(this.state.errorMessage, null, 4)}</pre>
                            </div>
                        </FlyOutUI> : <span></span>
                }

            </div>
        )

    }


}
