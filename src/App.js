import './App.scss';
import React, {Suspense} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Page404View from "./web/views/page-404";
import Explorer from "./web/views/explorer";
import IndexView from "./web/views";
import LabelView from "./web/views/data";
import DataManagementView from "./web/views/data";
import SettingsView from "./web/views/settings";
import ConnectView from "./web/views/connect";
import ConsoleView from "./web/views/console";


export default class App extends React.Component {
    render() {
        return (
            <Router>
                 <Suspense fallback={<div style={{color: "white"}}>Loading...</div>}>
                    <Routes>
                        <Route exact path="/" element={<IndexView />}/>
                        <Route exact path="/connect" element={<ConnectView />}/>
                        <Route exact path="/explorer" element={<Explorer />}/>
                        <Route exact path="/data" element={<DataManagementView />}/>
                        <Route exact path="/console" element={<ConsoleView />}/>
                        <Route exact path="/settings" element={<SettingsView />}/>
                        <Route exact path="/label" element={<LabelView />}/>
                        <Route element={<Page404View />}/>
                    </Routes>
                 </Suspense>
            </Router>
        );
    }
}

