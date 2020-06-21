import React from "react";
import Modal from "../core/ui/modal";
import {setDataToLocalStorage} from "../core/utils";
import {gremlinServerUrlKey} from "../config";
import "./connect.scss";

export default class SetupGremlinServerConnection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null
        }
    }

    onFormSubmit(e) {
        e.preventDefault();
        setDataToLocalStorage(gremlinServerUrlKey, e.target.gremlinServerUrl.value);
        window.location.href = "/";
    }


    render() {

        return (

            <Modal title={null} size={"md"}>
                <div className={"connect"}>
                    <div className={"top-section"}>
                        <h1>Graph Explorer <small>Beta</small></h1>
                        <p>The missing web UI for Gremlin supported databases.</p>

                    </div>
                    {/*<hr/>*/}
                    <div className={"bottom-section"}>
                        <form action="" onSubmit={this.onFormSubmit.bind(this)}>
                            <input type="text" name={"gremlinServerUrl"}
                                   defaultValue={"ws://localhost:8182/gremlin"}
                                   placeholder={"ws://localhost:8182/gremlin"}/>
                            <br/>
                            <button type={"submit"} className={"primary-btn button"}>Connect</button>
                        </form>
                        {/*<p><small>Press ENTER to submit and proceed to the explorer.</small></p>*/}
                        {this.state.errorMessage ?
                            (
                                <p>
                                    <small className={"errorMessage"}>{this.state.errorMessage}</small>
                                </p>
                            ) : (<span></span>)
                        }
                        <p className={"built-with"}><small>Built with love for Humans
                            & Innovations at <a
                                className={"selected"}
                                target={"_blank"}
                                rel="noopener noreferrer"
                                href="https://invana.io">Invana</a></small>
                        </p>
                    </div>
                </div>
            </Modal>

        )
    }
}
