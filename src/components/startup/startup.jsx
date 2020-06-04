import React from "react";
import './startup.css';
import {getDataFromLocalStorage, setDataToLocalStorage} from "../core/utils";
import {gremlinServerUrlKey, GREMLIN_SERVER_URL} from "../../config";

export default class StartupUIComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "errorMessage": null
        }
    }

    onFormSubmit(e) {
        e.preventDefault();
        setDataToLocalStorage(gremlinServerUrlKey, e.target.gremlinServerUrl.value);
        window.location.reload();
    }

    componentDidMount() {

        if (!this.state.gremlinServerUrl) {
            this.setState({
                "errorMessage": "There is no gremlin server set." +
                    " Example: ws://localhost:8182/gremlin"
            });
        }
    }


    render() {


        return (
            <div className={"start-ui"}>
                <div className={"top-section"}>
                    <h1>Graph Explorer <small>Beta</small></h1>
                    <p>Yet another gremlin supported graph database visualiser in the universe.</p>
                    <p><small>Built at <a target={"_blank"} rel="noopener noreferrer"
                                          href="https://invana.io">Invana</a></small></p>
                </div>
                <hr/>
                <div className={"bottom-section"}>
                    <form action="" onSubmit={this.onFormSubmit.bind(this)}>
                        <input type="text" name={"gremlinServerUrl"}
                               defaultValue={this.state.gremlinServerUrl} placeholder={"ws://localhost:8182/gremlin"}/>
                    </form>
                    <p><small>Press ENTER to submit and proceed to the explorer.</small></p>
                    {this.state.errorMessage ?
                        (
                            <p>
                                <small className={"errorMessage"}>{this.state.errorMessage}</small>
                            </p>
                        ) : (<span></span>)
                    }
                </div>
            </div>
        )
    }
}
