import React from "react";
import "./query-textarea.scss";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import TLN from "./tln";

export default class QueryTextarea extends React.Component {

    static propTypes = {
        onChange: PropTypes.func,
        onKeyDown: PropTypes.func,
        canvasQueryString: PropTypes.string,
        style: PropTypes.object
        // canvasQueryString: PropTypes.string,
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         canvasQueryString: this.props.canvasQueryString
    //     }
    // }
    //
    // onQueryChange(e) {
    //     this.setState({canvasQueryString: e.target.value});
    // }

    componentDidMount() {
        TLN.append_line_numbers("queryTextArea")
    }


    render() {
        return (
            <div className="textarea-wrapper w-100">
                <Form.Control as={"textarea"}
                              autoComplete={"off"}
                              className=" ml-0 pl-3 h-100 pr-3 flex-fill query-textarea rounded-0 border-0"
                              type={"text"}
                              name={"canvasQueryString"}
                              style={this.props.style}
                              placeholder="start your gremlin query here"
                              spellCheck={false}
                              autoFocus
                              id={"queryTextArea"}
                              onChange={this.props.onChange}
                              onKeyDown={this.props.onKeyDown}
                              value={this.props.canvasQueryString || ''}
                />
            </div>
        )
    }
}