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
import packageJson from '../package.json';


export const STUDIO_ROUTES = {
    HOME: "/",
    MODELLER: "/modeller",
    EXPLORER: "/explorer",
    FUNCTIONS: "/functions",
    GRAPHQL: "/graphql",
    SETTINGS: "/settings",
    CONNECT: "/connect"
}

export const STUDIO_CONNECT_CONSTANTS = {
    INVANA_ENGINE_URL: "INVANA_ENGINE_URL",
    HTTP_HEADERS: "INVANA_HTTP_HEADERS",
    // GRAPH_ENGINE_NAME: "INVANA_GRAPH_ENGINE_NAME",
    // RENDERING_EDGES_SETTINGS: "INVANA_RENDERING_EDGES_SETTINGS"
}

export const STUDIO_SETTINGS = {
    VERSION: packageJson.version,
    ABOUT_TEXT: packageJson.description, // "Open source graph data visualiser and insights engine.",
    REPO_URL: packageJson.repository.url,
    HELP_LINK: "https://docs.invana.io",
    CONNECTION_URL: localStorage.getItem(STUDIO_CONNECT_CONSTANTS.INVANA_ENGINE_URL)
}
