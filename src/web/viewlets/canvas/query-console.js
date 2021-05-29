import React from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import QueryTextarea from "../../query-textarea/query-textarea";
import {addQueryToLambda} from "../../../utils/localStorage";


export default class QueryConsole extends React.Component {


    static propTypes = {
        requestBuilder: PropTypes.object,
        canvasQueryString: PropTypes.string,
        makeQuery: PropTypes.func,
        connector: PropTypes.object,
        setLeftContentName: PropTypes.func,
        style: PropTypes.object,
        startNewQueryInConsole: PropTypes.func
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
        if (this.props.canvasQueryString !== prevProps.canvasQueryString) {
            console.log("this.props.query", this.props.canvasQueryString)
            const canvasQueryString = this.props.canvasQueryString.replace(/\\n/g, String.fromCharCode(13, 10))
            this.setState({canvasQueryString: canvasQueryString});
        }
    }

    onQueryChange(e) {

        this.props.startNewQueryInConsole(e.target.value);
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

    saveQueryToLambda() {
        addQueryToLambda(this.state.canvasQueryString);
    }

    render() {
        return (
            <div className={" position-absolute  d-flex"} style={this.props.style}>
                <div className={" flex-fill ml-3  bg-white"} style={{"minHeight": "465px"}}>
                    <form ref={e => this.formRef = e} id={"queryForm"} className={"border"}
                          onSubmit={(e) => this.onFormSubmit(this, e)}>
                        <QueryTextarea
                            style={{"minHeight": "420px"}}

                            onChange={this.onQueryChange.bind(this)}
                            onKeyDown={this.onEnterPress.bind(this)}
                            canvasQueryString={this.state.canvasQueryString || ''}
                        />
                        <div className={"pl-2  pt-2 pb-2 pr-3 bg-white border-top"}>
                            <div className="row">
                                <div className="col col-10">
                                    <Button variant={"outline-primary position-relative pt-0 pb-0 mr-2"} size="sm"
                                            type={"submit"}>Submit Query</Button>
                                    <Button variant={"outline-secondary position-relative pt-0 pb-0"} size="sm"
                                            onClick={() => this.saveQueryToLambda()}
                                            type={"button"}>save as lambda</Button>

                                </div>
                                <div className="col col-2">
                                    <Button variant={"outline-secondary float-right border-0" +
                                    " position-relative ml-2 pt-0 pb-0 mr-0 button-hover-bg-disable"}
                                            onClick={() => this.props.setLeftContentName(null)}
                                            size="sm">
                                        <FontAwesomeIcon icon={faWindowClose}/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="clearfix"/>
                </div>
            </div>
        )
    }
}
