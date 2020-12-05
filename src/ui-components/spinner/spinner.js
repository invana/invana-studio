import React from "react";
// import {DefaultMaxTimeElapsedWarningInSeconds} from "../../config";
import "./spinner.scss";
import PropTypes from "prop-types";

export default class LoadSpinner extends React.Component {

    static propTypes = {
        isLoading: PropTypes.bool,
        loadingMessage: PropTypes.string,
        loadTimeCounter: PropTypes.number,
        loadingExtraText: PropTypes.string,
        isConnected2Gremlin: PropTypes.bool,
        showSignOut: PropTypes.bool
    }

    render() {

        let cls = "loadingDivExplorerView";
        if (window.location.pathname === "/") {
            cls = "loadingDivFull";
        }
        console.log("======isLoading", this.props.isLoading);
        return (
            <div>
                {this.props.isLoading ? (
                    <div className={cls}>
                        {
                            <h3>{this.props.loadingMessage}</h3>
                        }
                        {/*<p>*/}
                        {/*    {this.props.loadTimeCounter ? (*/}
                        {/*        <span>Elapsed {this.props.loadTimeCounter}s.</span>*/}
                        {/*    ) : (*/}
                        {/*        <span/>*/}
                        {/*    )}{" "}*/}
                        {/*    {this.props.loadingExtraText}*/}
                        {/*</p>*/}
                        {/*{this.props.loadTimeCounter >=*/}
                        {/*DefaultMaxTimeElapsedWarningInSeconds ? (*/}
                        {/*    <span>Strange! this operation took more than{" "}*/}
                        {/*        {DefaultMaxTimeElapsedWarningInSeconds} seconds</span>*/}
                        {/*) : (*/}
                        {/*    <span/>*/}
                        {/*)}*/}
                        {/*{this.props.showSignOut === true ? (*/}
                        {/*    <p>*/}
                        {/*        <a href="/switch-server">*/}
                        {/*            <u>switch</u> to a different server.*/}
                        {/*        </a>*/}
                        {/*    </p>*/}
                        {/*) : (*/}
                        {/*    <span/>*/}
                        {/*)}*/}
                    </div>
                ) : (
                    <span/>
                )}


                {/*{this.props.isLoading ? (*/}
                {/*    <div className={cls}>*/}
                {/*        {*/}
                {/*            this.props.isConnected2Gremlin*/}
                {/*                ? <h3>{this.props.loadingMessage}</h3>*/}
                {/*                : <h3>Failed to connect to the database.</h3>*/}
                {/*        }*/}
                {/*        <p>*/}
                {/*            {this.props.loadTimeCounter ? (*/}
                {/*                <span>Elapsed {this.props.loadTimeCounter}s.</span>*/}
                {/*            ) : (*/}
                {/*                <span/>*/}
                {/*            )}{" "}*/}
                {/*            {this.props.loadingExtraText}*/}
                {/*        </p>*/}
                {/*        {this.props.loadTimeCounter >=*/}
                {/*        DefaultMaxTimeElapsedWarningInSeconds ? (*/}
                {/*            <span>Strange! this operation took more than{" "}*/}
                {/*                {DefaultMaxTimeElapsedWarningInSeconds} seconds</span>*/}
                {/*        ) : (*/}
                {/*            <span/>*/}
                {/*        )}*/}
                {/*        {this.props.showSignOut === true ? (*/}
                {/*            <p>*/}
                {/*                <a href="/switch-server">*/}
                {/*                    <u>switch</u> to a different server.*/}
                {/*                </a>*/}
                {/*            </p>*/}
                {/*        ) : (*/}
                {/*            <span/>*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <span/>*/}
                {/*)}*/}
            </div>
        );
    }
}
