import React from "react";
import Modal from "../ui-components/modal/modal";
import {setDataToLocalStorage} from "../core/utils";
import {AUTH_CONSTANTS, VERSION, ABOUT_TEXT, DEMO_URL} from "../config";
import "./connect.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";

export default class SetupGremlinServerConnection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null
        }
    }

    checkIfHttps(url) {
        const protocol = new URL(url).protocol;
        return protocol === "https:" || protocol === "wss:";
    }

    onFormSubmit(e) {

        const gremlinServerUrl = e.target.gremlinServerUrl.value;
        const isHttps = new URL(window.location.href).protocol === "https:" || new URL(window.location.href).protocol === "wss:";
        if (isHttps && !this.checkIfHttps(gremlinServerUrl)) {
            alert("Your connection string is not secure. You can only use https or wss connection string " +
                "when you are using Graph Explorer on https.")
        }
        e.preventDefault();
        if (gremlinServerUrl) {
            setDataToLocalStorage(AUTH_CONSTANTS.gremlinServerUrlKey, gremlinServerUrl);
            window.location.href = "/";
        } else {
            alert("Invalid Gremlin connection string");
        }
    }

    openDemo() {
        window.open(DEMO_URL);
    }

    render() {
        return (
            <Modal title={null} size={"md"}>
                <div className={"connect"}>
                    <div className={"top-section"}>
                        <h1>Graph Explorer <small>{VERSION}</small></h1>
                        <p>{ABOUT_TEXT}</p>

                    </div>
                    {/*<hr/>*/}
                    <div className={"bottom-section"}>
                        <form action="" onSubmit={this.onFormSubmit.bind(this)}>
                            <input type="text" name={"gremlinServerUrl"}
                                // defaultValue={"ws://localhost:8182/gremlin"}
                                   placeholder={"http://user:password@localhost:8182/gremlin"}/>
                            <br/>
                            <button type={"submit"} className={"primary-btn button"}>Connect</button>

                            <button onClick={() => this.openDemo()} type={"button"}
                                    className={" button secondary-btn ml-10"}>
                                <FontAwesomeIcon icon={faPlayCircle}/> watch demo
                            </button>
                        </form>
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
