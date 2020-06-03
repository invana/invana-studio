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
        this.setState({
            timerCount: timerCount,
            maxTimeElapsedError: maxTimeElapsedError
        })
    }


    componentDidMount() {
        this.updateStatus(0, false)
    }

    //
    componentDidUpdate(prevProps, prevState, snapshot) {

        return false;

    }

    render() {
        let _this = this;
        let divHeight = 0;
        if (window.location.pathname === "/explorer") {
            divHeight = "35px";
        }
        let i = 1;
        // let timer = setInterval((function () {
        //         _this.updateStatus(i, false);
        //         i += 1;
        //         if (i >= DefaultMaxTimeExlapsedWarninginSeconds) {
        //             _this.updateStatus(i, true);
        //         }
        //     }
        // ), 1000); // retry in 5 seconds

        return (
            <div>
                {(this.props.statusMessage && this.props.statusMessage.toLowerCase().includes("sending"))
                    ? (
                        <div className='loadingDiv' style={{"top": divHeight}}>
                            <h3>{this.props.loadingMessage}...</h3>
                            <p>Elapsed {this.state.timerCount}s. {this.props.loadingExtraText}</p>
                        </div>
                    ) : (<span></span>)
                }


            </div>

        )
    }
}
