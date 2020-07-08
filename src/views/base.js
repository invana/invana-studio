// import React from "react";
import GremlinBasedComponent from "../core/gremlin-component";
import GremlinResponseSerializers from "../core/gremlin-serializer";

const serializer = new GremlinResponseSerializers();


class GremlinViewBase extends GremlinBasedComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            canvasType: "graph",
            selectedElementData: null,
            query: "g.V().limit(5).toList()",
            vertices: [],
            edges: []

        };
    }

    setSelectedElementData(selectedData) {
        this.setState({
            selectedElementData: selectedData,
        })
    }


    extendGraph(responses) {
        let overallNodes = this.state.vertices;
        let overallLinks = this.state.edges;
        console.log("========this.state", this.state)
        console.log("<<<>>>overallNodes", overallNodes);

        responses.forEach(function (response) {
            const serializedData = serializer.process(response);
            const separatedData = serializer.separateVerticesAndEdges(serializedData);
            overallNodes = overallNodes.concat(separatedData['nodes']);
            overallLinks = overallLinks.concat(separatedData['links']);
        });
        const uniqueNodes = [...new Map(overallNodes.map(item => [item.id, item])).values()];
        const uniqueLinks = [...new Map(overallLinks.map(item => [item.id, item])).values()];

        console.log("<<<>>>uniqueNodes", uniqueNodes);
        console.log("<<<>>>uniqueLinks", uniqueLinks);
        this.setState({
            vertices: uniqueNodes,
            edges: uniqueLinks,
            shallReRenderD3Canvas: true
        })
    }


    processResponse(responses) {
        this.responseSessions = this.responseSessions.concat(responses);
        console.log("responseSessions", this.responseSessions);
        this.setState({
            responses: this.responseSessions,
            shallReRenderD3Canvas: true
        })
    }

    onQuerySubmit(query, queryOptions) {
        super.onQuerySubmit(query, queryOptions)
        // this.updateVerticesAndEdges();
    }

    // setShowVertexOptions(selectedElementData) {
    //     // alert("setShowVertexOptions");
    //
    //     this.setState({
    //         selectedElementData: selectedElementData,
    //         middleBottomContentName: "vertex-options"
    //     })
    // }

    reRenderCanvas() {
        this.setState({
            shallReRenderD3Canvas: true
        })
    }

    setHideVertexOptions() {
        this.setState({
            selectedElementData: null,
            middleBottomContentName: null
        })
    }

    componentDidMount() {
        super.componentDidMount();
    }

    resetShallReRenderD3Canvas() {
        this.setState({
            shallReRenderD3Canvas: false
        })
    }


}

export default class BaseView extends GremlinViewBase {


    responseSessions = []; // responses from all the queries
    requests = []

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            // layout var start
            leftContentName: null,
            rightContentName: null,
            bottomContentName: null,
            middleBottomContentName: null,
            // layout var ends
        };
    }


    setLeftContent(contentName) {
        this.setState({leftContentName: contentName});
    }

    setRightContentName(contentName) {
        this.setState({rightContentName: contentName});
    }

    setBottomContentName(contentName) {
        this.setState({bottomContentName: contentName});
    }

    setMiddleBottomContentName(contentName) {
        this.setState({middleBottomContentName: contentName});
    }


    ///

}


