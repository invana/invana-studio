
export function redirectToConnectIfNeeded(connectionUrl) {
    console.log("redirectToConnectIfNeeded");
    const u = new URL(window.location.href)
    if ((connectionUrl === null || connectionUrl === "") && u.pathname !== "/connect") {
        window.location.href = "/connect";
    } else {
        return true;
    }
}
