export const INVANA_GRAPH_API_HOST = "http://127.0.0.1:5001";
export const GREMLIN_SERVER_URL = "ws://127.0.0.1:8182/gremlin";


export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
