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
    return JSON.stringify(localStorage)
}

export function importDataToStorage(text) {
    const data = JSON.parse(text);
    for (let key in data) {
        localStorage[key] = data[key];
    }
}
