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
import {Panel} from "rsuite";

const styles = {width: "360px", "backgroundColor": "white", "padding": 0, height: '100%'}

const ElementDetail = (props: any) => {
    // const [activeTab, setActiveTab] = React.useState("node-label");
    console.log("data====", props.data)
    return (
        <Panel className={"element-detail"} header={<div> Node Details </div>} bordered style={styles}>
            {
                props.data ? (
                    <h3>id: {props.data.id}</h3>
                ) : <span/>
            }

        </Panel>
    )
}

export default ElementDetail;