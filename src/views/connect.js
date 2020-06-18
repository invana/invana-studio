import React from "react";
import Modal from "../core/ui/modal";
import {setDataToLocalStorage} from "../core/utils";
import {gremlinServerUrlKey} from "../config";
import "./connect.scss";

export default class ConnectView extends React.Component {

    onFormSubmit(e) {
        e.preventDefault();
        setDataToLocalStorage(gremlinServerUrlKey, e.target.gremlinUrl.value);
        window.location.href = "/";
    }


    render() {

        return (
            <div>
                <Modal title={'Connect to Gremlin Server'} size={"md"}>

                    {/*<form action="" onSubmit={this.formSubmit.bind(this)}>*/}
                    {/*    <input name={"gremlinUrl"} type="text"/>*/}
                    {/*    <button type={"submit"}>Update</button>*/}
                    {/*</form>*/}
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
                                       defaultValue={"ws://localhost:8182/gremlin"}
                                       placeholder={"ws://localhost:8182/gremlin"}/>
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
                </Modal>
            </div>
        )
    }
}
