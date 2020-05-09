import React from "react";
import LeftNav from "../components/core/left-nav";
import MainContent from "../components/core/main-content";

const aboutDiv = {
    "maxWidth": "600px",
    "margin": "0 auto",
    "marginTop": "15rem",
    "border": "2px solid rgb(84, 86, 95)",
    "padding": "15px"
}

const marginRight = {
    "marginRight": "20px"
}

const small = {
    "background": "#47ab4e",
    "color": "#3b3e4c",
    "fontSize": "16px",
    "padding": "2px 4px",
    "marginLeft": "6px",
    "paddingBottom": "0"
}


export default class AboutView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "title": "Invana Graph Explorer"
        }
    }

    render() {
        return (
            <div className="App">
                <LeftNav/>
                <MainContent>
                    <div style={aboutDiv}>
                        <h1 style={{"margin": "0"}}>{this.state.title}
                            <small style={small}>Beta</small>
                        </h1>
                        <p>
                            Opensource Graph Data
                            Visualiser for Graph Databases and <a style={{"color": " inherit"}} href="https://invana.io">Invana Graph.</a>
</p>
                        <p>
                            <a style={marginRight} target={"_new"}
                               href="https://github.com/invanalabs/graph-explorer">@github</a>
                            <a style={marginRight} target={"_new"}
                               href="https://invana.io/graph-explorer/">@documentation</a>

                        </p>
                    </div>
                </MainContent>

            </div>
        );
    }


}

