import React from "react";
import Modal from "../core/ui/modal";
import {setDataToLocalStorage} from "../core/utils";
import {gremlinServerUrlKey , VERSION, ABOUT_TEXT} from "../config";
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

    onFormSubmit(e) {
        e.preventDefault();
        setDataToLocalStorage(gremlinServerUrlKey, e.target.gremlinServerUrl.value);
        window.location.href = "/";
    }

    openDemo(){

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
                                   defaultValue={"ws://localhost:8182/gremlin"}
                                   placeholder={"ws://localhost:8182/gremlin"}/>
                            <br/>
                            <button type={"submit"} className={"primary-btn button"}>Connect</button>

                            <button onClick={() => this.openDemo()} type={"button"} className={" button secondary-btn ml-10"}>
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
