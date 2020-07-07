import React, { Suspense } from "react";
import HomeView from "./views/home";
import ExplorerView from "./views/explorer";
import Page404 from "./ui-components/error-views/404";
import SetupGremlinServerConnection from "./views/connect";
import SwitchServerView from "./views/switch-server";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/explorer" component={ExplorerView} />
            <Route exact path="/connect" component={SetupGremlinServerConnection} />
            <Route exact path="/switch-server" component={SwitchServerView} />
            <Route component={Page404} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
