import React from "react";
import FlyOutUI from "../ui/flyout";
import GremlinHeadlessComponent from "../base/gremlin";
import {getDataFromLocalStorage, setElementColorOptionsToStorageUsingResponse} from "../utils";
import {
    managementVertexLabel,
    DefaultNodeBgColor,
    DefaultNodeBgPropertyKey,
    DefaultNodeBorderColor,
    DefaultNodeLabelColor
} from "../../config";


export default class VertexOptions extends GremlinHeadlessComponent {

// g.V().has('InvanaManagement','LabelName','Person')
// .tryNext()
// .orElseGet{g.addV('InvanaManagement').property('LabelName','Person')
// .next()}
//


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
            this.makeQuery(query, "internal", );
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
        this.props.reRenderCanvas();
    }

    render() {
        const selectedNode = this.props.selectedNode;
        const allNodeOptions = getDataFromLocalStorage("nodeLabels", true);
        const thisNodeOptions = allNodeOptions[selectedNode.label] || {"properties": {}};
        // get nodeOptions from localStorage.
        console.log("=====selectedNode>>>", selectedNode)
        return (
            <FlyOutUI title={"Vertex Options"}
                      display={"block"}
                      position={"right"}
                      onClose={this.props.onClose}
            >

                {/*                bgImagePropertyKey: undefined*/}
                {/*bgImageUrl: undefined*/}
                {/*labelOptions: {showLabel: false, labelText: "rrmerugu", labelColor: "#dddddd"}*/}
                {/*nodeShape: "circle"*/}
                {/*shapeOptions: {radius: 24, strokeWidth: 3, strokeColor: "#4385b8", fillColor: "#444444", textColor: "#dddddd", …}*/}
                {/*tagOptions:*/}
                <form onSubmit={this.onFormSubmit.bind(this)}>

                    <label>Vertex Label</label>
                    <input type="text" name={"name"} readOnly={true} spellCheck="false"
                           defaultValue={selectedNode.label}/>
                    <input type="hidden" name={"label"} defaultValue={selectedNode.properties.name || selectedNode.id}/>
                    <input type="hidden" name={"uid"} defaultValue={selectedNode.id}/>

                    <label className={""}>Background Color</label>
                    <input type="text" name={"bgColor"} maxLength={7} minLength={7}
                           placeholder={"bgColor"} spellCheck="false"
                           defaultValue={thisNodeOptions.bgColor || selectedNode.meta.shapeOptions.fillColor}/>

                    <label className={""}>Border Color</label>
                    <input type="text" name={"borderColor"} maxLength={7} minLength={7}
                           placeholder={"borderColor"} spellCheck="false"
                           defaultValue={thisNodeOptions.borderColor || selectedNode.meta.shapeOptions.strokeColor}/>

                    <label className={""}>Background Image (from web)</label>
                    <input type="text" name={"bgImageUrl"} placeholder={"bgImage (optional)"}
                           spellCheck="false"
                           defaultValue={thisNodeOptions.bgImageUrl || selectedNode.meta.bgImageUrl}/>

                    <label className={""}>Background Image (from data field)</label>
                    <input type="text" name={"bgImagePropertyKey"}
                           spellCheck="false"
                           placeholder={"bgImagePropertyKey (optional)"}
                           defaultValue={thisNodeOptions.bgImagePropertyKey || selectedNode.meta.bgImagePropertyKey}/>

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
