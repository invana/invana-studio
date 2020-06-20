import React from "react";
import FlyOutUI from "./flyout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";

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
                settings here.
                <a>switch gremlin server</a>

                <a onClick={() => this.props.setLeftFlyOut("switch-server")} title={"Switch Server"}>
                    <FontAwesomeIcon icon={faSignInAlt}/>
                </a>
            </FlyOutUI>
        )
    }

}
