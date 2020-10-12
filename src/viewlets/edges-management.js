import React from "react";
import RemoteGraphComponent from "../core/graph-component";
import GEList from "../ui-components/lists/list";

export default class EdgesManagement extends RemoteGraphComponent {

    state = {
        edgesLabels: []
    }

    componentDidMount() {
        const queryPayload = this.requestBuilder.getEdgesLabelStats();
        this.makeQuery(queryPayload);
    }

    processResponse(responses) {
        console.log("=====responses===", responses);
        const response = responses[0];
        // if (response.status.code !== 200) {
        //     // this.props.setErrorMessage(response.status);
        //     console.log("Failed to get the vertices labels");
        // }else {
        console.log("===>>", response.getResponseResult());
        this.setState({edgesLabels: response.getResponseResult()})
        // }
        // this.props.setStatusMessage("Updated options for label '" + this.props.selectedElementData.label + "'");
        // this.props.reRenderCanvas();
    }


    render() {
        console.log("=====this.state.edgesLabels", this.state.edgesLabels);
        return (

            <div className={" p-10"}>
                <GEList type={"vertical-no-border"}>
                    {
                        this.state.edgesLabels.map((edgeLabel, index) => {
                            return (<li style={{"marginBottom": "5px", "cursor": "pointer"}} key={index}
                                        onClick={() => this.props.parentGraphComponent.makeQuery(
                                            this.requestBuilder.filterEdges(edgeLabel.label, 10, 0), {'source': 'canvas'})}>{edgeLabel.label} ({edgeLabel.count})
                            </li>)
                        })
                    }
                </GEList>
            </div>

        );
    }
}
