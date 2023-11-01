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
import { Loader } from 'rsuite';
import DefaultLayout from '../../components/coreUi/layout/layout';
import DefaultHeader from "../../components/coreUi/header/header";
import ExplorerCanvasMenu from "./canvasMenu";
import FullCanvas from "../../components/canvas/fullCanvas/fullCanvas";
import { GraphCanvasCtrl } from "../../components/canvas/artboard/controller";
import GenerateEvents from "../../components/canvas/artboard/events";
import NetworkErrorUI from "../../components/networkError";
import { GENERIC_GREMLIN_QUERY } from "../../queries/modeller";
import { useQuery } from "@apollo/client";
import { convertToVisJsData } from "../../components/canvas/artboard/utils";
import defaultOptions from "../../components/canvas/artboard/networkOptions";
import { addCanvasData } from "../../state/canvas/canvasSlice";
import { useDispatch, useSelector } from "react-redux";


const ExplorerView = () => {


    const dispatch = useDispatch();


    

    const canvasCtrl: GraphCanvasCtrl = new GraphCanvasCtrl();
    const [renderCanvas, setRenderCanvas] = React.useState<boolean>(false);
    const [selectedData, setSelectedData] = React.useState(null)


    // const [leftSidebar, setLeftSidebar] = React.useState("")
    const [rightSidebar, setRightSidebar] = React.useState("")


    const events = GenerateEvents(canvasCtrl, setSelectedData, setRightSidebar)
    const { loading, error, data } = useQuery(GENERIC_GREMLIN_QUERY);

    console.log("=====error", error);
    if (error) return <NetworkErrorUI error={error} />;
    if (!loading) {
        if (data) {
            // const graphDataConverted = convertSchemaDataToVisJsData(data);
            // canvasCtrl.addNewData(graphDataConverted.nodes, graphDataConverted.edges);
                const graphDataConverted = convertToVisJsData(data.execute_query, [])
                // canvasCtrl.addNewData(graphDataConverted.nodes, graphDataConverted.edges);

                dispatch(addCanvasData(graphDataConverted))
        }
    }
    return (
        <DefaultLayout header={<DefaultHeader canvasMenu={<ExplorerCanvasMenu />} />}>
            {loading ? (
                <Loader backdrop content="Fetching data ..." vertical />
            ) : (<span></span>)}
            <FullCanvas
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

export default ExplorerView

