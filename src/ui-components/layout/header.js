import React from "react";
import "./header.scss";

export default class GEHeader extends React.Component {
  render() {
    return <div className={"header"}>{this.props.children}</div>;
  }
}
