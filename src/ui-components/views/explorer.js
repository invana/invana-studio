import React from "react";
import DefaultLayout from "../layouts/default";
import Canvas from "../viewlets/canvas/canvas";
import Welcome from "../viewlets/welcome/welcome";
import DefaultRemoteRoutableComponent from "../layouts/default-remote-routable";
import {STUDIO_SETTINGS} from "../../settings";


export default class Explorer extends DefaultRemoteRoutableComponent {

    static defaultProps = {
        connectionUrl: STUDIO_SETTINGS.CONNECTION_URL,
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            showWelcome: true
        }
    }

    setWelcome(welcomeStatus) {
        this.setState({showWelcome: welcomeStatus});
    }

    render() {
        return (
            <DefaultLayout>
                {
                    this.state.showWelcome
                        ? <Welcome setWelcome={this.setWelcome.bind(this)}/>
                        : <React.Fragment/>
                }
                <Canvas showCommandConsole={!this.state.showWelcome}/>
            </DefaultLayout>
        );
    }
}
