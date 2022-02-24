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
import React from "react";
import {Nav, Panel, Navbar, Loader, Badge, Tree, Whisper, Popover} from "rsuite";
import ReloadIcon from '@rsuite/icons/Reload';
import {useQuery} from "@apollo/client";
import {GET_SCHEMA_QUERY} from "../../queries/modeller";
import NetworkErrorUI from "../networkError";
import OneColumnIcon from '@rsuite/icons/OneColumn';
import ArowBackIcon from '@rsuite/icons/ArowBack';
import ColumnsIcon from '@rsuite/icons/Columns';
import GridIcon from '@rsuite/icons/Grid';
import PcIcon from '@rsuite/icons/Pc';
// import PropTypes from "prop-types";
// import {ItemDataType} from "rsuite/esm/@types/common";

const styles = {width: "280px", "backgroundColor": "white", "padding": 0}

// export type GraphQLResponse = {
//     loading: boolean;
//     error: Array<any>;
//     data: Array<any>;
// }

const createIndexId = (name: string) => "indexes---" + name;
const createPropertiesId = (name: string) => "properties---" + name;
const createNodePropertyId = (labelName: string, propertyName: string) => "property---" + labelName + "---" + propertyName;
const createDisplaySettingsId = (labelName: string) => "display-settings---" + labelName;

function convert2Tree(data: Array<any>) {
    let __data: Array<any> = [];
    data.map((item: any, index: any) => (
        __data.push({
            label: item.name,
            value: item.name + index.toString(),
            children: [
                {
                    label: "properties",
                    value: createPropertiesId(item.name),
                    children: item.properties.map((property: any) => {
                        return {
                            label: property.name + ":" + property.type,
                            value: createNodePropertyId(item.name, property.name)
                        };
                    })
                },
                {
                    label: "indexes",
                    value: createIndexId(item.name),
                    children: []
                },
                {
                    label: "display settings",
                    value: createDisplaySettingsId(item.name),
                    children: []
                }
            ]
        })
    ))
    return __data;
}

interface PropertySpeakerProps {
    title: any
}

// eslint-disable-next-line react/display-name
const PropertySpeaker = React.forwardRef<HTMLInputElement, PropertySpeakerProps>(
    (props, ref) => {
        console.log(props)
        return (
            <Popover ref={ref}   {...props}>
                <p>This is a default Popover </p>
                <p>Content</p>
                <p>
                    <a>link</a>
                </p>

            </Popover>
        )
    })

const renderTreeNode = (nodeData: any, labelType: "node" | "relation") => {
    console.log("labelType", labelType)
    const labelIcon = (labelType == "node") ? <OneColumnIcon/> : <ArowBackIcon/>
    if (nodeData.label === "properties") {
        return (<span><ColumnsIcon/> {nodeData.label}</span>)
    } else if (nodeData.label === "indexes") {
        return (<span><GridIcon/> {nodeData.label}</span>)
    } else if (nodeData.label === "display settings") {
        return (<span><PcIcon/> {nodeData.label}</span>)
    } else { // @ts-ignore
        if (nodeData.value.startsWith("property---")) {
            return (<Whisper
                placement="right"
                speaker={<PropertySpeaker
                    title={nodeData.label}
                />}
                trigger="hover">
                <span> {nodeData.label}</span>
            </Whisper>)
        } else {
            return (<span> {labelIcon} {nodeData.label} </span>);
        }
    }

}

const GraphOverview = () => {
    const [activeTab, setActiveTab] = React.useState("node-label");
    const {loading, error, data, refetch} = useQuery(GET_SCHEMA_QUERY)
    if (error) return <NetworkErrorUI error={error}/>;
    if (loading) return <Loader backdrop content="Fetching data ..." vertical/>

    return (
        <Panel header={<div> Graph Schema Model </div>} bordered style={styles}>
            <Navbar style={{backgroundColor: "transparent"}}>
                <Nav activeKey={activeTab}>
                    <Nav.Item eventKey="node-label" onClick={() => setActiveTab("node-label")}>
                        Nodes <Badge content={data.getAllVertexModels.length} color={"cyan"}
                                     style={{marginLeft: '2px'}}/>
                    </Nav.Item>
                    <Nav.Item eventKey="relationship-label" onClick={() => setActiveTab("relationship-label")}>
                        Relations <Badge content={data.getAllEdgesModels.length} color={"cyan"}
                                         style={{marginLeft: '2px'}}/>
                    </Nav.Item>
                </Nav>
                <Nav pullRight>
                    <Nav.Item eventKey="refresh" onClick={() => refetch()} icon={<ReloadIcon/>}/>
                </Nav>
            </Navbar>
            {activeTab === "node-label" ? (
                <Tree data={convert2Tree(data.getAllVertexModels)}
                      showIndentLine={true}
                      height={document.documentElement.clientHeight - 190}
                      renderTreeNode={(nodeData) => renderTreeNode(nodeData, "node")}
                />
            ) : <span/>}
            {activeTab === "relationship-label" ? (
                <Tree data={convert2Tree(data.getAllEdgesModels)}
                      height={document.documentElement.clientHeight - 190}
                      showIndentLine={true}
                      renderTreeNode={(nodeData) => renderTreeNode(nodeData, "relation")}

                />
            ) : <span/>}


        </Panel>
    )
}

export default GraphOverview;