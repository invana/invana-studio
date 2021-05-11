import React from "react";
import {Button, Form} from "react-bootstrap";
import PropTypes from "prop-types";


export default class CanvasQueryConsole extends React.Component {
    static propTypes = {
        showHistory: PropTypes.bool,
    }

    render() {
        return (
            <div className={" position-absolute ml-3"} style={{"width": "396px", "top": "59px"}}>
                <Form.Control as={"textarea"}
                              autoComplete={"off"}
                              className=" ml-2 flex-fill rounded-0 border-top-0"
                              style={{"maxWidth": "400px"}}
                              type={"text"}
                              rows={20}
                              placeholder="Ctrl + / to start gremlin query"
                />
                <Button variant={"outline-outline position-relative ml-2 btn-sm"} style={{
                    "bottom": "47px", "right": "-310px"}}>close</Button>
                <Button variant={"outline-primary position-relative ml-2 btn-sm"} type={"submit"} style={{
                    "bottom": "47px", "right": "-310px"}}>Submit</Button>
                {/*<Form.Control as={"textarea"}*/}
                {/*              autoComplete={"off"}*/}
                {/*              className=" ml-2 flex-fill rounded-0 border-top-0"*/}
                {/*              style={{"maxWidth": "400px"}}*/}
                {/*              type={"text"}*/}
                {/*              rows={20}*/}
                {/*              placeholder="Ctrl + / to start gremlin query"*/}
                {/*/>*/}
            </div>
        )
    }
}