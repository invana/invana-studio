import React from "react";
import "./indicator.scss";

export default class ConnectionIndicatorComponent extends React.Component {

    static defaultProps = {
        isConnected2Gremlin: null
    }

    render() {
        return (
            <span>
                {
                    (this.props.isConnected2Gremlin === true)
                        ? <span className={"connected connectionIndicator"}></span>
                        : this.props.isConnected2Gremlin === false
                        ? <span className={"notConnected connectionIndicator"}></span>
                        : <span className={"unknownStatus connectionIndicator"}></span>
                }
            </span>
        )
    }
}
