import React from "react";
import "./management.css";
import LeftNav from "../components/core/left-nav";
import HeaderNav from "../components/core/header-nav";
import MainContent from "../components/core/main-content";
import GremlinConnectorViewBase from "../components/core/gremlin-connector";
import {ConnectionStatus, CopyRightInfo} from "../components/visualizer/util-components";
import GremlinResponseSerializers from "../components/visualizer/gremlin-serializer";
import {
    InvanaManagementLabel, DefaultNodeBgColor,
    DefaultNodeBorderColor, DefaultNodeBgPropertyKey
} from "../config";


const nodeColorStyle = {
    width: '20px',
    height: '20px',
    background: 'rebeccapurple',
    display: 'inline-block',
    marginRight: '5px',
    borderRadius: '30rem',
    border: '2px solid #999999'

}
export default class ManagementView extends GremlinConnectorViewBase {
    gremlin_serializer = new GremlinResponseSerializers();


    constructor(props) {
        super(props);
        this.state = {
            "title": "Graph Data Management",
            "vertices": []
        }
    }

    /*
    g.V().has('InvanaManagement','LabelName','Person').tryNext().orElseGet{
        g.addV('InvanaManagement').property('LabelName','Person').next()}

     */

    getVerticesManagement() {
        this.queryGremlinServer("nodes=g.V().label().groupCount().toList();links=g.E().label().groupCount().toList(); [nodes, links]", false)
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


    queryVertexData(vertexStats) {
        /*
        g.V().has('InvanaManagement','LabelName','Person').tryNext().orElseGet{
    g.addV('InvanaManagement').property('LabelName','Person').next()}
         */
        let query = "";
        Object.keys(vertexStats).forEach(function (key) {
            query = query + "g.V().has('" + InvanaManagementLabel + "','name','" + key + "')" +
                ".tryNext()" +
                ".orElseGet{g.addV('" + InvanaManagementLabel + "')" +
                ".property('name','" + key + "')" +
                ".property('bgColor','" + DefaultNodeBgColor + "')" +
                ".property('bgImagePropertyKey','" + DefaultNodeBgPropertyKey + "')" +
                ".property('borderColor','" + DefaultNodeBorderColor + "')" +
                ".next()};"
        })
        query = query + 'g.V().hasLabel("' + InvanaManagementLabel + '").toList()';
        console.log("====query", query);
        this.queryGremlinServer(query, false);


    }

    serializeManagementVerticesData(response) {
        let result = this.gremlin_serializer.process(response);
        let _ = this.gremlin_serializer.seperate_vertices_and_edges(result, false);
        console.log("=======serializeManagementVerticesData", _);

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
            console.log("======_type", _type);
            if (_type === "g:List") {
                let vertexStats = this.serializeStatsData(response.result.data);
                this.queryVertexData(vertexStats)
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
        return (
            <div className="App">

                <LeftNav/>
                <MainContent>
                    <HeaderNav title={this.state.title}/>
                    <div className="" style={{"padding": "15px"}}>
                        <h2>Vertices</h2>
                        {
                            this.state.vertices.map((vertex, index) => (
                                <form style={{"marginBottom": "5px"}} action="" key={vertex.properties.name + "-form"}
                                      onSubmit={this.onVertexFormSubmit.bind(this)}>
                                    <div className={'node-coloring'}
                                         style={{
                                             "backgroundColor": vertex.properties.bgColor,
                                             "borderColor": vertex.properties.borderColor
                                         }}>&nbsp;</div>
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

                            ))
                        }
                        {/*    </tbody>*/}
                        {/*</table>*/}
                    </div>
                    {JSON.stringify(this.state.result)}
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

