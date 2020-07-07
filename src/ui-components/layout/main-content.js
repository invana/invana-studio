import React from "react";
import "./main-content.scss";

export default class MainContent extends React.Component {
  render() {
    return <div className={"main-content"}>{this.props.children}</div>;
  }
}
