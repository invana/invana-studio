import React, {Suspense} from "react";
import SwitchServerView from "./views/switch-server";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ConnectView from "./views/connect";
import Page404 from "./views/page-404";
import IndexView from "./views";
import SchemaView from "./views/schema";
import GraphView from "./views/graph";
import TableView from "./views/table";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Suspense fallback={<div style={{color: "white"}}>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={IndexView}/>
                        <Route exact path="/graph" component={GraphView}/>
                        <Route exact path="/table" component={TableView}/>
                        <Route exact path="/schema" component={SchemaView}/>
                        <Route exact path="/connect" component={ConnectView}/>
                        <Route exact path="/switch-server" component={SwitchServerView}/>
                        <Route component={Page404}/>
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}

