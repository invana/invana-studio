import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import { STUDIO_SETTINGS} from "../../settings";
import PropTypes from "prop-types";
import {askToSwitchGremlinServer} from "../interface/utils";
import {Button, Card} from "react-bootstrap";

export default class SettingsComponent extends React.Component {

    static defaultProps = {
        setModalContentName: () => console.error("setCenterModal prop not set for SettingsFlyOut"),
    }

    static propTypes = {
        setModalContentName: PropTypes.func,
        onClose: PropTypes.func,
    }


    connectionStringWithoutCreds() {
        const __url = new URL(STUDIO_SETTINGS.CONNECTION_URL);
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
            <Card style={{"min-height": "300px"}}>
                <Card.Body>
                    <h6 className={"pb-2 mb-3 border-bottom"}>
                        Invana Studio settings.
                    </h6>

                    <h6 className={"mb-0"}>Graph engine name:</h6>
                    <p>{STUDIO_SETTINGS.GRAPH_ENGINE_NAME}</p>

                    <h6 className={"mb-0"}>Connection string:</h6>
                    <p className={"mb-0"}>
                        <span>{this.connectionStringWithoutCreds()}</span></p>
                    <p>
                        <Button size={"sm"}  variant={"outline-secondary"}
                                id={"connectionStringBtn"} onClick={this.showCredentials.bind(this)}
                                className={"selected"}>
                            <small>show full connection string(toggle)</small>
                        </Button>
                    </p>
                    <p id={"connection-string"} style={{"display": "none"}}>{STUDIO_SETTINGS.CONNECTION_URL}</p>
                    <br/>
                    <Button variant={"secondary"} onClick={() => askToSwitchGremlinServer()} title={"Switch Server"}>
                        switch invana engine<FontAwesomeIcon icon={faSignInAlt}/>
                    </Button>
                    <Button variant={"outline-secondary"} className={"ml-3"} onClick={() =>
                        this.props.onClose()}>cancel
                    </Button>


                </Card.Body>
            </Card>
        )
    }

}
