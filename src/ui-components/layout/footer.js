import React from "react";
import "./footer.scss";

export default class GEFooter extends React.Component {
  render() {
    return <div className={"footer"}>{this.props.children}</div>;
  }
}
