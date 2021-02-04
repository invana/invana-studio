import React from "react";
import "./loading.scss";

export default class LoadingDiv extends React.Component{

    render() {
        return(
            <div className={"loadingDiv"}>
                <p className={"text-muted"}>{this.props.statusMessage}...</p>
            </div>
        )
    }
}
