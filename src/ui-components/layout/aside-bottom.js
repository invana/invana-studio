import React from "react";
import "./aside-bottom.scss";
import PropTypes from "prop-types"

export default class AsideBottom extends React.Component {
  static defaultProps = {
    extraClass: ""
  };

  static propTypes = {
    extraClass: PropTypes.string,
    children: PropTypes.any
  }

  render() {
    return (
      <div className={"aside-bottom " + this.props.extraClass}>
        {this.props.children}
      </div>
    );
  }
}
