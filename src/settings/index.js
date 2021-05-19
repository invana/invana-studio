import {STUDIO_CONNECT_CONSTANTS} from "./constants";
import {getDataFromLocalStorage} from "../utils/localStorage";
import packageJson from '../../package.json';


export const STUDIO_SETTINGS = {
    VERSION: packageJson.version,
    ABOUT_TEXT: packageJson.description, // "Open source graph data visualiser and insights engine.",
    REPO_URL: packageJson.homepage,
    SETUP_INSTRUCTIONS_URL: "https://docs.invana.io/get-started/setup-invana-in-5-min",
    DEMO_VIDEO_URL: "https://www.youtube.com/watch?v=17Q02VV_0Tc",
    SUPPORT_URL: "https://invana.io/support",


    CONNECTION_URL: localStorage.getItem(STUDIO_CONNECT_CONSTANTS.INVANA_ENGINE_URL),
    GRAPH_ENGINE_NAME: localStorage.getItem(STUDIO_CONNECT_CONSTANTS.GRAPH_ENGINE_NAME) || "invana-engine",


    RENDERING_EDGES_SETTINGS : getDataFromLocalStorage(STUDIO_CONNECT_CONSTANTS.RENDERING_EDGES_SETTINGS, true ) || {},//defaultEdgesOptions,

    MANAGEMENT_VERTEX_LABEL: "InvanaManagement"
}


export const RENDERING_CONFIG = {
    LOCAL_STORAGE_KEY: "RENDERING_CONFIG"
}


export const ROUTE_URLS = {
    CONNECT_URL: "/connect"
}