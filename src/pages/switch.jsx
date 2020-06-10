import React from "react";
import LeftNav from "../components/core/left-nav";
import MainContent from "../components/core/main-content";
import {removeEverythingFromLocalStorage} from "../components/core/utils";


export default class SwitchServerView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "title": "Signing out..."
        }
    }

    componentDidMount() {
        removeEverythingFromLocalStorage();
        // window.location.reload();
        window.location.href = "/";
    }

    render() {
        return (
            <div className="App">
                <LeftNav/>
                <MainContent>
                    <div style={{"margin-top": "10rem", "textAlign": "center"}}>
                        <h1>{this.state.title}</h1>
                    </div>
                </MainContent>

            </div>
        );
    }


}

