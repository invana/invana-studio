import React from "react";
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view'
import "./json.scss";
import GraphSONDeSerializer from "../serializers/graphson-v3";

const gremlinDeSerializer = new GraphSONDeSerializer()

export default class JSONCanvas extends React.Component {

    static defaultProps = {
        dataStore: null
    }

    static propTypes = {
        dataStore: PropTypes.object
    };

    state = {
        rjv_component: false
    }

    UNSAFE_componentWillMount() {
        // there's probably a better way than setTimeout for non-blocking rendering
        const {vertices, edges} = this.props.dataStore.getAllData();
        console.log("JSONCanvas", vertices, edges);

        const vertexGroups = gremlinDeSerializer.groupByLabel(gremlinDeSerializer.removeMeta(vertices));
        const edgeGroups = gremlinDeSerializer.groupByLabel(gremlinDeSerializer.removeMeta(edges));

        const data = {
            "vertexGroups": vertexGroups,
            "edgeGroups": edgeGroups
        }
        const TIMEOUT = 10 // wait 10 ms
        setTimeout(() => {
            this.setState({
                rjv_component: <ReactJson className={"p-10"} theme="monokai" style={{"backgroundColor": "transparent"}}
                                          src={data}/>
            })
        }, TIMEOUT)
    }

    render() {
        return <div className={"jsonCanvas"}>{this.getJsonOrLoader()}         </div>
    }

    getJsonOrLoader() {
        const {rjv_component} = this.state
        if (rjv_component === false) {
            return <div className={"loading-text"}>loading...</div>
        } else {
            // component was rendered and stored to this var
            return rjv_component
        }
    }


}
