import React from "react";
import Navigation from "../components/core/navigation";
import HeaderNav from "../components/core/header-nav";


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
                <Navigation/>
                <div style={aboutDiv}>
                    <h1 style={{"margin": "0"}}>{this.state.title}</h1>
                    <p>Opensource Graph Data Visualiser for Tinkerpop supported Graph Databases.</p>
                    <p>
                        <a style={marginRight} target={"_blank"}
                           href="https://github.com/invanalabs/graph-explorer">@github</a>

                    </p>


                </div>
            </div>
        );
    }


}

