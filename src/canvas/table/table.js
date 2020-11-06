import React from "react";
import PropTypes from 'prop-types';
import "./table.scss";
import GraphSONDeSerializer from "../../serializers/graphson-v3";
import {getDataFromLocalStorage} from "../../core/utils";


const gremlinDeSerializer = new GraphSONDeSerializer();

export class TableComponent extends React.Component {
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
                {/*<h3>{this.props.type} | {this.props.label}</h3>*/}
                <table className={" mb-10 "}>
                    <thead>
                    <tr style={{
                        "backgroundColor": colorOptions.bgColor,
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
        dataStore: null
    }

    static propTypes = {
        dataStore: PropTypes.object
    }

    render() {
        const {vertices, edges } = this.props.dataStore.getAllData();
        const vertexGroups = gremlinDeSerializer.groupByLabel(vertices);
        const edgeGroups = gremlinDeSerializer.groupByLabel(edges);

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

