import React from "react";
import FlyOutUI from "../ui/flyout";
import GremlinHeadlessComponent from "../base/gremlin";
import {getDataFromLocalStorage, setElementColorOptionsToStorageUsingResponse} from "../utils";
import {managementVertexLabel} from "../../config";
import GremlinResponseSerializers from "../gremlin-connector/gremlin-serializer";


export default class VertexOptions extends GremlinHeadlessComponent {


    onFormSubmit(e) {
        e.preventDefault();
        console.log("formdata", e.target);
        let query = "" +
            "update =" +
            "g.V()" +
            ".hasLabel('" + managementVertexLabel + "')" +
            ".has('name','" + e.target.name.value + "')" +
            ".property('bgColor', '" + e.target.bgColor.value + "')" +
            ".property('bgImageUrl', '" + e.target.bgImageUrl.value + "')" +
            ".property('bgImagePropertyKey', '" + e.target.bgImagePropertyKey.value + "')" +
            ".property('borderColor', '" + e.target.borderColor.value + "')" +
            ".property('tagHtml', '" + e.target.tagHtml.value + "').iterate();" +
            "vertex = g.V()" +
            ".hasLabel('" + managementVertexLabel + "')" +
            ".has('name','" + e.target.name.value + "').toList()";

        if (query && this.ws) {
            this.makeQuery(query, false);
        }

    }

    // add this vertex options to

    updateThisLabelSettings(response) {
        console.log("<<response", response);
        setElementColorOptionsToStorageUsingResponse(response);
    }

    processResponse(responses) {
        console.log("=====responses===", responses);
        const response = responses[0];
        this.updateThisLabelSettings(response);
        if (response.status.code !== 200) {
            this.props.setErrorMessage(response.status);
        }
        this.props.setStatusMessage("Updated vertex options for label '" + this.props.selectedNode.label + "'");
    }

    render() {
        const selectedNode = this.props.selectedNode;
        const allNodeOptions = getDataFromLocalStorage("nodeLabels", true);
        const thisNodeOptions = allNodeOptions[selectedNode.label] || {"properties": {}};
        // get nodeOptions from localStorage.
        return (
            <FlyOutUI title={"Verex Options"}
                      display={"block"}
                      position={"left"}
                      onClose={this.props.onClose}
            >

                <form onSubmit={this.onFormSubmit.bind(this)}>

                    <label>Vertex Label</label>
                    <input type="text" name={"name"} readOnly={true} spellCheck="false"
                           defaultValue={thisNodeOptions.name}/>
                    <input type="hidden" name={"label"} defaultValue={thisNodeOptions.name}/>
                    <input type="hidden" name={"uid"} defaultValue={thisNodeOptions.id}/>

                    <label className={""}>Background Color</label>
                    <input type="text" name={"bgColor"} maxLength={7} minLength={7}
                           placeholder={"bgColor"} spellCheck="false"
                           defaultValue={thisNodeOptions.bgColor}/>

                    <label className={""}>Border Color</label>
                    <input type="text" name={"borderColor"} maxLength={7} minLength={7}
                           placeholder={"borderColor"} spellCheck="false"
                           defaultValue={thisNodeOptions.borderColor}/>

                    <label className={""}>Background Image (from web)</label>
                    <input type="text" name={"bgImageUrl"} placeholder={"bgImage (optional)"}
                           spellCheck="false"
                           defaultValue={thisNodeOptions.bgImageUrl || ""}/>

                    <label className={""}>Background Image (from data field)</label>
                    <input type="text" name={"bgImagePropertyKey"}
                           spellCheck="false"
                           placeholder={"bgImagePropertyKey (optional)"}
                           defaultValue={thisNodeOptions.bgImagePropertyKey || ""}/>

                    <label className={""}>Background HTML</label>
                    <input type="text" name={"tagHtml"}
                           spellCheck="false"
                           placeholder={"tagHtml (optional)"}
                           defaultValue={thisNodeOptions.tagHtml || ""}/>


                    <button className={"mt-10 primary-btn"} type={"submit"}>update</button>
                </form>
            </FlyOutUI>
        )
    }

}
