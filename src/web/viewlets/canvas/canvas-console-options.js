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


export default class CanvasConsoleOptions extends React.Component {

    static propTypes = {
        showQueryConsole: PropTypes.func,
    }

    render() {
        return (
            <div className={"d-flex position-absolute"}
                 style={{"width": "420px", "top": "26px"}}>
                <div className={" flex-fill ml-3 bg-light"}>

                    <ul className="nav nav-pills nav-canvas d-flex justify-content-start text-center pt-2 pb-1 ml-0 border border-bottom-0">
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1 mr-0 pr-2 pl-2 justify-content-center flex-column  text-dark ">
                                <FontAwesomeIcon icon={faTerminal}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1 mr-1  pr-2 pl-2 justify-content-end flex-column  text-dark ">
                                 <FontAwesomeIcon icon={faBars}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1 mr-5 pr-2 pl-2 justify-content-center flex-column  text-dark ">
                                <FontAwesomeIcon icon={faHistory}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1 ml-4  pr-2 pl-2 justify-content-center flex-column  text-dark ">
                                <FontAwesomeIcon icon={faCamera}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1  pr-2 pl-2 justify-content-center flex-column  text-dark ">
                                <FontAwesomeIcon icon={faSync}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1 pr-2 pl-2 justify-content-center flex-column  text-dark ">
                                <FontAwesomeIcon icon={faDownload}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1  pr-2 pl-2 justify-content-center flex-column text-dark  ">
                                <FontAwesomeIcon icon={faDesktop}/>
                            </Button>
                        </li>

                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1  pr-2 pl-2 justify-content-center flex-column text-dark  ">
                                <FontAwesomeIcon icon={faExpand}/>
                            </Button>
                        </li>


                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-end pt-0 pb-1  pr-2 pl-2 justify-content-end flex-column text-dark  ">
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-end pt-0 pb-1 pr-2 pl-2 justify-content-end flex-column  text-dark">
                                <FontAwesomeIcon icon={faCog}/>
                            </Button>
                        </li>
                    </ul>
                    <Form inline>
                        <Form.Control
                            autoComplete={"off"}
                            className=" ml-0 flex-fill rounded-0 border-top-0                                    "
                            id="inlineFormInputName2"
                            type={"text"}
                            onFocus={() => this.props.showQueryConsole()}
                            placeholder="Ctrl + / to start gremlin query"
                        />
                    </Form>
                </div>
            </div>
        );
    }
}
