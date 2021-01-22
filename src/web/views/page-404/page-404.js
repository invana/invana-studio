import React from "react";
import PropTypes from "prop-types";
import DefaultLayout from "../../layout/default";
import "./page-404.scss";
import Page404Viewlet from "./page-404-viewlet";

export default class Page404View extends React.Component {

    static propTypes = {
        location: PropTypes.any
    }

    render() {
        const {location} = this.props;

        return (
            <DefaultLayout {...this.props}>
                <Page404Viewlet {...this.props}/>
            </DefaultLayout>
        );
    }
}
