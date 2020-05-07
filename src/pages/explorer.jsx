import GraphViewer from "../components/viewer/viewer";
import React from "react";
import Navigation from "../components/core/navigation"

export default function GraphExplorerView() {
    return (
        <div className="App">
            <GraphViewer/>
            <Navigation />
        </div>
    );
}

