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

import {ItemDataType} from "rsuite/esm/@types/common";
// const createIndexId = (name: string) => "indexes---" + name;
const createPropertiesId = (name: string) => "properties---" + name;
const createNodePropertyId = (labelName: string, propertyName: string) => "property---" + labelName + "---" + propertyName;
// const createDisplaySettingsId = (labelName: string) => "display-settings---" + labelName;

const createPropertiesNotFoundId = (labelName: string) => "property-not-found---" + labelName;

export const convertDict2KeyValues = (propertyDataType: any) => Object.keys(propertyDataType).map((propertyKey: any) => {
    return {
        key: propertyKey,
        value: propertyDataType[propertyKey]
    }
})

function convert2Tree(data: Array<any>, labelType: "node" | "relation") {
    console.log("convert2Tree", data)
    // let __data = [];
    const __data: Array<any> = data.map((item: any, index: any) => {
        let itemData: ItemDataType = {
            label: item.name,
            value: item.name + index.toString(),
            children: [
                {
                    label: "properties",
                    value: createPropertiesId(item.name),
                    children: (
                        item.properties.length ?
                            item.properties.map((property: any) => {
                                return {
                                    label: property.name + ":" + property.type,
                                    value: createNodePropertyId(item.name, property.name)
                                };
                            }) : [
                                {
                                    label: "No properties found",
                                    value: createPropertiesNotFoundId(item.name)
                                }
                            ]
                    )
                },
                // {
                //     label: "indexes",
                //     value: createIndexId(item.name),
                //     children: []
                // },
                // // {
                // //     label: "display settings",
                //     value: createDisplaySettingsId(item.name),
                //     children: []
                // }
            ]
        }
        if (labelType === "node") {
            // @ts-ignore
            itemData.children.push({
                label: "partitioned : " + item.partitioned,
                value: "other-option---partitioned---" + item.name,
                // children: []
            })
            // @ts-ignore
            itemData.children.push({
                label: "static : " + item.static,
                value: "other-option---static---" + item.name,
                // children: []
            })
        } else if (labelType === "relation") {
            // @ts-ignore
            itemData.children.push({
                label: "directed : " + item.directed,
                value: "other-option---directed---" + item.directed,
                // children: []
            })
            // @ts-ignore
            itemData.children.push({
                label: "unidirected : " + item.unidirected,
                value: "other-option---unidirected---" + item.unidirected,
                // children: []
            })
        }
        return itemData;
    })
    return __data;
}

export default convert2Tree;
