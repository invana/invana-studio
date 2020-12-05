import React from "react";
import "./aside-content.scss";
import PropTypes from "prop-types"

export default class AsideContent extends React.Component {
    static defaultProps = {
        extraClass: ""
    }

    static propTypes = {
        position: PropTypes.string,
        size: PropTypes.string, // sm(200px), default(300px), lg(500px)
        children: PropTypes.any
    }

    render() {
        return (
            <div className={"aside-content " + this.props.position + " " + this.props.size}>
                {this.props.children}
            </div>
        );
    }
}
