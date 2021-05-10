import './App.scss';
import React, {Suspense} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Page404View from "./ui-components/views/page-404";
import Explorer from "./ui-components/views/explorer";
import IndexView from "./ui-components/views";
import LabelView from "./ui-components/views/data";
import DataManagementView from "./ui-components/views/data";
import SettingsView from "./ui-components/views/settings";
import ConnectView from "./ui-components/views/connect";


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
                        <Route exact path="/settings" component={SettingsView}/>
                        <Route exact path="/label" component={LabelView}/>
                        <Route component={Page404View}/>
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}

