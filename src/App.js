import React, {Suspense} from "react";
import SwitchServerView from "./web/views/switch-server";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ConnectView from "./web/views/connect/connect";
import Page404 from "./web/views/page-404";
import IndexView from "./web/views";
import SchemaView from "./web/views/schema/schema";
import ExplorerView from "./web/views/explorer/explorer";
import DataView from "./web/views/data";
import SettingsView from "./web/views/settings/settings";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Suspense fallback={<div style={{color: "white"}}>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={IndexView}/>
                        <Route exact path="/explorer" component={ExplorerView}/>
                        <Route exact path="/data" component={DataView}/>
                        <Route exact path="/schema" component={SchemaView}/>
                        <Route exact path="/connect" component={ConnectView}/>
                        <Route exact path="/settings" component={SettingsView}/>
                        <Route exact path="/switch-server" component={SwitchServerView}/>
                        <Route component={Page404}/>
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}

