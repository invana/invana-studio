import GraphViewer from "../components/viewer/viewer";
import React from "react";
import LeftNav from "../components/core/left-nav"

export default function GraphExplorerView() {
    return (
        <div className="App">
            <GraphViewer/>
            <LeftNav />
        </div>
    );
}

