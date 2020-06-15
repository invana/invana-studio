
export const gremlinServerUrlKey = "GREMLIN_SERVER_URL";
export const GREMLIN_SERVER_URL = localStorage.getItem(gremlinServerUrlKey);
export const DefaultMaxTimeElapsedWarningInSeconds = 180;
export const DefaultConnectionRetryTimeout = 10;


export const VERSION = "alpha";
export const CONNECT_URL= "/";
export const UUIDGenerator = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
