import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {GREMLIN_SERVER_URL} from "../config";
import {askToSwitchGremlinServer} from "../core/utils";

export default class SettingsComponent extends React.Component {

    static defaultProps = {
        setLeftFlyOut: () => console.error("setCenterModal prop not set for SettingsFlyOut"),
    }

    render() {
        return (
            <div className={"p-10"}>
                <p className={"mb-10"}>Currently using `<span>{GREMLIN_SERVER_URL}</span>` server </p>
                <button className={"button small"}  onClick={() => askToSwitchGremlinServer()} title={"Switch Server"}>
                    switch gremlin server  <FontAwesomeIcon icon={faSignInAlt}/>
                </button>
            </div>
        )
    }

}
