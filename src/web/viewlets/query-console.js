import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import "./query-console.scss";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
// import GEPanel from "../../ui-components/panels/panel";


export default class QueryConsole extends React.Component {

    static defaultProps = {
        makeQuery: () => console.log("No Query Handler added yet"),
        connector: null,
        flushCanvas: () => console.log("flushCanvas added  to QueryConsole"),
        defaultPlaceholderText: "g.V().limit(5).toList();",
        onClose: () => console.log("onClose not implemented"),
        query: null
    }

    static propTypes = {
        requestBuilder: PropTypes.object,
        onClose: PropTypes.func,
        makeQuery: PropTypes.func,
        connector: PropTypes.object,
        flushCanvas: PropTypes.func,
        defaultPlaceholderText: PropTypes.string,
        query: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            query: this.props.query
        }
    }

    componentDidMount() {
        document.getElementsByTagName('textarea')[0].focus();
        // Mousetrap.bind("esc", () => this.props.onClose());
    }

    //
    // componentWillUnmount() {
    //     // super.componentWillUnmount();
    //     Mousetrap.unbind("esc");
    // }


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
        if (e.target.query.value) {
            const query = _this.props.connector.requestBuilder.rawQuery(e.target.query.value)
            const queryPayloadCleaned = this.props.connector.requestBuilder.combineQueries(query, null);

            _this.props.makeQuery(queryPayloadCleaned, {source: "console"});
        } else {
            alert("Query cannot be null")
        }
    }


    render() {
        console.log("queryConsole=======", this.props.query);
        return (


            <div className={" queryConsole"}>

                <form ref={e => this.formRef = e} id={"queryForm"}
                      onSubmit={(e) => this.onFormSubmit(this, e)}>
                    {/*<p className={"small "}>Shift+Enter to submit the Query.</p>*/}
                    <h6 className={"pb-1 border-bottom"}>Query Console</h6>
                    <textarea
                        spellCheck={false}
                        autoFocus
                        onChange={this.onQueryChange.bind(this)}
                        name={"query"}
                        onKeyDown={this.onEnterPress.bind(this)}
                        value={this.state.query || ''}
                        placeholder={this.props.defaultPlaceholderText}
                    />
                    {/*<div className={"queryOptions"}>*/}
                    {/*<div className={"float-left"}>*/}
                    <Button variant={"outline-primary"} size={"sm"}
                            className={"mr-2"} type={"submit"}
                            onSubmit={(e) => this.onFormSubmit.bind(this, e)}>
                        <FontAwesomeIcon icon={faPlayCircle}/> Run Query
                    </Button>
                    <Button variant={"outline-secondary"} size={"sm"}
                            type={"button"} onClick={() => this.props.onClose()}>
                        {/*<FontAwesomeIcon icon={faWindowClose}/>*/}
                        Close
                    </Button>
                    {/*    </div>*/}
                    {/*</div>*/}
                </form>
            </div>


        );
    }
}
