import React from "react";
import {ABOUT_TEXT, VERSION} from "../config";

export default class AboutComponent extends React.Component {


    render() {
        return (
            <div className={"p-10"}>
                <h3 style={{  "fontWeight": "20px"}}>Graph Explorer <small>({VERSION})</small></h3>
                <p style={{"marginTop": "0"}}>
                    {ABOUT_TEXT} <br/>
                </p>
                <p>
                    <strong>License:</strong> Apache License 2.0
                </p>
                <p><a rel="noopener noreferrer" target={"_blank"}
                                             href="http://github.com/invanalabs/graph-explorer/">http://github.com/invanalabs/graph-explorer/</a>
                </p>

                <p>This is an open source project under Apache License 2.0, so
                    feel free to <u><a target={"_blank"} rel="noopener noreferrer"
                                       href="http://github.com/invanalabs/graph-explorer/">star</a></u> and <u><a rel="noopener noreferrer" target={"_blank"}
                          href="http://github.com/invanalabs/graph-explorer/">fork.</a></u>
                    &nbsp;Any contributions are welcome :)</p>

            </div>
        )
    }
}
