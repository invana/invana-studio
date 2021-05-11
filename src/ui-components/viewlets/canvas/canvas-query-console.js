import React from "react";
import {Button, Form} from "react-bootstrap";
import PropTypes from "prop-types";


export default class CanvasQueryConsole extends React.Component {

    static propTypes = {
        showHistory: PropTypes.bool,
    }

    render() {
        return (
            <div className={" position-absolute  d-flex"} style={{"width": "420px", "top": "59px"}}>
                <div className={" flex-fill ml-3 border bg-white p-2"}>


                    <Form.Control as={"textarea"}
                                  autoComplete={"off"}
                                  className=" ml-0 flex-fill rounded-0 border-0"
                                  type={"text"}
                                  rows={20}
                                  placeholder="Ctrl + / to start gremlin query"
                    />
                    <div className={"pt-2"}>
                        <Button variant={"outline-primary position-relative pt-0 pb-0"} size="sm"
                                type={"submit"}>Submit Query</Button>
                        <Button variant={"outline-secondary position-relative ml-2 pt-0 pb-0"} size="sm">close</Button>
                    </div>

                    {/*<Form.Control as={"textarea"}*/}
                    {/*              autoComplete={"off"}*/}
                    {/*              className=" ml-2 flex-fill rounded-0 border-top-0"*/}
                    {/*              style={{"maxWidth": "400px"}}*/}
                    {/*              type={"text"}*/}
                    {/*              rows={20}*/}
                    {/*              placeholder="Ctrl + / to start gremlin query"*/}
                    {/*/>*/}
                </div>
            </div>
        )
    }
}