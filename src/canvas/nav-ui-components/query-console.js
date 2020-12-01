import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import "./query-console.scss";
import PropTypes from "prop-types";
import GEPanel from "../../ui-components/panels/panel";

const Mousetrap = require("mousetrap");

export default class QueryConsole extends React.Component {

    static defaultProps = {
        makeQuery: () => console.log("No Query Handler added yet"),
        connector: null,
        flushCanvas: () => console.log("flushCanvas added  to QueryConsole"),
        defaultPlaceholderText: "g.V().limit(5).toList();",
        onClose: () => console.log("onClose not implemented"),
        defaultQuery: null
    }

    static propTypes = {
        requestBuilder: PropTypes.object,
        onClose: PropTypes.func,
        makeQuery: PropTypes.func,
        connector: PropTypes.object,
        flushCanvas: PropTypes.func,
        defaultPlaceholderText: PropTypes.string,
        defaultQuery: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            defaultQuery: this.props.defaultQuery
        }
    }

    componentDidMount() {
        document.getElementsByTagName('textarea')[0].focus();
        Mousetrap.bind("esc", () => this.props.onClose());
    }

    componentWillUnmount() {
        // super.componentWillUnmount();
        Mousetrap.unbind("esc");
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

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.defaultQuery !== prevProps.defaultQuery ) {
    //         this.setState({defaultQuery: this.props.defaultQuery});
    //     }
    //
    //
    // }

    onQueryChange(e) {
        this.setState({defaultQuery: e.target.value});
    }


    onFormSubmit(_this, e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("=====_this", _this);
        if (e.target.query.value) {
            const query = _this.props.connector.requestBuilder.rawQuery(e.target.query.value)
            _this.props.makeQuery(query, {source: "console"});
        } else {
            alert("Query cannot be null")
        }
    }


    render() {
        console.log("queryConsole=======", this.props.defaultQuery);
        return (

            <div className={"queryConsole"}>
                <GEPanel
                    title={"Query Console"}
                    onClickClose={() => this.props.onClose(null)}
                    showToggleBtn={false}
                >
                    <div className={"p-10"}>

                        <form ref={e => this.formRef = e} id={"queryForm"}
                              onSubmit={(e) => this.onFormSubmit(this, e)}>
                            {/*<p className={"small "}>Shift+Enter to submit the Query.</p>*/}


                            <textarea
                                spellCheck={false}
                                autoFocus
                                onChange={this.onQueryChange.bind(this)}
                                name={"query"}
                                onKeyDown={this.onEnterPress.bind(this)}
                                value={this.state.defaultQuery}
                                placeholder={this.props.defaultPlaceholderText}/>
                            <div className={"queryOptions"}>
                                <div className={"float-left"}>
                                    {/*    <label htmlFor="isQueryRepeatEnabled">*/}
                                    {/*        <input type="checkbox" name="isQueryRepeatEnabled"*/}
                                    {/*            // defaultChecked={"checked"}*/}
                                    {/*               onClick={this.handleChange.bind(this)}*/}
                                    {/*            // onChange={this.handleQueryRepeater}*/}
                                    {/*               value="."/>*/}
                                    {/*        Repeat query <span className={"repeatInfoCls"}>every*/}
                                    {/*<input type="number"*/}
                                    {/*       min={5}*/}
                                    {/*       defaultValue={5}*/}
                                    {/*    // value={15}*/}
                                    {/*       name={"queryRepeatFrequency"}/>s.*/}
                                    {/*    </span>*/}
                                    {/*    </label>*/}
                                    <button className={"button m-0"} type={"submit"}
                                            onSubmit={(e) => this.onFormSubmit.bind(this, e)}
                                    >
                                        <FontAwesomeIcon icon={faPlayCircle}/> Run Query
                                    </button>
                                </div>
                                <div className={"float-right"}>

                                </div>
                            </div>
                        </form>
                    </div>
                </GEPanel>
            </div>

        );
    }
}
