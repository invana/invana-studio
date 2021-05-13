import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import DefaultLayout from "../layouts/default";

export default class Page404View extends React.Component {

    static propTypes = {
        location: PropTypes.any
    }

    render() {
        const {location} = this.props;

        return (
<DefaultLayout {...this.props}>
                    <Col className={"p-3"}>
                        <h3>
                            No match found for <code>{location.pathname}</code>
                        </h3>
                        <p>
                            {/*<a href={document.referrer} title={document.referrer}>*/}
                            {/*    &larr; go back{" "}*/}
                            {/*</a>{" "}*/}
                            {/*or*/}
                            <Link to={"/"}>&larr; go to home</Link>
                        </p>
                    </Col>

            </DefaultLayout>
        );
    }
}
