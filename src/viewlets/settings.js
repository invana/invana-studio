import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {GREMLIN_SERVER_URL, GRAPH_ENGINE_NAME} from "../config";
import {askToSwitchGremlinServer} from "../core/utils";
import PropTypes from "prop-types";

export default class SettingsComponent extends React.Component {

    static defaultProps = {
        setLeftFlyOut: () => console.error("setCenterModal prop not set for SettingsFlyOut"),
        setCanvasBgColor: (bgColor) => console.log("setCanvasBgColor not set", bgColor)
    }

    static propTypes = {
        setCanvasBgColor: PropTypes.func,
        setLeftFlyOut: PropTypes.func,
        canvasBgColor: PropTypes.string
    }


    connectionStringWithoutCreds() {
        const __url = new URL(GREMLIN_SERVER_URL);
        return __url.protocol + "//" + __url.host + __url.pathname;
    }

    showCredentials() {

        let credentialVisibilityStatus = document.getElementById("connection-string").style.display;
        if (credentialVisibilityStatus === "none") {
            document.getElementById("connection-string").style.display = "inline-block";
            // document.querySelector("connectionStringBtn small").innerText = "hide full connection string";
        } else {
            document.getElementById("connection-string").style.display = "none";
            // document.querySelector("connectionStringBtn small").innerText = "show full connection string";
        }
    }


    onFormSubmit(e) {
        e.preventDefault();
        console.log("formdata", e.target);

        this.props.setCanvasBgColor(document.querySelector("input[name=canvasBgColor]").value);

    }

    render() {
        return (
            <div className={"p-10"}>

                <h4>Graph Engine Name:</h4>

                <p><span>{GRAPH_ENGINE_NAME}</span></p>

                <br/><br/>
                <h4>Canvas Background Color</h4>

                <form className={"mt-10"} onSubmit={this.onFormSubmit.bind(this)}>
                    <input type="text" name={"canvasBgColor"}
                           minLength={7} maxLength={7} defaultValue={this.props.canvasBgColor}/>


                    <button className={"button  mt-10"} type={"submit"}>
                        update
                    </button>
                </form>
                <br/><br/>
                <h4>Connection String:</h4>

                <p className={"mb-0"}>
                    <span>{this.connectionStringWithoutCreds()}</span></p>
                <p>
                    <button id={"connectionStringBtn"} onClick={this.showCredentials.bind(this)} className={"selected"}>
                        <small>show full connection string(toggle)</small>
                    </button>
                </p>
                <p id={"connection-string"} style={{"display": "none"}}>{GREMLIN_SERVER_URL}</p>

                <p></p>
                <button className={"button"} onClick={() => askToSwitchGremlinServer()} title={"Switch Server"}>
                    switch gremlin server <FontAwesomeIcon icon={faSignInAlt}/>
                </button>


            </div>
        )
    }

}
