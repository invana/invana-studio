// import React from "react";
import RemoteGraphComponent from "../core/graph-component";


class RemoteGraphComponentViewBase extends RemoteGraphComponent {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            canvasType: "graph",
            selectedElementData: null,
            selectedLabel: null,
            selectedLabelType: null,
            query: null,
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
        console.log("extending the graph data .")
        let _this = this;
        const serializedData = _this.responseSerializer.process(response.getResponseData());
        const {nodes, links} = _this.responseSerializer.separateVerticesAndEdges(serializedData);

        console.log("extending graph=========", Object.assign(nodes, {}), Object.assign(links, {}));
        this.dataStore.addData(nodes, links,
            //
            () => {
                _this.setState({
                    shallReRenderD3Canvas: true
                })
            }
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
        console.log("reRenderCanvas",)
        // this.setState({
        //     vertices: this.dataStore.getAllRawVerticesList(),
        //     edges: this.dataStore.getAllRawEdgesList()
        // })
        //
        this.resetShallReRenderD3Canvas();
        this.render()
        this.forceUpdate();
    }


    setHideVertexOptions() {
        this.setState({
            selectedLabel: null,
            selectedLabelType: null,
            middleBottomContentName: null
        })
    }


    setShowVertexOptions(label, labelType) {
        console.log("setShowVertexOptions", label, labelType)
        this.setState({
            selectedLabel: label,
            selectedLabelType: labelType,
            middleBottomContentName: "vertex-options"
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
    setShallReRenderD3Canvas(status) {
        this.setState({
            shallReRenderD3Canvas: status
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


