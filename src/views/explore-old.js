import BaseView from "./base";
import React from "react";
import {redirectToConnectIfNeeded} from "../core/utils";
import GEHeader from "../ui-components/layout/header";
import List from "../ui-components/lists/list";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCog, faCubes,
    faHistory, faHome, faInfoCircle, faLifeRing,
    faStickyNote, faTerminal
} from "@fortawesome/free-solid-svg-icons";
import Indicator from "../ui-components/indicator/indicator";
import Main from "../ui-components/layout/main";
// import AsideNav from "../ui-components/layout/aside-nav";
import MainContent from "../ui-components/layout/main-content";
import AsideLeftNav from "../ui-components/layout/aside-left-nav";
import GEPanel from "../ui-components/panels/panel";
import MainContentMiddle from "../ui-components/layout/main-content-middle";
import MainContentRight from "../ui-components/layout/main-content-right";
import AsideBottom from "../ui-components/layout/aside-bottom";
import GEFooter from "../ui-components/layout/footer";
import AsideRight from "../ui-components/layout/aside-right";
import SettingsComponent from "../viewlets/settings";
import LearnComponent from "../viewlets/learn";
import HistoryComponent from "../viewlets/history";
import SupportComponent from "../viewlets/support";
// import QueryConsole from "../canvas/nav-ui-components/query-console";
import VerticesManagement from "../viewlets/vertices-management";
import EdgesManagement from "../viewlets/edges-management";
import AboutComponent from "../viewlets/about";
import {REPO_URL} from "../config";
import SelectedData from "../viewlets/selected-data";
import VertexOptions from "../viewlets/vertex-options";
import FounderNote from "../viewlets/founder-note";
import WhatsNew from "../viewlets/whats-new";
import GEList from "../ui-components/lists/list";
import Canvas from "../canvas/canvas";
import QueryConsole from "../canvas/nav-ui-components/query-console";

const Mousetrap = require("mousetrap");

export default class ExplorerView extends BaseView {


    state = {
        ...this.state,
        focusedNodes: []
    }

    processResponse(response) {
        super.processResponse(response);
        this.extendGraph(response);
    }


    // removeFocusedNode(nodeId){
    //     console.log("removeFocusedNode", nodeId);
    //
    // }

    // startQuery(query) {
    //     this.setState({
    //         query: query,
    //     })
    // }

    getQueryFromUrl() {
        return new URLSearchParams(window.location.search).get("query");
    }

    getLatestResponse() {
        const lastResponse = this.connector.getLastResponse();
        if (lastResponse) {
            return {
                status: lastResponse.getStatusCode(),
                response: lastResponse.getResponseData(),
                error: lastResponse.getError()
            }
        } else {
            return {
                status: null,
                response: null,
                error: null
            }
        }
    }

    setupHotKeys() {
        Mousetrap.bind("ctrl+1", () => this.switchCanvasTo("graph"));
        Mousetrap.bind("ctrl+2", () => this.switchCanvasTo("table"));
        Mousetrap.bind("ctrl+3", () => this.switchCanvasTo("json"));
        Mousetrap.bind("ctrl+4", () => this.switchCanvasTo("raw"));
        // Mousetrap.bind("shift+/", () => this.setLeftContentName("query-console"));
        Mousetrap.bind("shift+h", () => this.setLeftContentName("history"));
        Mousetrap.bind("esc", () => this.setLeftContentName(null));
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

    onErrorMessageFlyoutClose() {
        this.setState({
            "errorMessage": null
        })
    }


    addQueryToConsole(query) {
        this.addQueryToState(query);
    }


    reRenderCanvas() {
        super.reRenderCanvas();
        // const {vertices, edges } = this.dataStore.getAllData()
        // this.resetShallReRenderD3Canvas();
        this.setState({
            // ...this.dataStore.getAllData(),
            verticesCount: this.dataStore.getVerticesCount(),
            edgesCount: this.dataStore.getEdgesCount(),
        })

    }

    render() {
        // console.log("explorer render() ", this.connector.getLastResponse(), this.connector.responsesList)
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
                            <button className={this.state.rightContentName === "learn" ? "selected no-bg" : "no-bg"}
                                    onClick={() => this.setRightContentName("learn")}>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <FontAwesomeIcon icon={faCubes}/> Get Started
                            </button>
                        </li>
                        {/*<li>*/}
                        {/*    <button className={"no-bg"} onClick={() => this.setRightContentName("history")}>*/}
                        {/*        <FontAwesomeIcon icon={faHistory}/>*/}
                        {/*    </button>*/}
                        {/*</li>*/}

                        {/*<li>*/}
                        {/*    <button className={"no-bg"} onClick={() => this.setRightContentName("learn")}>*/}
                        {/*        <FontAwesomeIcon icon={faBook}/>*/}
                        {/*    </button>*/}
                        {/*</li>*/}

                        <li>
                            <button
                                className={this.state.rightContentName === "founder-note" ? "selected no-bg" : "no-bg"}
                                onClick={() => this.setRightContentName("founder-note")}>
                                <FontAwesomeIcon icon={faStickyNote}/>
                            </button>
                        </li>

                        <li>
                            <button className={this.state.rightContentName === "settings" ? "selected no-bg" : "no-bg"}
                                    onClick={() => this.setRightContentName("settings")}>
                                <FontAwesomeIcon icon={faCog}/>
                            </button>
                        </li>


                        <li style={{"padding": "0 5px"}}>
                            <a style={{"padding": 0}} rel="noopener noreferrer" target={"_blank"} href={REPO_URL}>
                                <img
                                    src="https://img.shields.io/github/stars/invanalabs/graph-explorer?color=%23429770&label=stars&logo=github&style=flat-square"
                                    alt=""/>
                            </a>
                        </li>
                    </List>
                </GEHeader>
                <Main>

                    <MainContent>
                        <AsideLeftNav>
                            <GEList type={"aside"}>

                                <li style={{"marginTop": "22px"}}>
                                    <button onClick={() => this.toggleRightContentName("overview")}
                                            className={this.state.rightContentName === "overview" ? "selected" : ""}
                                    >
                                        <FontAwesomeIcon icon={faHome}/><span>Overview</span>
                                    </button>
                                </li>

                                <li style={{"marginTop": "97px"}}>
                                    <button onClick={() => this.toggleRightContentName("query-console")}
                                            className={this.state.rightContentName === "query-console" ? "selected" : ""}
                                    >
                                        <FontAwesomeIcon icon={faTerminal}/><span>Query&nbsp;Console</span>
                                    </button>
                                </li>
                                <li style={{"marginTop": "125px"}}>
                                    <button onClick={() => this.toggleRightContentName("history")}
                                            className={this.state.rightContentName === "history" ? "selected" : ""}
                                    >
                                        <FontAwesomeIcon icon={faHistory}/><span>History</span>
                                    </button>
                                </li>
                                <li style={{"marginTop": "80px"}}>
                                    <button onClick={() => this.toggleRightContentName("support")}
                                            className={this.state.rightContentName === "support" ? "selected" : ""}
                                    >
                                        <FontAwesomeIcon icon={faLifeRing}/><span>Support</span>
                                    </button>
                                </li>
                                <li style={{"marginTop": "80px"}}>
                                    <button onClick={() => this.toggleRightContentName("about")}
                                            className={this.state.rightContentName === "about" ? "selected" : ""}
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle}/><span>About</span>
                                    </button>
                                </li>
                            </GEList>

                        </AsideLeftNav>

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
                                                    <pre>{JSON.stringify(this.getLatestResponse().error, null, 2)}</pre>
                                                </span>
                                            }

                                        </GEPanel>
                                    </AsideBottom>
                                ) : (
                                    <span/>
                                )
                            }
                        >
                            <Canvas
                                setStatusMessage={this.setStatusMessage.bind(this)}

                                setHideVertexOptions={this.setHideVertexOptions.bind(this)}
                                setSelectedElementData={this.setSelectedElementData.bind(this)}
                                setRightContentName={this.setRightContentName.bind(this)}
                                setMiddleBottomContentName={this.setMiddleBottomContentName.bind(this)}
                                middleBottomContentName={this.state.middleBottomContentName}

                                selectedElementData={this.state.selectedElementData}

                                connector={this.connector}
                                dataStore={this.dataStore}
                                resetShallReRenderD3Canvas={this.resetShallReRenderD3Canvas.bind(this)}
                                shallReRenderD3Canvas={this.state.shallReRenderD3Canvas}
                                setShallReRenderD3Canvas={this.setShallReRenderD3Canvas.bind(this)}
                                makeQuery={this.makeQuery.bind(this)}

                                flushCanvas={this.flushCanvas.bind(this)}

                                query={this.state.query}

                                addQueryToState={this.addQueryToState.bind(this)}

                            />
                        </MainContentRight>
                        <MainContentMiddle>
                            <div
                                className={
                                    this.state.middleBottomContentName
                                        ? "main-content-top"
                                        : "main-content-top bottom-closed"
                                }
                            >
                                {/*<GEPanel*/}
                                {/*    title={"Query Console"}*/}
                                {/*    showToggleBtn={false}*/}
                                {/*    showCloseBtn={false}*/}
                                {/*>*/}
                                {/*    <QueryConsole*/}
                                {/*        onQuerySubmit={this.onQuerySubmit.bind(this)}*/}
                                {/*        query={this.state.query}*/}
                                {/*        flushCanvas={this.flushCanvas.bind(this)}*/}
                                {/*        // onClose={this.onLeftFlyOutClose.bind(this)}*/}
                                {/*    />*/}
                                {/*</GEPanel>        */}

                                <div className={"main-content-nav"}>
                                    <GEList>
                                        <li style={{"paddingLeft": "3px"}}>
                                            <button
                                                className={this.state.middleTopContentName === 'vertices-management' ? "active" : ''}
                                                onClick={() => this.setMiddleTopContentName("vertices-management")}>
                                                Vertices
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={this.state.middleTopContentName === 'edges-management' ? "active" : ''}
                                                onClick={() => this.setMiddleTopContentName("edges-management")}>
                                                Edges
                                            </button>
                                        </li>
                                        {/*<li>*/}
                                        {/*    <button*/}
                                        {/*        className={this.state.middleTopContentName === "query-console" ? 'active' : ''}*/}
                                        {/*        onClick={() => this.setMiddleTopContentName("query-console")}>*/}
                                        {/*        Query Console*/}
                                        {/*    </button>*/}
                                        {/*</li>*/}
                                    </GEList>
                                </div>

                                {
                                    this.state.middleTopContentName === "vertices-management" ?
                                        (
                                            <VerticesManagement
                                                parentGraphComponent={this}
                                                setShowVertexOptions={this.setShowVertexOptions.bind(this)}
                                            />

                                        ) :
                                        this.state.middleTopContentName === "edges-management" ?
                                            (
                                                <EdgesManagement
                                                    parentGraphComponent={this}
                                                    setShowVertexOptions={this.setShowVertexOptions.bind(this)}
                                                />

                                            ) : (<div></div>)
                                    // this.state.middleTopContentName === "query-console" ? (
                                    //     <QueryConsole
                                    //         makeQuery={this.makeQuery.bind(this)}
                                    //         query={this.state.query}
                                    //         connector={this.connector}
                                    //         flushCanvas={this.flushCanvas.bind(this)}
                                    //     />
                                    // ) : (<div></div>)

                                }
                                {/*<GEPanel*/}
                                {/*    title={"Vertices"}*/}
                                {/*    showToggleBtn={false}*/}
                                {/*    showCloseBtn={false}*/}
                                {/*>*/}
                                {/*</GEPanel>*/}
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
                                            title={this.state.selectedElementData.meta.labelOptions.labelText
                                            || this.state.selectedElementData.id.toString()}
                                            headerStyle={{
                                                'color': this.state.selectedElementData.type === "g:Vertex"
                                                    ? this.state.selectedElementData.meta.shapeOptions.fillColorHex
                                                    : this.state.selectedElementData.meta.shapeOptions.strokeColorHex,
                                                // 'color': invertColor(this.state.selectedElementData.meta.shapeOptions.fillColor, true)
                                            }}
                                            showToggleBtn={false}
                                            showCloseBtn={true}
                                            onClickClose={() => {
                                                this.setHideVertexOptions();
                                                this.setRightContentName(null)
                                            }}
                                        >
                                            <SelectedData
                                                selectedData={this.state.selectedElementData}
                                                onClose={() => {
                                                    this.setSelectedElementData(null);
                                                    this.setRightContentName(null)
                                                }}/>

                                        </GEPanel>
                                        :
                                        this.state.middleBottomContentName === "vertex-options" && this.state.selectedLabel
                                            ?
                                            <GEPanel
                                                title={this.state.selectedLabel + " | Element Options"}
                                                // title={null}
                                                onClickClose={() => {
                                                    this.setHideVertexOptions();
                                                    this.setRightContentName(null)
                                                }}
                                                showToggleBtn={false}
                                            >
                                                <VertexOptions selectedLabel={this.state.selectedLabel}
                                                               selectedLabelType={this.state.selectedLabelType}
                                                               setStatusMessage={this.setStatusMessage.bind(this)}
                                                               setErrorMessage={this.setErrorMessage.bind(this)}
                                                               onClose={() => {
                                                                   this.setHideVertexOptions.bind(this);
                                                                   this.setRightContentName(null)
                                                               }}
                                                               reRenderCanvas={this.reRenderCanvas.bind(this)}
                                                               setShallReRenderD3Canvas={this.setShallReRenderD3Canvas.bind(this)}
                                                />

                                            </GEPanel>
                                            : <span></span>
                                }
                            </div>

                        </MainContentMiddle>
                        <GEList type={"aside"}>

                            <li style={{"marginTop": "22px"}}>
                                <button onClick={() => this.toggleRightContentName("overview")}
                                        className={this.state.rightContentName === "overview" ? "selected" : ""}
                                >
                                    <FontAwesomeIcon icon={faHome}/><span>Overview</span>
                                </button>
                            </li>

                            <li style={{"marginTop": "97px"}}>
                                <button onClick={() => this.toggleRightContentName("query-console")}
                                        className={this.state.rightContentName === "query-console" ? "selected" : ""}
                                >
                                    <FontAwesomeIcon icon={faTerminal}/><span>Query&nbsp;Console</span>
                                </button>
                            </li>
                            <li style={{"marginTop": "125px"}}>
                                <button onClick={() => this.toggleRightContentName("history")}
                                        className={this.state.rightContentName === "history" ? "selected" : ""}
                                >
                                    <FontAwesomeIcon icon={faHistory}/><span>History</span>
                                </button>
                            </li>
                            <li style={{"marginTop": "80px"}}>
                                <button onClick={() => this.toggleRightContentName("support")}
                                        className={this.state.rightContentName === "support" ? "selected" : ""}
                                >
                                    <FontAwesomeIcon icon={faLifeRing}/><span>Support</span>
                                </button>
                            </li>
                            <li style={{"marginTop": "80px"}}>
                                <button onClick={() => this.toggleRightContentName("about")}
                                        className={this.state.rightContentName === "about" ? "selected" : ""}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle}/><span>About</span>
                                </button>
                            </li>
                        </GEList>
                    </MainContent>
                </Main>
                <GEFooter>
                    <List type={"nav-left"}>
                        {
                            this.state.isConnected2Gremlin
                                ?
                                <li className={"ml-5"}>
                                    <Indicator isConnected2Gremlin={this.state.isConnected2Gremlin}/>
                                </li>
                                : <span></span>
                        }
                        <li><span>{this.state.statusMessage} </span></li>
                        {
                            this.state.isLoading && this.state.loaderElapsedTimer && this.state.loaderElapsedTimer > 0
                                ? <li><span>({this.state.loaderElapsedTimer}s elapsed)</span></li>
                                : <span></span>
                        }
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
                                            this.getLatestResponse().status < 200 && this.getLatestResponse().status > 300
                                                ? <strong
                                                    className={"error-badge"}>{this.getLatestResponse().status}</strong>
                                                : <strong
                                                    className={"ok-badge"}>{this.getLatestResponse().status}</strong>
                                            : <strong>NA</strong>
                                    }&nbsp;response</span>

                                    <span>
                                        {this.queryEndedAt - this.queryStartedAt} ms
                                    </span>
                                </button>
                            </li>
                            : <li><span></span></li>
                        }
                        <li>
                            <span>{this.state.canvasType} canvas</span>
                        </li>
                        <li>
                            <span>{this.dataStore.getVerticesCount()} vertices, {this.dataStore.getEdgesCount()} edges</span>
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
                                    setRightContentName={this.setRightContentName.bind(this)}
                                    onClose={() => this.setRightContentName(null)}/>
                                </GEPanel>
                                : this.state.rightContentName === "whats-new"
                                ?
                                <GEPanel
                                    title={"What's New"}
                                    onClickClose={() => this.setRightContentName(null)}
                                    showToggleBtn={false}
                                > <WhatsNew
                                    setLeftContentName={this.setLeftContentName.bind(this)}
                                    onClose={() => this.setRightContentName(null)}/>
                                </GEPanel>
                                : <span></span>
                        }
                        {
                            this.state.rightContentName === "settings"
                                ? (
                                    <GEPanel
                                        title={"Settings"}
                                        onClickClose={() => this.setRightContentName(null)}
                                        showToggleBtn={false}
                                    >
                                        <SettingsComponent/>
                                    </GEPanel>
                                ) :
                                this.state.rightContentName === "learn"
                                    ? (
                                        <GEPanel
                                            title={"Get Started"}
                                            onClickClose={() => this.setRightContentName(null)}
                                            showToggleBtn={false}
                                        >
                                            <LearnComponent
                                                addQueryToConsole={this.addQueryToConsole.bind(this)}
                                                makeQuery={this.makeQuery.bind(this)}
                                                onClose={() => this.setLeftContentName(null)}
                                            />


                                        </GEPanel>
                                    ) :
                                    this.state.rightContentName === "support"
                                        ? (
                                            <GEPanel
                                                title={"Support"}
                                                // onClickClose={() => this.setRightContentName(null)}
                                                showCloseBtn={false}
                                                showToggleBtn={false}
                                            >
                                                <SupportComponent/>
                                            </GEPanel>
                                        ) :
                                        this.state.rightContentName === "about"
                                            ? (
                                                <GEPanel
                                                    title={"About"}
                                                    // onClickClose={() => this.setRightContentName(null)}
                                                    showCloseBtn={false}
                                                    showToggleBtn={false}
                                                >
                                                    <AboutComponent/>
                                                </GEPanel>
                                            ) : (<span></span>)
                        }
                    </AsideRight>
                ) : (
                    <span/>
                )}
                {this.state.rightContentName &&
                (this.state.rightContentName === "history"
                    || this.state.rightContentName === "query-console") ? (
                    <AsideRight size={"lg"}>
                        {
                            this.state.rightContentName === "history" ? (
                                <GEPanel
                                    title={"History"}
                                    // onClickClose={() => this.setRightContentName(null)}
                                    showToggleBtn={false}
                                    showCloseBtn={false}>
                                    <HistoryComponent
                                        makeQuery={this.makeQuery.bind(this)}
                                        // requestBuilder={this.requestBuilder}
                                        addQueryToConsole={this.addQueryToConsole.bind(this)}
                                    />
                                </GEPanel>
                            ) : this.state.rightContentName === "query-console" ? (
                                <QueryConsole
                                    makeQuery={this.makeQuery.bind(this)}
                                    connector={this.connector}
                                    defaultQuery={this.state.query}
                                    // value={this.state.defaultQuery}
                                    onClose={() => {
                                        this.setRightContentName(null);
                                        // this.setDefaultQuery("");
                                    }}
                                />
                            ) : <span></span>
                        }
                    </AsideRight>
                ) : (
                    <span/>
                )}
                {super.render()}
            </div>
        );
    }
}
