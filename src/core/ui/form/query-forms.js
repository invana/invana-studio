import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import "./query-forms.scss";

export default class QueryInputForm extends React.Component {


    static defaultProps = {
        onQuerySubmit: () => console.log("No Query Handler added yet"),
        canvasQuery: null,
        defaultPlaceholderText: "g.V().toList();"
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.props.onQuerySubmit(e.target.query.value);
    }

    render() {
        return (
            <div className={"queryInputForm"}>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <input name={"query"} type="text" placeholder={this.props.defaultPlaceholderText}
                           defaultValue={this.props.canvasQuery}/>
                    <button type={"submit"}><FontAwesomeIcon icon={faSearch}/></button>

                </form>
            </div>
        );
    }
}

export class QueryTextAreaForm extends React.Component {

    defaultProps = {
        queryOnSubmitHandler: () => console.log("No Query Handler added yet"),
        defaultQueryValue: null
    }

    render() {
        return (
            <div className={"queryInputForm"}>
                <form onSubmit={this.props.queryOnSubmitHandler}>
                    <textarea>{this.props.defaultQueryValue}</textarea>
                </form>
            </div>
        );
    }
}
