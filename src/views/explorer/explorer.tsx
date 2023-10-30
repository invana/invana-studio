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
import ExplorerCanvasMenu from "./canvasMenu";
import TabNav from '@rsuite/responsive-nav';
import MoreIcon from '@rsuite/icons/More';
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CanvasTabs from "./canvasTabs";




const ExplorerView = () => {



    return (
        <DefaultLayout header={<DefaultHeader canvasMenu={<ExplorerCanvasMenu />} />}>
         
                <CanvasTabs />
        
        </DefaultLayout>

    );
};

export default ExplorerView;