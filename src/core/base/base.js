import React, {Component} from 'react';
import {DefaultMaxTimeElapsedWarningInSeconds} from "../../config";
import LoadSpinner from "../ui/spinner";
import {StatusMessageComponent} from "../gremlin-connector";
import Footer from "../ui/footer";

export default class ComponentBase extends React.Component {

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
    }


    updateTimer(timerCount, isMaxTimeElapsed) {
        this.setState({loaderElapsedTimer: timerCount, loaderMaxTimeElapsedError: isMaxTimeElapsed});
    }

    startLoaderTimer() {
        console.log("loader Timer started")
        let _this = this;
        let i = 0;
        let timer = setInterval((function () {
                i += 1;

                console.log("base loader Timer started xyx; i", i);
                if (_this.state.isLoading === false) {
                    clearInterval(timer);
                }

                if (i >= DefaultMaxTimeElapsedWarningInSeconds) {
                    _this.updateTimer(i, true);
                } else {
                    _this.updateTimer(i, false);

                }

            }
        ), 1000); // check every second.
    }


    setStatusMessage(messageText) {
        this.setState({statusMessage: messageText});
    }

    render() {
        return (
            <Footer>

                <StatusMessageComponent statusMessage={this.state.statusMessage}/>
                <LoadSpinner
                    loadingMessage={this.state.loadingMessage}
                    loadingExtraText={this.state.loadingExtraText}
                    isLoading={this.state.isLoading}
                    showSignout={true}
                    loadTimeCounter={this.state.loaderElapsedTimer}/>
            </Footer>
        )
    }


}
