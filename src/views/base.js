// import React from "react";
import RemoteGraphComponent from "../core/graph-component";


class RemoteGraphComponentViewBase extends RemoteGraphComponent {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            canvasType: "graph",
            selectedElementData: null,
            // query: this.connector.requestBuilder.initQuery(),
            // vertices: [],
            // edges: []
        };
    }

    setSelectedElementData(selectedData) {
        this.setState({
            selectedElementData: selectedData,
        })
    }

    // getUniqueItems(data) {
    //     let uniqueItems = [];
    //     data.forEach(function (item) {
    //         const i = uniqueItems.findIndex(x => x.id === item.id);
    //         if (i <= -1) {
    //             uniqueItems.push(item);
    //         }
    //     });
    //     return uniqueItems
    //
    // }

    extendGraph(response) {
        // let overallNodes = this.state.vertices;
        // let overallLinks = this.state.edges;
        console.log("extending the graph data .")
        let _this = this;
        const serializedData = _this.responseSerializer.process(response.getResponseData());
        const {nodes, links} = _this.responseSerializer.separateVerticesAndEdges(serializedData);


        this.dataStore.addData(nodes, links,
            //
            // () => {
            //     _this.setState({
            //         shallReRenderD3Canvas: true
            //     })
            // }
        );




        // responses.forEach(function (response) {
        //     const serializedData = _this.responseSerializer.process(response.getResponseData());
        //     const separatedData = _this.responseSerializer.separateVerticesAndEdges(serializedData);
        //     overallNodes = overallNodes.concat(separatedData['nodes']);
        //     overallLinks = overallLinks.concat(separatedData['links']);
        // });
        // const uniqueNodes = this.getUniqueItems(overallNodes);
        // const uniqueLinks = this.getUniqueItems(overallLinks);
        // this.setState({
        //     vertices: uniqueNodes,
        //     edges: uniqueLinks,
        //     shallReRenderD3Canvas: true
        // })
    }

    //
    processResponse(response) {

        console.log("processResponse", response);
        this.extendGraph(response);
        this.reRenderCanvas();
    }


    reRenderCanvas() {
        console.log("reRenderCanvas", this.dataStore.getAllData())
        // this.setState({
        //     vertices: this.dataStore.getAllRawVerticesList(),
        //     edges: this.dataStore.getAllRawEdgesList()
        // })
        //
        this.render()
        this.forceUpdate();
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
            middleTopContentName: "vertices-management"
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

    setMiddleTopContentName(contentName) {
        this.setState({middleTopContentName: contentName});
    }


}


