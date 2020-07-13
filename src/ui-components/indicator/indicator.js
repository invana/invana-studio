import React from "react";
import "./indicator.scss";
import PropTypes from "prop-types";

export default class Indicator extends React.Component {

    static defaultProps = {
        isConnected2Gremlin: null
    }

    static propTypes = {
        isConnected2Gremlin: PropTypes.bool
    }

    render() {
        return (
            (this.props.isConnected2Gremlin === true)
                ? <span className={"connectionIndicator connected"}></span>
                : this.props.isConnected2Gremlin === false
                ? <span className={"connectionIndicator notConnected"}></span>
                : <span className={"connectionIndicator unknownStatus"}></span>
        )
    }
}
