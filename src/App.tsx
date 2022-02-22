/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *  
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import './App.scss';
import React, {Suspense} from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import ExploreView from "./views/explorer/explorer";
import Page404 from "./views/page404/page404";
import GraphQLView from "./views/graphql/graphql";
import GraphModellerView from "./views/modeller/modeller";
import SettingsView from "./views/settings/settings";
import {STUDIO_ROUTES} from "./settings";
import ConnectView from "./views/connect/connect";

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Suspense fallback={<div style={{color: "white"}}>Loading...</div>}>
                    <Routes>
                        <Route path={STUDIO_ROUTES.HOME} element={<Navigate to={STUDIO_ROUTES.MODELLER}/>}/>
                        <Route path={STUDIO_ROUTES.CONNECT} element={<ConnectView/>}/>
                        <Route path={STUDIO_ROUTES.EXPLORER} element={<ExploreView/>}/>
                        <Route path={STUDIO_ROUTES.GRAPHQL} element={<GraphQLView/>}/>
                        <Route path={STUDIO_ROUTES.MODELLER} element={<GraphModellerView/>}/>
                        <Route path={STUDIO_ROUTES.SETTINGS} element={<SettingsView/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </Suspense>
            </Router>
        );
    }
}