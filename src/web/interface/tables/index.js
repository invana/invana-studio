import React, {Fragment} from "react";
import PropTypes from 'prop-types';
import "./index.scss";
import {getDataFromLocalStorage} from "../../utils";
import {renderPropertyData} from "../utils";
import {Badge} from "react-bootstrap";


export default class TableInterface extends React.Component {

    static defaultProps = {
        // dataStore: null,
        elementsData: [],
        elementsLabel: "Collection label",
        elementsType: "vertex",
        elementsSchema: null,

    }

    static propTypes = {
        // dataStore: PropTypes.object,
        elementsData: PropTypes.array,
        elementsLabel: PropTypes.string,
        elementsType: PropTypes.string,
        elementsSchema: PropTypes.object,
        showLabel: PropTypes.bool
    }

    render() {

        return (
            <div className={"p-10 tableCanvas"}>
                <div className={"___responseBox "}>
                    {

                        this.props.elementsType === "vertex"
                            ?
                            <VertexTableComponent type={"Vertex"}

                                                  showLabel={this.props.showLabel}
                                                  vertexSchema={this.props.elementsSchema}
                                                  dataStore={this.props.dataStore}
                                                  label={this.props.elementsLabel}
                                                  data={this.props.elementsData}/>

                            : <span/>

                    }
                    {
                        this.props.elementsType === "edge"
                            ?
                            <EdgeTableComponent type={"Edge"}

                                                showLabel={this.props.showLabel}
                                                label={this.props.elementsLabel}
                                                data={this.props.elementsData}

                            />

                            : <span/>
                    }
                </div>
            </div>
        )
    }
}

export class VertexTableComponent extends React.Component {
    static defaultProps = {
        data: null,
        label: null,
        vertexSchema: {},
        dataStore: null,
        type: null,
        showLabel: false
    }

    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                properties: PropTypes.object,
                type: PropTypes.string
            })
        ),
        vertexSchema: PropTypes.object,
        dataStore: PropTypes.object,
        label: PropTypes.string,
        type: PropTypes.string,
        showLabel: PropTypes.bool
    }

    getPropertyKeys() {
        if (this.props.data.length === 0) {
            return []
        } else {
            return Object.keys(this.props.data[0].properties || {})
        }
    }

    getElementType(elem) {
        console.log("====elem", elem)
        return elem.type === "g:Vertex" ? "V" : "E";
    }

    getElementColor(elem) {
        const elType = this.getElementType(elem);
        if (elType === "V" && elem.meta) {
            return elem.meta.shapeOptions.fillColorHex;
        } else if (elType === "E" && elem.meta) {
            return elem.meta.shapeOptions.strokeColorHex;
        }
    }

    getInELabels() {
        let inELabelsConfig = []
        this.props.vertexSchema.inE.map((inELabel) => (
            inELabelsConfig.push({
                edgeFillColorHex: this.props.dataStore.getEdgeOptions(inELabel)
                    ? this.props.dataStore.getEdgeOptions(inELabel).shapeOptions.strokeColorHex
                    : "#efefef",
                edgeLabel: inELabel
            })
        ));
        return inELabelsConfig;
    }

    getOutELabels() {
        let outELabelsConfig = []
        this.props.vertexSchema.outE.map((outELabel) => (
            // console.log("====this.props.getEdgeOptions(outELabel)", this.props.dataStore.getEdgeOptions(outELabel))
            outELabelsConfig.push({
                edgeFillColorHex: this.props.dataStore.getEdgeOptions(outELabel)
                    ? this.props.dataStore.getEdgeOptions(outELabel).shapeOptions.strokeColorHex
                    : "#efefef",
                edgeLabel: outELabel
            })
        ));
        return outELabelsConfig;
    }

    getFirstElement() {
        return this.props.data[0];
    }

    render() {
        console.log("======this.props.data", this.props.data);
        const propertyKeys = this.getPropertyKeys();

        const elColor = this.props.data.length > 0 ? this.getElementColor(this.props.data[0]) : "";


        // console.log("VertexTableComponent here", this.props.label)
        // console.log("VertexTableComponent here  this.props.data[0]", this.props.data[0])
        // console.log("VertexTableComponent vertexSchema", this.props.label, this.props.vertexSchema)
        let colorOptions = {};
        if (this.props.type === "Vertex") {
            const _ = getDataFromLocalStorage("nodeLabels", true) || {}
            colorOptions = _[this.props.label] || {};
        } else {
            const _ = getDataFromLocalStorage("linkLabels", true) || {}
            colorOptions = _[this.props.label] || {}
        }

        const inELabels = [];// this.getInELabels();
        const outELabels = []; // this.getOutELabels();

        return (

            <div className={"VertexTableComponent"}>
                {/*<h3>{this.props.type} | {this.props.label}</h3>*/}
                <table className={"mb-10"}
                       // style={{"width": "calc(100vw - 295px)"}}
                >
                    <thead>
                    <tr style={{
                        "backgroundColor": colorOptions.bgColor,
                    }}>
                        {
                            this.props.showLabel === true
                                ? <th colSpan={2}>MetaData</th>
                                : <th colSpan={1}>Id</th>
                        }
                        {propertyKeys.length
                            ? <th colSpan={propertyKeys.length}>Properties</th>
                            : <Fragment/>
                        }
                        {
                            inELabels.length > 0
                                ? <th colSpan={inELabels.length}>InE Data</th>
                                : <React.Fragment/>
                        }
                        {
                            outELabels.length > 0
                                ? <th colSpan={outELabels.length}>OutE Data</th>
                                : <React.Fragment/>
                        }
                    </tr>
                    <tr style={{
                        "backgroundColor": colorOptions.bgColor,
                    }}>
                        {
                            this.props.showLabel === true
                                ? <td>Label<span>({this.getElementType(this.getFirstElement())})</span></td>
                                : <React.Fragment/>
                        }

                        <td>Id</td>
                        {
                            propertyKeys.map((propertyKey, index) => {
                                return (
                                    <td key={index}>{propertyKey}</td>
                                )
                            })
                        }
                        {
                            inELabels.length > 0
                                ? inELabels.map((edgeLabelConfig, index) => {
                                    return (
                                        <td key={index}
                                            style={{"color": edgeLabelConfig.edgeFillColorHex}}>{edgeLabelConfig.edgeLabel}</td>
                                    )
                                })
                                : <React.Fragment/>
                        }
                        {
                            outELabels.length > 0
                                ? outELabels.map((edgeLabelConfig, index) => {
                                    return (
                                        <td key={index}
                                            style={{"color": edgeLabelConfig.edgeFillColorHex}}>{edgeLabelConfig.edgeLabel}</td>
                                    )
                                })
                                : <React.Fragment/>
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map((node) => {
                            return (
                                <tr key={node.id}>
                                    {/*<td>{node.type}</td>*/}
                                    {
                                        this.props.showLabel === true
                                            ? <td style={{"color": elColor}}>{node.label}</td>
                                            : <React.Fragment/>
                                    }

                                    {/*<td><a  href={"/vertex/" + node.id}>{node.id}</a></td>*/}
                                    <td><strong>{node.id}</strong></td>
                                    {
                                        propertyKeys.map((prop, index) => {
                                            return (
                                                <td key={index}>{renderPropertyData(prop, node.properties[prop])}</td>)
                                        })
                                    }
                                    {
                                        inELabels.map((inELabelConfig, index) => {
                                            const vertices = node.inData[inELabelConfig.edgeLabel]
                                                ? node.inData[inELabelConfig.edgeLabel].vertices
                                                : [];
                                            return (
                                                <td key={index}>
                                                    {
                                                        vertices.map((vertex, vtxIndex) => {
                                                            return (
                                                                <button className={"btn"} key={vtxIndex}
                                                                        title={vertex.label}
                                                                        style={{"borderColor": vertex.fillColorHex}}>
                                                                    {vertex.labelText}
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                    {
                                        outELabels.map((outELabelConfig, index) => {
                                            const vertices = node.outData[outELabelConfig.edgeLabel]
                                                ? node.outData[outELabelConfig.edgeLabel].vertices
                                                : [];
                                            return (
                                                <td key={index}>
                                                    {
                                                        vertices.map((vertex, vtxIndex) => {
                                                            return (
                                                                <button className={"btn"} key={vtxIndex}
                                                                        title={vertex.label}
                                                                        style={{"borderColor": vertex.fillColorHex}}>
                                                                    {vertex.labelText}
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>


            </div>
        )
    }

}

export class EdgeTableComponent extends React.Component {
    static defaultProps = {
        data: null,
        label: null,
        type: null
    }

    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                properties: PropTypes.object,
                type: PropTypes.string
            })
        ),
        label: PropTypes.string,
        type: PropTypes.string,
    }

    getPropertyKeys() {
        if (this.props.data.length === 0) {
            return []
        } else {
            return Object.keys(this.props.data[0].properties || {})
        }
    }

    getElementType(elem) {
        return elem.type === "g:Vertex" ? "V" : "E";
    }

    getElementColor(elem) {
        const elType = this.getElementType(elem);
        if (elType === "V" && elem.meta) {
            return elem.meta.shapeOptions.fillColorHex;
        } else if (elType === "E" && elem.meta) {
            return elem.meta.shapeOptions.strokeColorHex;
        }
    }

    render() {
        const propertyKeys = this.getPropertyKeys();

        // const elColor = this.props.data.length > 0 ? this.getElementColor(this.props.data[0]) : "";

        // console.log("EdgeTableComponent here", this.props.label)
        // console.log("EdgeTableComponent here  this.props.data[0]", this.props.data[0])
        let colorOptions = {};
        if (this.props.type === "Vertex") {
            const _ = getDataFromLocalStorage("nodeLabels", true) || {}
            colorOptions = _[this.props.label] || {};
        } else {
            const _ = getDataFromLocalStorage("linkLabels", true) || {}
            colorOptions = _[this.props.label] || {}
        }

        return (
            <div className={"VertexTableComponent"}>
                {/*<h3>{this.props.type} | {this.props.label}</h3>*/}

                {
                    this.props.data.length > 0
                        ? <table className={"mb-10"}
                                 // style={{"width": "calc(100vw - 295px)"}}
                        >
                            <thead>
                            <tr style={{"backgroundColor": colorOptions.bgColor}}>
                                <th colSpan={1}>ID</th>
                                {
                                    propertyKeys.length
                                        ? <th colSpan={propertyKeys.length}>Properties</th>
                                        : <Fragment/>
                                }
                                <th>from(outV)</th>
                                <th>to (inV)</th>
                            </tr>
                            <tr style={{"backgroundColor": colorOptions.bgColor}}>

                                {/*style={{"borderColor": colorOptions.borderColor || "inherit"}}*/}
                                {/*<th>Type</th>*/}
                                {/*<td>Label<span>({this.getElementType(this.props.data[0])})</span></td>*/}
                                <td>Id</td>
                                {
                                    propertyKeys.map((propertyKey, index) => {
                                        return (
                                            <td key={index}>{propertyKey}</td>
                                        )
                                    })
                                }
                                <td>from</td>
                                <td>to</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.data.map((node) => {
                                    return (
                                        <tr key={node.id}>
                                            {/*<td>{node.type}</td>*/}
                                            {/*<td style={{"color": elColor}}>{node.label}</td>*/}
                                            <td>{node.id}</td>
                                            {

                                                propertyKeys.map((prop, index) => {
                                                    return (
                                                        <td key={index}>{renderPropertyData(prop, node.properties[prop])}</td>)
                                                })
                                            }
                                            <td>
                                                {/*<button className={"btn"} title={node.label}*/}
                                                {/*    style={{"borderColor": node.source.meta.shapeOptions.fillColorHex}}*/}
                                                {/*>*/}
                                                {/*{node.source.meta.labelOptions.labelText}*/}
                                                {node.outV} <Badge variant={"secondary"}> {node.outVLabel}</Badge>
                                                {/*</button>*/}
                                            </td>
                                            <td>
                                                {/*<button className={"btn"} title={node.label}*/}
                                                {/*    style={{"borderColor": node.target.meta.shapeOptions.fillColorHex}}*/}
                                                {/*>*/}
                                                {node.inV} <Badge variant={"secondary"}>{node.inVLabel}</Badge>

                                                {/*{node.target.meta.labelOptions.labelText}*/}
                                                {/*</button>*/}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        : <React.Fragment/>
                }


            </div>
        )
    }

}

