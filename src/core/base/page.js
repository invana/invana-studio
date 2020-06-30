/*
To create new pages with full header, left nav etc ui components
 */
import React from "react";
import Header from "./header";
import LeftNav from "./left-nav";
import GremlinHeadlessComponent from "./gremlin";
import LearnFlyOut from "../components/learn";
import FlyOutUI from "../ui/flyout";
import {redirectToConnectIfNeeded} from "../utils";
import HistoryFlyOut from "../components/history";
import SettingsFlyOut from "../ui/settings";
import QueryConsole from "../components/console";
import SupportFlyOut from "../components/support";
import AboutComponent from "../components/about";

const Mousetrap = require("mousetrap");

export default class PageComponentBase extends GremlinHeadlessComponent {


    responseSessions = []; // responses from all the queries
    requests = []

    constructor(props) {
        super(props);
        this.state = {
            canvasQuery: null,
            canvasType: "graph",
            leftFlyOutName: null,
            rightFlyOutName: "welcome",
            // centerModalName: "welcome"
        }
    }


    setLeftFlyOut(leftFlyOutName) {
        this.setState({
            leftFlyOutName: leftFlyOutName
        })
    }

    setRightFlyOut(leftFlyOutName) {
        this.setState({
            rightFlyOutName: leftFlyOutName
        })
    }

    onLeftFlyOutClose() {
        this.setState({
            leftFlyOutName: null
        })
    }

    onRightFlyOutClose() {
        this.setState({
            rightFlyOutName: null
        })
    }

    //
    // onCenterModalClose() {
    //     this.setState({
    //         centerModalName: null
    //     })
    // }
    //
    // setLeftFlyOut(modalName) {
    //     this.setState({
    //         centerModalName: modalName
    //     })
    // }

    processResponse(responses) {
        this.responseSessions = this.responseSessions.concat(responses);
        console.log("responseSessions", this.responseSessions);
        this.setState({
            responses: this.responseSessions,
            shallReRenderD3Canvas: true
        })
    }

    startQuery(query) {
        this.setState({
            query: query,
            leftFlyOutName: "query-console"
        })
    }

    getQueryFromUrl() {
        return new URLSearchParams(window.location.search).get("query");
    }


    setupHotKeys() {
        Mousetrap.bind("ctrl+1", () => this.switchCanvasTo("graph"));
        Mousetrap.bind("ctrl+2", () => this.switchCanvasTo("table"));
        Mousetrap.bind("ctrl+3", () => this.switchCanvasTo("json"));
        Mousetrap.bind("ctrl+4", () => this.switchCanvasTo("raw"));
        Mousetrap.bind("shift+/", () => this.setLeftFlyOut("query-console"));
        Mousetrap.bind("shift+h", () => this.setLeftFlyOut("history"));
        Mousetrap.bind("esc", () => this.onLeftFlyOutClose());
    }

    unSetupHotKeys() {
        Mousetrap.unbind("ctrl+1");
        Mousetrap.unbind("ctrl+2");
        Mousetrap.unbind("ctrl+3");
        Mousetrap.unbind("ctrl+4");
        Mousetrap.unbind("shift+/");
        Mousetrap.unbind("shift+h");
        Mousetrap.unbind("esc");
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.unSetupHotKeys();
    }

    componentDidMount() {
        redirectToConnectIfNeeded();
        super.componentDidMount();
        setTimeout(() => this.loadQueryFromUrl(), 300);
        this.setupHotKeys()

    }

    loadQueryFromUrl() {
        const query = this.getQueryFromUrl();
        if (query && query !== "null") {
            this.makeQuery(query, {source: "console"});
        }
    }

    onQuerySubmit(query, queryOptions) {
        console.log("Query is " + query);
        if (queryOptions.source === "console") {
            // this is the beginning of a new query.
            this.flushResponsesData();
        }
        this.makeQuery(query, {source: "console"});
    }

    onErrorMessageFlyoutClose() {
        this.setState({
            "errorMessage": null
        })
    }

    switchCanvasTo(canvasType) {
        this.setState({
            canvasType: canvasType,
            statusMessage: "Canvas switched to " + canvasType
        })
    }

    addQueryToConsole(query) {
        this.addQueryToState(query);
        if (this.state.leftFlyOutName !== "query-console") {
            this.setLeftFlyOut("query-console");
        }
    }

    render() {

        // alert(this.state.query)

        const superRender = super.render();
        return (
            <div>
                <Header
                    canvasType={this.state.canvasType}
                    rightFlyOutName={this.state.rightFlyOutName}
                    switchCanvasTo={this.switchCanvasTo.bind(this)}
                    setRightFlyOut={this.setRightFlyOut.bind(this)}
                    setLeftFlyOut={this.setLeftFlyOut.bind(this)}
                    onQuerySubmit={this.onQuerySubmit.bind(this)}
                />
                {
                    (this.state.rightFlyOutName === "learn") ?
                        <LearnFlyOut
                            addQueryToConsole={this.addQueryToConsole.bind(this)}
                            makeQuery={this.makeQuery.bind(this)}
                            onClose={this.onRightFlyOutClose.bind(this)}/>
                        : <span></span>
                }
                {
                    this.state.errorMessage ?
                        <FlyOutUI position={"bottom"}
                                  display={this.state.errorMessage ? "block" : "none"}
                            // title={"Query failed(" + this.state.errorMessage.code + "): " + this.state.errorMessage.message}
                                  title={"Response Console"}
                                  isWarning={true}
                                  padding={true}
                                  onClose={this.onErrorMessageFlyoutClose.bind(this)}
                        >
                            <div className={"errorMessage"}>
                                <pre>{JSON.stringify(this.state.errorMessage, null, 4)}</pre>
                            </div>
                        </FlyOutUI> : <span></span>
                }
                {
                    (this.state.leftFlyOutName === "history") ?
                        <HistoryFlyOut
                            makeQuery={this.makeQuery.bind(this)}
                            addQueryToConsole={this.addQueryToConsole.bind(this)}
                            onClose={this.onLeftFlyOutClose.bind(this)}/>
                        : <span></span>
                }
                {
                    (this.state.leftFlyOutName === "query-console") ?
                        <QueryConsole
                            onQuerySubmit={this.onQuerySubmit.bind(this)}
                            query={this.state.query}
                            onClose={this.onLeftFlyOutClose.bind(this)}
                        />
                        : <span></span>
                }
                {
                    (this.state.leftFlyOutName === "settings") ?
                        <SettingsFlyOut
                            setLeftFlyOut={this.setLeftFlyOut.bind(this)}
                            onClose={this.onLeftFlyOutClose.bind(this)}/>
                        : <span></span>
                }
                {
                    (this.state.rightFlyOutName === "support") ?
                        <SupportFlyOut
                            setLeftFlyOut={this.setLeftFlyOut.bind(this)}
                            onClose={this.onRightFlyOutClose.bind(this)}/>
                        : <span></span>
                }
                {
                    (this.state.rightFlyOutName === "about") ?
                        <AboutComponent
                            setLeftFlyOut={this.setLeftFlyOut.bind(this)}
                            onClose={this.onRightFlyOutClose.bind(this)}/>
                        : <span></span>
                }
                <LeftNav
                    leftFlyOutName={this.state.leftFlyOutName}
                    rightFlyOutName={this.state.rightFlyOutName}
                    setRightFlyOut={this.setRightFlyOut.bind(this)}
                    setLeftFlyOut={this.setLeftFlyOut.bind(this)}
                />
                {superRender}
            </div>
        )
    }
}
