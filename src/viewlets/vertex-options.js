import React from "react";
import RemoteGraphComponent from "../core/graph-component";
import {
    getDataFromLocalStorage,
    setElementColorOptionsToStorageUsingResponse
} from "../core/utils";
import {
    managementVertexLabel
} from "../config";
import {getDefaultNodeOptions} from "../canvas/canvas-utils";


export default class VertexOptions extends RemoteGraphComponent {

    state = {
        ...this.state,
        nodeOptions: {}
    }
    shallReload = true;

    // firstTime = false;
    //
    // componentWillUnmount() {
    //     super.componentWillUnmount();
    //     // alert("vertex options unmounted")
    // }

    componentDidMount() {
        console.log("VO componentDidMount")

        // super.componentDidMount();
        console.log("======", this.props, this.requestBuilder);
        this.getSelectedLabelConfigData();
    }

    getSelectedLabelConfigData() {
        const queryPayload = this.connector.requestBuilder.getOrCreateVertices(
            managementVertexLabel, {name: this.props.selectedLabel}
        );
        this.makeQuery(queryPayload);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("VO componentDidUpdate")
        if (prevProps.selectedLabel !== this.props.selectedLabel) {
            // already data exist
            this.getSelectedLabelConfigData();
        }
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log("formdata", e.target);
        let query = "" +
            "" +
            "vtx = g.V().has('" + managementVertexLabel + "','name','" + e.target.name.value + "')" +
            ".tryNext()" +
            ".orElseGet{" +
            " g.addV('" + managementVertexLabel + "')" +
            ".property('name','" + e.target.name.value + "')" +
            ".next()};" +
            "g.V().has('" + managementVertexLabel + "','name','" + e.target.name.value + "')" +
            ".property('bgColor', '" + e.target.bgColor.value + "')" +
            ".property('bgImageUrl', '" + e.target.bgImageUrl.value + "')" +
            ".property('bgImagePropertyKey', '" + e.target.bgImagePropertyKey.value + "')" +
            ".property('borderColor', '" + e.target.borderColor.value + "')" +
            ".property('labelPropertyKey', '" + e.target.labelPropertyKey.value + "')" +
            ".property('tagHtml', '" + e.target.tagHtml.value + "')" +
            ".next();" +
            "vertex = g.V()" +
            ".hasLabel('" + managementVertexLabel + "')" +
            ".has('name','" + e.target.name.value + "')" +
            ".toList()";

        if (query) {
            // this.makeQuery(query, {source: "internal"});


            this.makeQuery(
                this.connector.requestBuilder.rawQuery(query, {'source': 'canvas'})
            );
        }

    }

    // add this vertex options to

    updateThisLabelSettings(response) {
        setElementColorOptionsToStorageUsingResponse(response);
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps.selectedLabel !== this.props.selectedLabel || nextState.nodeOptions !== this.state.nodeOptions;
    //     // return this.shallReload;
    // }


    processResponse(response) {
        this.shallReload = true;
        console.log("=====responses===",response.response.data.getOrCreateVertex.id,  response);
        if (response.response.data.getOrCreateVertex) {
            // get
            this.setState({nodeOptions: response.response.data.getOrCreateVertex})
            setElementColorOptionsToStorageUsingResponse(response.response.data.getOrCreateVertex);
            this.forceUpdate();

        } else {
            this.updateThisLabelSettings(response);
            if (response.transporterStatusCode !== 200) {
                this.props.setErrorMessage(response.transporterStatusCode);
            }
            this.props.setStatusMessage("Updated options for label '" + this.props.selectedLabel + "'");
        }
        // this.props.reRenderCanvas();

    }

    handleValueChange(e){

    }

    render() {
        const selectedLabel = this.props.selectedLabel;
        let thisNodeOptions = this.state.nodeOptions;
        if (!thisNodeOptions.properties) {
            thisNodeOptions.properties = {};
        }
        console.log("======thisNodeOptions ", thisNodeOptions)
        const defaultNodeOptions = getDefaultNodeOptions(selectedLabel, {});
        console.log("========defaultNodeOptions", defaultNodeOptions)
        console.log("***");
        this.shallReload = false;

        return (
            <div className={"p-10"}>
                {this.state.nodeOptions &&

                <form onSubmit={this.onFormSubmit.bind(this)}>

                    {/*<label>Vertex Label</label>*/}
                    <input type="hidden" name={"name"} readOnly={true} spellCheck="false"
                           defaultValue={selectedLabel}/>
                    <input type="hidden" name={"label"}
                           defaultValue={selectedLabel}/>
                    {/*<input type="hidden" name={"uid"} defaultValue={selectedElementData.id}/>*/}

                    <label className={""}>Background Color</label>
                    <input type="text" name={"bgColor"} maxLength={7} minLength={7}
                           placeholder={"bgColor"} spellCheck="false"
                           value={thisNodeOptions.properties.bgColor || defaultNodeOptions.bgColor}/>

                    <label className={""}>Border Color</label>
                    <input type="text" name={"borderColor"} maxLength={7} minLength={7}
                           placeholder={"borderColor"} spellCheck="false"
                           defaultValue={thisNodeOptions.properties.borderColor || defaultNodeOptions.borderColor}/>

                    {/*<label className={""}>Background Image (from web)</label>*/}
                    <input type="hidden" name={"bgImageUrl"} placeholder={"bgImage (optional)"}
                           spellCheck="false"
                           defaultValue={thisNodeOptions.properties.bgImageUrl || defaultNodeOptions.bgImageUrl}/>

                    <label className={""}>Background Image (from data field)</label>
                    <input type="text" name={"bgImagePropertyKey"}
                           spellCheck="false"
                           placeholder={"bgImagePropertyKey (optional)"}
                           defaultValue={thisNodeOptions.properties.bgImagePropertyKey || defaultNodeOptions.bgImagePropertyKey}/>

                    <label className={""}>Label Property Key (from data fields)</label>
                    <input type="text" name={"labelPropertyKey"}
                           spellCheck="false"
                           placeholder={"labelPropertyKey (optional)"} onChange={this.handleValueChange}
                           value={thisNodeOptions.properties.labelPropertyKey || defaultNodeOptions.labelPropertyKey}/>

                    {/*<label className={""}>Background HTML</label>*/}
                    <input type="hidden" name={"tagHtml"}
                           spellCheck="false"
                           placeholder={"tagHtml (optional)"}
                           defaultValue={thisNodeOptions.properties.tagHtml || ""}/>
                    <br/>
                    <button className={"mt-10 button primary-btn"} type={"submit"}>update</button>
                </form>

                }

            </div>
        )
    }

}
