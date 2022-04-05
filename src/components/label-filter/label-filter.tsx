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
import {Form, SelectPicker, Button, Col, Row} from 'rsuite';
import "./label-filter.scss";
import {ORDER_TYPES, SEARCH_FILTER_NAMES} from "./constants";
// import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import {selectedLabelTypeWithLabelData} from "./types";


const LabelFilterComponent = (props: selectedLabelTypeWithLabelData) => {
    console.log("LabelFilterComponent", props.getLabelData().properties)
    const properties: Array<any> = props.getLabelData().properties;
    console.log("====properties", properties);
    const propertiesPickerData = properties.map((propertyData) => {
        return {
            label: propertyData.name,
            value: propertyData.name
        }
    })
    const filterNames = SEARCH_FILTER_NAMES.map((filterName) => {
        return {
            label: filterName,
            value: filterName
        }
    })
    return (
        <div className={"label-filter"}>
            {properties.length > 0 ?
                (
                    <div>
                        <h6>Filters</h6>
                        <Form layout={"inline"}>
                            <Form.Group className={"rs-form-group-inline1"} controlId="username-8">
                                {/*<Form.ControlLabel>Property Type</Form.ControlLabel>*/}
                                <SelectPicker data={propertiesPickerData} appearance="default"
                                              style={{width: "210px"}}
                                              placeholder="select property"/>

                            </Form.Group>
                            <Form.Group className={"rs-form-group-inline1"} controlId="password-8">
                                {/*<Form.ControlLabel>Condition</Form.ControlLabel>*/}
                                <SelectPicker data={filterNames} appearance="default"
                                              style={{width: "210px"}}
                                              placeholder="select search filter"/>
                            </Form.Group>
                            <Form.Group className={"rs-form-group-inline1"} controlId="password-8">
                                {/*<Form.ControlLabel>Value</Form.ControlLabel>*/}
                                <Form.Control placeholder="ex: search text here" name="value"
                                              style={{width: "260px"}}
                                              autoComplete="off"/>
                            </Form.Group>
                            <Form.Group className={"rs-form-group-inline1 rs-form-group-no-right-margin"}
                                        controlId="password-8">
                                {/*<Form.ControlLabel>&nbsp;</Form.ControlLabel>*/}
                                <Button><MinusIcon/></Button>
                            </Form.Group>
                        </Form>
                    </div>
                ) : (<div style={{marginBottom: "30px"}}>No properties found for this label.</div>)
            }
            <Row>
                <Col md={properties.length > 0 ? 12 : 24}>
                    <h6>Pagination</h6>
                    <Form>
                        <Form.Group className={"rs-form-group-inline1"} controlId="username-8">
                            <Form.ControlLabel>Page size</Form.ControlLabel>
                            <Form.Control name="page_size" type={"number"}
                                // value={20}
                                          style={{width: "180px"}}/>
                        </Form.Group>
                        <Form.Group className={"rs-form-group-inline1"} controlId="password-8">
                            <Form.ControlLabel>Page Number</Form.ControlLabel>
                            <Form.Control name="page_number" type={"number"}
                                          value={1} style={{width: "120px"}}/>
                        </Form.Group>
                    </Form>
                </Col>
                {properties.length > 0 ?
                    (
                        <Col md={12}>
                            <h6>Order By</h6>
                            <Form>
                                <Form.Group className={"rs-form-group-inline1"} controlId="username-8">
                                    <Form.ControlLabel>Property Name</Form.ControlLabel>
                                    <SelectPicker data={propertiesPickerData} appearance="default"
                                                  style={{width: "210px"}}
                                                  placeholder="select property"/>

                                </Form.Group>
                                <Form.Group className={"rs-form-group-inline1"} controlId="password-8">
                                    <Form.ControlLabel>order</Form.ControlLabel>
                                    <SelectPicker data={ORDER_TYPES.map((order) => {
                                        return {
                                            "label": order,
                                            "value": order,
                                            // "role": "Master"
                                        }
                                    })} appearance="default"
                                                  style={{width: "150px"}}
                                                  placeholder="select order"/>
                                </Form.Group>
                            </Form>
                        </Col>
                    ) : (<div></div>)
                }
            </Row>


        </div>
    )
}
export default LabelFilterComponent;