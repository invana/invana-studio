import React from "react";
import FlyOutUI from "./flyout";

export default class SettingsFlyOut extends React.Component {


    render() {
        return (
            <FlyOutUI title={"Settings"}
                      display={"block"}
                      position={"left"}
                      onClose={this.props.onClose}
            >
                settings here.
                <a>switch gremlin server</a>
            </FlyOutUI>
        )
    }

}
