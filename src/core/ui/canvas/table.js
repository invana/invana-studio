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
            <div className={"tableComponent p-10"}>
                {/*<h3>{this.props.type} | {this.props.label}</h3>*/}
                <table className={" mb-10 "}>
                    <thead>
                    <tr style={{
                        "backgroundColor": colorOptions.bgColor || "inherit",
                    }}>

                        {/*style={{"borderColor": colorOptions.borderColor || "inherit"}}*/}
                        <th>Type</th>
                        <th>Label</th>
                        <th>Id</th>
                        {
                            propertyKeys.map((propertyKey, index) => {
                                return (
                                    <th key={index}>{propertyKey}</th>
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
        responses: null,
        vertices: [],
        edges: []
    }


    render() {
        const vertexGroups = gremlinSerializer.groupByLabel(this.props.vertices);
        const edgeGroups = gremlinSerializer.groupByLabel(this.props.edges);

        console.log("=====vertexGroups", vertexGroups)
        return (
            <div className={"p-10 tableCanvas"}>


                <div className={"___responseBox "}>

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

