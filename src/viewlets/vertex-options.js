import React from "react";
import GremlinBasedComponent from "../core/gremlin-component";
import {
    getDataFromLocalStorage,
    // redirectToConnectIfNeeded,
    setElementColorOptionsToStorageUsingResponse
} from "../core/utils";
import {
    managementVertexLabel
} from "../config";


export default class VertexOptions extends GremlinBasedComponent {

    // componentWillUnmount() {
    //     super.componentWillUnmount();
    // }
    //
    // componentDidMount() {
    //     // redirectToConnectIfNeeded();
    //     super.componentDidMount();
    //     // setTimeout(() => this.loadQueryFromUrl(), 300);
    //     // this.setupHotKeys()
    // }


    onFormSubmit(e) {
        e.preventDefault();
        console.log("formdata", e.target);
        let query = "" +
            "" +
            "vtx = g.V().has('" + managementVertexLabel + "','name','" + e.target.name.value + "')" +
            ".tryNext()" +
            ".orElseGet{" +
            " g.addV('" + managementVertexLabel + "').property('name','" + e.target.name.value + "').next()};" +
            "g.V().has('" + managementVertexLabel + "','name','" + e.target.name.value + "')" +
            ".property('bgColor', '" + e.target.bgColor.value + "')" +
            ".property('bgImageUrl', '" + e.target.bgImageUrl.value + "')" +
            ".property('bgImagePropertyKey', '" + e.target.bgImagePropertyKey.value + "')" +
            ".property('borderColor', '" + e.target.borderColor.value + "')" +
            ".property('tagHtml', '" + e.target.tagHtml.value + "').next();" +
            "vertex = g.V()" +
            ".hasLabel('" + managementVertexLabel + "')" +
            ".has('name','" + e.target.name.value + "').toList()";

        if (query && this.ws) {
            this.makeQuery(query, {source: "internal"});
        }

    }

    // add this vertex options to

    updateThisLabelSettings(response) {
        setElementColorOptionsToStorageUsingResponse(response);
    }


    processResponse(responses) {
        console.log("=====responses===", responses);
        const response = responses[0];
        this.updateThisLabelSettings(response);
        if (response.status.code !== 200) {
            this.props.setErrorMessage(response.status);
        }
        this.props.setStatusMessage("Updated options for label '" + this.props.selectedElementData.label + "'");
        this.props.reRenderCanvas();
    }

    render() {
        const selectedElementData = this.props.selectedElementData;
        const allNodeOptions = getDataFromLocalStorage("nodeLabels", true);
        const thisNodeOptions = allNodeOptions[selectedElementData.label] || {"properties": {}};
        // get nodeOptions from localStorage.
        console.log("=====selectedElementData>>>", selectedElementData)
        return (
            <div className={"p-10"}>
                <form onSubmit={this.onFormSubmit.bind(this)}>

                    <label>Vertex Label</label>
                    <input type="text" name={"name"} readOnly={true} spellCheck="false"
                           defaultValue={selectedElementData.label}/>
                    <input type="hidden" name={"label"}
                           defaultValue={selectedElementData.properties.name || selectedElementData.id}/>
                    <input type="hidden" name={"uid"} defaultValue={selectedElementData.id}/>

                    <label className={""}>Background Color</label>
                    <input type="text" name={"bgColor"} maxLength={7} minLength={7}
                           placeholder={"bgColor"} spellCheck="false"
                           defaultValue={thisNodeOptions.bgColor || selectedElementData.meta.shapeOptions.fillColor}/>

                    <label className={""}>Border Color</label>
                    <input type="text" name={"borderColor"} maxLength={7} minLength={7}
                           placeholder={"borderColor"} spellCheck="false"
                           defaultValue={thisNodeOptions.borderColor || selectedElementData.meta.shapeOptions.strokeColor}/>

                    {/*<label className={""}>Background Image (from web)</label>*/}
                    <input type="hidden" name={"bgImageUrl"} placeholder={"bgImage (optional)"}
                           spellCheck="false"
                           defaultValue={thisNodeOptions.bgImageUrl || selectedElementData.meta.bgImageUrl}/>

                    <label className={""}>Background Image (from data field)</label>
                    <input type="text" name={"bgImagePropertyKey"}
                           spellCheck="false"
                           placeholder={"bgImagePropertyKey (optional)"}
                           defaultValue={thisNodeOptions.bgImagePropertyKey || selectedElementData.meta.bgImagePropertyKey}/>

                    {/*<label className={""}>Background HTML</label>*/}
                    <input type="hidden" name={"tagHtml"}
                           spellCheck="false"
                           placeholder={"tagHtml (optional)"}
                           defaultValue={thisNodeOptions.tagHtml || ""}/>
                    <br/>
                    <button className={"mt-10 primary-btn"} type={"submit"}>update</button>
                </form>
            </div>
        )
    }

}
