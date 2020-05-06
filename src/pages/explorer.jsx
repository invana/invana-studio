import GraphViewer from "../components/viewer";
import React from "react";
import Navigation from "../components/navigation"

export default function GraphExplorerView() {
    return (
        <div className="App">
            <GraphViewer/>
            <Navigation />
        </div>
    );
}

