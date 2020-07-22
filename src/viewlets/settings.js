import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {GREMLIN_SERVER_URL} from "../config";
import {askToSwitchGremlinServer} from "../core/utils";

export default class SettingsComponent extends React.Component {

    static defaultProps = {
        setLeftFlyOut: () => console.error("setCenterModal prop not set for SettingsFlyOut"),
    }


    removeCredentials() {
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

    render() {
        return (
            <div className={"p-10"}>
                <p className={"mb-10"}>Currently using `<span>{this.removeCredentials()}</span>` server </p>
                <p>
                    <button id={"connectionStringBtn"} onClick={this.showCredentials.bind(this)} className={"selected"}>
                        <small>show full connection string(toggle)</small>
                    </button>
                </p>
                <p id={"connection-string"} style={{"display": "none"}}>{GREMLIN_SERVER_URL}</p>

                <p><br/><br/></p>
                <button className={"button small"} onClick={() => askToSwitchGremlinServer()} title={"Switch Server"}>
                    switch gremlin server <FontAwesomeIcon icon={faSignInAlt}/>
                </button>
            </div>
        )
    }

}
