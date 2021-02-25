import React from "react";
import PropTypes from "prop-types";
import DefaultLayout from "../../layout/default";
import "./page-404.scss";
import Page404Viewlet from "./page-404-viewlet";
import RoutableRemoteEngine from "../../layout/routable-remote";

export default class Page404View extends RoutableRemoteEngine {

    static propTypes = {
        location: PropTypes.any
    }

    render() {
        return (
            <DefaultLayout {...this.props}
                   setModalContentName={this.setModalContentName.bind(this)}>
                <Page404Viewlet {...this.props}/>
            </DefaultLayout>
        );
    }
}
