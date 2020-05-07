import React, {Suspense} from 'react';
import './App.css';
import GraphExplorerView from "./pages/explorer";
import ManagementView from "./pages/management";
import AboutView from "./pages/about";
import Console from "./pages/console";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


export default class App extends React.Component {


    render() {
        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={GraphExplorerView}/>
                        <Route path="/management" component={ManagementView}/>
                        <Route path="/about" component={AboutView}/>
                        <Route path="/console" component={Console}/>
                    </Switch>
                </Suspense>
            </Router>
        )
    }
}


