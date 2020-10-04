// import React from "react";
import RemoteGraphComponent from "../core/graph-component";



class RemoteGraphComponentViewBase extends RemoteGraphComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            canvasType: "graph",
            selectedElementData: null,
            query: this.requestBuilder.initQuery(),
            vertices: [],
            edges: []
        };
    }

    setSelectedElementData(selectedData) {
        this.setState({
            selectedElementData: selectedData,
        })
    }

    getUniqueItems(data) {
        let uniqueItems = [];
        data.forEach(function (item) {
            const i = uniqueItems.findIndex(x => x.id === item.id);
            if (i <= -1) {
                uniqueItems.push(item);
            }
        });
        return uniqueItems

    }

    extendGraph(responses) {
        let overallNodes = this.state.vertices;
        let overallLinks = this.state.edges;
        let _this = this;
        responses.forEach(function (response) {
            const serializedData = _this.responseSerializer.process(response.getResponseData());
            const separatedData = _this.responseSerializer.separateVerticesAndEdges(serializedData);
            overallNodes = overallNodes.concat(separatedData['nodes']);
            overallLinks = overallLinks.concat(separatedData['links']);
        });
        const uniqueNodes = this.getUniqueItems(overallNodes);
        const uniqueLinks = this.getUniqueItems(overallLinks);
        this.setState({
            vertices: uniqueNodes,
            edges: uniqueLinks,
            shallReRenderD3Canvas: true
        })
    }


    processResponse(responses) {

        this.responseSessions = this.responseSessions.concat(responses);
        const responseSessions = this.responseSessions.filter(e => e)
        console.log("responseSessions", responseSessions);
        this.setState({
            responses: responseSessions,
            shallReRenderD3Canvas: true
        })
    }


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

export default class BaseView extends RemoteGraphComponentViewBase {


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


}


