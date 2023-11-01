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
import ArtBoard from "../artboard/artBoard";
import {CanvasArtBoardProps} from "../artboard/types";


class SimpleCanvas extends React.Component<CanvasArtBoardProps, {}> {
    // Contains only artboard, on hover show properties
 
    render() {
        return (
            <div className={"canvasContainer w-100 h-100"}>
                <ArtBoard
                    containerId={this.props.containerId}
                    data={this.props.canvasCtrl.getData()}
                    options={this.props.options}
                    events={this.props.events}
                    getNetwork={(network) => this.props.canvasCtrl.setNetwork(network)}
                    style={{width: "100%", height: "calc(100vh - 60px )"}}
                />
            </div>
        )
    }
}

export default SimpleCanvas;