import React from "react";
import "./management.css";
import LeftNav from "../../components/core/left-nav";
import HeaderNav from "../../components/core/header-nav";
import MainContent from "../../components/core/main-content";
import GremlinConnectorViewBase from "../../components/core/gremlin-connector";
import {ConnectionStatus, CopyRightInfo} from "../../components/visualizer/util-components";
import GremlinResponseSerializers from "../../components/visualizer/gremlin-serializer";
import {
    InvanaManagementLabel, DefaultNodeBgColor,
    DefaultNodeBorderColor, DefaultNodeBgPropertyKey
} from "../../config";
import {prepareNodesDataWithOptions} from "../../components/visualizer/canvas-utils";

export default class NodesManagementView extends GremlinConnectorViewBase {
    gremlin_serializer = new GremlinResponseSerializers();


    constructor(props) {
        super(props);
        this.state = {
            "title": "Nodes | Management",
            "vertices": []
        }
    }

    getVerticesManagement() {
        this.queryGremlinServer("nodes=g.V().label().groupCount().toList(); [nodes]", false)
    }

    serializeStatsData(data) {
        let _list = data['@value'][0]['@value'][0]['@value'];
        let cleaned_data = Object({});
        _list.forEach(function (item, i) {
            if (typeof item === "string") {
                cleaned_data[item] = _list[i + 1]['@value']
            }
        })
        return cleaned_data

    }


    checkIfExistOrCreate(nodeStats) {
        /*
        g.V().has('InvanaManagement','LabelName','Person').tryNext().orElseGet{
    g.addV('InvanaManagement').property('LabelName','Person').next()}
         */
        let query = "";
        Object.keys(nodeStats).forEach(function (key) {
            query = query + "g.V().has('" + InvanaManagementLabel + "','name','" + key + "')" +
                ".has('" + InvanaManagementLabel + "','type','Vertex')" +
                ".tryNext()" +
                ".orElseGet{g.addV('" + InvanaManagementLabel + "')" +
                ".property('name','" + key + "')" +
                ".property('type','Vertex')" +
                ".property('bgColor','" + DefaultNodeBgColor + "')" +
                ".property('bgImagePropertyKey','" + DefaultNodeBgPropertyKey + "')" +
                ".property('borderColor','" + DefaultNodeBorderColor + "')" +
                ".next()};"
        })
        query = query + 'g.V().hasLabel("' + InvanaManagementLabel + '").has("type","Vertex").toList()';
        this.queryGremlinServer(query, false);


    }

    serializeManagementVerticesData(response) {
        let result = this.gremlin_serializer.process(response);
        let _ = this.gremlin_serializer.seperate_vertices_and_edges(result, false);
        return _.nodes;
    }


    processGremlinResponseEvent(event) {
        let _this = this;
        let response = JSON.parse(event.data);
        console.log("onmessage received", response);
        if (response.status.code === 200 || response.status.code === 206) {
            _this.updateStatusMessage("Query Successfully Responded.");
            // create Management data needed if necessary.
            let _type = response.result.data['@value'][0]['@type'];
            if (_type === "g:List") {
                let nodeStats = this.serializeStatsData(response.result.data);
                this.checkIfExistOrCreate(nodeStats)
            } else if (_type === "g:Vertex") {
                let serializedData = this.serializeManagementVerticesData(response);
                _this.updateStatusMessage("Query Successfully Responded.");
                _this.setState({
                    "errorMessage": null,
                    vertices: serializedData
                })
            }
        } else {

            _this.setState({
                "errorMessage": JSON.stringify(response,),
                "showErrorMessage": true,
                "statusMessage": "Query Successfully Responded." +
                    " But returned non 200 status[" + response.status.code + "]"
            })
        }
    }


    componentDidMount() {
        super.componentDidMount.apply(this);
        this.getVerticesManagement();
    }

    // onPropertyChanged(vertex, propertyKey) {
    //
    // }
    onVertexFormSubmit(e) {
        e.preventDefault();
        console.log("formdata", e.target);
        let query = "update = g.V(" + parseInt(e.target.uid.value) + ")" +
            ".property('bgColor', '" + e.target.bgColor.value + "')" +
            ".property('bgImageUrl', '" + e.target.bgImageUrl.value + "')" +
            ".property('bgImagePropertyKey', '" + e.target.bgImagePropertyKey.value + "')" +
            ".property('borderColor', '" + e.target.borderColor.value + "');";

        if (query && this.ws) {
            this.queryGremlinServer(query, false);
        }
    }


    render() {
        console.log("=====Node", this.state.vertices);
        return (
            <div className="App">

                <LeftNav/>
                <MainContent>
                    <HeaderNav title={this.state.title}/>
                    <div className="" style={{"padding": "15px"}}>
                        <ul className={"nav"}>
                            <li><a href="/management/nodes">Nodes</a></li>
                            <li><a href="/management/links">Links</a></li>
                            <li><a href="/management/settings">Settings</a></li>

                        </ul>
                        <hr/>

                        {
                            this.state.vertices.map((vertex, index) => (
                                (vertex.properties.name !== "InvanaManagement") ? (
                                    <form style={{"marginBottom": "5px"}} action=""
                                          key={vertex.properties.name + "-form"}
                                          onSubmit={this.onVertexFormSubmit.bind(this)}>
                                        <div className={'node-coloring'}
                                             style={{
                                                 "backgroundColor": vertex.properties.bgColor,
                                                 "borderColor": vertex.properties.borderColor
                                             }}>&nbsp;
                                        </div>
                                        <input type="text" name={"name"} readOnly={"readonly"}
                                               defaultValue={vertex.properties.name}/>
                                        <input type="hidden" name={"label"} defaultValue={vertex.label}/>
                                        <input type="hidden" name={"uid"} defaultValue={vertex.id}/>

                                        <input type="text" name={"bgColor"} maxLength={7} minLength={7}
                                               placeholder={"bgColor"}
                                               defaultValue={vertex.properties.bgColor}/>
                                        <input type="text" name={"borderColor"} maxLength={7} minLength={7}
                                               placeholder={"borderColor"}
                                               defaultValue={vertex.properties.borderColor}/>

                                        <input type="text" name={"bgImageUrl"} placeholder={"bgImage (optional)"}
                                               defaultValue={vertex.properties.bgImageUrl || ""}/>

                                        <input type="text" name={"bgImagePropertyKey"}
                                               placeholder={"bgImagePropertyKey (optional)"}
                                               defaultValue={vertex.properties.bgImagePropertyKey || ""}/>


                                        <button type={"submit"}>update</button>

                                    </form>
                                ) : (<span key={vertex.properties.name}> </span>)

                            ))
                        }
                        {/*    </tbody>*/}
                        {/*</table>*/}
                    </div>
                    <ConnectionStatus
                        statusMessage={this.state.statusMessage}
                        isConnected2Server={this.state.isConnected2Server}
                        showErrorMessage={this.state.showErrorMessage}
                        errorMessage={this.state.errorMessage}
                        closeErrorMessage={this.closeErrorMessage.bind(this)}

                    />
                    <CopyRightInfo/>
                </MainContent>

            </div>
        );
    }


}

