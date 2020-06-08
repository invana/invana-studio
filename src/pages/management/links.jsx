import React from "react";
import "./management.css";
import LeftNav from "../../components/core/left-nav";
import HeaderNav from "../../components/core/header-nav";
import MainContent from "../../components/core/main-content";
import GremlinConnectorViewBase from "../../components/core/gremlin-connector";
import {ConnectionStatus, CopyRightInfo} from "../../components/visualizer/util-components";
import GremlinResponseSerializers from "../../components/visualizer/gremlin-serializer";
import {
    InvanaManagementLabel,
    DefaultLinkPathColor, DefaultLinkTextColor
} from "../../config";
import LoadingDiv from "../../components/core/loading";
import ManagementNav from "./nav";


export default class LinksManagementView extends GremlinConnectorViewBase {
    gremlin_serializer = new GremlinResponseSerializers();


    constructor(props) {
        super(props);
        this.state = {
            "title": "Nodes | Management",
            "links": []
        }
    }

    getEdgesData() {
        this.queryGremlinServer("links=g.E().label().groupCount().toList(); [ links]", false)
    }

    serializeStatsData(data) {
        let _list = data['@value'][0]['@value'][0]['@value'];
        let cleaned_data = Object({});
        _list.forEach(function (item, i) {
            if (typeof item === "string") {
                cleaned_data[item] = _list[i + 1]['@value']
            }
        })
        return cleaned_data;
    }


    checkIfExistOrCreate(linkStats) {
        /*
        g.V().has('InvanaManagement','LabelName','Person').tryNext().orElseGet{
    g.addV('InvanaManagement').property('LabelName','Person').next()}
         */
        let query = "";
        Object.keys(linkStats).forEach(function (key) {
            query = query + "g.V().has('" + InvanaManagementLabel + "','name','" + key + "')" +
                ".has('" + InvanaManagementLabel + "','type','Edge')" +
                ".tryNext()" +
                ".orElseGet{g.addV('" + InvanaManagementLabel + "')" +
                ".property('name','" + key + "')" +
                ".property('type','Edge')" +
                ".property('pathColor','" + DefaultLinkPathColor + "')" +
                ".property('linkTextColor','" + DefaultLinkTextColor + "')" +
                ".next()};"
        })
        query = query + 'g.V().hasLabel("' + InvanaManagementLabel + '").has("type","Edge").toList()';
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
        if (response.status.code >= 200 || response.status.code < 300) {
            _this.updateStatusMessage("Query Successfully Responded.");
            // create Management data needed if necessary.
            let _type = null;
            if (response.result.data) {
                _type = response.result.data['@value'][0]['@type'];
            }

            if (_type === "g:List") {
                let linkStats = this.serializeStatsData(response.result.data);
                this.checkIfExistOrCreate(linkStats)
            } else if (_type === "g:Vertex") {
                let serializedData = this.serializeManagementVerticesData(response);
                _this.updateStatusMessage("Query Successfully Responded.");
                _this.setState({
                    "errorMessage": null,
                    links: serializedData
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
        this.getEdgesData();
    }

    // onPropertyChanged(vertex, propertyKey) {
    //
    // }
    onVertexFormSubmit(e) {
        e.preventDefault();
        console.log("formdata", e.target);
        let query = "update = g.V(" + parseInt(e.target.uid.value) + ")" +
            ".property('pathColor', '" + e.target.pathColor.value + "')" +
            ".property('linkTextColor', '" + e.target.linkTextColor.value + "').;";
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
                        <ManagementNav/>
                        <hr/>

                        {
                            this.state.links.map((link, index) => (
                                <form style={{"marginBottom": "5px"}} action="" key={link.properties.name + "-form"}
                                      onSubmit={this.onVertexFormSubmit.bind(this)}>
                                    <div className={'link-coloring'}
                                         style={{
                                             "backgroundColor": link.properties.pathColor,
                                         }}>&nbsp;</div>
                                    <input type="text" name={"name"} readOnly={"readonly"}
                                           defaultValue={link.properties.name}/>
                                    <input type="hidden" name={"label"} defaultValue={link.label}/>
                                    <input type="hidden" name={"uid"} defaultValue={link.id}/>

                                    <input type="text" name={"pathColor"} maxLength={7} minLength={7}
                                           placeholder={"pathColor"}
                                           defaultValue={link.properties.linkTextColor}/>
                                    <input type="text" name={"linkTextColor"} maxLength={7} minLength={7}
                                           placeholder={"linkTextColor"}
                                           defaultValue={link.properties.linkTextColor}/>


                                    <button type={"submit"}>update</button>

                                </form>

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
                    <LoadingDiv loadingMessage={"Loading"} showLoading={this.state.showLoading}/>

                </MainContent>

            </div>
        );
    }


}

