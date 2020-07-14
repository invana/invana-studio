import React from "react";
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view'
import "./json.scss";
import GremlinResponseSerializers from "../core/gremlin-serializer";

const gremlinSerializer = new GremlinResponseSerializers()

export default class JSONCanvas extends React.Component {

    static defaultProps = {
        vertices: [],
        edges: []
    }

    static propTypes = {
        vertices: PropTypes.array,
        edges: PropTypes.array
    };

    state = {
        rjv_component: false
    }

    UNSAFE_componentWillMount() {
        // there's probably a better way than setTimeout for non-blocking rendering
        const vertexGroups = gremlinSerializer.groupByLabel(gremlinSerializer.removeMeta(this.props.vertices));
        const edgeGroups = gremlinSerializer.groupByLabel(gremlinSerializer.removeMeta(this.props.edges));

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
