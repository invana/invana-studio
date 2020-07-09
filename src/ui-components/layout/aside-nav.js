import React from "react";
import "./aside-nav.scss";

export default class AsideNav extends React.Component {
  render() {
    return <div className={"aside-nav"}>{this.props.children}</div>;
  }
}
