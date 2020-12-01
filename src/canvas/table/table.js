import React, {Fragment} from "react";

import PropTypes from 'prop-types';
import "./table.scss";
import GraphSONDeSerializer from "../../serializers/graphson-v3";
import {getDataFromLocalStorage} from "../../core/utils";
import {renderPropertyData} from "../canvas-utils";
import GraphSimulator from "../../core/graph-simulator";
import GESettings from "../graph/settings";


const gremlinDeSerializer = new GraphSONDeSerializer();

export class VertexTableComponent extends React.Component {
    static defaultProps = {
        data: null,
        label: null,
        vertexSchema: {},
        dataStore: null,
        type: null
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

    getInELabels() {
        let inELabelsConfig = []
        this.props.vertexSchema.inE.map((inELabel) => {
            inELabelsConfig.push({
                edgeFillColorHex: this.props.dataStore.getEdgeOptions(inELabel)
                    ? this.props.dataStore.getEdgeOptions(inELabel).shapeOptions.strokeColorHex
                    : "#efefef",
                edgeLabel: inELabel
            })
        });
        return inELabelsConfig;
    }

    getOutELabels() {
        let outELabelsConfig = []
        this.props.vertexSchema.outE.map((outELabel) => {
            // console.log("====this.props.getEdgeOptions(outELabel)", this.props.dataStore.getEdgeOptions(outELabel))
            outELabelsConfig.push({
                edgeFillColorHex: this.props.dataStore.getEdgeOptions(outELabel)
                    ? this.props.dataStore.getEdgeOptions(outELabel).shapeOptions.strokeColorHex
                    : "#efefef",
                edgeLabel: outELabel
            })
        });
        return outELabelsConfig;
    }

    getFirstElement() {
        return this.props.data[0];
    }

    render() {
        const propertyKeys = this.getPropertyKeys();
        const elColor = this.getElementColor(this.props.data[0]);
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

        return (
            <div className={"VertexTableComponent"}>
                {/*<h3>{this.props.type} | {this.props.label}</h3>*/}
                <table className={" mb-10 "}>
                    <thead>
                    <tr style={{
                        "backgroundColor": colorOptions.bgColor,
                    }}>


                        <th colSpan={2}>MetaData</th>
                        {propertyKeys.length
                            ? <th colSpan={propertyKeys.length}>Properties</th>
                            : <Fragment/>
                        }

                        <th colSpan={this.getInELabels().length}>InE Data</th>
                        <th colSpan={this.getOutELabels().length}>OutE Data</th>
                    </tr>
                    <tr style={{
                        "backgroundColor": colorOptions.bgColor,
                    }}>

                        <td>Label<span>({this.getElementType(this.getFirstElement())})</span></td>
                        <td>Id</td>
                        {
                            propertyKeys.map((propertyKey, index) => {
                                return (
                                    <td key={index}>{propertyKey}</td>
                                )
                            })
                        }
                        {
                            this.getInELabels().map((edgeLabelConfig, index) => {
                                return (
                                    <td key={index}
                                        style={{"color": edgeLabelConfig.edgeFillColorHex}}>{edgeLabelConfig.edgeLabel}</td>
                                )
                            })
                        }
                        {
                            this.getOutELabels().map((edgeLabelConfig, index) => {
                                return (
                                    <td key={index}
                                        style={{"color": edgeLabelConfig.edgeFillColorHex}}>{edgeLabelConfig.edgeLabel}</td>
                                )
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map((node) => {
                            return (
                                <tr key={node.id}>
                                    {/*<td>{node.type}</td>*/}
                                    <td style={{"color": elColor}}>{node.label}</td>
                                    <td>{node.id}</td>
                                    {
                                        propertyKeys.map((prop, index) => {
                                            return (
                                                <td key={index}>{renderPropertyData(prop, node.properties[prop])}</td>)
                                        })
                                    }
                                    {
                                        this.getInELabels().map((inELabelConfig, index) => {
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
                                        this.getOutELabels().map((outELabelConfig, index) => {
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
        const elColor = this.getElementColor(this.props.data[0]);
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
                <table className={" mb-10 "}>
                    <thead>
                    <tr style={{
                        "backgroundColor": colorOptions.bgColor,
                    }}>


                        <th colSpan={2}>MetaData</th>
                        {propertyKeys.length
                            ? <th colSpan={propertyKeys.length}>Properties</th>
                            : <Fragment/>
                        }
                        <th>from</th>
                        <th>to (outV)</th>
                    </tr>
                    <tr style={{
                        "backgroundColor": colorOptions.bgColor,
                    }}>

                        {/*style={{"borderColor": colorOptions.borderColor || "inherit"}}*/}
                        {/*<th>Type</th>*/}
                        <td>Label<span>({this.getElementType(this.props.data[0])})</span></td>
                        <td>Id</td>
                        {
                            propertyKeys.map((propertyKey, index) => {
                                return (
                                    <td key={index}>{propertyKey}</td>
                                )
                            })
                        }
                        <td>from</td>
                        <td>to (outV)</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map((node) => {
                            return (
                                <tr key={node.id}>
                                    {/*<td>{node.type}</td>*/}
                                    <td style={{"color": elColor}}>{node.label}</td>
                                    <td>{node.id}</td>
                                    {

                                        propertyKeys.map((prop, index) => {
                                            return (
                                                <td key={index}>{renderPropertyData(prop, node.properties[prop])}</td>)
                                        })
                                    }
                                    <td>
                                        <button className={"btn"} title={node.label}
                                                style={{"borderColor": node.source.meta.shapeOptions.fillColorHex}}>
                                            {node.source.meta.labelOptions.labelText}</button>
                                    </td>
                                    <td>
                                        <button className={"btn"} title={node.label}
                                                style={{"borderColor": node.target.meta.shapeOptions.fillColorHex}}>
                                            {node.target.meta.labelOptions.labelText}</button>
                                    </td>
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

export default class TableCanvas extends React.Component {

    static defaultProps = {
        dataStore: null
    }

    static propTypes = {
        dataStore: PropTypes.object,
    }

    render() {
        // const {vertices, edges} = this.props.dataStore.getAllData();
        const settings = new GESettings(0, 0);
        const forceSimulator = new GraphSimulator(settings, null, 0.5);
        const {verticesToRender, edgesToRender} = this.props.dataStore.determineAllDataToRender();
        forceSimulator.addDataToGraphSimulation(verticesToRender, edgesToRender,);

        const vertexGroups = gremlinDeSerializer.groupByLabel(verticesToRender);
        const edgeGroups = gremlinDeSerializer.groupByLabel(edgesToRender);
        return (
            <div className={"p-10 tableCanvas"}>
                <div className={"___responseBox "}>
                    {
                        Object.keys(vertexGroups).map((nodeLabel, index) => (
                            <VertexTableComponent type={"Vertex"} key={nodeLabel + index}
                                                  vertexSchema={this.props.dataStore.getVertexSchema(nodeLabel)}
                                                  dataStore={this.props.dataStore}

                                                  label={nodeLabel}
                                                  data={vertexGroups[nodeLabel]}/>
                        ))
                    }
                    {
                        Object.keys(edgeGroups).map((linkLabel, index) => (
                            <EdgeTableComponent type={"Edge"} key={edgeGroups + index} label={linkLabel}
                                                data={edgeGroups[linkLabel]}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}

