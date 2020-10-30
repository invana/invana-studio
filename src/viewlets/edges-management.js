import React from "react";
import RemoteGraphComponent from "../core/graph-component";
import GEList from "../ui-components/lists/list";

export default class EdgesManagement extends RemoteGraphComponent {

    state = {
        edgesLabels: []
    }

    componentDidMount() {
        const queryPayload = this.connector.requestBuilder.getEdgesLabelStats();
        this.makeQuery(queryPayload);
    }

    processResponse(response) {
        console.log("=====responses===", response);
        const result = response.getResponseResult();
        if (result) {
            this.setState({edgesLabels: response.getResponseResult()})
        }
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
                                            this.connector.requestBuilder.getNeighborEdgesAndVertices(edgeLabel.label, 10, 0), {'source': 'canvas'})}>{edgeLabel.label} ({edgeLabel.count})
                            </li>)
                        })
                    }
                </GEList>
            </div>

        );
    }
}
