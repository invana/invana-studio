import React from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {faDesktop} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";
import {STUDIO_CONNECT_CONSTANTS} from "../../../settings/constants";
import {setDataToLocalStorage} from "../../../utils/localStorage";
import defaultOptions from "../../../settings/networkOptions";


export default class CanvasDisplaySettings extends React.Component {

    static propTypes = {
        onClose: PropTypes.func,
        style: PropTypes.object
    }

    constructor(props) {
        super(props);
        console.log("defaultOptions", JSON.stringify(defaultOptions))
        console.log("defaultOptions", defaultOptions)
        this.state = {studioSettings: defaultOptions};
    }


    updateEdgeOptionsInStorage(studioSettings) {
        console.log("updateEdgeOptionsInStorage", studioSettings);

        this.setState({studioSettings: studioSettings});

    }

    updateSettings() {

        setDataToLocalStorage(STUDIO_CONNECT_CONSTANTS.RENDERING_EDGES_SETTINGS, {
                physics: this.state.studioSettings.edges.physics,
                smooth: this.state.studioSettings.edges.smooth,
                length: this.state.studioSettings.edges.length
            }
        );
        // eslint-disable-next-line react/prop-types
        this.props.startRenderingGraph(defaultOptions);

    }

    handleValueChange(e) {
        console.log("handleValueChange=====", e.target.name, e.target.value, parseInt(e.target.value) === 100);
        let studioSettings = this.state.studioSettings;
        if (e.target.name === "smooth") {
            console.log("====e.target.value === \"on\"", e.target.checked === "on")
            console.log("====e.target.value === e.target.value", e.target.checked, typeof e.target.checked)
            studioSettings.edges.smooth.enabled = e.target.checked;
            this.updateEdgeOptionsInStorage(studioSettings)
        } else if (e.target.name === "type") {
            studioSettings.edges.smooth.type = e.target.value;
            this.updateEdgeOptionsInStorage(studioSettings)
        } else if (e.target.name === "forceDirection") {
            studioSettings.edges.smooth.forceDirection = e.target.value;
            this.updateEdgeOptionsInStorage(studioSettings)
        } else if (e.target.name === "roundness") {
            studioSettings.edges.smooth.roundness = parseFloat(e.target.value);
            this.updateEdgeOptionsInStorage(studioSettings)
        } else if (e.target.name === "length") {

            studioSettings.edges.length = (parseInt(e.target.value) === 100) ? "undefined" : parseInt(e.target.value);
            this.updateEdgeOptionsInStorage(studioSettings)
        }
    }
 
    render() {
        console.log("this.state.studioSettings", this.state.studioSettings);
        return (
            <div className={" position-absolute  d-flex"} style={this.props.style}>
                <div className={" flex-fill ml-3 border border-top-0 bg-white"}>

                    <Card className={"border-0 rounded-0"}>
                        <Card.Header className={"bg-secondary text-white pt-2 pb-2t rounded-0"}>
                            <FontAwesomeIcon icon={faDesktop}/> Display Settings
                        </Card.Header>
                        <Card.Body>

                            <Form
                                // onSubmit={this.onFormSubmit.bind(this)}
                            >
                                {/*<Form.Control name="labelName" value={this.props.vertexLabel} type={"hidden"}/>*/}
                                {/*<Row>*/}
                                {/*    <Col md={5} className={"p-0"}>*/}
                                <h6>edges options</h6>

                                <Form.Group className={"mb-1"}>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        name={"smooth"}
                                        label="smooth"
                                        onChange={this.handleValueChange.bind(this)}
                                        defaultChecked={this.state.studioSettings.edges.smooth.enabled}
                                    />
                                </Form.Group>

                                {

                                    this.state.studioSettings.edges.smooth && this.state.studioSettings.edges.smooth.enabled
                                        ? <div>
                                            <Row>
                                                <Col size={"6"}>
                                                    <Form.Group controlId="type" className={"mb-1 pr-2"}>
                                                        <Form.Label>type</Form.Label>
                                                        <Form.Control
                                                            name={"type"} size={"sm"} as={"select"}
                                                            onChange={this.handleValueChange.bind(this)}
                                                            defaultValue={this.state.studioSettings.edges.smooth.type}
                                                        >
                                                            <option value="dynamic">dynamic</option>
                                                            <option value="continuous">continuous</option>
                                                            <option value="discrete">discrete</option>
                                                            <option value="diagonalCross">diagonalCross</option>
                                                            <option value="straightCross">straightCross</option>
                                                            <option value="horizontal">horizontal</option>
                                                            <option value="vertical">vertical</option>
                                                            <option value="curvedCW">curvedCW</option>
                                                            <option value="curvedCCW">curvedCCW</option>
                                                            <option value="cubicBezier">cubicBezier</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col size={"6"}>
                                                    <Form.Group controlId="forceDirection" className={"mb-1"}>
                                                        <Form.Label>forceDirection</Form.Label>
                                                        <Form.Control
                                                            name={"forceDirection"} size={"sm"} as={"select"}
                                                            defaultValue={this.state.studioSettings.edges.smooth.forceDirection}
                                                            onChange={this.handleValueChange.bind(this)}
                                                            // defaultValue={this.getValueFromDataOrGetDefault("elementShape")}
                                                        >
                                                            <option value="horizontal">horizontal</option>
                                                            <option value="vertical">vertical</option>
                                                            <option value="none">none</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                            <Form.Group controlId="roundness" className={"mb-1"}>
                                                <Form.Label>roundness <small>({this.state.studioSettings.edges.smooth.roundness})</small></Form.Label>
                                                <Form.Control type="range" name={"roundness"}
                                                              onChange={this.handleValueChange.bind(this)}
                                                              min={0} max={1} step={0.05}
                                                              defaultValue={this.state.studioSettings.edges.smooth.roundness}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="length">
                                                <Form.Label>length <small>({this.state.studioSettings.edges.length})</small></Form.Label>
                                                <Form.Control type="range" name={"length"}
                                                              onChange={this.handleValueChange.bind(this)}
                                                              min={100} max={1000} step={1}
                                                              defaultValue={this.state.studioSettings.edges.length}
                                                />
                                            </Form.Group>
                                            {/*<Form.Group>*/}
                                            {/*    <Form.Label>roundness</Form.Label>*/}


                                            {/*    <Form.Control type="number" placeholder="0.5"/>*/}
                                            {/*    <Form.Text className="text-muted">*/}
                                            {/*        We&apos;ll never share your email with anyone else.*/}
                                            {/*    </Form.Text>*/}
                                            {/*    /!*<input type="roundnessnum" step="1"/>*!/*/}
                                            {/*</Form.Group>*/}

                                            {/*    </Col>*/}
                                            {/*</Row>*/}
                                        </div>
                                        : <React.Fragment/>
                                }
                                <div className={"mt-3"}>
                                    <Button variant="outline-success" size={"sm"}
                                            onClick={this.updateSettings.bind(this)}>Update</Button>
                                    <Button className={"ml-2"} variant="outline-secondary" size={"sm"}
                                            onClick={() => this.props.onClose()}>close</Button>

                                </div>

                            </Form>

                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}
