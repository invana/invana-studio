import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {STUDIO_SETTINGS} from "../../settings";
import PropTypes from "prop-types";
import {askToSwitchGremlinServer} from "../interface/utils";
import {Button, Card} from "react-bootstrap";
import DefaultRemoteRoutableComponent from "../layouts/default-remote-routable";
import downloadTextAsFile, {exportDataFromStorage} from "../../utils/download";

export default class SettingsComponent extends DefaultRemoteRoutableComponent {


    static propTypes = {
        onClose: PropTypes.func,
    }


    connectionStringWithoutCreds() {
        try {
            const __url = new URL(STUDIO_SETTINGS.CONNECTION_URL);
            return __url.protocol + "//" + __url.host + __url.pathname;

        } catch (e) {
            return null;
        }
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
            <Card style={{"minHeight": "220px"}}>
                <Card.Body className={"pb-0"}>
                    <h6 className={"pb-2 mb-3 border-bottom"}>
                        Invana Studio settings.
                    </h6>

                    {/*<h6 className={"mb-0"}>Graph engine name:</h6>*/}
                    {/*<p>{STUDIO_SETTINGS.GRAPH_ENGINE_NAME}</p>*/}

                    <h6 className={"mb-0 font-weight-bold"}>connection string:</h6>
                    <p className={"mb-0"}>
                        <span>{this.connectionStringWithoutCreds()}</span>
                    </p>
                    <p className={""}>
                        <Button size={"sm"} variant={"outline-secondary"}
                                id={"connectionStringBtn"} onClick={this.showCredentials.bind(this)}
                                className={"selected pt-1 pb-1 "}>
                            <small>show full connection string(toggle)</small>
                        </Button>
                    </p>

                    <div id="connection-string" style={{"display": "none"}}>
                        <h6 className={"mb-0 font-weight-bold"}>connection string full:</h6>
                        <p>{STUDIO_SETTINGS.CONNECTION_URL}</p>
                    </div>
                    <br/>
                    <Button variant={"outline-danger"} onClick={() => askToSwitchGremlinServer()}
                            title={"Switch Server"}>
                        Disconnect<FontAwesomeIcon className={"ml-2"} icon={faSignInAlt}/>
                    </Button>
                    <Button variant={"outline-secondary"} className={"ml-3"} onClick={() =>
                        this.props.onClose()}>cancel
                    </Button>

                    <p className={"mt-5"}>
                        <Button className={"btn btn-link p-0 text-muted"} variant={"link"}
                                onClick={() => downloadTextAsFile(
                                    exportDataFromStorage(),
                                    "invana-settings.txt")}
                        >export settings</Button>
                    </p>



                </Card.Body>
            </Card>
        )
    }

}
