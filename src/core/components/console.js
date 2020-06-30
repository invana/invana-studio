import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import "./console.scss";
import FlyOutUI from "../ui/flyout";

const Mousetrap = require("mousetrap");

export default class QueryConsole extends React.Component {

    static defaultProps = {
        onQuerySubmit: () => console.log("No Query Handler added yet"),
        query: null,
        defaultPlaceholderText: "g.V().limit(5).toList();"
    }

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
        const sourceType = e.target.isFreshCanvas.checked ? "canvas" : "console";
        this.props.onQuerySubmit(e.target.query.value, {source: sourceType});
    }

    render() {
        return (
            <FlyOutUI
                title={"Query Console"} display={"block"}
                position={"left"}
                onClose={this.props.onClose}
            >
                <div className={"queryConsole"}>
                    <form ref={e => this.formRef = e} id={"queryForm"} onSubmit={this.onFormSubmit.bind(this)}>
                        {/*<p className={"small "}>Shift+Enter to submit the Query.</p>*/}

                        <div className={"queryOptions"}>
                            <div className={"float-left"}>
                                <label htmlFor="isFreshCanvas">
                                    <input type="checkbox" name="isFreshCanvas"
                                           defaultChecked={"checked"}
                                           value="."/> extend canvas
                                </label>
                            </div>
                            <div className={"float-right"}>
                                <button className={"button"} type={"submit"}
                                        onSubmit={this.onFormSubmit.bind(this)}
                                >
                                    <FontAwesomeIcon icon={faPlayCircle}/> Run Query
                                </button>
                            </div>
                        </div>
                        <textarea
                            onChange={this.onQueryChange.bind(this)}
                            name={"query"}
                            onKeyDown={this.onEnterPress.bind(this)}
                            value={this.state.query || ""}
                            placeholder={this.props.defaultPlaceholderText}/>
                    </form>
                </div>
            </FlyOutUI>
        );
    }
}
