import GraphViewer from "../components/visualizer/viewer";
import React from "react";
import LeftNav from "../components/core/left-nav"
import MainContent from "../components/core/main-content";

export default function GraphExplorerView() {



    return (
        <div className="App">


            <LeftNav/>
            <MainContent>
                <GraphViewer/>
            </MainContent>
        </div>
    );
}

