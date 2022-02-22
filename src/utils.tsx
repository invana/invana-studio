/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export function getDataFromLocalStorage(itemKey: string, isJson: boolean) {

    if (isJson) {
        const d = localStorage.getItem(itemKey)
        if (d) {
            return JSON.parse(d);
        }
    } else {
        return localStorage.getItem(itemKey) || [];
    }
}

export function setDataToLocalStorage(itemKey: string, itemData: any) {
    // console.log("settings example-data", itemKey, itemData)
    if (typeof itemData === 'object') {
        itemData = JSON.stringify(itemData);
    }
    localStorage.setItem(itemKey, itemData);
}

