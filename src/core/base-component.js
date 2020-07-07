import React from 'react';
import {DefaultMaxTimeElapsedWarningInSeconds} from "../config";


export default class BaseComponent extends React.Component {

    /*


     */
    constructor(props) {
        super(props);
        this.state = {
            statusMessage: null,
            isLoading: false,
            loaderElapsedTimer: 0,
            loaderMaxTimeElapsedError: false,
            loadingMessage: null,
            loadingExtraText: null,
        }
    }


    startLoader(message, extraMessage) {
        this.setState({
            loadingMessage: message,
            loadingExtraText: extraMessage,
            isLoading: true,
            loaderElapsedTimer: 0
        })
        this.startLoaderTimer()
    }

    resetLoader() {
        this.setState({
            loadingMessage: null,
            loadingExtraText: null,
            isLoading: false,
            loaderElapsedTimer: null
        })
        clearInterval(this.timer);
        clearInterval(this.timer2);
    }


    updateTimer(timerCount, isMaxTimeElapsed) {
        this.setState({loaderElapsedTimer: timerCount, loaderMaxTimeElapsedError: isMaxTimeElapsed});
    }

    startLoaderTimer() {
        console.log("loader Timer started")
        let _this = this;
        let i = 0;
        this.timer = setInterval((function () {
                i += 1;

                console.log("base loader Timer started xyx; i", i);
                if (_this.state.isLoading === false) {
                    clearInterval(this.timer);
                }

                if (i >= DefaultMaxTimeElapsedWarningInSeconds) {
                    _this.updateTimer(i, true);
                } else {
                    _this.updateTimer(i, false);

                }

            }
        ), 1000); // check every second.
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        clearInterval(this.timer2)
    }

    setStatusMessage(messageText) {
        this.setState({statusMessage: messageText});
    }

    // render() {
    //     return (
    //         <Footer>
    //             <StatusMessageComponent statusMessage={this.state.statusMessage}/>
    //             <LoadSpinner
    //                 loadingMessage={this.state.loadingMessage}
    //                 loadingExtraText={this.state.loadingExtraText}
    //                 isLoading={this.state.isLoading}
    //                 showSignout={true}
    //                 loadTimeCounter={this.state.loaderElapsedTimer}/>
    //         </Footer>
    //     )
    // }


}
