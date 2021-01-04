export const GE_CONSTANTS = {
    connectionUrlKey: "INVANA_ENGINE_URL",
    httpHeadersKey: "HTTP_HEADERS",
    graphEngineName: "GRAPH_ENGINE"
}

export const VERSION = "alpha";
export const ABOUT_TEXT = "Open source knowledge engine for making decisions.";
export const CONNECT_URL = "/connect";
export const REPO_URL = "https://github.com/invanalabs/graph-explorer";

export const UUIDGenerator = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );

export const GREMLIN_SERVER_URL = localStorage.getItem(GE_CONSTANTS.connectionUrlKey);
export const GRAPH_ENGINE_NAME = localStorage.getItem(GE_CONSTANTS.graphEngineName);

export const managementVertexLabel = "InvanaManagement";
