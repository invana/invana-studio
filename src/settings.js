export const STUDIO_CONNECT_CONSTANTS = {
    INVANA_ENGINE_URL: "INVANA_ENGINE_URL",
    httpHeadersKey: "HTTP_HEADERS",
    GRAPH_ENGINE_NAME: "GRAPH_ENGINE_NAME"
}


export const STUDIO_SETTINGS = {
    VERSION: "alpha",
    ABOUT_TEXT: "Open source knowledge graphs visualiser and editor.",
    REPO_URL: "https://github.com/invanalabs/graph-studio",
    SETUP_README_URL: "https://invana.io/help.html",
    DEMO_VIDEO_URL: "https://www.youtube.com/watch?v=17Q02VV_0Tc",


    CONNECTION_URL: localStorage.getItem(STUDIO_CONNECT_CONSTANTS.INVANA_ENGINE_URL),
    GRAPH_ENGINE_NAME: localStorage.getItem(STUDIO_CONNECT_CONSTANTS.GRAPH_ENGINE_NAME) || "invana-engine",

    managementVertexLabel: "InvanaManagement"

}

export const GRAPH_CANVAS_SETTINGS = {
    DefaultNodeBorderColor: "#121212",
    DefaultNodeLabelPropertyKey: "_id",
    DefaultNodeStrokeWidth: 2,
    DefaultNodeRadius: 15,
    DefaultNodeInShapeTextColor: "#dddddd", // inside the shape
    DefaultNodeLabelColor: "#dddddd",

    DefaultLinkLabelPropertyKey: "id",
    DefaultLinkPathColor: 0xc9c9c9,
    DefaultLinkLabelColor: "#c9c9c9",
    DefaultLinkStrokeWidth: 2,
    DefaultLinkDistance: 180,

    DefaultInShapeHTMLFn: (node) => node.properties.name ? node.properties.name.substring(0, 10) : node.id,

    DefaultLabelVisibility: false,
    simulationAlpha: 0.8,
    linkCurvature: .85,


    DefaultElementTextColor: "#343434",
    DefaultElementUnHighlightColor: "#9e9e9e",
}

export const HISTORY_SETTINGS = {
    historyLocalStorageKey: "GRAPH_EXPLORER_HISTORY",
    MAX_HISTORY_COUNT_TO_REMEMBER: 100
}


export const ROUTE_URLS = {
    CONNECT_URL: "/connect"
}

