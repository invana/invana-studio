import React from "react";
import GraphComponent from "../core/graph-component";
import {
    getDataFromLocalStorage,
    setElementColorOptionsToStorageUsingResponse
} from "../core/utils";
import {
    managementVertexLabel
} from "../config";
import {getDefaultNodeOptions} from "../canvas/graph/canvas-utils";


export default class VertexOptions extends GraphComponent {


    componentWillUnmount() {
        super.componentWillUnmount();
        // alert("vertex options unmounted")
    }

    componentDidMount() {
        super.componentDidMount();
    }

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

        if (query) {
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
        let thisNodeOptions = null;
        try {
            const allNodeOptions = getDataFromLocalStorage("nodeLabels", true);
            thisNodeOptions = allNodeOptions[this.props.selectedElementData.label];

        } catch (e) {
            console.error("Failed to get the node options with error", e)
        }

        console.log("======thisNodeOptions " + JSON.stringify(thisNodeOptions))
        if (!thisNodeOptions) {
            // alert("setting default")
            thisNodeOptions = getDefaultNodeOptions(selectedElementData.label, selectedElementData.meta);
        }
        // get nodeOptions from localStorage.
        // console.log("=====selectedElementData>>>", this.props.selectedElementData)
        return (
            <div className={"p-10"}>
                <form onSubmit={this.onFormSubmit.bind(this)}>

                    {/*<label>Vertex Label</label>*/}
                    <input type="hidden" name={"name"} readOnly={true} spellCheck="false"
                           defaultValue={selectedElementData.label}/>
                    <input type="hidden" name={"label"}
                           defaultValue={selectedElementData.properties.name || selectedElementData.id}/>
                    <input type="hidden" name={"uid"} defaultValue={selectedElementData.id}/>

                    <label className={""}>Background Color</label>
                    <input type="text" name={"bgColor"} maxLength={7} minLength={7}
                           placeholder={"bgColor"} spellCheck="false"
                           defaultValue={thisNodeOptions.bgColor}/>

                    <label className={""}>Border Color</label>
                    <input type="text" name={"borderColor"} maxLength={7} minLength={7}
                           placeholder={"borderColor"} spellCheck="false"
                           defaultValue={thisNodeOptions.borderColor }/>

                    {/*<label className={""}>Background Image (from web)</label>*/}
                    <input type="hidden" name={"bgImageUrl"} placeholder={"bgImage (optional)"}
                           spellCheck="false"
                           defaultValue={thisNodeOptions.bgImageUrl }/>

                    <label className={""}>Background Image (from data field)</label>
                    <input type="text" name={"bgImagePropertyKey"}
                           spellCheck="false"
                           placeholder={"bgImagePropertyKey (optional)"}
                           defaultValue={thisNodeOptions.bgImagePropertyKey}/>

                    {/*<label className={""}>Background HTML</label>*/}
                    <input type="hidden" name={"tagHtml"}
                           spellCheck="false"
                           placeholder={"tagHtml (optional)"}
                           defaultValue={thisNodeOptions.tagHtml || ""}/>
                    <br/>
                    <button className={"mt-10 button primary-btn"} type={"submit"}>update</button>
                </form>
            </div>
        )
    }

}
