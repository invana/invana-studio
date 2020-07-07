import React from "react";
import "./main-content-right.scss";

export default class MainContentRight extends React.Component {
  static defaultProps = {
    extraClass: ""
  };
  render() {
    return (
      <div className={"main-content-right " + this.props.extraClass}>
        {this.props.children}
        <div>{this.props.secondaryChild}</div>
      </div>
    );
  }
}
