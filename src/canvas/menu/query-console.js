import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import "./query-console.scss";
import PropTypes from "prop-types";
import GEPanel from "../../ui-components/panels/panel";

const Mousetrap = require("mousetrap");

export default class QueryConsole extends React.Component {

    repeatTimer = null;

    static defaultProps = {
        makeQuery: () => console.log("No Query Handler added yet"),
        connector: {},
        flushCanvas: () => console.log("flushCanvas added  to QueryConsole"),
        query: null,
        defaultPlaceholderText: "g.V().limit(5).toList();",
        onClose: ()=> console.log("onClose not implemented")
    }

    static propTypes = {
        requestBuilder: PropTypes.object,
        query: PropTypes.string,
        onClose: PropTypes.func,
        makeQuery: PropTypes.func,
        connector: PropTypes.func,
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


    onFormSubmit(_this, e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("=====_this", _this);
        const query = _this.props.connector.requestBuilder.rawQuery(e.target.query.value)
        _this.props.makeQuery(query, {source: "console"});
    }


    setUpTimer(repeatFrequency) {
        let _this = this;
        this.repeatTimer = setInterval((function () {
                console.log("Repeating the query every " + repeatFrequency)
                _this.props.flushCanvas();
                _this.props.makeQuery(
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

            <div className={"queryConsole"}>
                <GEPanel
                    title={"Query Console"}
                    onClickClose={() => this.props.onClose(null)}
                    showToggleBtn={false}
                >
                    <div className={"p-10"}>

                        <form ref={e => this.formRef = e} id={"queryForm"} c
                              onSubmit={(e) => this.onFormSubmit(this, e)}>
                            {/*<p className={"small "}>Shift+Enter to submit the Query.</p>*/}

                            <div className={"queryOptions"}>
                                <div className={"float-left"}>
                                    <label htmlFor="isQueryRepeatEnabled">
                                        <input type="checkbox" name="isQueryRepeatEnabled"
                                            // defaultChecked={"checked"}
                                               onClick={this.handleChange.bind(this)}
                                            // onChange={this.handleQueryRepeater}
                                               value="."/>
                                        Repeat query <span className={"repeatInfoCls"}>every
                                <input type="number"
                                       min={5}
                                       defaultValue={5}
                                    // value={15}
                                       name={"queryRepeatFrequency"}/>s.
                                    </span>
                                    </label>
                                </div>
                                <div className={"float-right"}>
                                    <button className={"button m-0"} type={"submit"}
                                            onSubmit={(e) => this.onFormSubmit.bind(this, e)}
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
                                placeholder={this.props.defaultPlaceholderText}/>
                        </form>
                    </div>
                </GEPanel>
            </div>

        );
    }
}
