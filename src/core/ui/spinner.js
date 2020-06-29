import React from "react";
import {DefaultMaxTimeElapsedWarningInSeconds} from "../../config";
import "./spinner.scss";

export default class LoadSpinner extends React.Component {


    render() {
        let divTop = 0;
        let divLeft = 0;
        if (window.location.pathname === "/explorer") {
            divTop = "46px";
            divLeft = "46px";
        } else if (window.location.pathname === "/") {
            divTop = 0;
            divLeft = 0;
        }

        return (
            <div>
                {(this.props.isLoading)
                    ? (
                        <div className={'loadingDiv'} style={{"top": divTop, "left": divLeft}}>
                            <div className={"sk-fold"} style={{"margin": "0 auto"}}>
                                <div className={"sk-fold-cube"}></div>
                                <div className={"sk-fold-cube"}></div>
                                <div className={"sk-fold-cube"}></div>
                                <div className={"sk-fold-cube"}></div>
                            </div>
                            <h3>{this.props.loadingMessage}...</h3>
                            <p>{(this.props.loadTimeCounter) ? (<span>Elapsed {this.props.loadTimeCounter}s.</span>) : (
                                <span></span>)} {this.props.loadingExtraText}</p>
                            {(this.props.loadTimeCounter >= DefaultMaxTimeElapsedWarningInSeconds)
                                ? (
                                    <span>Strange! this operation took more than {DefaultMaxTimeElapsedWarningInSeconds}</span>)
                                : (<span></span>)
                            }
                            {(this.props.showSignout === true) ?
                                <p><a href="/switch-server"><u>switch</u> to a different server.</a></p> : <span></span>}
                        </div>
                    ) : (<span></span>)
                }
            </div>

        )
    }
}
