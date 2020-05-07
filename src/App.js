import React, {Suspense, lazy} from 'react';
import GraphViewer from './components/viewer/viewer';
import './App.css';
import GraphExplorerView from "./pages/explorer";
import ManagementView from "./pages/management";
import AboutView from "./pages/about";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    IndexRoute,
    Link
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
                    </Switch>
                </Suspense>
            </Router>
        )
    }
}


