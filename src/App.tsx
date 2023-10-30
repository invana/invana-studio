import './App.scss';
import React, {Suspense} from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Page404 from "./views/page404/page404";
import {STUDIO_ROUTES} from "./settings";
import ConnectView from "./views/connect/connect";
import ExplorerView from './views/explorer/explorer';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Suspense fallback={<div style={{color: "white"}}>Loading...</div>}>
                    <Routes>
                        <Route path={STUDIO_ROUTES.HOME} element={<Navigate to={STUDIO_ROUTES.EXPLORER}/>}/>
                        <Route path={STUDIO_ROUTES.CONNECT} element={<ConnectView/>}/>
                        <Route path={STUDIO_ROUTES.EXPLORER} element={<ExplorerView/>}/>

                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </Suspense>
            </Router>
        );
    }
}