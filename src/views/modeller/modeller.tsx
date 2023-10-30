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
import { Button, Content } from 'rsuite';
import { STUDIO_CONNECT_CONSTANTS, STUDIO_ROUTES } from "../../settings";
import { setDataToLocalStorage } from "../../utils";
import DefaultLayout from '../../components/core-ui/layout/layout';
import DefaultHeader from "../../components/core-ui/header/header";
import TabNav from '@rsuite/responsive-nav';
import MoreIcon from '@rsuite/icons/More';
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CanvasArtBoard from "../../components/canvas/canvas-artboard";
import { GraphCanvasCtrl } from "../../components/canvas/canvas-ctrl";
import GenerateEvents from "../../components/canvas/events";
import NetworkErrorUI from "../../components/networkError";
import { GET_GOD_QUERY, GET_SCHEMA_QUERY } from "../../queries/modeller";
import { useQuery } from "@apollo/client";
import convertSchemaDataToVisJsData, { convertToVisJsData } from "../../components/canvas/utils";
import defaultOptions from "../../components/canvas/networkOptions";
import ExplorerCanvasMenu from "../explorer/canvasMenu";


const ModellerView = () => {

    const canvasCtrl: GraphCanvasCtrl = new GraphCanvasCtrl();
    const [renderCanvas, setRenderCanvas] = React.useState<boolean>(false);
    const [selectedData, setSelectedData] = React.useState(null)


    const [leftSidebar, setLeftSidebar] = React.useState("")
    const [rightSidebar, setRightSidebar] = React.useState("")


    const events = GenerateEvents(canvasCtrl, setSelectedData, setRightSidebar)
    const {loading, error, data} = useQuery(GET_SCHEMA_QUERY);
    if (error) return <NetworkErrorUI error={error}/>;
    if (!loading) {
        if (data) {
            const graphDataConverted = convertSchemaDataToVisJsData(data);
            canvasCtrl.addNewData(graphDataConverted.nodes, graphDataConverted.edges);
        }
    }else{

    }
    return (
        <DefaultLayout header={<DefaultHeader canvasMenu={<ExplorerCanvasMenu />} />}>         
                <CanvasArtBoard 
                          containerId={"artboard-1"}
                          renderCanvas={renderCanvas}
                          setRenderCanvas={setRenderCanvas}
                          options={defaultOptions}
                          events={events}
                          canvasCtrl={canvasCtrl}
                
                />
        </DefaultLayout>

    );
};

export default ModellerView