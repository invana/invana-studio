import React from "react";
import LeftNav from "../components/core/left-nav";
import HeaderNav from "../components/core/header-nav";
import MainContent from "../components/core/main-content";


const textAreaDiv = {
    "width": "calc(50% - 30px)",
    "float": "left",
    "height": "calc(100vh - 42px)"
}
const textAreaCls = {
    "width": "calc(100% - 30px)",
    "height": "100%",
    "background": "#212427",
    "border": "1px solid #2f2f2f",
    "resize": "none",
    "color": "#efefef",
    "padding": "15px",
    "fontSize": "16px"
}

const ResponseDiv = {
    "width": "50%",
    "height": "calc(100vh - 42px)",
    "float": "left",
    "padding": "15px"
}

const codeDiv = {
    "fontSize": "12px"
}
export default class ConsoleView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "title": "Console"
        }
    }

    render() {
        return (
            <div className="App">
                <LeftNav/>
                <MainContent>
                    <HeaderNav title={this.state.title}/>
                    <div>
                        <div style={textAreaDiv}>
                            <textarea style={textAreaCls} name="" id="" cols="30" rows="10">
                            </textarea>
                        </div>
                        <div style={ResponseDiv}>
                            <code style={codeDiv}>

                                "title": "Response"

                            </code>
                        </div>

                    </div>
                </MainContent>
            </div>
        );
    }


}

