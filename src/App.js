import React, { Suspense } from "react";
import ModalExampleView from "./views/connect";
import ExamplePageView from "./views/explorer";
import Page404 from "./ui-components/error-views/404";
import SetupGremlinServerConnection from "./views/connect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={ExamplePageView} />
            <Route exact path="/modal" component={ModalExampleView} />
            <Route exact path="/connect" component={SetupGremlinServerConnection} />
            <Route component={Page404} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
