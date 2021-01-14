export function getDataFromLocalStorage(itemKey, isJson) {

    if (isJson) {
        return JSON.parse(localStorage.getItem(itemKey));
    } else {
        return localStorage.getItem(itemKey)
    }

}

export function setDataToLocalStorage(itemKey, itemData) {
    // console.log("settings example-data", itemKey, itemData)
    if (typeof itemData === 'object') {
        itemData = JSON.stringify(itemData);
    }
    localStorage.setItem(itemKey, itemData);
}

export function removeItemFromLocalStorage(itemKey) {
    localStorage.removeItem(itemKey);
}
