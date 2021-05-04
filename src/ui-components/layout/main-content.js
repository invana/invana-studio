import React from "react";

export default class MainContent extends React.Component {

    render() {
        return (
            <div className="d-flex flex-column bg-light" style={{"width": "calc(100% - 45px)", "height": "100vh"}}>
                {this.props.children}
            </div>

        )
    }
}
