import React, {Fragment} from "react";

import PropTypes from 'prop-types';
import "./table.scss";
import GraphSONDeSerializer from "../../serializers/graphson-v3";
import {getDataFromLocalStorage} from "../../core/utils";
import {renderPropertyData} from "../canvas-utils";


const gremlinDeSerializer = new GraphSONDeSerializer();

export class VertexTableComponent extends React.Component {
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

    getInELabels() {
        // TODO - right now, schema is decided based on first element, need to fix this ASAP
        // what if there were more edge labels for the second element. !! :(
        const elem = this.getFirstElement();
        let labels = [];
        console.log("getInELabels", elem);
        Object.keys(elem.inData).map((inELabel) => {
            labels.push(inELabel);
        })
        return labels;
    }

    getOutELabels() {
        const elem = this.getFirstElement();
        let labels = [];
        Object.keys(elem.outData).map((outELabel) => {
            labels.push(outELabel);
        })
        return labels;
    }

    getFirstElement() {
        return this.props.data[0];
    }

    render() {
        const propertyKeys = this.getPropertyKeys();
        const elColor = this.getElementColor(this.props.data[0]);
        console.log("VertexTableComponent here", this.props.label)
        console.log("VertexTableComponent here  this.props.data[0]", this.props.data[0])
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
                            this.getInELabels().map((edgeLabel, index) => {
                                return (
                                    <td key={index}
                                        style={{"color": this.getFirstElement().inData[edgeLabel].edgeFillColorHex}}>{edgeLabel}</td>
                                )
                            })
                        }
                        {
                            this.getOutELabels().map((edgeLabel, index) => {
                                return (
                                    <td key={index}
                                        style={{"color": this.getFirstElement().outData[edgeLabel].edgeFillColorHex}}>{edgeLabel}</td>
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
                                        Object.keys(node.inData).map((inELabel, index) => {
                                            return (
                                                <td key={index}>
                                                    {
                                                        node.inData[inELabel].vertices.map((vertex, vtxIndex) => {
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
                                        Object.keys(node.outData).map((outELabel, index) => {
                                            return (
                                                <td key={index}>
                                                    {
                                                        node.outData[outELabel].vertices.map((vertex, vtxIndex) => {
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
        console.log("EdgeTableComponent here", this.props.label)
        console.log("EdgeTableComponent here  this.props.data[0]", this.props.data[0])
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
        dataStore: PropTypes.object
    }

    render() {
        // const {vertices, edges} = this.props.dataStore.getAllData();

        const {verticesToRender, edgesToRender} = this.props.dataStore.determineAllDataToRender();

        const vertexGroups = gremlinDeSerializer.groupByLabel(verticesToRender);
        const edgeGroups = gremlinDeSerializer.groupByLabel(edgesToRender);

        console.log("=====vertexGroups", vertexGroups)
        return (
            <div className={"p-10 tableCanvas"}>


                <div className={"___responseBox "}>

                    {
                        Object.keys(vertexGroups).map((nodeLabel, index) => (
                            <VertexTableComponent type={"Vertex"} key={nodeLabel + index} label={nodeLabel}
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

