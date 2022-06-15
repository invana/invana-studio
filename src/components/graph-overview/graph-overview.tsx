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
import {
    Nav, Panel, Navbar, Loader, Badge, Tree, Whisper, Modal, Button
} from "rsuite";
import ReloadIcon from '@rsuite/icons/Reload';
import {useQuery} from "@apollo/client";
import {GET_SCHEMA_QUERY} from "../../queries/modeller";
import NetworkErrorUI from "../networkError";
import OneColumnIcon from '@rsuite/icons/OneColumn';
import ColumnsIcon from '@rsuite/icons/Columns';
import GridIcon from '@rsuite/icons/Grid';
import PcIcon from '@rsuite/icons/Pc';
import MinusIcon from '@rsuite/icons/Minus';
import "./graph-overview.scss";
import convert2Tree from "./utils";
import PropertySpeaker from "./popovers"
import LabelFilterComponent from "../label-filter/label-filter";
import {selectedLabelType} from "../label-filter/types";

const styles = {width: "280px", "backgroundColor": "white", "padding": 0}


const renderTreeNode = (nodeData: any,
                        labelType: "node" | "relation",
                        getPropertyData: any,
                        handleOpenFunc: any) => {
    // console.log("renderTreeNode", nodeData, labelType)
    const labelIcon = (labelType == "node") ? <OneColumnIcon/> : <MinusIcon/>
    if (nodeData.label === "properties") {
        return (<span><ColumnsIcon/> {nodeData.label}</span>)
    } else if (nodeData.label === "indexes") {
        return (<span><GridIcon/> {nodeData.label}</span>)
    } else if (nodeData.label === "display settings") {
        return (<span><PcIcon/> {nodeData.label}</span>)
    } else { // @ts-ignore
        if (nodeData.value.startsWith("property---")) {
            const label: string = nodeData.label.split(":")[0]
            return (<Whisper
                placement="right"
                speaker={<PropertySpeaker
                    title={nodeData.label}
                    propertyDataType={getPropertyData(label)}
                />}
                trigger="click">
                < span> {nodeData.label}</span>
            </Whisper>)
        } else if (nodeData.value.startsWith("property-not-found---")) {
            return (<span style={{color: "#bbb"}}> {nodeData.label}</span>)
        } else if (nodeData.value.startsWith("other-option---")) {
            return (<span> {nodeData.label}</span>)
        } else {
            return (<span onClick={() => handleOpenFunc({
                label: nodeData.label,
                labelType: labelType
            })}>{labelIcon} {nodeData.label}</span>);
        }
    }
}


const GraphOverview = () => {
    const [selectedLabel, setSelectedLabel] = React.useState<selectedLabelType>();
    const [activeTab, setActiveTab] = React.useState("node-label");
    // for modal
    const [open, setOpen] = React.useState(false);


    const {loading, error, data, refetch} = useQuery(GET_SCHEMA_QUERY)
    if (error) return <NetworkErrorUI error={error}/>;
    if (loading) return <Loader backdrop content="Fetching data ..." vertical/>

    console.log("====data", data)


    const handleOpenFunc = (props: selectedLabelType) => {
        console.log("handleOpenFunc==", JSON.stringify(props), setSelectedLabel, setOpen);
        setSelectedLabel(props);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }


    function createPropertyDataTypesMap(d: any) {
        console.log("createProperty----", d);
        let propertyDataTypesMap: any = {}
        d.get_all_vertex_models.map((propertyType: any) => {
            propertyType.properties.map((property: any) => {
                propertyDataTypesMap[property.name] = property
            })
        })
        d.get_all_edges_models.map((propertyType: any) => {
            propertyType.properties.map((property: any) => {
                propertyDataTypesMap[property.name] = property
            })
        })
        return propertyDataTypesMap;
    }


    function createLabelMap(d: any) {
        let labelMap: any = {}
        d.map((labelData: any) => {
            labelMap[labelData.name] = labelData
        })
        return labelMap;
    }

    function getLabelData(label: string, labelType: "node" | "relation") {
        const labelMap = labelType === "node" ? nodeLabelMap : relationMap;
        console.log("getLabelData", label, labelType, nodeLabelMap, relationMap, labelMap)
        return labelMap[label]

    }


    const propertyDataTypesMap: any = createPropertyDataTypesMap(data);
    const nodeLabelMap = createLabelMap(data.get_all_vertex_models)
    const relationMap = createLabelMap(data.get_all_edges_models)

    function getPropertyData(propertyName: string) {
        return propertyDataTypesMap[propertyName];
    }

    function  submitSearch(){
        console.log("submitSearch")
    }

    return (
        <Panel className={"graph-overview"} header={<div> Graph Schema Model </div>} bordered style={styles}>
            <Navbar style={{backgroundColor: "transparent", borderBottom: "1px solid #ccc"}}>
                <Nav activeKey={activeTab}>
                    <Nav.Item eventKey="node-label" onClick={() => setActiveTab("node-label")}>
                        Nodes <Badge content={data.get_all_vertex_models.length} color={"cyan"}
                                     style={{marginLeft: '2px'}}/>
                    </Nav.Item>
                    <Nav.Item eventKey="relationship-label" onClick={() => setActiveTab("relationship-label")}>
                        Relations <Badge content={data.get_all_edges_models.length} color={"cyan"}
                                         style={{marginLeft: '2px'}}/>
                    </Nav.Item>
                </Nav>,
                <Nav pullRight>
                    <Nav.Item eventKey="refresh" onClick={() => refetch()} icon={<ReloadIcon/>}/>
                </Nav>
            </Navbar>
            {
                activeTab === "node-label" ? (
                    <Tree data={convert2Tree(data.get_all_vertex_models, "node")}
                          showIndentLine={true}
                          height={document.documentElement.clientHeight - 190}
                          renderTreeNode={(nodeData) => renderTreeNode(nodeData, "node", getPropertyData, handleOpenFunc)}
                    />
                ) : <span/>
            }
            {
                activeTab === "relationship-label" ? (
                    <Tree data={convert2Tree(data.get_all_edges_models, "relation")}
                          height={document.documentElement.clientHeight - 190}
                          showIndentLine={true}
                          renderTreeNode={(nodeData) => renderTreeNode(nodeData, "relation", getPropertyData, handleOpenFunc)}

                    />
                ) : <span/>
            }
            {
                selectedLabel ? (

                    <Modal size={"md"} keyboard={false} open={open} onClose={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Interactively
                                query <strong>{selectedLabel.label}</strong> label
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <LabelFilterComponent
                                getLabelData={() => getLabelData(selectedLabel.label, selectedLabel.labelType)}
                                label={selectedLabel.label}
                                labelType={selectedLabel.labelType}
                                submitSearch={submitSearch}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleClose} appearance="primary">
                                Fetch data
                            </Button>
                            <Button onClick={handleClose} appearance="subtle">
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                ) : (<span/>)

            }

        </Panel>
    )
}

export default GraphOverview;