import React from "react";
import {Button, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";


export default class QueryConsole extends React.Component {


    static propTypes = {
        requestBuilder: PropTypes.object,
        canvasQueryString: PropTypes.string,
        makeQuery: PropTypes.func,
        connector: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            canvasQueryString: this.props.canvasQueryString
        }
    }

    componentDidMount() {
        document.getElementsByTagName('textarea')[0].focus();
    }

    onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === true) {
            e.preventDefault();
            e.stopPropagation();
            this.formRef.dispatchEvent(new Event('submit'));
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.query !== prevProps.query) {

            console.log("this.props.query", this.props.canvasQueryString)
            const canvasQueryString = this.props.canvasQueryString.replace(/\\n/g, String.fromCharCode(13, 10))
            this.setState({canvasQueryString: canvasQueryString});
        }
    }

    onQueryChange(e) {
        this.setState({canvasQueryString: e.target.value});
    }


    onFormSubmit(_this, e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("=====_this", _this);
        if (e.target.canvasQueryString.value) {
            const query = _this.props.connector.requestBuilder.rawQuery(e.target.canvasQueryString.value)
            const queryPayloadCleaned = this.props.connector.requestBuilder.combineQueries(query, null);
            _this.props.makeQuery(queryPayloadCleaned, {source: "console"});
        } else {
            alert("Query cannot be null")
        }
    }

    render() {
        return (
            <div className={" position-absolute  d-flex"} style={this.props.style}>
                <div className={" flex-fill ml-3 border bg-white"}>
                    <form ref={e => this.formRef = e} id={"queryForm"} className={"h-100"}
                          onSubmit={(e) => this.onFormSubmit(this, e)}>
                        <Form.Control as={"textarea"}
                                      autoComplete={"off"}
                                      className=" ml-0 flex-fill rounded-0 border-0"
                                      type={"text"}
                                      name={"canvasQueryString"}
                                      style={{"height": "calc(100% - 40px)"}}
                                      placeholder="Ctrl + / to start gremlin query"
                                      spellCheck={false}
                                      autoFocus
                                      onChange={this.onQueryChange.bind(this)}
                                      onKeyDown={this.onEnterPress.bind(this)}
                                      value={this.state.canvasQueryString || ''}
                        />
                        <div className={"p-2 bg-white border-top "}>
                            <Button variant={"outline-primary position-relative pt-0 pb-0"} size="sm"
                                    type={"submit"}>Submit Query</Button>
                            <Button variant={"outline-secondary position-relative ml-2 pt-0 pb-0"} size="sm">
                                <FontAwesomeIcon icon={faWindowClose}/>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}