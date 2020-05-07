import GraphViewer from "../components/viewer/viewer";
import React from "react";
import FloatNav from "../components/core/float-nav"

export default function GraphExplorerView() {
    return (
        <div className="App">
            <GraphViewer/>
            <FloatNav />
        </div>
    );
}

