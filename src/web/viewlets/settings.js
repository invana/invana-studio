import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {STUDIO_SETTINGS} from "../../settings";
import PropTypes from "prop-types";
import {askToSwitchGremlinServer} from "../interface/utils";
import {Button, Card, Form} from "react-bootstrap";
import DefaultRemoteRoutableComponent from "../layouts/default-remote-routable";
import downloadTextAsFile, {exportDataFromStorage, importDataToStorage} from "../../utils/download";

export default class SettingsComponent extends DefaultRemoteRoutableComponent {


    static propTypes = {
        onClose: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            showImportSettings: false
        };
        // this.child = React.createRef();
    }
/*
    componentDidMount() {
        super.componentDidMount();
        document.getElementById('fileInput').addEventListener('change',
            this.handleFileSelect.bind(this),
            false);

    }*/

    handleFileSelect(event) {
        const reader = new FileReader()
        reader.onload = this.handleFileLoad.bind(this);
        reader.readAsText(event.target.files[0])
    }

    handleFileLoad(event) {
        console.log(" event.target.result", event.target.result);
        importDataToStorage(event.target.result);
        // document.getElementById('fileContent').textContent = event.target.result;
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

    setImportSettingsVisibility(setting) {
        this.setState({showImportSettings: setting});
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
                        <Button size={"sm"} variant={"link text-muted p-0"}
                                id={"connectionStringBtn"} onClick={this.showCredentials.bind(this)}
                                className={"selected  "}>
                            <small>show full connection string(toggle)</small>
                        </Button>
                    </p>

                    <div id="connection-string" style={{"display": "none"}}>
                        <h6 className={"mb-0 font-weight-bold"}>connection string full:</h6>
                        <p>{STUDIO_SETTINGS.CONNECTION_URL}</p>
                    </div>
                    <br/>
                    <hr/>
                    <Button variant={"outline-danger"} onClick={() => askToSwitchGremlinServer()}
                            title={"Switch Server"}>
                        Disconnect<FontAwesomeIcon className={"ml-2"} icon={faSignInAlt}/>
                    </Button>
                    <Button variant={"outline-secondary"} className={"ml-3"} onClick={() =>
                        this.props.onClose()}>cancel
                    </Button>

                    <p className={"mt-3 small"}>
                        <Button className={"btn btn-link p-0 mr-3 text-muted small"} variant={"link"}
                                onClick={() => downloadTextAsFile(
                                    exportDataFromStorage(),
                                    "invana-settings.txt")}
                        >export settings</Button>

                        <Button className={"btn btn-link p-0 ml-3 text-muted small"} variant={"link"}
                                onClick={() => this.setImportSettingsVisibility(true)}
                        >import settings</Button>


                    </p>
                    {
                        this.state.showImportSettings === true
                            ? <Form>
                                <div className="mb-3">
                                    <Card>
                                        <Card.Body className={"p-2"}>
                                            {/*<h3>Import invana settings</h3>*/}
                                            <Form.File id="formcheck-api-regular">
                                                <h6 className={"border-bottom text-muted pb-2 font-weight-bold"}>Import invana settings
                                                    file:</h6>
                                                <Form.File.Input id="fileInput" onChange={(event) => this.handleFileSelect(event)}/>
                                                <p className="small mb-2 mt-2 text-muted">Browse and selected the settings
                                                    file.
                                                    ex: <strong>invana-settings.txt</strong></p>
                                                <Button variant={"outline-secondary"}
                                                        onClick={()=> this.setImportSettingsVisibility(false)}
                                                        className={"pl-1 pr-1 pt-0 pb-0 small  "}>close
                                                    import</Button>
                                            </Form.File>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Form>
                            : <React.Fragment/>
                    }


                </Card.Body>
            </Card>
        )
    }

}
