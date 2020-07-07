import React from "react";
import "./aside-right.scss";

export default class AsideRight extends React.Component {

  // componentWillUnmount() {
  //   super.componentWillUnmount()
  // }

  render() {
    return <div className={"aside-right"}>{this.props.children}</div>;
  }
}
