/*
 *
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
 *
 */


const convertModelDataToVisJsData = (responseData: any) => {
    console.log("responseData", responseData);
    let allEdgesModels: any = [];
    let allVertexModels: any = [];
    responseData.getAllVertexModels.map((model: any) => {
        allVertexModels.push({id: model.name, label: model.name,})
    })

    responseData.getAllEdgesModels.map((model: any) => {
        model.linkPaths.map((linkPath: any) => {
            allEdgesModels.push({
                id: model.name + "-" + linkPath.outvLabel + "-" + linkPath.invLabel,
                label: model.name, from: linkPath.outvLabel, to: linkPath.invLabel
            })
        })
    })
    return {nodes: allVertexModels, edges: allEdgesModels}

}
export default convertModelDataToVisJsData;