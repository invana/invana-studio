import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import "./query-console.scss";
import PropTypes from "prop-types";

const Mousetrap = require("mousetrap");

export default class QueryConsole extends React.Component {

    repeatTimer = null;

    static defaultProps = {
        onQuerySubmit: () => console.log("No Query Handler added yet"),
        flushCanvas: () => console.log("flushCanvas added  to QueryConsole"),
        query: null,
        defaultPlaceholderText: "g.V().limit(5).toList();"
    }

    propTypes = {
        query: PropTypes.array,
        onClose: PropTypes.func,
        onQuerySubmit: PropTypes.func,
        flushCanvas: PropTypes.func,
        defaultPlaceholderText: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            query: this.props.query
        }
    }

    componentDidMount() {
        document.getElementsByTagName('textarea')[0].focus();
        Mousetrap.bind("esc", () => this.props.onClose());

    }

    componentWillUnmount() {
        // super.componentWillUnmount();
        Mousetrap.unbind("esc");
        clearInterval(this.repeatTimer);
    }


    onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === true) {
            e.preventDefault();
            e.stopPropagation();
            this.formRef.dispatchEvent(new Event('submit'));

            // document.getElementById('queryForm').submit();
            // this.onFormSubmit(e);
            // this.refs.formToSubmit.submit();
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.query !== prevProps.query) {
            this.setState({query: this.props.query});
        }
    }

    onQueryChange(e) {
        this.setState({query: e.target.value});
    }


    onFormSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onQuerySubmit(e.target.query.value, {source: "console"});
    }


    setUpTimer(repeatFrequency) {
        let _this = this;
        this.repeatTimer = setInterval((function () {
                console.log("Repeating the query every " + repeatFrequency)
                _this.props.flushCanvas();
                _this.props.onQuerySubmit(
                    document.querySelector('textarea[name="query"]').value
                    , {source: "console"}
                );
            }
        ), repeatFrequency * 1000); // check every second.
    }

    handleChange({target}) {
        let _this = this;

        let repeatFrequency = document.querySelector('input[name="queryRepeatFrequency"]').value;
        if (target.checked) {

            const r = window.confirm("This will repeat the query in the console for every " + repeatFrequency + " seconds." +
                "Do you want to proceed!");
            if (r === true) {
                target.setAttribute('checked', true);
                this.setUpTimer(repeatFrequency)
            }

        } else {
            target.removeAttribute('checked');
            clearInterval(_this.repeatTimer);
            alert("INFO: Query will not be repeated anymore.");


        }
    }


    render() {
        return (

            <div className={"queryConsole p-10"}>
                <form ref={e => this.formRef = e} id={"queryForm"} onSubmit={this.onFormSubmit.bind(this)}>
                    {/*<p className={"small "}>Shift+Enter to submit the Query.</p>*/}

                    <div className={"queryOptions"}>
                        <div className={"float-left"}>
                            <label htmlFor="isQueryRepeatEnabled">
                                <input type="checkbox" name="isQueryRepeatEnabled"
                                    // defaultChecked={"checked"}
                                       onClick={this.handleChange.bind(this)}
                                    // onChange={this.handleQueryRepeater}
                                       value="."/>
                                Repeat this query <span className={"repeatInfoCls"}>every
                                <input type="number"
                                       min={5}
                                       defaultValue={5}
                                    // value={15}
                                       name={"queryRepeatFrequency"}/>
                                       seconds.
                                    </span>
                            </label>
                        </div>
                        <div className={"float-right"}>
                            <button className={"button m-0"} type={"submit"}
                                    onSubmit={this.onFormSubmit.bind(this)}
                            >
                                <FontAwesomeIcon icon={faPlayCircle}/> Run Query
                            </button>
                        </div>
                    </div>
                    <textarea
                        spellCheck={false}
                        autoFocus
                        onChange={this.onQueryChange.bind(this)}
                        name={"query"}
                        onKeyDown={this.onEnterPress.bind(this)}
                        value={this.state.query || ""}
                        placeholder={this.props.defaultPlaceholderText}/>
                </form>
            </div>

        );
    }
}
