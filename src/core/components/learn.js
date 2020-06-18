import React from "react";
import FlyOutUI from "../ui/flyout";

export default class LearnFlyOut extends React.Component {


    render() {
        return (
            <FlyOutUI title={"Learn about Graph Explorer"}
                      display={"block"}
                      position={"right"}
                      onClose={this.props.onClose}
            >
                learn section comes here
            </FlyOutUI>
        )
    }

}
