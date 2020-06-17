import React from "react";
import "./secondary-header.scss";
import HistoryFlyOut from "../../components/history";

export default class SecondaryHeader extends React.Component {


    render() {
        return (
            <div className={"secondaryHeader"}>
                {this.props.children}
            </div>
        )
    }

}
