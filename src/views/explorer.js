import BaseView from "./base";
import React from "react";
import {redirectToConnectIfNeeded} from "../core/utils";
import GEHeader from "../ui-components/layout/header";
import List from "../ui-components/lists/list";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBook, faBug,
    faCog,
    faFilter,
    faHistory, faInfoCircle, faLifeRing,
    faSave,
    faStickyNote, faSync, faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import Indicator from "../ui-components/indicator/indicator";
import Main from "../ui-components/layout/main";
import AsideNav from "../ui-components/layout/aside-nav";
import MainContent from "../ui-components/layout/main-content";
import AsideLeft from "../ui-components/layout/aside-left";
import GEPanel from "../ui-components/panels/panel";
import MainContentMiddle from "../ui-components/layout/main-content-middle";
import MainContentRight from "../ui-components/layout/main-content-right";
import AsideBottom from "../ui-components/layout/aside-bottom";
import GEFooter from "../ui-components/layout/footer";
import AsideRight from "../ui-components/layout/aside-right";
import LoadSpinner from "../ui-components/spinner/spinner";
import SettingsComponent from "../viewlets/settings";
import LearnComponent from "../viewlets/learn";
import HistoryComponent from "../viewlets/history";
import SupportComponent from "../viewlets/support";
import QueryConsole from "../viewlets/query-console";
import AboutComponent from "../viewlets/about";
import {REPO_URL} from "../config";
import ErrorBoundary from "../canvas/graph/error-boundary";
import GraphCanvas from "../canvas/graph";
import JSONCanvas from "../canvas/json";
import TableCanvas from "../canvas/table";
import RawResponsesCanvas from "../canvas/raw-responses";
import SelectedDataCanvas from "../canvas/graph/selected-data";
import VertexOptions from "../viewlets/vertex-options";
import FounderNote from "../viewlets/founder-note";

const Mousetrap = require("mousetrap");

export default class ExplorerView extends BaseView {


    processResponse(responses) {
        super.processResponse(responses);
        this.extendGraph(responses);
    }

    startQuery(query) {
        this.setState({
            query: query,
        })
    }

    getQueryFromUrl() {
        return new URLSearchParams(window.location.search).get("query");
    }

    getLatestResponse() {
        // alert(this.state.responses.length);
        if (this.state.responses.length > 0) {
            const responses = this.state.responses;
            const lastResponse = responses[responses.length - 1];
            // console.log("=======lastResponse", lastResponse)
            return {
                status: lastResponse.status.code,
                response: lastResponse
            }
        } else {
            return {
                status: null,
                response: {
                    result: null
                }
            }
        }
    }

    setupHotKeys() {
        Mousetrap.bind("ctrl+1", () => this.switchCanvasTo("graph"));
        Mousetrap.bind("ctrl+2", () => this.switchCanvasTo("table"));
        Mousetrap.bind("ctrl+3", () => this.switchCanvasTo("json"));
        Mousetrap.bind("ctrl+4", () => this.switchCanvasTo("raw"));
        // Mousetrap.bind("shift+/", () => this.setLeftContent("query-console"));
        Mousetrap.bind("shift+h", () => this.setLeftContent("history"));
        Mousetrap.bind("esc", () => this.setLeftContent(null));
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
        // if (queryOptions.source === "canvas") {
        //     // this is the beginning of a new query.
        //     this.flushResponsesData();
        // }
        this.makeQuery(query, queryOptions);
    }


    confirmFlushCanvas() {
        let r = window.confirm("Are you sure you want to clear the canvas");
        if (r === true) {
            this.flushCanvas();
        }
    }

    confirmRedrawCanvas() {

        let r = window.confirm("Are you sure you want to re-draw the canvas");
        if (r === true) {
            this.setState({shallReRenderD3Canvas: true})
        }
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

    }

    setCanvasType(canvasType) {
        this.setState({canvasType: canvasType});
    }


    render() {

        return (
            <div className="App">
                <GEHeader>
                    <List type={"nav-left"}>
                        <li className={"logo"}>
                            <a href="/" className={"no-bg"}>
                                <strong>Graph Explorer</strong>
                            </a>
                        </li>
                    </List>
                    <List type={"nav-right"}>
                        <li>
                            <button onClick={() => this.setRightContentName("founder-note")}>
                                <FontAwesomeIcon icon={faStickyNote}/> Note from the Author
                            </button>
                        </li>
                        <li style={{"padding": "0 5px"}}>
                            <a style={{"padding": 0}} rel="noopener noreferrer" target={"_blank"} href={REPO_URL}>
                                {/*<FontAwesomeIcon icon={faGithub}/> 33 stars*/}
                                <img src="https://img.shields.io/github/stars/invanalabs/graph-explorer" alt=""/>
                            </a>
                        </li>
                        <li>
                            <a rel="noopener noreferrer" target={"_blank"} href={REPO_URL + '/issues'}>
                                <FontAwesomeIcon icon={faBug}/>
                            </a>
                        </li>
                        {/*<li>*/}
                        {/*    <button onClick={() => this.setRightContentName("learn")}>*/}
                        {/*        <FontAwesomeIcon icon={faQuestionCircle}/>*/}
                        {/*    </button>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <button onClick={() => console.log("ok")}>*/}
                        {/*        <FontAwesomeIcon icon={faEllipsisV}/>*/}
                        {/*    </button>*/}
                        {/*</li>*/}
                    </List>
                </GEHeader>
                <Main>
                    <AsideNav>
                        <List type={"aside-nav"}>
                            {/*<li>*/}
                            {/*    <a onClick={() => this.setLeftContent("something")}>*/}
                            {/*        <FontAwesomeIcon icon={faSearch}/>*/}
                            {/*    </a>*/}
                            {/*</li>*/}
                            <li>
                                <button onClick={() => this.setLeftContent("history")}>
                                    <FontAwesomeIcon icon={faHistory}/>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => this.setLeftContent("settings")}>
                                    <FontAwesomeIcon icon={faCog}/>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => this.setLeftContent("support")}>
                                    <FontAwesomeIcon icon={faLifeRing}/>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => this.setLeftContent("learn")}>
                                    <FontAwesomeIcon icon={faBook}/>
                                </button>
                            </li>

                            <li>
                                <button onClick={() => this.setLeftContent("about")}>
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                </button>
                            </li>
                        </List>
                    </AsideNav>
                    <MainContent>
                        <AsideLeft extraClass={this.state.leftContentName ? "" : "closed"}>
                            {this.state.leftContentName === "history" ? (
                                    <GEPanel
                                        title={"History"}
                                        onClickClose={() => this.setLeftContent(null)}
                                        showToggleBtn={false}
                                    >
                                        <HistoryComponent
                                            makeQuery={this.makeQuery.bind(this)}
                                            addQueryToConsole={this.addQueryToConsole.bind(this)}
                                        />
                                    </GEPanel>
                                ) :
                                this.state.leftContentName === "settings"
                                    ? (
                                        <GEPanel
                                            title={"Settings"}
                                            onClickClose={() => this.setLeftContent(null)}
                                            showToggleBtn={false}
                                        >
                                            <SettingsComponent/>
                                        </GEPanel>
                                    ) :
                                    this.state.leftContentName === "learn"
                                        ? (
                                            <GEPanel
                                                title={"Learn"}
                                                onClickClose={() => this.setLeftContent(null)}
                                                showToggleBtn={false}
                                            >
                                                <LearnComponent
                                                    addQueryToConsole={this.addQueryToConsole.bind(this)}
                                                    makeQuery={this.makeQuery.bind(this)}
                                                    onClose={() => this.setLeftContent(null)}/>


                                            </GEPanel>
                                        ) :
                                        this.state.leftContentName === "support"
                                            ? (
                                                <GEPanel
                                                    title={"Support"}
                                                    onClickClose={() => this.setLeftContent(null)}
                                                    showToggleBtn={false}
                                                >
                                                    <SupportComponent/>
                                                </GEPanel>
                                            ) :
                                            this.state.leftContentName === "about"
                                                ? (
                                                    <GEPanel
                                                        title={"About"}
                                                        onClickClose={() => this.setLeftContent(null)}
                                                        showToggleBtn={false}
                                                    >
                                                        <AboutComponent/>
                                                    </GEPanel>
                                                ) : (<span></span>)
                            }
                        </AsideLeft>
                        <MainContentMiddle>
                            <div
                                className={
                                    this.state.middleBottomContentName
                                        ? "main-content-top"
                                        : "main-content-top bottom-closed"
                                }
                            >
                                <GEPanel
                                    title={"Query Console"}
                                    showToggleBtn={false}
                                    showCloseBtn={false}
                                >
                                    <QueryConsole
                                        onQuerySubmit={this.onQuerySubmit.bind(this)}
                                        query={this.state.query}
                                        flushCanvas={this.flushCanvas.bind(this)}
                                        // onClose={this.onLeftFlyOutClose.bind(this)}
                                    />
                                </GEPanel>
                            </div>
                            <div
                                className={
                                    this.state.middleBottomContentName
                                        ? "main-content-bottom"
                                        : "main-content-bottom closed"
                                }
                            >
                                {/*{this.state.middleBottomContentName ? (*/}
                                {/*    <GEPanel*/}
                                {/*        title={"Middle Bottom Content"}*/}
                                {/*        showToggleBtn={false}*/}
                                {/*        onClickClose={() => this.setMiddleBottomContentName(null)}*/}
                                {/*        // showCloseBtn={true}*/}
                                {/*    >*/}
                                {/*        <p>middle bottom here</p>*/}
                                {/*    </GEPanel>*/}
                                {/*) : (*/}
                                {/*    <span/>*/}
                                {/*)}*/}
                                {
                                    this.state.middleBottomContentName === "selected-data-overview" && this.state.selectedElementData
                                        ?
                                        <GEPanel
                                            // title={"Selected Element Data"}
                                            title={"Properties of hovered element"}

                                            showToggleBtn={false}
                                            showCloseBtn={true}
                                            onClickClose={() => {
                                                this.setHideVertexOptions();
                                                this.setRightContentName(null)
                                            }}
                                        >


                                            <SelectedDataCanvas
                                                selectedData={this.state.selectedElementData}
                                                onClose={() => {
                                                    this.setSelectedElementData(null);
                                                    this.setRightContentName(null)
                                                }}/>

                                        </GEPanel>
                                        :
                                        this.state.middleBottomContentName === "vertex-options" && this.state.selectedElementData
                                            ?
                                            <GEPanel
                                                title={this.state.selectedElementData.label + " | Element Options"}
                                                // title={null}
                                                onClickClose={() => {
                                                    this.setHideVertexOptions();
                                                    this.setRightContentName(null)
                                                }}
                                                showToggleBtn={false}
                                            >
                                                <VertexOptions selectedElementData={this.state.selectedElementData}
                                                               setStatusMessage={this.setStatusMessage.bind(this)}
                                                               setErrorMessage={this.setErrorMessage.bind(this)}
                                                               onClose={() => {
                                                                   this.setHideVertexOptions.bind(this);
                                                                   this.setRightContentName(null)
                                                               }}
                                                               reRenderCanvas={this.reRenderCanvas.bind(this)}
                                                />

                                            </GEPanel>
                                            : <span></span>
                                }
                            </div>
                        </MainContentMiddle>
                        <MainContentRight
                            extraClass={this.state.leftContentName ? "" : "expanded"}
                            secondaryChild={
                                this.state.bottomContentName === "error-console" ? (
                                    <AsideBottom>
                                        <GEPanel
                                            title={"Response Console"}
                                            onClickClose={() => this.setBottomContentName(null)}
                                            showToggleBtn={false}
                                        >
                                            {this.state.errorMessage
                                                ? <pre>{JSON.stringify(this.state.errorMessage, null, 2)}</pre>
                                                : <span>
                                                    <pre>{JSON.stringify(this.getLatestResponse().response.result, null, 2)}</pre>
                                                </span>
                                            }

                                        </GEPanel>
                                    </AsideBottom>
                                ) : (
                                    <span/>
                                )
                            }
                        >
                            <div
                                style={{
                                    height: "inherit"
                                }}
                            >

                                <div className={"main-content-nav"}>
                                    <List type={"canvas-nav"}>
                                        <li>
                                            {/*<span></span>*/}
                                            <span
                                                style={{"textTransform": "capitalize"}}>Using {this.state.canvasType} canvas | </span>
                                        </li>
                                        <li>
                                            <div className={"canvasToggle"}>
                                                <button className={this.state.canvasType === "graph" ? "selected" : ""}
                                                        onClick={() => this.switchCanvasTo("graph")}>Graph
                                                </button>
                                                <button className={this.state.canvasType === "table" ? "selected" : ""}
                                                        onClick={() => this.switchCanvasTo("table")}>Table
                                                </button>
                                                <button className={this.state.canvasType === "json" ? "selected" : ""}
                                                        onClick={() => this.switchCanvasTo("json")}>JSON
                                                </button>
                                                {/*<a className={this.canvasType === "raw" ? "selected" : ""}*/}
                                                {/*   onClick={() => this.switchCanvasTo("raw")}>Raw</a>*/}

                                            </div>
                                        </li>
                                        <li>
                                            <button title={"clear the canvas"}
                                                    onClick={() => this.confirmFlushCanvas()}>
                                                <FontAwesomeIcon icon={faTrashAlt}/>
                                            </button>
                                        </li>
                                        <li>
                                            <button title={"re render the canvas"}
                                                    onClick={() => this.confirmRedrawCanvas()}>
                                                <FontAwesomeIcon icon={faSync}/>
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => alert("Still in the Design stage")}>
                                                <FontAwesomeIcon icon={faSave}/>
                                            </button>
                                        </li>

                                        <li>
                                            <button onClick={() => alert("Still in the Design stage")}>
                                                <FontAwesomeIcon icon={faFilter}/>
                                            </button>
                                        </li>

                                        {/*<li>*/}
                                        {/*    <button onClick={() => alert("Still in the Design stage")}>*/}
                                        {/*        <FontAwesomeIcon icon={faExpand}/>*/}
                                        {/*    </button>*/}
                                        {/*</li>*/}

                                    </List>
                                </div>

                                <div className={"main-content-body"}>

                                    <ErrorBoundary>
                                        {(() => {
                                            if (this.state.canvasType === "graph" && this.state.responses) {
                                                return (
                                                    <GraphCanvas
                                                        // setShowVertexOptions={this.setShowVertexOptions.bind(this)}
                                                        setHideVertexOptions={this.setHideVertexOptions.bind(this)}
                                                        responses={this.state.responses}
                                                        setSelectedElementData={this.setSelectedElementData.bind(this)}
                                                        vertices={this.state.vertices}
                                                        edges={this.state.edges}
                                                        setRightContentName={this.setRightContentName.bind(this)}
                                                        setMiddleBottomContentName={this.setMiddleBottomContentName.bind(this)}
                                                        middleBottomContentName={this.state.middleBottomContentName}
                                                        startQuery={this.startQuery.bind(this)}
                                                        queryGremlinServer={this.makeQuery.bind(this)}
                                                        resetShallReRenderD3Canvas={this.resetShallReRenderD3Canvas.bind(this)}
                                                        shallReRenderD3Canvas={this.state.shallReRenderD3Canvas}
                                                    />
                                                )
                                            } else if (this.state.canvasType === "json" && this.state.responses) {
                                                return (
                                                    <JSONCanvas
                                                        vertices={this.state.vertices}
                                                        edges={this.state.edges}
                                                        responses={this.state.responses}/>
                                                )
                                            } else if (this.state.canvasType === "table" && this.state.responses) {
                                                return (
                                                    <TableCanvas
                                                        vertices={this.state.vertices}
                                                        edges={this.state.edges}
                                                        responses={this.state.responses}/>
                                                )
                                            } else if (this.state.canvasType === "raw" && this.state.responses) {
                                                return (
                                                    <RawResponsesCanvas
                                                        responses={this.state.responses}/>
                                                )
                                            } else {
                                                return (
                                                    <span></span>
                                                )
                                            }
                                        })()}
                                    </ErrorBoundary>


                                </div>
                            </div>
                        </MainContentRight>
                    </MainContent>
                </Main>
                <GEFooter>
                    <List type={"nav-left"}>
                        <li className={"ml-5"}><Indicator isConnected2Gremlin={this.state.isConnected2Gremlin}/></li>
                        <li><span>{this.state.statusMessage}</span></li>
                    </List>
                    <List type={"nav-right"}>

                        <li>
                            <button className={"no-bg"}>{this.getProtocol()} protocol</button>
                        </li>

                        {this.getLatestResponse().status
                            ?
                            <li>
                                <button className={"no-bg"} onClick={() => this.setBottomContentName("error-console")}>
                                    <span>{
                                        this.getLatestResponse().status ?
                                            this.getLatestResponse().status !== 200
                                                ? <strong
                                                    className={"error-badge"}>{this.getLatestResponse().status}</strong>
                                                : <strong
                                                    className={"ok-badge"}>{this.getLatestResponse().status}</strong>
                                            : <strong>NA</strong>
                                    }&nbsp;response</span>
                                </button>
                            </li>
                            : <li><span></span></li>
                        }
                        <li>
                            <span>{this.state.canvasType} canvas</span>
                        </li>
                        <li>
                            <span>{this.state.vertices.length} vertices, {this.state.edges.length} edges</span>
                        </li>
                    </List>
                </GEFooter>
                {this.state.rightContentName ? (
                    <AsideRight>
                        {console.log("========== rightContentName", this.state.rightContentName)}

                        {
                            this.state.rightContentName === "founder-note"
                                ?
                                <GEPanel
                                    title={"Note from Author"}
                                    onClickClose={() => this.setRightContentName(null)}
                                    showToggleBtn={false}
                                > <FounderNote
                                    setLeftContent={this.setLeftContent.bind(this)}
                                    onClose={() => this.setRightContentName(null)}/>
                                </GEPanel>
                                : <span></span>
                        }

                    </AsideRight>
                ) : (
                    <span/>
                )}
                <LoadSpinner
                    loadingMessage={this.state.loadingMessage}
                    loadingExtraText={this.state.loadingExtraText}
                    isLoading={this.state.isLoading}
                    showSignOut={true}
                    loadTimeCounter={this.state.loaderElapsedTimer}/>
                {super.render()}
            </div>
        );
    }
}
