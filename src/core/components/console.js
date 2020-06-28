import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle, faSearch} from "@fortawesome/free-solid-svg-icons";
import "./console.scss";
import FlyOutUI from "../ui/flyout";

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
                    <form onSubmit={this.onFormSubmit.bind(this)}>

                        <div className={"queryOptions"}>
                            <div className={"float-left"}>
                                <label htmlFor="isFreshCanvas">
                                    <input type="checkbox" name="isFreshCanvas"
                                           defaultChecked={"checked"}
                                           value="."/>
                                    extend canvas
                                </label>
                            </div>
                            <div className={"float-right"}>
                                <button className={"button"} type={"submit"}>
                                    <FontAwesomeIcon icon={faPlayCircle}/> Run Query
                                </button>
                            </div>
                        </div>

                        <textarea
                            onChange={this.onQueryChange.bind(this)}
                            name={"query"}
                            value={this.state.query || ""}
                            placeholder={this.props.defaultPlaceholderText}/>

                    </form>
                </div>
            </FlyOutUI>
        );
    }
}
