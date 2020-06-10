import React from "react";
import { DefaultMaxTimeExlapsedWarninginSeconds} from "../../config";
import "./spinner.css";

export default class LoadingDiv extends React.Component {


    render() {
        let divHeight = 0;
        if (window.location.pathname === "/explorer") {
            divHeight = "35px";
        }
        console.log("this.props.showLoading", this.props.showLoading);

        return (
            <div>
                {(this.props.showLoading === true)
                    ? (
                        <div className={'loadingDiv'} style={{"top": divHeight}}>
                            <div className={"sk-fold"} style={{"margin": "0 auto"}}>
                                <div className={"sk-fold-cube"}></div>
                                <div className={"sk-fold-cube"}></div>
                                <div className={"sk-fold-cube"}></div>
                                <div className={"sk-fold-cube"}></div>
                            </div>
                            <h3>{this.props.loadingMessage}...</h3>
                            <p>{(this.props.loadTimeCounter) ? (<span>Elapsed {this.props.loadTimeCounter}s.</span>) : (
                                <span></span>)} {this.props.loadingExtraText}</p>
                            {(this.props.loadTimeCounter >= DefaultMaxTimeExlapsedWarninginSeconds)
                                ? (
                                    <span>Strange! this operation took more than {DefaultMaxTimeExlapsedWarninginSeconds}</span>)
                                : (<span></span>)
                            }

                            {(this.props.showSignout === true) ? <p><a href="/switch-server">switch to a different server.</a></p> : <span></span>}

                        </div>
                    ) : (<span></span>)
                }


            </div>

        )
    }
}
