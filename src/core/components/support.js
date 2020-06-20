import React from "react";
import FlyOutUI from "../ui/flyout";

export default class SupportFlyout extends React.Component {


    render() {
        return (
            <FlyOutUI title={"Support"}
                      display={"block"}
                      position={"right"}
                      onClose={this.props.onClose}
            />
        )
    }

}
