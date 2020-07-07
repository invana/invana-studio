import React from "react";
import "./aside-left.scss";

export default class AsideLeft extends React.Component {
  static defaultProps = {
    extraClass: ""
  };

  render() {
    return (
      <div className={"aside-left " + this.props.extraClass}>
        {this.props.children}
      </div>
    );
  }
}
