import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import "./console.scss";
import FlyOutUI from "../ui/flyout";

export default class QueryConsole extends React.Component {


    static defaultProps = {
        onQuerySubmit: () => console.log("No Query Handler added yet"),
        canvasQuery: null,
        defaultPlaceholderText: "g.V().limit(5).toList();"
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.props.onQuerySubmit(e.target.query.value);
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
                        <textarea
                            name={"query"}
                            defaultValue={this.props.canvasQuery}
                            placeholder={this.props.defaultPlaceholderText}></textarea>
                        <button className={"button"} type={"submit"}><FontAwesomeIcon icon={faSearch}/> Run Query</button>

                    </form>
                </div>
            </FlyOutUI>
        );
    }
}
