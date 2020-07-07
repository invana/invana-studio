import React from "react";
import "./404.scss";

export default class Page404 extends React.Component {
  render() {
    const { match, location, history } = this.props;

    return (
      <div className={"error-view-404"}>
        <h2>
          No match found for <code>{location.pathname}</code>
        </h2>
        <p>
          <a href={document.referrer} title={document.referrer}>
            &larr; go back{" "}
          </a>{" "}
          or <a href={"/"}> go home</a>
        </p>
      </div>
    );
  }
}
