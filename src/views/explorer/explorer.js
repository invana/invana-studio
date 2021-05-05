import React from "react";
import DefaultLayout from "../../ui-components/layout/default-layout";
import Canvas from "../../viewlets/canvas/canvas";
import Welcome from "../../viewlets/welcome/welcome";


export default class Explorer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showWelcome: true
        }
    }

    setWelcome(welcomeStatus){
        this.setState({showWelcome: welcomeStatus});
    }

    render() {
        return (
            <DefaultLayout>
                {
                    this.state.showWelcome
                    ? <Welcome setWelcome={this.setWelcome.bind(this)}/>
                    : <React.Fragment />
                }
                <Canvas showCommandConsole={!this.state.showWelcome} />
            </DefaultLayout>
        );
    }
}
