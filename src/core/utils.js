
// export function redirectToConnectIfNeeded(connectionUrl) {
//     console.log("redirectToConnectIfNeeded");
//     const u = new URL(window.location.href)
//     if ((connectionUrl === null || connectionUrl === "") && u.pathname !== "/connect") {
//         window.location.href = "/connect";
//     } else {
//         return true;
//     }
// }


export function convertMapKeysToArray(mapData) {
    let data = [];
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of mapData.entries()) {
        // console.log("=====key", key);
        data.push(value);
    }
    return data;
}

export function convertWeakMapKeysToArray(weakMapData) {
    console.log("weakMap", weakMapData)
    let data = [];
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of weakMapData.items()) {
        // console.log("=====key", key);
        data.push(value);
    }
    return data;
}

export function LightenDarkenColor(col, amt) {

    let usePound = false;

    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }

    let num = parseInt(col, 16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;


    let g = ((num >> 8) & 0xff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;


    let b = (num & 0xff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    return (usePound ? "#" : "") + ((r << 16) | (g << 8) | b).toString(16);

}
