import React from "react";
import "./list.scss";

export default class GEList extends React.Component {
  /*

    type can be "default" or "nav"
  */
  static defaultProps = {
    type: "default"
  };

  render() {
    return (
      <ul className={this.props.type + "-list list"}>{this.props.children}</ul>
    );
  }
}
