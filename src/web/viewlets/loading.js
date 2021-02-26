import React from "react";
import "./loading.scss";
import PropTypes from "prop-types";

export default class LoadingDiv extends React.Component {

    static propTypes = {
        statusMessage: PropTypes.string
    }

    render() {
        return (
            <div className={"loadingDiv"}>
                <p className={"text-muted"}>{this.props.statusMessage}...</p>
            </div>
        )
    }
}
