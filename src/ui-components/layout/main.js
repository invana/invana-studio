import React from "react";
import "./main.scss";

export default class Main extends React.Component {
  render() {
    return <div className={"main"}>{this.props.children}</div>;
  }
}
