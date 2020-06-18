import React from "react";
import "./left.scss";


export default class MainLeftNavBase extends React.Component {

    static defaultProps = {
        leftFlyOutName: null,
        onLeftFlyOutClose: () => console.error("onLeftFlyOutClose prop not added to MainLeftNavBase"),
        setCenterModal: () => console.error("setCenterModal prop not added to LeftNav")
    }

    render() {

        return (
            <div className={"mainLeftNav"}>
                {this.props.children}
            </div>
        )
    }
}

