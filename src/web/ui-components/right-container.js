import React from "react";
import "./right-container.scss";

export default class RightContainer extends React.Component {

    // static propTypes = {
    //     onClose: PropTypes.func,
    // }

    render() {
        return (
            <div className={"rightContainer"}>
                {this.props.children}
            </div>
        )
    }
}
