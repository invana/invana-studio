import React from "react";
import "./modal.scss";

export default class GEModal extends React.Component {
  render() {
    return (
      <div className={"ge-modal"}>
        {this.props.title ? (
          <div className={"ge-modal-header"}>
            <h4>{this.props.title}</h4>
          </div>
        ) : (
          <span />
        )}

        <div className={"ge-modal-body"}>{this.props.children}</div>
      </div>
    );
  }
}
