import React from "react";
import {DefaultConnectionRetryTimeout, DefaultMaxTimeExlapsedWarninginSeconds} from "../../config";

export default class LoadingDiv extends React.Component {


    render() {
        let _this = this;
        let divHeight = 0;
        if (window.location.pathname === "/explorer") {
            divHeight = "35px";
        }
            console.log("this.props.showLoading", this.props.showLoading);

        return (
            <div>
                {(this.props.showLoading === true)
                    ? (
                        <div className='loadingDiv' style={{"top": divHeight}}>
                            <h3>{this.props.loadingMessage}...</h3>
                            <p>{(this.props.loadTimeCounter) ? (<span>Elapsed {this.props.loadTimeCounter}s.</span>) : (
                                <span></span>)} {this.props.loadingExtraText}</p>
                            {(this.maxTimeElapsedError === true)
                                ? (
                                    <span>Strange! this operation took more than {DefaultMaxTimeExlapsedWarninginSeconds}</span>)
                                : (<span></span>)
                            }
                        </div>
                    ) : (<span></span>)
                }


            </div>

        )
    }
}
