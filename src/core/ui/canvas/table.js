import React from "react";
import "./table.scss";
import GremlinResponseSerializers from "../../base/gremlin-serializer";
import {getDataFromLocalStorage} from "../../utils";


const gremlinSerializer = new GremlinResponseSerializers();

export class TableComponent extends React.Component {
    static defaultProps = {
        data: null,
        label: null
    }

    getPropertyKeys() {
        if (this.props.data.length === 0) {
            return []
        } else {
            return Object.keys(this.props.data[0].properties || {})
        }
    }

    render() {
        const propertyKeys = this.getPropertyKeys();
        console.log("TableComponent here", this.props.label)
        let colorOptions = {};
        if (this.props.type === "Vertex") {
            const _ = getDataFromLocalStorage("nodeLabels", true) || {}
            colorOptions = _[this.props.label] || {};
        } else {
            const _ = getDataFromLocalStorage("linkLabels", true) || {}
            colorOptions = _[this.props.label] || {}
        }

        return (
            <div className={"tableComponent"}>
                <h3>{this.props.type} | {this.props.label}</h3>
                <table>
                    <thead>
                    <tr style={{
                        "backgroundColor": colorOptions.bgColor || "inherit",
                    }}>


                        <th style={{"borderColor": colorOptions.borderColor || "inherit"}}>Type</th>
                        <th style={{"borderColor": colorOptions.borderColor || "inherit"}}>Label</th>
                        <th style={{"borderColor": colorOptions.borderColor || "inherit"}}>Id</th>
                        {
                            propertyKeys.map((propertyKey, index) => {
                                return (
                                    <th style={{"borderColor": colorOptions.borderColor || "inherit"}}
                                        key={index}>{propertyKey}</th>
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
                                    <td>{node.type}</td>
                                    <td>{node.label}</td>
                                    <td>{node.id}</td>
                                    {

                                        propertyKeys.map((prop, index) => {
                                            return (<td key={index}>{node.properties[prop]}</td>)
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

export default class TableCanvas extends React.Component {

    static defaultProps = {
        responses: null
    }



    render() {
        const vertexGroups = gremlinSerializer.groupByLabel(this.props.vertices);
        const edgeGroups = gremlinSerializer.groupByLabel(this.props.edges);

        console.log("=====vertexGroups", vertexGroups)
        return (
            <div className={"p-10 tableCanvas"}>


                <div className={"responseBox "} >

                    {
                        Object.keys(vertexGroups).map((nodeLabel, index) => (
                            <TableComponent type={"Vertex"} key={nodeLabel + index} label={nodeLabel}
                                            data={vertexGroups[nodeLabel]}/>
                        ))
                    }
                    {
                        Object.keys(edgeGroups).map((linkLabel, index) => (
                            <TableComponent type={"Edge"} key={edgeGroups + index} label={linkLabel}
                                            data={edgeGroups[linkLabel]}/>
                        ))
                    }
                </div>

            </div>
        )
    }
}

