export const STUDIO_CONNECT_CONSTANTS = {
    connectionUrlKey: "INVANA_ENGINE_URL",
    httpHeadersKey: "HTTP_HEADERS",
    graphEngineName: "GRAPH_ENGINE_NAME"
}


export const STUDIO_SETTINGS = {
    VERSION: "alpha",
    ABOUT_TEXT: "Open source knowledge graphs visualiser and editor.",
    REPO_URL: "https://github.com/invanalabs/graph-studio",
    SETUP_README_URL: "https://invana.io/help.html",
    DEMO_VIDEO_URL: "https://www.youtube.com/watch?v=17Q02VV_0Tc",


    CONNECTION_URL: localStorage.getItem(STUDIO_CONNECT_CONSTANTS.connectionUrlKey) || "http://192.168.0.10:8000/graphql",
    GRAPH_ENGINE_NAME: localStorage.getItem(STUDIO_CONNECT_CONSTANTS.graphEngineName),

    managementVertexLabel : "InvanaManagement"

}

export const HISTORY_SETTINGS = {
    historyLocalStorageKey: "GRAPH_EXPLORER_HISTORY",
    MAX_HISTORY_COUNT_TO_REMEMBER: 100
}


export const ROUTE_URLS = {
    CONNECT_URL: "/connect"
}

