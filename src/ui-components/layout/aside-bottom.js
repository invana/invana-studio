import React from "react";
import "./aside-bottom.scss";

export default class AsideBottom extends React.Component {
  static defaultProps = {
    extraClass: ""
  };

  render() {
    return (
      <div className={"aside-bottom " + this.props.extraClass}>
        {this.props.children}
      </div>
    );
  }
}
