import BaseView from "./base";
import React, {Fragment} from "react";
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
// import MainContentMiddle from "../ui-components/layout/main-content-middle";
// import MainContentRight from "../ui-components/layout/main-content-right";
// import AsideBottom from "../ui-components/layout/aside-bottom";
import GEFooter from "../ui-components/layout/footer";
import AsideRight from "../ui-components/layout/aside-right";
import SettingsComponent from "../viewlets/settings";
import LearnComponent from "../viewlets/learn";
import HistoryComponent from "../viewlets/history";
import SupportComponent from "../viewlets/support";
// import QueryConsole from "../canvas/nav-ui-components/query-console";
// import VerticesManagement from "../viewlets/vertices-management";
// import EdgesManagement from "../viewlets/edges-management";
import AboutComponent from "../viewlets/about";
// import {REPO_URL} from "../config";
// import SelectedData from "../viewlets/selected-data";
import VertexOptions from "../viewlets/vertex-options";
import FounderNote from "../viewlets/founder-note";
// import WhatsNew from "../viewlets/whats-new";
import GEList from "../ui-components/lists/list";
import Canvas from "../canvas/canvas";
import QueryConsole from "../canvas/nav-ui-components/query-console";
// import AsideTop from "../ui-components/layout/aside-top";
import AsideContent from "../ui-components/layout/aside-content";
import GraphOverview from "../viewlets/overview";
import CanvasNav from "../canvas/canvas-nav";
// import GetStarted from "../viewlets/get-started";
import FilterNodes from "../canvas/nav-ui-components/filter-nodes";
import FocusNode from "../canvas/nav-ui-components/focus-node";
// import NodeMenu from "../canvas/graph/node-menu";

const Mousetrap = require("mousetrap");

export default class ExplorerView extends BaseView {


    state = {
        ...this.state,
        focusedNodes: [],
        leftContentName: "overview",
        rightContentName: "founder-note",
        canvasType: "graph",
        canvasMenuType: null,
        canvasBgColor: "#181818"
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
        this.setState({rightContentName: "query-console"});
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

    setGraphicsEngine(graphicsEngine) {
        this.setState({graphicsEngine: graphicsEngine})
    }

    getGraphicsEngine() {
        return this.state.graphicsEngine;
    }

    getSetFocusedNodes(focusedNodes) {
        return focusedNodes;
    }

    setCanvasType(canvasType) {
        console.log("setCanvasType", canvasType);
        this.setState({canvasType: canvasType});
        this.resetShallReRenderD3Canvas();
    }

    setCanvasCtrl(canvasCtrl) {
        this.setState({canvasCtrl: canvasCtrl});
    }

    setFocusedNodes(nodes) {
        console.log("setFocusedNodes", nodes);
        this.setState({focusedNodes: nodes});
        // this.props.getSetFocusedNodes(nodes);
    }

    getFocusedNodes() {
        console.log("getFocusedNodes", this.state.focusedNodes);
        return this.state.focusedNodes;
    }

    switchToCanvasMenu(canvasMenuType) {
        console.log("updating canvasMenuType", canvasMenuType);
        this.setState({
            canvasMenuType: canvasMenuType
        });
    }

    setCanvasBgColor(canvasBgColor) {
        this.setState({canvasBgColor: canvasBgColor});
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
                    <CanvasNav
                        canvasType={this.state.canvasType}
                        canvasCtrl={this.state.canvasCtrl}
                        makeQuery={this.makeQuery.bind(this)}
                        connector={this.connector}
                        dataStore={this.dataStore}
                        canvasMenuType={this.state.canvasMenuType}
                        // getGraphicsEngine={this.getGraphicsEngine.bind(this)}
                        // setFocusedNodes={this.setFocusedNodes.bind(this)}
                        defaultQuery={this.state.query}
                        setDefaultQuery={this.addQueryToConsole.bind(this)}

                        rightContentName={this.state.rightContentName}
                        leftContentName={this.state.leftContentName}

                        setRightContentName={this.setRightContentName.bind(this)}
                        setLeftContentName={this.setLeftContentName.bind(this)}


                        switchToCanvasMenu={this.switchToCanvasMenu.bind(this)}

                        setFocusedNodes={this.setFocusedNodes.bind(this)}
                        getFocusedNodes={this.getFocusedNodes.bind(this)}


                        // switchCanvasTo={this.switchCanvasTo.bind(this)}
                        // confirmFlushCanvas={this.confirmFlushCanvas.bind(this)}
                        // confirmRedrawCanvas={this.confirmRedrawCanvas.bind(this)}
                    />

                    {/*<List type={"nav-right"}>*/}


                    {/*    <li>*/}
                    {/*        <button className={this.state.leftContentName === "learn" ? "selected no-bg" : "no-bg"}*/}
                    {/*                onClick={() => this.setLeftContentName("learn")}>*/}
                    {/*            /!* eslint-disable-next-line react/no-unescaped-entities *!/*/}
                    {/*            <FontAwesomeIcon icon={faCubes}/> Get Started*/}
                    {/*        </button>*/}
                    {/*    </li>*/}
                    {/*    /!*<li>*!/*/}
                    {/*    /!*    <button className={"no-bg"} onClick={() => this.setRightContentName("history")}>*!/*/}
                    {/*    /!*        <FontAwesomeIcon icon={faHistory}/>*!/*/}
                    {/*    /!*    </button>*!/*/}
                    {/*    /!*</li>*!/*/}

                    {/*    /!*<li>*!/*/}
                    {/*    /!*    <button className={"no-bg"} onClick={() => this.setRightContentName("learn")}>*!/*/}
                    {/*    /!*        <FontAwesomeIcon icon={faBook}/>*!/*/}
                    {/*    /!*    </button>*!/*/}
                    {/*    /!*</li>*!/*/}

                    {/*    <li>*/}
                    {/*        <button*/}
                    {/*            className={this.state.rightContentName === "founder-note" ? "selected no-bg" : "no-bg"}*/}
                    {/*            onClick={() => this.setLeftContentName("founder-note")}>*/}
                    {/*            <FontAwesomeIcon icon={faStickyNote}/>*/}
                    {/*        </button>*/}
                    {/*    </li>*/}

                    {/*    <li>*/}
                    {/*        <button className={this.state.leftContentName === "settings" ? "selected no-bg" : "no-bg"}*/}
                    {/*                onClick={() => this.setLeftContentName("settings")}>*/}
                    {/*            <FontAwesomeIcon icon={faCog}/>*/}
                    {/*        </button>*/}
                    {/*    </li>*/}


                    {/*    /!*<li style={{"padding": "0 5px"}}>*!/*/}
                    {/*    /!*    <a style={{"padding": 0}} rel="noopener noreferrer" target={"_blank"} href={REPO_URL}>*!/*/}
                    {/*    /!*        <img*!/*/}
                    {/*    /!*            src="https://img.shields.io/github/stars/invanalabs/graph-explorer?color=%23429770&label=stars&logo=github&style=flat-square"*!/*/}
                    {/*    /!*            alt=""/>*!/*/}
                    {/*    /!*    </a>*!/*/}
                    {/*    /!*</li>*!/*/}
                    {/*</List>*/}
                </GEHeader>
                <Main>
                    {/*<AsideTop>*/}

                    {/*</AsideTop>*/}
                    <AsideLeftNav>
                        <GEList type={"aside-left"}>

                            <li style={{"marginTop": "105px"}}>
                                <button onClick={() => this.toggleLeftContentName("overview")}
                                        className={this.state.leftContentName === "overview" ? "selected" : ""}
                                >
                                    <FontAwesomeIcon icon={faHome}/> <span>Overview</span>
                                </button>
                            </li>


                            <li style={{"marginTop": "82px"}}>
                                <button onClick={() => this.toggleLeftContentName("settings")}
                                        className={this.state.leftContentName === "settings" ? "selected" : ""}
                                >
                                    <FontAwesomeIcon icon={faCog}/><span>Settings</span>
                                </button>
                            </li>
                            <li style={{"marginTop": "100px"}}>
                                <button onClick={() => this.toggleLeftContentName("learn")}
                                        className={this.state.leftContentName === "learn" ? "selected" : ""}
                                >
                                    <FontAwesomeIcon icon={faCubes}/><span>Get&nbsp;Started</span>
                                </button>
                            </li>
                            {/*<li style={{"marginTop": "80px"}}>*/}
                            {/*    <button onClick={() => this.toggleLeftContentName("about")}*/}
                            {/*            className={this.state.leftContentName === "about" ? "selected" : ""}*/}
                            {/*    >*/}
                            {/*        <FontAwesomeIcon icon={faInfoCircle}/><span>About</span>*/}
                            {/*    </button>*/}
                            {/*</li>*/}
                        </GEList>
                    </AsideLeftNav>

                    <MainContent leftContentName={this.state.leftContentName}
                                 style={{"backgroundColor": this.state.canvasBgColor}}>
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


                            // getGraphicsEngine={this.getGraphicsEngine.bind(this)}
                            // getSetFocusedNodes={this.getSetFocusedNodes.bind(this)}
                            //
                            canvasType={this.state.canvasType}
                            focusedNodes={this.state.focusedNodes}

                            setGraphicsEngine={this.setGraphicsEngine.bind(this)}
                            getGraphicsEngine={this.getGraphicsEngine.bind(this)}

                            setCanvasType={this.setCanvasType.bind(this)}
                            setCanvasCtrl={this.setCanvasCtrl.bind(this)}

                            getFocusedNodes={this.getFocusedNodes.bind(this)}
                            setFocusedNodes={this.setFocusedNodes.bind(this)}

                        />
                    </MainContent>
                    <AsideRight>
                        <GEList type={"aside-right"}>

                            {/*<li style={{"marginTop": "22px"}}>*/}
                            {/*    <button onClick={() => this.toggleRightContentName("overview")}*/}
                            {/*            className={this.state.rightContentName === "overview" ? "selected" : ""}*/}
                            {/*    >*/}
                            {/*        <FontAwesomeIcon icon={faHome}/><span>Overview</span>*/}
                            {/*    </button>*/}
                            {/*</li>*/}

                            <li style={{"marginTop": "20px"}}>
                                <button onClick={() => this.toggleRightContentName("query-console")}
                                        className={this.state.rightContentName === "query-console" ? "selected" : ""}
                                >
                                    <FontAwesomeIcon icon={faTerminal}/><span>Query&nbsp;Console</span>
                                </button>
                            </li>
                            <li style={{"marginTop": "122px"}}>
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
                    </AsideRight>


                    {(() => {
                        if (this.state.leftContentName === "settings") {
                            return (
                                <AsideContent position={"left"} size={"sm"}>
                                    <GEPanel
                                        title={"Settings"}
                                        onClickClose={() => this.setLeftContentName(null)}
                                        showToggleBtn={false}
                                        showCloseBtn={false}
                                        headerIcon={faCog}
                                    >
                                        <SettingsComponent
                                            canvasBgColor={this.state.canvasBgColor}
                                            setCanvasBgColor={this.setCanvasBgColor.bind(this)}/>
                                    </GEPanel>
                                </AsideContent>
                            )
                        } else if (this.state.leftContentName === "overview") {
                            return (
                                <AsideContent position={"left"} size={"sm"}>
                                    <GEPanel
                                        title={"Overview"}
                                        onClickClose={() => this.setLeftContentName(null)}
                                        headerIcon={faHome}
                                        showCloseBtn={false}
                                        showToggleBtn={false}
                                    >
                                        <GraphOverview setShowVertexOptions={this.setShowVertexOptions.bind(this)}
                                                       parentElem={this}
                                        />
                                    </GEPanel>
                                </AsideContent>
                            )

                        } else if (this.state.leftContentName === "learn") {
                            return (
                                <AsideContent position={"left"} size={"md"}>
                                    <GEPanel
                                        title={"Get Started"}
                                        // onClickClose={() => this.setLeftContentName(null)}
                                        showCloseBtn={false}
                                        showToggleBtn={false}
                                        headerIcon={faCubes}

                                    >
                                        <LearnComponent
                                            addQueryToConsole={this.addQueryToConsole.bind(this)}
                                            makeQuery={this.makeQuery.bind(this)}
                                            onClose={() => this.setLeftContentName("overview")}
                                        />

                                    </GEPanel>
                                </AsideContent>
                            )


                        } else {
                            return (
                                <span></span>
                            )
                        }
                    })()}
                    {this.state.middleBottomContentName === "vertex-options" && this.state.selectedLabel
                        ?
                        <AsideContent position={"left"} size={"sm"}>

                            <GEPanel
                                title={this.state.selectedLabel + " | Element Options"}
                                // title={null}
                                onClickClose={() => {
                                    this.setHideVertexOptions();
                                    this.setRightContentName(null)
                                }}
                                showToggleBtn={false}
                                showCloseBtn={false}
                            >
                                <VertexOptions selectedLabel={this.state.selectedLabel}
                                               selectedLabelType={this.state.selectedLabelType}
                                               setStatusMessage={this.setStatusMessage.bind(this)}
                                               setErrorMessage={this.setErrorMessage.bind(this)}
                                               setHideVertexOptions={this.setHideVertexOptions.bind(this)}
                                               onClose={() => {
                                                   this.setHideVertexOptions.bind(this);
                                                   this.setRightContentName(null)
                                               }}
                                               reRenderCanvas={this.reRenderCanvas.bind(this)}
                                               setShallReRenderD3Canvas={this.setShallReRenderD3Canvas.bind(this)}
                                />

                            </GEPanel>
                        </AsideContent>
                        : <span></span>
                    }


                    {(() => {
                        if (this.state.rightContentName === "query-console") {
                            return (
                                <AsideContent position={"right"} size={"lg"}>
                                    <GEPanel
                                        title={"Query Console"}
                                        onClickClose={() => this.setRightContentName(null)}
                                        showToggleBtn={false}
                                        showCloseBtn={false}
                                        headerIcon={faTerminal}
                                    >
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
                                    </GEPanel>
                                </AsideContent>
                            )
                        } else if (this.state.rightContentName === "founder-note") {
                            return (
                                <AsideContent position={"right"} size={"lg"}>
                                    <GEPanel
                                        title={"Note from Project Creator"}
                                        onClickClose={() => this.setRightContentName(null)}
                                        showCloseBtn={true}
                                        showToggleBtn={false}
                                        headerIcon={faStickyNote}

                                    >
                                        <FounderNote
                                            setRightContentName={this.setRightContentName.bind(this)}
                                            setLeftContentName={this.setLeftContentName.bind(this)}
                                            onClose={() => this.setRightContentName(null)}/>

                                    </GEPanel>
                                </AsideContent>
                            )
                        } else if (this.state.rightContentName === "history") {
                            return (
                                <AsideContent position={"right"} size={"lg"}>
                                    <GEPanel
                                        title={"History"}
                                        // onClickClose={() => this.setRightContentName(null)}
                                        showCloseBtn={false}
                                        showToggleBtn={false}
                                        headerIcon={faHistory}
                                    >
                                        <HistoryComponent
                                            makeQuery={this.makeQuery.bind(this)}
                                            // requestBuilder={this.requestBuilder}
                                            addQueryToConsole={this.addQueryToConsole.bind(this)}
                                        />
                                        {/*<AboutComponent/>*/}
                                    </GEPanel>
                                </AsideContent>
                            )
                        } else if (this.state.rightContentName === "support") {
                            return (
                                <AsideContent position={"right"} size={"md"}>
                                    <GEPanel
                                        title={"Support"}
                                        // onClickClose={() => this.setRightContentName(null)}
                                        showCloseBtn={false}
                                        showToggleBtn={false}
                                        headerIcon={faLifeRing}
                                    >
                                        <SupportComponent/>
                                    </GEPanel>
                                </AsideContent>
                            )
                        } else if (this.state.rightContentName === "about") {
                            return (
                                <AsideContent position={"right"} size={"md"}>
                                    <GEPanel
                                        title={"About"}
                                        // onClickClose={() => this.setRightContentName(null)}
                                        showCloseBtn={false}
                                        showToggleBtn={false}
                                        headerIcon={faInfoCircle}
                                    >
                                        <AboutComponent/>
                                    </GEPanel>
                                </AsideContent>
                            )
                        } else {
                            return (
                                <span></span>
                            )
                        }
                    })()}

                    {/*{*/}
                    {/*    this.state.middleBottomContentName === "selected-data-overview" && this.state.selectedElementData*/}
                    {/*        ? <AsideContent position={"left"} size={"sm"}>*/}

                    {/*            <GEPanel*/}
                    {/*                // title={"Selected Element Data"}*/}
                    {/*                title={this.state.selectedElementData.meta.labelOptions.labelText*/}
                    {/*                || this.state.selectedElementData.id.toString()}*/}
                    {/*                headerStyle={{*/}
                    {/*                    'color': this.state.selectedElementData.type === "g:Vertex"*/}
                    {/*                        ? this.state.selectedElementData.meta.shapeOptions.fillColorHex*/}
                    {/*                        : this.state.selectedElementData.meta.shapeOptions.strokeColorHex,*/}
                    {/*                    // 'color': invertColor(this.state.selectedElementData.meta.shapeOptions.fillColor, true)*/}
                    {/*                }}*/}
                    {/*                showToggleBtn={false}*/}
                    {/*                showCloseBtn={true}*/}
                    {/*                onClickClose={() => {*/}
                    {/*                    this.setHideVertexOptions();*/}
                    {/*                    // this.setLeftContentName(null)*/}
                    {/*                }}*/}
                    {/*            >*/}
                    {/*                <SelectedData*/}

                    {/*                    setFocusedNodes={this.setFocusedNodes.bind(this)}*/}
                    {/*                    getFocusedNodes={this.getFocusedNodes.bind(this)}*/}


                    {/*                    connector={this.connector}*/}
                    {/*                    selectedElementData={this.props.selectedElementData}*/}
                    {/*                    makeQuery={this.makeQuery.bind(this)}*/}
                    {/*                    graphicsEngine={this.state.graphicsEngine}*/}
                    {/*                    setDefaultQuery={this.addQueryToConsole.bind(this)}*/}
                    {/*                    setRightContentName={this.state.setRightContentName}*/}


                    {/*                    selectedData={this.state.selectedElementData}*/}
                    {/*                    onClose={() => {*/}
                    {/*                        this.setSelectedElementData(null);*/}
                    {/*                        // this.setLeftContentName(null)*/}
                    {/*                    }}/>*/}

                    {/*            </GEPanel>*/}
                    {/*        </AsideContent>*/}
                    {/*        : <span></span>*/}
                    {/*}*/}


                    {
                        this.state.canvasMenuType === "filter-nodes"
                            ? (<FilterNodes onClose={this.switchToCanvasMenu.bind(this)}/>)
                            // : this.state.canvasMenuType === "query-console"
                            // // && (this.props.defaultQuery && !this.props.defaultQuery.query)
                            // ? (
                            //     <QueryConsole
                            //         makeQuery={this.props.makeQuery}
                            //         connector={this.props.connector}
                            //         defaultQuery={this.props.defaultQuery}
                            //         // value={this.state.defaultQuery}
                            //         onClose={() => {
                            //             this.switchToCanvasMenu(null);
                            //             this.props.setDefaultQuery("");
                            //         }}
                            //     />
                            // )
                            : this.state.canvasMenuType === "focus-node"
                            ? (<FocusNode
                                onClose={this.switchToCanvasMenu.bind(this)}
                                dataStore={this.dataStore}
                                graphicsEngine={this.state.graphicsEngine}
                                setFocusedNodes={this.setFocusedNodes.bind(this)}
                            />)
                            : (<Fragment/>)
                    }
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

                {super.render()}
            </div>
        );
    }
}
