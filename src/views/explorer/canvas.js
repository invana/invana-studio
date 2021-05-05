import React from "react";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCog,
    faDatabase,
    faDownload, faExpand,
    faHistory,
    faList,
    faSearch,
    faWindowMaximize
} from "@fortawesome/free-solid-svg-icons";


export default class Canvas extends React.Component {


    render() {
        return (

            <div className="d-flex  flex-column" style={{"height": "100%"}}>
                <div className="" style={{"height": "calc(100% - 24px)"}}>
                    {/* top section starts here */}
                    <div className={"d-flex position-absolute"}
                         style={{"width": "calc(100% - 46px)", "top": "5px"}}>
                        <div className={" flex-fill"}>
                            {/*<FontAwesomeIcon icon={faSearch} className={"mr-2 ml-2 mt-2"}/>*/}

                            {/*<span className={"text-muted"}>*/}
                            {/*    <Button variant="link" className={" text-dark"}>*/}
                            {/*        <FontAwesomeIcon icon={faSearch} className={"mr-2"}/>*/}
                            {/*        Ctrl + / to start gremlin query </Button>*/}

                            {/*</span>*/}
                            <Form inline>

                                <Form.Control
                                    autoComplete={"off"}
                                    className=" mt-1 ml-2 flex-fill rounded-0 border-top-0
                                    border-left-0 border-right-0"
                                    id="inlineFormInputName2"
                                    style={{"maxWidth": "320px"}}
                                    type={"text"}
                                    placeholder="Ctrl + / to start gremlin query"
                                />
                                {/*<Button type="submit" variant={"primary"}*/}
                                {/*        className="mt-1 pl-3 pr-3 rounded-0 ">*/}
                                {/*    <FontAwesomeIcon icon={faSearch}/>*/}
                                {/*</Button>*/}

                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <Button variant="outline-secondary" className={" ml-2"}><FontAwesomeIcon icon={faList}/></Button>
                                    </InputGroup.Prepend>
                                    <FormControl className={" flex-fill"}
                                                 placeholder="Ctrl + / to start gremlin query"
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary"><FontAwesomeIcon icon={faHistory}/></Button>
                                        <Button variant="outline-secondary"><FontAwesomeIcon icon={faSearch}/></Button>
                                    </InputGroup.Append>
                                </InputGroup>


                            </Form>
                        </div>
                        <div className={" flex-fill p-2"}>
                            {/*<h5>Hello Explorer Here</h5>*/}

                            <ul className="nav nav-pills nav-canvas d-flex justify-content-end   text-center">
                                <li className="nav-item ">
                                    <Button type="button" variant={"link"}
                                            className="nav-link small  d-flex align-items-start pt-0 pb-1  pr-2 pl-2 justify-content-center flex-column  ">
                                        <FontAwesomeIcon icon={faHistory}/>
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
                                        <FontAwesomeIcon icon={faExpand}/>
                                    </Button>
                                </li>
                                <li className="nav-item ">
                                    <Button type="button" variant={"link"}
                                            className="nav-link small  d-flex align-items-start pt-0 pb-1 pr-2 pl-2 justify-content-center flex-column ">
                                        <FontAwesomeIcon icon={faCog}/>
                                    </Button>
                                </li>
                            </ul>

                        </div>
                    </div>
                    {/* top section ends here */}
                </div>
                <div style={{"height": "24px"}} className={"pl-2 pr-2 border-top"}>Footer comes here</div>
                {/*<div className="p-2 bd-highlight">Flex item</div>*/}
            </div>

        );
    }
}
