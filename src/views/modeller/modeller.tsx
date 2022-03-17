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
import {Container, Header, Content, Nav, Loader, Navbar} from 'rsuite';
import StudioHeader from "../../layouts/header/header";
import {useQuery} from '@apollo/client';
import {GET_SCHEMA_QUERY} from "../../queries/modeller";
import CanvasArtBoard from "../../graph/canvas-artboard";
import defaultOptions from "../../graph/networkOptions";
import NetworkErrorUI from "../../components/networkError";
import {GraphCanvasCtrl} from "../../graph/canvas-ctrl";
import GenerateEvents from "../../graph/events";
// import SearchIcon from '@rsuite/icons/Search';
// import PcIcon from '@rsuite/icons/Pc';
import convertSchemaDataToVisJsData from "./utils";
import {noImplementedAlert} from "../../utils";

const GraphModellerView = () => {
    // const [expand, setExpand] = React.useState(false);
    const canvasCtrl: GraphCanvasCtrl = new GraphCanvasCtrl();
    const [renderCanvas, setRenderCanvas] = React.useState<boolean>(false);
    const events = GenerateEvents()

    const {loading, error, data} = useQuery(GET_SCHEMA_QUERY);
    if (error) return <NetworkErrorUI error={error}/>;
    if (!loading) {
        const graphDataConverted = convertSchemaDataToVisJsData(data);
        canvasCtrl.addNewData(graphDataConverted.nodes, graphDataConverted.edges);
    }

    // function getRndInteger(min: any, max: any) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    // function addNewData() {
    //     const rand = getRndInteger(1, 1000);
    //     canvasCtrl.addNewData([{id: "yolo-" + rand, label: "yolo-" + rand}], []);
    // }

    return (
        <div className="show-fake-browser sidebar-page">
            <Container>
                <StudioHeader/>
            </Container>
            <Container>
                {/*<StudioLeftNavSidebar expand={expand} setExpand={setExpand}/>*/}
                <Container>
                    <Header>
                        <Navbar className={"sub-menu"}>
                            <Nav activeKey={''}>
                                <Nav.Item eventKey="add-vertex-label"
                                          onClick={noImplementedAlert}>Refresh Model</Nav.Item>
                                {/*<Nav.Item eventKey="add-edge-label"*/}
                                {/*          onClick={noImplementedAlert}>Add Edge</Nav.Item>*/}
                                {/*<Nav.Item eventKey="home" onClick={() => addNewData()}>Add data</Nav.Item>*/}
                                {/*<Nav.Item eventKey="news">News</Nav.Item>*/}
                                {/*<Nav.Item eventKey="solutions">Solutions</Nav.Item>*/}
                                {/*<Nav.Item eventKey="products">Products</Nav.Item>*/}
                                {/*<Nav.Item eventKey="about">About</Nav.Item>*/}
                            </Nav>


                        </Navbar>
                    </Header>
                    <Content>
                        {loading ? (
                            <Loader backdrop content="Fetching schema model ..." vertical/>
                        ) : (<span></span>)}
                        <CanvasArtBoard
                            containerId={"artboard-1"}
                            renderCanvas={renderCanvas}
                            setRenderCanvas={setRenderCanvas}
                            options={defaultOptions}
                            events={events}
                            canvasCtrl={canvasCtrl}
                        />
                    </Content>
                </Container>
            </Container>
        </div>
    );
};

export default GraphModellerView;