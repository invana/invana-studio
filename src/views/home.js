import React from "react";
import MainLeftNav from "../core/ui/structure/left";
import MainHeaderNav from "../core/ui/structure/header";
import MainContent from "../core/ui/main-content";
import JSONCanvas from "../core/ui/canvas/json";
import Welcome from "../core/ui/welcome";
import GremlinConnectorComponent from "../core/gremlin-connector";

export default class HomeView extends GremlinConnectorComponent {


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data: null
    //     }
    // }

    constructor(props) {
        super(props);
        this.state = {
            data:null,
            canvasType: "graph"
        }
    }

    onQuerySubmit(query) {
        console.log("Query is " + query);
        // make query to gremlin here
        this.makeQuery(query);
    }

    processResponse(responses) {
        this.setState({
            data: responses
        })
    }

    render() {

        const parentHTML = super.render();
        return (
            <div>
                <MainLeftNav/>
                <MainHeaderNav onQuerySubmit={this.onQuerySubmit.bind(this)}/>
                <MainContent>
                    {(() => {
                        if (this.state.canvasType === "graph" && this.state.data) {
                            return (
                                <div>Graph</div>
                            )
                        } else if (this.state.canvasType === "table" && this.state.data) {
                            return (
                                <div>table</div>
                            )
                        }  else if (this.state.canvasType === "json" && this.state.data) {
                            return (
                                <JSONCanvas data={this.state.data}/>
                            )
                        } else {
                            return (
                                <Welcome makeQuery={this.makeQuery.bind(this)}/>
                            )
                        }
                    })()}

                </MainContent>
                {parentHTML}
            </div>
        )
    }
}
