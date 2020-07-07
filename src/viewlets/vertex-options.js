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
        // const selectedElementData = this.props.selectedElementData;
        const allNodeOptions = getDataFromLocalStorage("nodeLabels", true);
        const thisNodeOptions = allNodeOptions[this.props.selectedElementData.label] || {"properties": {}};
        // get nodeOptions from localStorage.
        console.log("=====selectedElementData>>>", this.props.selectedElementData)
        return (
            <div className={"p-10"}>
                <form onSubmit={this.onFormSubmit.bind(this)}>

                    <label>Vertex Label</label>
                    <input type="text" name={"name"} readOnly={true} spellCheck="false"
                           value={this.props.selectedElementData.label}/>
                    <input type="hidden" name={"label"}
                           value={this.props.selectedElementData.properties.name || this.props.selectedElementData.id}/>
                    <input type="hidden" name={"uid"} value={this.props.selectedElementData.id}/>

                    <label className={""}>Background Color</label>
                    <input type="text" name={"bgColor"} maxLength={7} minLength={7}
                           placeholder={"bgColor"} spellCheck="false"
                           value={thisNodeOptions.bgColor || this.props.selectedElementData.meta.shapeOptions.fillColor}/>

                    <label className={""}>Border Color</label>
                    <input type="text" name={"borderColor"} maxLength={7} minLength={7}
                           placeholder={"borderColor"} spellCheck="false"
                           value={thisNodeOptions.borderColor || this.props.selectedElementData.meta.shapeOptions.strokeColor}/>

                    {/*<label className={""}>Background Image (from web)</label>*/}
                    <input type="hidden" name={"bgImageUrl"} placeholder={"bgImage (optional)"}
                           spellCheck="false"
                           value={thisNodeOptions.bgImageUrl || this.props.selectedElementData.meta.bgImageUrl}/>

                    <label className={""}>Background Image (from data field)</label>
                    <input type="text" name={"bgImagePropertyKey"}
                           spellCheck="false"
                           placeholder={"bgImagePropertyKey (optional)"}
                           value={thisNodeOptions.bgImagePropertyKey || this.props.selectedElementData.meta.bgImagePropertyKey}/>

                    {/*<label className={""}>Background HTML</label>*/}
                    <input type="hidden" name={"tagHtml"}
                           spellCheck="false"
                           placeholder={"tagHtml (optional)"}
                           value={thisNodeOptions.tagHtml || ""}/>
                    <br/>
                    <button className={"mt-10 button primary-btn"} type={"submit"}>update</button>
                </form>
            </div>
        )
    }

}
