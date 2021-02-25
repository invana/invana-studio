import React from "react";
import "./left-container.scss";

export default class LeftContainer extends React.Component {

    // static propTypes = {
    //     onClose: PropTypes.func,
    // }

    render() {
        return (
            <div className={"leftContainer"}>
                {this.props.children}
            </div>
        )
    }
}
