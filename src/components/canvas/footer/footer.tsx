import React from "react";
import "./footer.scss"

const CanvasFooter = () => {

    const canvasDataStats = { nodesCount: 120, edgesCount: 2030 }

    return <div className="canvasFooter">
        <span style={{ marginLeft: 15 }}>Node#1231234[Person:rrmerugu] </span>
        <span style={{ float: "right" }}>
            <span style={{ marginRight: 15 }}>{canvasDataStats.nodesCount} nodes, {canvasDataStats.edgesCount} relationships in the canvas</span>
            <span style={{ marginRight: 15 }}>took 300ms to query</span>
        </span>
    </div>
}

export default CanvasFooter;