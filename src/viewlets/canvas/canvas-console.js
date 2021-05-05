import React from "react";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCamera,
    faCog,
    faDesktop,
    faDownload, faExpand,
    faHistory,
    faSync, faTrash,

} from "@fortawesome/free-solid-svg-icons";


export default class CanvasConsole extends React.Component {


    render() {
        return (
            <div className={"d-flex position-absolute"}
                 style={{"width": "420px", "top": "26px"}}>
                <div className={" flex-fill ml-3 bg-light"}>
                    {/*<FontAwesomeIcon icon={faSearch} className={"mr-2 ml-2 mt-2"}/>*/}

                    {/*<span className={"text-muted"}>*/}
                    {/*    <Button variant="link" className={" text-dark"}>*/}
                    {/*        <FontAwesomeIcon icon={faSearch} className={"mr-2"}/>*/}
                    {/*        Ctrl + / to start gremlin query </Button>*/}

                    {/*</span>*/}
                    <ul className="nav nav-pills nav-canvas d-flex justify-content-start text-center pt-2 pb-1 ml-2 border border-bottom-0">
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1  pr-2 pl-2 justify-content-center flex-column  ">
                                <FontAwesomeIcon icon={faBars}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1  pr-2 pl-2 justify-content-center flex-column  ">
                                <FontAwesomeIcon icon={faCamera}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1  pr-2 pl-2 justify-content-center flex-column  ">
                                <FontAwesomeIcon icon={faSync}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1 pr-2 pl-2 justify-content-center flex-column  ">
                                <FontAwesomeIcon icon={faDownload}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1  pr-2 pl-2 justify-content-center flex-column  ">
                                <FontAwesomeIcon icon={faDesktop}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1  pr-2 pl-2 justify-content-center flex-column  ">
                                <FontAwesomeIcon icon={faHistory}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1  pr-2 pl-2 justify-content-center flex-column  ">
                                <FontAwesomeIcon icon={faExpand}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1  pr-2 pl-2 justify-content-center flex-column  ">
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </li>
                        <li className="nav-item ">
                            <Button type="button" variant={"link"}
                                    className="nav-link small  d-flex align-items-start pt-0 pb-1 pr-2 pl-2 justify-content-center flex-column ">
                                <FontAwesomeIcon icon={faCog}/>
                            </Button>
                        </li>
                    </ul>

                    <Form inline>

                        <Form.Control
                            autoComplete={"off"}
                            className=" ml-2 flex-fill rounded-0 border-top-0                                    "
                            id="inlineFormInputName2"
                            style={{"maxWidth": "400px"}}
                            type={"text"}
                            placeholder="Ctrl + / to start gremlin query"
                        />
                        {/*<Form.Control as={"textarea"}*/}
                        {/*              autoComplete={"off"}*/}
                        {/*              className=" ml-2 flex-fill rounded-0 border-top-0                                    "*/}
                        {/*              style={{"maxWidth": "400px"}}*/}
                        {/*              type={"text"}*/}
                        {/*              rows={20}*/}
                        {/*              placeholder="Ctrl + / to start gremlin query"*/}
                        {/*/>*/}

                        {/*<Button type="submit" variant={"primary"}*/}
                        {/*        className="mt-1 pl-3 pr-3 rounded-0 ">*/}
                        {/*    <FontAwesomeIcon icon={faSearch}/>*/}
                        {/*</Button>*/}

                        {/*<InputGroup>*/}
                        {/*    <InputGroup.Prepend>*/}
                        {/*        <Button variant="outline-secondary" className={" ml-2"}><FontAwesomeIcon icon={faList}/></Button>*/}
                        {/*    </InputGroup.Prepend>*/}
                        {/*    <FormControl className={" flex-fill"}*/}
                        {/*                 placeholder="Ctrl + / to start gremlin query"*/}
                        {/*    />*/}
                        {/*    <InputGroup.Append>*/}
                        {/*        <Button variant="outline-secondary"><FontAwesomeIcon icon={faHistory}/></Button>*/}
                        {/*        <Button variant="outline-secondary"><FontAwesomeIcon icon={faSearch}/></Button>*/}
                        {/*    </InputGroup.Append>*/}
                        {/*</InputGroup>*/}


                    </Form>

                </div>

            </div>


        );
    }
}
