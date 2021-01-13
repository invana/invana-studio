export async function postData(url = '', extraHeaders = {}, data = {}) {
    // Default options are marked with *
    const urlAnalysed = new URL(url);
    extraHeaders["Content-Type"] = "application/json";
    extraHeaders["Accept"] = "application/json";
    extraHeaders['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
    if (urlAnalysed.username && urlAnalysed.password) {
        extraHeaders['Authorization'] = 'Basic ' + btoa(urlAnalysed.username + ':' + urlAnalysed.password);
    } else if (urlAnalysed.username && urlAnalysed.password !== "") {
        extraHeaders['Authorization'] = 'Token ' + urlAnalysed.username;
    }

    console.log("=====request data", data);
    const connectionUrl = urlAnalysed.origin + urlAnalysed.pathname;
    // let response = null
    let transporterStatusCode = null;
    let responseJson = {};

    try {
        const response = await fetch(connectionUrl, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            headers: extraHeaders,
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        console.log("response========", response);

        transporterStatusCode = response.status
        try {
            responseJson = await response.json();
        } catch (e) {
            console.error("failed to get the json data with error", e);
        }
    } catch (e) {
        console.error("Failed to perform fetch with error ", e);
        transporterStatusCode = 999;
    }

    // let statusCode = response.status; // response from the server.

    return {"response": responseJson, transporterStatusCode: transporterStatusCode}
}
