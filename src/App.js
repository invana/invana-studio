import React, {Suspense} from 'react';
import './App.css';
// import ConsoleView from "./views/console";
import HomeView from "./views/home";
import SetupGremlinServerConnection from "./views/connect";
import {
    GREMLIN_SERVER_URL
} from "./config";
import {redirectToConnectIfNeeded} from "./core/utils";
import PageComponentBase from "./core/base/page";
import ExplorerView from "./views/explorer";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";



const Page404 = ({location}) => (
    <div style={{marginTop: "48vh", "textAlign": "center"}}>
        <h2>
            No match found for <code>{location.pathname}</code>
        </h2>
        <p><a href={document.referrer} title={document.referrer}>&larr; go back </a> or <a href="/"> go home</a></p>
    </div>
);


export default class App extends React.Component {


    render() {
        redirectToConnectIfNeeded();

        return (
            <Router>
                <Suspense fallback={<div style={{"color": "white"}}>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={HomeView}/>
                        <Route exact path="/explorer" component={ExplorerView}/>
                        <Route exact path="/connect" component={SetupGremlinServerConnection}/>
                        <Route exact path="/page" component={PageComponentBase}/>
                        <Route component={Page404}/>
                    </Switch>
                </Suspense>
            </Router>
        )
    }
}


