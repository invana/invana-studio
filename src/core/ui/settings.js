import React from "react";
import FlyOutUI from "./flyout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {GREMLIN_SERVER_URL} from "../../config";
import {askToSwitchGremlinServer} from "../utils";

export default class SettingsFlyOut extends React.Component {

    static defaultProps = {
        setLeftFlyOut: () => console.error("setCenterModal prop not set for SettingsFlyOut"),
    }

    render() {
        return (
            <FlyOutUI title={"Settings"}
                      display={"block"}
                      position={"left"}
                      onClose={this.props.onClose}
            >
                <p>Currently using <span>{GREMLIN_SERVER_URL}</span> server </p>
                <a onClick={() => askToSwitchGremlinServer()} title={"Switch Server"}>
                    <FontAwesomeIcon icon={faSignInAlt}/>
                </a>
            </FlyOutUI>
        )
    }

}
