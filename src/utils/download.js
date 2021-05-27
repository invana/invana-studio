export default function downloadTextAsFile(text, filename) {

    console.log("downloadTextAsFile", text, filename)
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export function exportDataFromStorage() {

    let newStore = {};

    // Object.()localStorage.map((storeKey, storeValue)=>{
    //     console.log("store======", storeKey, storeValue)
    // })

    for (var key in localStorage) {
        let typeofKey = localStorage[key];
        console.log("store", key, typeofKey);
        if (key.startsWith("INVANA_")) {
            newStore[key] = localStorage[key];
        }
    }
    return JSON.stringify(newStore);
}

export function importDataToStorage(text) {
    const data = JSON.parse(text);
    for (let key in data) {
        if (key.startsWith("INVANA_")) {
            localStorage[key] = data[key];
        }
    }
}
