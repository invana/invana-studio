import {getDataFromLocalStorage} from "../web/utils";
import {defaultEdgesOptions} from "./edge-options";

export const STUDIO_CONNECT_CONSTANTS = {
    INVANA_ENGINE_URL: "INVANA_ENGINE_URL",
    HTTP_HEADERS: "HTTP_HEADERS",
    GRAPH_ENGINE_NAME: "GRAPH_ENGINE_NAME",
    RENDERING_EDGES_SETTINGS: "RENDERING_EDGES_SETTINGS"
}


export const STUDIO_SETTINGS = {
    VERSION: "alpha",
    ABOUT_TEXT: "Open source knowledge graphs visualiser, editor and insights engine.",
    REPO_URL: "https://github.com/invanalabs/graph-studio",
    SETUP_INSTRUCTIONS_URL: "https://invana.io/get-started.html",
    DEMO_VIDEO_URL: "https://www.youtube.com/watch?v=17Q02VV_0Tc",
    SUPPORT_URL: "https://invana.io/support",


    CONNECTION_URL: localStorage.getItem(STUDIO_CONNECT_CONSTANTS.INVANA_ENGINE_URL),
    GRAPH_ENGINE_NAME: localStorage.getItem(STUDIO_CONNECT_CONSTANTS.GRAPH_ENGINE_NAME) || "invana-engine",


    RENDERING_EDGES_SETTINGS : getDataFromLocalStorage(STUDIO_CONNECT_CONSTANTS.RENDERING_EDGES_SETTINGS, true ) || defaultEdgesOptions,

    MANAGEMENT_VERTEX_LABEL: "InvanaManagement"
}

export const GRAPH_CANVAS_SETTINGS = {
    DefaultNodeBorderColor: "#121212",
    DefaultNodeLabelPropertyKey: "_id",
    DefaultNodeStrokeWidth: 2,
    DefaultNodeRadius: 15,
    DefaultNodeInShapeTextColor: "#dddddd", // inside the shape
    DefaultNodeLabelColor: "#dddddd",

    DefaultLinkLabelPropertyKey: "_label",
    DefaultLinkPathColor: 0xc9c9c9,
    DefaultLinkLabelColor: "#9c9c9c",
    DefaultLinkStrokeWidth: 2,

    DefaultInShapeHTMLFn: (node) => node.properties.name ? node.properties.name.substring(0, 10) : node.id,

    DefaultLabelVisibility: false,
    simulationAlpha: 0.8,
    linkCurvature: .85,


    DefaultElementTextColor: "#343434",
    DefaultElementUnHighlightColor: "#9e9e9e",


    DEFAULT_LINK_LABEL_FONT_SIZE : 12,
    // DEFAULT_LINK_LENGTH: 180,

    MAX_LABEL_LENGTH: 45,
    DEFAULT_NODE_IMAGE: "https://via.placeholder.com/50",
    DEFAULT_NODE_LABEL_FONT_SIZE: 16,
    DEFAULT_NODE_SHAPE_SIZE: 16
}

export const HISTORY_SETTINGS = {
    historyLocalStorageKey: "GRAPH_EXPLORER_HISTORY",
    MAX_HISTORY_COUNT_TO_REMEMBER: 100
}

export const RENDERING_CONFIG = {
    LOCAL_STORAGE_KEY: "RENDERING_CONFIG"
}


export const ROUTE_URLS = {
    CONNECT_URL: "/connect"
}

