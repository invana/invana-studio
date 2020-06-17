import React from "react";
import FlyOutUI from "./flyout";

export default class LearnFlyOut extends React.Component {


    render() {
        return (
            <FlyOutUI title={"Learn about Graph Explorer"}
                      display={"block"}
                      position={"right"}
                      onClose={this.props.onClose}
            >
                Query history will come here
            </FlyOutUI>
        )
    }

}
