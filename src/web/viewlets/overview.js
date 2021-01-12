import React from "react";
import RemoteGraphComponent from "../core/graph-component";
// import GEList from "../ui-components/lists/list";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faWrench, faProjectDiagram} from "@fortawesome/free-solid-svg-icons";
import "./management.scss";
// import {managementVertexLabel} from "../config";
// import {getColorForString} from "../canvas/canvas-utils";
import VerticesManagement from "./vertices-management";
import EdgesManagement from "./edges-management";
import PropTypes from "prop-types";

export default class GraphOverview extends RemoteGraphComponent {
    static propTypes = {
        setShowVertexOptions: PropTypes.func,
        parentElem: PropTypes.object
    };

    render() {


        return (

            <div>

                <VerticesManagement
                    parentGraphComponent={this.props.parentElem}
                    setShowVertexOptions={this.props.setShowVertexOptions}
                />

                <EdgesManagement
                    parentGraphComponent={this.props.parentElem}
                    setShowVertexOptions={this.props.setShowVertexOptions}
                />


            </div>

        );
    }
}
