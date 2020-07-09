import React from "react";
import "./main-content-middle.scss";

export default class MainContentMiddle extends React.Component {
  render() {
    return <div className={"main-content-middle"}>{this.props.children}</div>;
  }
}
