import React from "react";
import PropTypes from "prop-types";

export default class MainContent extends React.Component {

    static propTypes = {
        contentChildren: PropTypes.object
    }

    render() {
        return (
            <div className="d-flex flex-column bg-light" style={{"width": "calc(100% - 50px)", "height": "100vh"}}>
                {this.props.contentChildren}
            </div>

        )
    }
}
