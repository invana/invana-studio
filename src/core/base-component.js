import React from 'react';
// import {DefaultMaxTimeElapsedWarningInSeconds} from "../config";


export default class BaseComponent extends React.Component {

    /*


     */

    loaderTimerIntervalId = null;

    constructor(props) {
        super(props);
        this.state = {
            statusMessage: null,
            isLoading: false,
            loaderElapsedTimer: 0,
            loadingMessage: null,
            loadingExtraText: null,
        }
    }


    resetLoader() {
        clearInterval(this.loaderTimerIntervalId);
        this.setState({
            loadingMessage: null,
            loadingExtraText: null,
            isLoading: false,
            loaderElapsedTimer: null
        })

    }


    setStatusMessage(messageText) {
        this.setState({statusMessage: messageText});
    }


}
