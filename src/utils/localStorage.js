import {RENDERING_CONFIG} from "../settings";
import {HISTORY_SETTINGS} from "../settings/history";
import {LAMBDA_SETTINGS} from "../settings/lambda";


// //
// class LocalStorageReader{
//
//
//     getValueByKey(key, isJson){
//         // get the value in localstorage by key
//
//     }
//
// }


export function getDataFromLocalStorage(itemKey, isJson) {

    if (isJson) {
        if (localStorage.getItem(itemKey)) {
            return JSON.parse(localStorage.getItem(itemKey));
        }
        // else {
        //     return [];
        // }
    } else {
        return localStorage.getItem(itemKey) || [];
    }
}

export function setDataToLocalStorage(itemKey, itemData) {
    // console.log("settings example-data", itemKey, itemData)
    if (typeof itemData === 'object') {
        itemData = JSON.stringify(itemData);
    }
    localStorage.setItem(itemKey, itemData);
}


export function addQueryToHistory(query, source) {
    let existingHistory = getDataFromLocalStorage(HISTORY_SETTINGS.HISTORY_LOCAL_STORAGE_KEY, true) || [];
    existingHistory.unshift({
        "query": query,
        "source": source,
        "id": new Date().getTime(),
        "dt": new Date()
    })
    // existingHistory = existingHistory.slice(0, HISTORY_SETTINGS.MAX_HISTORY_COUNT_TO_REMEMBER);
    setDataToLocalStorage(HISTORY_SETTINGS.HISTORY_LOCAL_STORAGE_KEY, existingHistory);
}


export function addQueryToLambda(query, name) {
    let existingLambda = getDataFromLocalStorage(LAMBDA_SETTINGS.LAMBDA_LOCAL_STORAGE_KEY, true) || [];
    if (!name) {
        name = "lambda-" + (existingLambda.length + 1);
    }
    existingLambda.unshift({
        query: query,
        name: name,
        id: new Date().getTime(),
        "dt": new Date()
    })
    setDataToLocalStorage(LAMBDA_SETTINGS.LAMBDA_LOCAL_STORAGE_KEY, existingLambda);
}


export function getLambdaFromStorageById(lambdaId) {
    let existingLambda = getDataFromLocalStorage(LAMBDA_SETTINGS.LAMBDA_LOCAL_STORAGE_KEY, true) || [];
    let lambdaData = null;
    existingLambda.map((lambda) => {
        console.log("lambda.id === lambdaId", lambda.id, lambdaId, lambda.id === lambdaId)
        if (lambda.id === lambdaId) {
            lambdaData = lambda;
        }
    })
    return lambdaData;
}

export function updateLambdaFromStorageById(lambdaId, updateDict) {
    console.log("====lambdaData.id", lambdaId)

    let lambdaData = getLambdaFromStorageById(lambdaId);
    console.log("====lambdaData", lambdaData)

    if (lambdaData) {
        if (updateDict && lambdaData) {
            lambdaData.name = updateDict.name;
        }
        let existingLambda = getDataFromLocalStorage(LAMBDA_SETTINGS.LAMBDA_LOCAL_STORAGE_KEY, true) || [];
        let newLambdaData = []
        existingLambda.map((lambda) => {
            if (lambda.id === lambdaId) {
                newLambdaData.push(lambdaData)
            } else {
                newLambdaData.push(lambda)
            }
        })
        setDataToLocalStorage(LAMBDA_SETTINGS.LAMBDA_LOCAL_STORAGE_KEY, newLambdaData);
    }
}


export function removeLambdaFromStorageById(lambdaId) {
    let existingLambda = getDataFromLocalStorage(LAMBDA_SETTINGS.LAMBDA_LOCAL_STORAGE_KEY, true) || [];
    let newLambdaData = []
    existingLambda.map((lambda) => {
        if (lambda.id !== lambdaId) {
            newLambdaData.push(lambda)
        }
    })
    setDataToLocalStorage(LAMBDA_SETTINGS.LAMBDA_LOCAL_STORAGE_KEY, newLambdaData);
}

export function removeHistoryFromStorageById(lambdaId) {
    let existingHistory = getDataFromLocalStorage(HISTORY_SETTINGS.HISTORY_LOCAL_STORAGE_KEY, true) || [];
    let newHistoryData = []
    existingHistory.map((historyData) => {
        if (historyData.id !== lambdaId) {
            newHistoryData.push(historyData)
        }
    })
    setDataToLocalStorage(HISTORY_SETTINGS.HISTORY_LOCAL_STORAGE_KEY, newHistoryData);
}


export function setElementColorOptionsToStorageUsingResponse(response) {
    /*
    If sent response from gremlin, it will automatically update those new
    vertex/edge key data only.
     */
    console.log("setElementColorOptionsToStorageUsingResponse", response.response.data.getVerticesByLabel);
    let nodeLabelsConfig = {};
    response.response.data.getVerticesByLabel.forEach((vertexConfig) => {
        nodeLabelsConfig[vertexConfig.properties.name] = vertexConfig.properties;
    });
    setDataToLocalStorage(RENDERING_CONFIG.LOCAL_STORAGE_KEY, nodeLabelsConfig);
}

export function removeItemFromLocalStorage(itemKey) {
    localStorage.removeItem(itemKey);
}

export function setElementColorOptionsToStorage(vertexOption) {
    /*
    If sent response from gremlin, it will automatically update those new
    vertex/edge key data only.
     */
    console.log("setElementColorOptionsToStorage", vertexOption)

    // if (vertexOption.type === "g:Vertex") {
    let _nodes = getDataFromLocalStorage(RENDERING_CONFIG.LOCAL_STORAGE_KEY, true) || {};
    _nodes[vertexOption.properties.name] = vertexOption.properties;
    setDataToLocalStorage(RENDERING_CONFIG.LOCAL_STORAGE_KEY, _nodes);

    // } else {
    //     let _links = getDataFromLocalStorage("linkLabels", true) || {};
    //     _links[vertexOption.properties.name] = vertexOption.properties;
    //     setDataToLocalStorage('linkLabels', _links);
    //
    //
    // }

}
