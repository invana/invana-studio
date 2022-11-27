import React from "react";
import {STUDIO_SETTINGS} from "../../settings";
import {getAllNodeShapes, getAllNodeShapesList, getDefaultEdgeOptions, getDefaultNodeOptions} from "./utils";
import {Button, Form} from "react-bootstrap";
import DefaultRemoteComponent from "../layouts/default-remote";
import {setElementColorOptionsToStorage} from "../../utils/localStorage";


export default class ElementOptions extends DefaultRemoteComponent {


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            nodeOptions: null,
            propertyFieldKeys: ["_id", "_label"]
        }
    }

    shallReload = true;

    // firstTime = false;
    //
    // componentWillUnmount() {
    //     this.setState({nodeOptions: null});
    //     // super.componentWillUnmount();
    //     // alert("vertex options unmounted")
    // }

    componentDidMount() {
        if (this.props.elementOptionsToShow && this.props.elementOptionsToShow.label) {

            super.componentDidMount();
            console.log("VO componentDidMount")
            console.log("======", this.props, this.requestBuilder);
            this.getElementInitialConfig();
        }
    }

    getElementLabel() {
        return this.props.elementOptionsToShow.label;
    }

    getElementType() {
        console.log("this.props.elementOptionsToShow", this.props.elementOptionsToShow)
        return this.props.elementOptionsToShow.elementType.replace("g:", "").toLowerCase();
    }

    getElementInitialConfig() {
        // const queryPayload = this.connector.requestBuilder.getOrCreateVertex(
        //     STUDIO_SETTINGS.MANAGEMENT_VERTEX_LABEL, {name: this.getElementLabel()}
        // );
        // const queryObject = this.connector.requestBuilder.combineQueries(queryPayload, null)
        // this.makeQuery(queryObject);
        //
        //

        const getOrCreateElementPayload = this.connector.requestBuilder.getOrCreateVertex(
            STUDIO_SETTINGS.MANAGEMENT_VERTEX_LABEL, {name: this.getElementLabel()}
        );
        const getLabelPropertyKeysPayload = this.connector.requestBuilder.getLabelPropertyKeys(
            this.getElementLabel(),
            this.getElementType()
        );
        const queryObject = this.connector.requestBuilder.combineQueries(
            getOrCreateElementPayload, getLabelPropertyKeysPayload
        )
        this.makeQuery(queryObject);
    }

    componentDidUpdate(prevProps) {
        console.log("VO componentDidUpdate")
        if (this.props.elementOptionsToShow && this.props.elementOptionsToShow.label) {
            const prevGroupName = prevProps.elementOptionsToShow ? prevProps.elementOptionsToShow.label : null;
            const thisPropGroupName = this.props.elementOptionsToShow ? this.props.elementOptionsToShow.label : null;
            if ((prevGroupName && thisPropGroupName) && (prevGroupName !== thisPropGroupName)) {
                // already data exist
                this.setState({nodeOptions: null});
                this.getElementInitialConfig();
            }
        }
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log("formdata", e.target);

        let properties = this.state.nodeOptions.properties;
        properties['label_type'] = this.getElementType();
        const queryObj = this.connector.requestBuilder.updateVertexById(
            this.state.nodeOptions.id, properties
        );
        this.makeQuery(queryObj, {'source': 'canvas'});
    }

    // add this vertex options to

    // updateThisLabelSettings(response) {
    //     setElementColorOptionsToStorageUsingResponse(response);
    // }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps.selectedLabel !== this.props.selectedLabel || nextState.nodeOptions !== this.state.nodeOptions;
    //     // return this.shallReload;
    // }


    processResponse(response) {
        this.shallReload = true;
        console.log("=====response===", response);
        // console.log("***wow", response.response.data[this.connector.requestBuilder.getLabelPropertyKeys(
        //     this.getElementLabel(), this.getElementType()
        // ).queryKey])

        const schemaData = response.response.data[this.connector.requestBuilder.getLabelPropertyKeys(
            this.getElementLabel(), this.getElementType()
        ).queryKey];
        const schemaPropertyKeys = schemaData  || [];
        // let schemaPropertyKeys__ = this.state.prop.concat(schemaPropertyKeys);
        if (response.response.data && response.response.data.getOrCreateVertex) {
            // get the init data of the vertex options.
            setElementColorOptionsToStorage(response.response.data.getOrCreateVertex.data);
            this.setState({
                nodeOptions: response.response.data.getOrCreateVertex.data,
                propertyFieldKeys: schemaPropertyKeys
            })
            this.forceUpdate();
        } else if (response.response.data && response.response.data.updateVertexById) {
            // mutation data - update the vertex options.
            setElementColorOptionsToStorage(response.response.data.updateVertexById);
            this.props.setStatusMessage("Updated options for label '" + this.getElementLabel() + "'");
            this.setState({nodeOptions: response.response.data.updateVertexById})
            // this.props.reRenderCanvas();
            // this.props.setShallReRenderD3Canvas(true);
            if (response.transporterStatusCode !== 200) {
                this.props.setErrorMessage(response.transporterStatusCode);
            }
            this.props.reRenderVisualizer();

        }
    }

    handleValueChange(e) {
        console.log("handleValueChange=====", e.target.name, e.target.value);
        let nodeOptions = this.state.nodeOptions;
        if (e.target.name === "bgImagePropertyKey" && e.target.value === "<select>") {
            nodeOptions.properties[e.target.name] = "";
        } else if (e.target.name === "labelPropertyKey" && e.target.value === "<select>") {
            nodeOptions.properties[e.target.name] = "";
        } else {
            nodeOptions.properties[e.target.name] = e.target.value;
        }
        const allNodeShapes = getAllNodeShapes();

        if (allNodeShapes['inLabelShapes'].includes(this.state.nodeOptions.properties.elementShape)) {
            delete nodeOptions.properties['shapeSize']; // delete shapeSize for in label shapes.. it doesnt need it
            nodeOptions.properties['labelFontSize'] = undefined; // delete shapeSize for in label shapes.. it doesnt need it
        }
        console.log("<<<>>>nodeOptions", nodeOptions)
        this.setState({nodeOptions: nodeOptions});
    }

    getValueFromDataOrGetDefault(propertyKey) {

        const labelType = this.getElementType();
        const label = this.getElementLabel();
        let elementOptions = {};
        if (labelType === "vertex") {
            elementOptions = getDefaultNodeOptions(label);
        } else if (labelType === "edge") {
            elementOptions = getDefaultEdgeOptions(label);
        }

        return this.state.nodeOptions.properties[propertyKey] || elementOptions[propertyKey];
    }


    render() {
        // const selectedLabel = this.props.selectedLabel;
        // let thisNodeOptions = this.state.nodeOptions;
        // if (!thisNodeOptions.properties) {
        //     thisNodeOptions.properties = {};
        // }
        console.log("======this.state.nodeOptions ", this.state.nodeOptions)
        // console.log("========defaultNodeOptions", defaultNodeOptions)
        console.log("***");
        this.shallReload = false;
        const allNodeShapes = getAllNodeShapes();
        return (
            <div className={"p-2"}>
                {this.state.nodeOptions && this.props.elementOptionsToShow
                    ?

                    <Form className={"p-2"} onSubmit={this.onFormSubmit.bind(this)}>
                        <h6 className={"pb-2 mb-3 border-bottom"}
                        >
                            Rendering options of
                            `<span style={{"color": this.getValueFromDataOrGetDefault("bgColor")}}>
                                {this.getElementLabel()}</span>` ({this.getElementType()})
                        </h6>

                        {/*<label>Vertex Label</label>*/}
                        <input type="hidden" name={"name"} readOnly={true} spellCheck="false"
                               defaultValue={this.getElementLabel()}/>
                        <input type="hidden" name={"label"} defaultValue={this.getElementLabel()}/>
                        {/*<input type="hidden" name={"uid"} defaultValue={elementOptionsToShow.id}/>*/}


                        <div className="row">
                            <div className="col-md-6 pr-2">


                                <Form.Group controlId="labelPropertyKey">
                                    <Form.Label>Label Field</Form.Label>
                                    <Form.Control name={"labelPropertyKey"} size={"sm"} as={"select"}
                                                  onChange={this.handleValueChange.bind(this)}
                                                  defaultValue={this.getValueFromDataOrGetDefault("labelPropertyKey")}>
                                        <option key={"_id"} value={"_id"}>{"_id"}</option>
                                        <option key={"_label"} value={"_label"}>{"_label"}</option>
                                        {
                                            this.state.propertyFieldKeys.map((fieldKey) =>
                                                <option key={fieldKey} value={fieldKey}>{fieldKey}</option>
                                            )
                                        }

                                    </Form.Control>
                                </Form.Group>

                                {
                                    this.getElementType() === "vertex" &&
                                    !allNodeShapes['inLabelShapes'].includes(this.state.nodeOptions.properties.elementShape)
                                        ?
                                        <React.Fragment>
                                            <Form.Group controlId="labelFontSize">
                                                <Form.Label>Label Font Size</Form.Label>
                                                <Form.Control type="number" name={"labelFontSize"} size={"sm"} min={2}
                                                              max={100}
                                                              placeholder={"labelFontSize"} spellCheck="false"
                                                              onChange={this.handleValueChange.bind(this)}
                                                              defaultValue={this.getValueFromDataOrGetDefault("labelFontSize")}/>
                                            </Form.Group>

                                        </React.Fragment>
                                        : <React.Fragment/>
                                }

                            </div>
                            <div className="col-md-6 pl-2">

                                {
                                    this.getElementType() === "edge"
                                        ?
                                        <React.Fragment>
                                            <Form.Group controlId="linkLength">
                                                <Form.Label>Link Length</Form.Label>
                                                <Form.Control type="number" name={"linkLength"} size={"sm"} min={2}
                                                              max={500}
                                                              placeholder={"size"} spellCheck="false"
                                                              onChange={this.handleValueChange.bind(this)}
                                                              defaultValue={this.getValueFromDataOrGetDefault("linkLength")}/>
                                            </Form.Group>
                                            <Form.Group controlId="linkColor">
                                                <Form.Label>Link Color</Form.Label>
                                                <Form.Control type="text" name={"linkColor"} size={"sm"} min={2}
                                                              max={100}
                                                              placeholder={"linkColor"} spellCheck="false"
                                                              onChange={this.handleValueChange.bind(this)}
                                                              defaultValue={this.getValueFromDataOrGetDefault("linkColor")}/>
                                            </Form.Group>


                                        </React.Fragment>
                                        : <React.Fragment/>
                                }


                                {
                                    this.getElementType() === "vertex"
                                        ?
                                        <React.Fragment>

                                            <Form.Group controlId="elementShape">
                                                <Form.Label>Shape</Form.Label>
                                                <Form.Control
                                                    name={"elementShape"} size={"sm"} as={"select"}
                                                    onChange={this.handleValueChange.bind(this)}
                                                    defaultValue={this.getValueFromDataOrGetDefault("elementShape")}>
                                                    <option key={"<select>"} value={"<select>"}>{"<select>"}</option>

                                                    {
                                                        getAllNodeShapesList().map((fieldKey) =>
                                                            <option key={fieldKey} value={fieldKey}>{fieldKey}</option>
                                                        )
                                                    }
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="bgColor">
                                                <Form.Label>Shape Color</Form.Label>
                                                <Form.Control type="text" name={"bgColor"} size={"sm"} maxLength={7}
                                                              minLength={7}
                                                              placeholder={"bgColor"} spellCheck="false"
                                                              onChange={this.handleValueChange.bind(this)}
                                                              defaultValue={this.getValueFromDataOrGetDefault("bgColor")}/>
                                            </Form.Group>
                                        </React.Fragment>

                                        : <React.Fragment/>
                                }


                                {
                                    this.getElementType() === "vertex"
                                    && !allNodeShapes['inLabelShapes'].includes(this.state.nodeOptions.properties.elementShape)

                                        ? <Form.Group controlId="shapeSize">
                                            <Form.Label>Shape size</Form.Label>
                                            <Form.Control type="number" name={"shapeSize"} size={"sm"} min={2} max={100}
                                                          placeholder={"shapeSize"} spellCheck="false"
                                                          onChange={this.handleValueChange.bind(this)}
                                                          defaultValue={this.getValueFromDataOrGetDefault("shapeSize")}/>
                                        </Form.Group>


                                        : <React.Fragment/>
                                } {
                                this.getElementType() === "vertex"
                                && allNodeShapes['bgImageShapes'].includes(this.state.nodeOptions.properties.elementShape)
                                    ? <Form.Group controlId="bgImagePropertyKey">
                                        <Form.Label>Shape Image Field</Form.Label>
                                        <Form.Control
                                            name={"bgImagePropertyKey"} size={"sm"} as={"select"}
                                            onChange={this.handleValueChange.bind(this)}
                                            defaultValue={this.getValueFromDataOrGetDefault("bgImagePropertyKey")}>
                                            <option key={"<select>"} value={"<select>"}>{"<select>"}</option>

                                            {
                                                this.state.propertyFieldKeys.map((fieldKey) =>
                                                    <option key={fieldKey} value={fieldKey}>{fieldKey}</option>
                                                )
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                    : <React.Fragment/>
                            }


                            </div>

                        </div>

                        {/*<br/>*/}
                        <Button variant={"outline-primary"} size={"sm"} className={"mr-1 mt-3 "}
                                type={"submit"}>update</Button>
                        <Button variant={"outline-secondary"} size={"sm"} className={"mt-3 "}
                                onClick={() => this.props.onClose()}
                                type={"button"}>cancel
                        </Button>


                        {/*<hr/>*/}
                        {/*{JSON.stringify(this.state.nodeOptions)}*/}
                    </Form>

                    : <React.Fragment/>
                }

            </div>
        )
    }

}
