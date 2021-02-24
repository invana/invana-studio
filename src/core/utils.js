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

// export function LightenDarkenColor(col, amt) {
//
//     let usePound = false;
//
//     if (col[0] === "#") {
//         col = col.slice(1);
//         usePound = true;
//     }
//
//     let num = parseInt(col, 16);
//
//     let r = (num >> 16) + amt;
//
//     if (r > 255) r = 255;
//     else if (r < 0) r = 0;
//
//
//     let g = ((num >> 8) & 0xff) + amt;
//
//     if (g > 255) g = 255;
//     else if (g < 0) g = 0;
//
//
//     let b = (num & 0xff) + amt;
//
//     if (b > 255) b = 255;
//     else if (b < 0) b = 0;
//
//     return (usePound ? "#" : "") + ((r << 16) | (g << 8) | b).toString(16);
//
// }


// export function LightenDarkenColor(col, amt) {
//     /// amount can be from 0 to 1000
//     //
//     col = col.replace(/^#/, '')
//     if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]
//
//     let [r, g, b] = col.match(/.{2}/g);
//     ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])
//
//     r = Math.max(Math.min(255, r), 0).toString(16)
//     g = Math.max(Math.min(255, g), 0).toString(16)
//     b = Math.max(Math.min(255, b), 0).toString(16)
//
//     const rr = (r.length < 2 ? '0' : '') + r
//     const gg = (g.length < 2 ? '0' : '') + g
//     const bb = (b.length < 2 ? '0' : '') + b
//
//     return `#${rr}${gg}${bb}`
//
//
// }
// export function LightenDarkenColor(hex, percent) {
//     hex = hex.replace(/^\s*#|\s*$/g, '');
//
//     // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
//     if (hex.length == 3) {
//         hex = hex.replace(/(.)/g, '$1$1');
//     }
//
//     var r = parseInt(hex.substr(0, 2), 16),
//         g = parseInt(hex.substr(2, 2), 16),
//         b = parseInt(hex.substr(4, 2), 16);
//
//     return '#' +
//         ((0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
//         ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
//         ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
//
//
// }
export function LightenDarkenColor(col, amt) {
    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}


const percentToHex = (p) => {
    /*
https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4#gistcomment-3036936

console.log(percentToHex(0)); // 00
console.log(percentToHex(50)); // 80
console.log(percentToHex(80)); // CC
console.log(percentToHex(100)); // FF

     */
    const percent = Math.max(0, Math.min(100, p)); // bound percent from 0 to 100
    const intValue = Math.round(percent / 100 * 255); // map percent to nearest integer (0 - 255)
    const hexValue = intValue.toString(16); // get hexadecimal representation
    return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
}

export function SetOpacityToHex(hexString, percentage) {
    return hexString + percentToHex(percentage);

}
