import './App.scss';
import React, {Suspense} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
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
                    <Switch>
                        <Route exact path="/" component={IndexView}/>
                        <Route exact path="/connect" component={ConnectView}/>
                        <Route exact path="/explorer" component={Explorer}/>
                        <Route exact path="/data" component={DataManagementView}/>
                        <Route exact path="/console" component={ConsoleView}/>
                        <Route exact path="/settings" component={SettingsView}/>
                        <Route exact path="/label" component={LabelView}/>
                        <Route component={Page404View}/>
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}

