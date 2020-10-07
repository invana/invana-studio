import React from "react";
import "./query-console.scss";
import PropTypes from "prop-types";
import RemoteGraphComponent from "../core/graph-component";

// const Mousetrap = require("mousetrap");

export default class VerticesManagement extends RemoteGraphComponent {


    static defaultProps = {
        requestBuilder: {},
        queryGremlinServer: () => console.error("queryGremlinServer prop not set"),
        flushCanvas: () => console.error("flushCanvas prop not set")
    }

    static propTypes = {
        requestBuilder: PropTypes.object,
        queryGremlinServer: PropTypes.func,
        flushCanvas: PropTypes.func
    };


    componentDidMount() {
        // this.prop
    }

    render() {
        return (

            <div className={" p-10"}>
                <ul>
                    <li>* Document</li>
                </ul>


            </div>

        );
    }
}
