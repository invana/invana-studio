import React from "react";
import FlyOutUI from "../ui/flyout";
import {ABOUT_TEXT, VERSION} from "../../config";

export default class AboutComponent extends React.Component {


    render() {
        return (
            <FlyOutUI title={"About Graph Explorer"}
                      poistion={"right"}
                      display={"block"}
                      size={this.props.size} onClose={this.props.onClose}>


                <h3 style={{"margin-bottom": "0", "fontWeight": "20px"}}>Graph Explorer <small>({VERSION})</small></h3>
                <p style={{"margin-top": "0"}}>
                    {ABOUT_TEXT} <br/>
                </p>
                <p>
                    <strong>License:</strong> Apache License 2.0
                </p>

            </FlyOutUI>
        )
    }
}
