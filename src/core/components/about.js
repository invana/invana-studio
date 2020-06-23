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


                <h3 style={{"marginBottom": "0", "fontWeight": "20px"}}>Graph Explorer <small>({VERSION})</small></h3>
                <p style={{"marginTop": "0"}}>
                    {ABOUT_TEXT} <br/>
                </p>
                <p>
                    <strong>License:</strong> Apache License 2.0
                </p>
                <p><strong>Repo:</strong> <a target={"_blank"} href="http://github.com/invanalabs/graph-explorer/">http://github.com/invanalabs/graph-explorer/</a></p>

                <p>This is an opensource project under Apache License 2.0, so
                    feel free to <u><a target={"_blank"} href="http://github.com/invanalabs/graph-explorer/">star</a></u> and <u><a target={"_blank"} href="http://github.com/invanalabs/graph-explorer/">fork.</a></u>
                 &nbsp;Any contributions are welcome :)</p>

            </FlyOutUI>
        )
    }
}
