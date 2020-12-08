export const GE_CONSTANTS = {
    gremlinServerUrlKey: "GREMLIN_SERVER_URL",
    httpHeadersKey: "HTTP_HEADERS",
    graphEngineName: "GRAPH_ENGINE"
}


export const GREMLIN_SERVER_URL = localStorage.getItem(GE_CONSTANTS.gremlinServerUrlKey);
export const GRAPH_ENGINE_NAME = localStorage.getItem(GE_CONSTANTS.graphEngineName);

export const DefaultMaxTimeElapsedWarningInSeconds = 180;
// export const DefaultConnectionRetryTimeout = 20;


export const VERSION = "alpha";
export const ABOUT_TEXT = "Open source visualiser for exploring the graph data.";
export const CONNECT_URL = "/connect";
export const REPO_URL = "https://github.com/invanalabs/graph-explorer";
export const UUIDGenerator = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );

export const DefaultNodeBorderColor = "#121212";
export const DefaultNodeLabelPropertyKey = "id";
export const DefaultNodeStrokeWidth = 2;
export const DefaultNodeRadius = 15;
export const DefaultNodeInShapeTextColor = "#dddddd"; // inside the shape
export const DefaultNodeLabelColor = "#dddddd";

export const DefaultLinkLabelPropertyKey = "id";
export const DefaultLinkPathColor = 0xc9c9c9;
export const DefaultLinkLabelColor = "#c9c9c9";
export const DefaultLinkStrokeWidth = 2;
export const DefaultLinkDistance = 180;

export const DefaultInShapeHTMLFn = (node) => node.properties.name ? node.properties.name.substring(0, 10) : node.id;

export const DefaultLabelVisibility = false;
export const simulationAlpha = 0.8;
export const linkCurvature = .85;


export const managementVertexLabel = "InvanaManagement";
export const historyLocalStorageKey = "GRAPH_EXPLORER_HISTORY";
export const MAX_HISTORY_COUNT_TO_REMEMBER = 100;
export const DEMO_VIDEO_URL = "https://www.youtube.com/watch?v=tZS_-7SX_f8";

