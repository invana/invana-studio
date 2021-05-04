import './App.scss';
import React, {Suspense} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Page404View from "./views/page-404";
import Explorer from "./views/explorer";
import IndexView from "./views";
import LabelView from "./views/data";
import DataManagementView from "./views/data";
import SettingsView from "./views/settings";


export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Suspense fallback={<div style={{color: "white"}}>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={IndexView}/>
                        <Route exact path="/explorer" component={Explorer}/>
                        <Route exact path="/data" component={DataManagementView}/>
                        <Route exact path="/settings" component={SettingsView}/>
                        <Route exact path="/label" component={LabelView}/>
                        <Route component={Page404View}/>
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}

