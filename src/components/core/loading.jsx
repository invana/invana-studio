import React from "react";
import {DefaultConnectionRetryTimeout, DefaultMaxTimeExlapsedWarninginSeconds} from "../../config";

export default class LoadingDiv extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "timerCount": 0
        }
    }

    updateStatus(timerCount, maxTimeElapsedError) {
        // this.setState({
        //     timerCount: timerCount,
        //     maxTimeElapsedError: maxTimeElapsedError
        // })
    }


    componentDidMount() {
        this.updateStatus(0, false)
    }

    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //
    //     return false;
    //
    // }

    render() {
        let _this = this;
        let divHeight = 0;
        if (window.location.pathname === "/explorer") {
            divHeight = "35px";
        }

        return (
            <div>
                {(this.props.statusMessage && this.props.statusMessage.toLowerCase().includes("sending"))
                    ? (
                        <div className='loadingDiv' style={{"top": divHeight}}>
                            <h3>{this.props.loadingMessage}...</h3>
                            <p>Elapsed {this.props.loadTimeCounter}s. {this.props.loadingExtraText}</p>
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
