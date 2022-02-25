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

// eslint-disable-next-line react/display-name
import React from "react";
import {Popover, Table} from "rsuite";
import PropertySpeakerProps from "./types";
import {convertDict2KeyValues} from "./utils";

// eslint-disable-next-line react/display-name
const PropertySpeaker = React.forwardRef<HTMLInputElement, PropertySpeakerProps>(
    (props, ref) => {
        // eslint-disable-next-line react/prop-types
        let propertyDataType = props.propertyDataType;
        return (
            <Popover ref={ref}  {...props}>
                <Table
                    headerHeight={0}
                    rowHeight={30}
                    width={320}
                    height={150}
                    data={convertDict2KeyValues(propertyDataType)}
                >
                    <Table.Column width={100}>
                        <Table.HeaderCell>key</Table.HeaderCell>
                        <Table.Cell dataKey="key" style={{padding: 5}}/>
                    </Table.Column>
                    <Table.Column width={220}>
                        <Table.HeaderCell>value</Table.HeaderCell>
                        <Table.Cell dataKey="value" style={{padding: 5}}/>
                    </Table.Column>
                </Table>
            </Popover>
        )
    })



export default PropertySpeaker