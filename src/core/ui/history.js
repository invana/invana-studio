import React from "react";
import FlyOutUI from "./flyout";

export default class HistoryFlyOut extends React.Component {


    render() {
        return (
            <FlyOutUI title={"Query History"}
                      display={"block"}
                      position={"left"}
                      onClose={this.props.onClose}
            >
                Query history will come here
            </FlyOutUI>
        )
    }

}
