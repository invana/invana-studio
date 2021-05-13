import React from "react";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCamera,
    faCog,
    faDesktop,
    faDownload, faExpand,
    faHistory, faSearch,
    faSync, faTerminal, faTrash,

} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import {faStopCircle} from "@fortawesome/free-regular-svg-icons";


export default class CanvasConsoleOptions extends React.Component {

    static propTypes = {
        setLeftContentName: PropTypes.func,
        canvasCtrl: PropTypes.object,
        isQuerying: PropTypes.bool,
        isRenderingCanvas: PropTypes.bool,
        leftContentName: PropTypes.string
    }

    render() {
        return (
            <div className={"d-flex position-absolute"}
                 style={{"width": "420px", "top": "26px"}}>
                <div className={" flex-fill ml-3 bg-light"}>

                    <ul className="nav nav-pills nav-canvas d-flex justify-content-start text-center pt-1 pb-0 pl-3 pr-3 ml-0 border border-bottom-0">
                        <li className="nav-item ">
                            <Button type="button" variant={null}
                                    onClick={() => this.props.setLeftContentName('query-console')}
                                    className={`nav-link small  d-flex align-items-start pt-1 pb-1 mr-0 pr-2 
                                     pl-2 justify-content-center flex-column   ${this.props.leftContentName === "query-console" ? " btn-primary text-white" : " text-dark btn-link"} `}
                            >
                                <FontAwesomeIcon icon={faTerminal}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={null}
                                    onClick={() => this.props.setLeftContentName('graph-management')}
                                    className={`nav-link small  d-flex align-items-start pt-1 pb-1 mr-0 pr-2 
                                     pl-2 justify-content-center flex-column   ${this.props.leftContentName === "graph-management" ? " btn-primary text-white" : " text-dark btn-link"} `}

                            >
                                <FontAwesomeIcon icon={faBars}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"} title={"Canvas display settings"}
                                    onClick={() => this.props.setLeftContentName('canvas-display-settings')}
                                    className={`nav-link small  d-flex align-items-start pt-1 pb-1 mr-0 pr-2 
                                     pl-2 justify-content-center flex-column   ${this.props.leftContentName === "canvas-display-settings" ? " btn-primary text-white" : " text-dark btn-link"} `}
                            >
                                <FontAwesomeIcon icon={faDesktop}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    onClick={() => this.props.setLeftContentName('query-history')}
                                    className={`nav-link small  d-flex align-items-start pt-1 pb-1 mr-0 pr-2 
                                     pl-2 justify-content-center flex-column   ${this.props.leftContentName === "query-history" ? " btn-primary text-white" : " text-dark btn-link"} `}
>
                                <FontAwesomeIcon icon={faHistory}/>
                            </Button>
                        </li>


                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    onClick={() => this.props.canvasCtrl.downloadCanvasImageAsPNG()}
                                    className="nav-link small  d-flex align-items-start pt-1 pb-1 ml-4  pr-2 pl-2 justify-content-center flex-column  text-dark ">
                                <FontAwesomeIcon icon={faCamera}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"} onClick={() => this.props.canvasCtrl.centerGraph()}
                                    className="nav-link small  d-flex align-items-start pt-1 pb-1  pr-2 pl-2 justify-content-center flex-column text-dark  ">
                                <FontAwesomeIcon icon={faExpand}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            {this.props.isQuerying === true || this.props.isRenderingCanvas === true
                                ?
                                <Button size={"sm"} variant={"link"} type={"button"}
                                        className={"nav-link small  d-flex align-items-start pt-1 pb-1  pr-2 pl-2 justify-content-center flex-column  text-dark"}
                                        onClick={() => this.props.canvasCtrl.stopRenderingGraph()}>
                                    <FontAwesomeIcon icon={faStopCircle}/>
                                </Button>
                                : <Button size={"sm"} variant={"link"} type={"button"}
                                          className={"nav-link small  d-flex align-items-start pt-1 pb-1  pr-2 pl-2 justify-content-center flex-column  text-dark"}
                                          onClick={() => this.props.canvasCtrl.confirmRedrawCanvas()}>
                                    <FontAwesomeIcon icon={faSync}/>
                                </Button>
                            }


                        </li>
                        {/*<li className="nav-item ">*/}
                        {/*    <Button type="button" variant={"link"}*/}
                        {/*            className="nav-link small  d-flex align-items-start pt-0 pb-1 pr-2 pl-2 justify-content-center flex-column  text-dark ">*/}
                        {/*        <FontAwesomeIcon icon={faDownload}/>*/}
                        {/*    </Button>*/}
                        {/*</li>*/}


                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    onClick={() => this.props.canvasCtrl.confirmFlushCanvas()}
                                    className="nav-link small  d-flex align-items-end pt-1 pb-1  pr-2 pl-2 justify-content-end flex-column text-dark  ">
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </li>
                        {/*<li className="nav-item ">*/}
                        {/*    <Button type="button" variant={"link"}*/}
                        {/*            className="nav-link small  d-flex align-items-end pt-0 pb-1 pr-2 pl-2 justify-content-end flex-column  text-dark">*/}
                        {/*        <FontAwesomeIcon icon={faCog}/>*/}
                        {/*    </Button>*/}
                        {/*</li>*/}
                    </ul>
                    <Form inline>
                        <Form.Control
                            autoComplete={"off"}
                            className=" ml-0 flex-fill rounded-0 border-top-0                                    "
                            id="inlineFormInputName2"
                            type={"text"}
                            onFocus={() => this.props.setLeftContentName('query-console')}
                            placeholder="Ctrl + / to start gremlin query"
                        />
                    </Form>
                </div>
            </div>
        );
    }
}