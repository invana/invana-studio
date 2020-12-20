import React from "react";
import PropTypes from "prop-types";

export default class Page404 extends React.Component {

    static propTypes = {
        location: PropTypes.any
    }

    render() {
        const {location} = this.props;

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
