import React from "react";
import {DefaultMaxTimeElapsedWarningInSeconds} from "../../config";
import "./spinner.scss";
import PropTypes from "prop-types";

export default class LoadSpinner extends React.Component {


    static propTypes = {
        isLoading: PropTypes.bool,
        loadingMessage: PropTypes.string,
        loadTimeCounter: PropTypes.number,
        loadingExtraText: PropTypes.string,
        isConnected2Gremlin: PropTypes.bool,
        showSignOut: PropTypes.bool,

    }

    render() {
        let divTop = 0;
        let divLeft = 0;
        let height = "calc(100% - 23px - 46px)";
        if (window.location.pathname === "/explorer") {
            divTop = "46px";
            divLeft = "46px";
            // height = "auto";
        } else if (window.location.pathname === "/") {
            divTop = 0;
            divLeft = 0;
            height = "100%"
        }

        return (
            <div>
                {this.props.isLoading ? (
                    <div className={"loadingDiv"} style={{top: divTop, left: divLeft, height: height}}>
                        <div className={"sk-fold"} style={{margin: "0 auto"}}>
                            <div className={"sk-fold-cube"}/>
                            <div className={"sk-fold-cube"}/>
                            <div className={"sk-fold-cube"}/>
                            <div className={"sk-fold-cube"}/>
                        </div>
                        <h3>{this.props.loadingMessage}...</h3>
                        <p>
                            {this.props.loadTimeCounter ? (
                                <span>Elapsed {this.props.loadTimeCounter}s.</span>
                            ) : (
                                <span/>
                            )}{" "}
                            {this.props.loadingExtraText}
                        </p>

                        {this.props.isConnected2Gremlin
                            ? <span></span>
                            : <p>Failed to connect to the database.</p>
                        }
                        {this.props.loadTimeCounter >=
                        DefaultMaxTimeElapsedWarningInSeconds ? (
                            <span>Strange! this operation took more than{" "}
                                {DefaultMaxTimeElapsedWarningInSeconds}</span>
                        ) : (
                            <span/>
                        )}
                        {this.props.showSignOut === true ? (
                            <p>
                                <a href="/switch-server">
                                    <u>switch</u> to a different server.
                                </a>
                            </p>
                        ) : (
                            <span/>
                        )}
                    </div>
                ) : (
                    <span/>
                )}
            </div>
        );
    }
}
