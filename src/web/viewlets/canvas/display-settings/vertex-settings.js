import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import {STUDIO_CONNECT_CONSTANTS} from "../../../../settings/constants";
import {setDataToLocalStorage} from "../../../../utils/localStorage";
import defaultNetworkOptions, {supportedPhysicsSolvers} from "../../../../settings/networkOptions";
import {existingNetworkOptions} from "../canvas-utils";



export default class VertexDisplaySettings extends React.Component {

    static propTypes = {
        onClose: PropTypes.func,
        startRenderingGraph: PropTypes.func

    }

    constructor(props) {
        super(props);
        console.log("defaultNetworkOptions", JSON.stringify(existingNetworkOptions))
        console.log("defaultNetworkOptions", existingNetworkOptions)
        this.state = {studioSettings: existingNetworkOptions};
    }


    updateStateData(studioSettings) {
        console.log("updateStateData", studioSettings);

        this.setState({studioSettings: studioSettings});

    }

    updateSettings() {
        existingNetworkOptions.physics = this.state.studioSettings.physics;
        setDataToLocalStorage(STUDIO_CONNECT_CONSTANTS.DISPLAY_SETTINGS, existingNetworkOptions);
        // eslint-disable-next-line react/prop-types
        this.props.startRenderingGraph(existingNetworkOptions);
    }

    loadDefaultSettings() {
        existingNetworkOptions.physics = defaultNetworkOptions.physics;
        setDataToLocalStorage(STUDIO_CONNECT_CONSTANTS.DISPLAY_SETTINGS, existingNetworkOptions);
        // eslint-disable-next-line react/prop-types
        this.props.startRenderingGraph(existingNetworkOptions);
        this.updateStateData(existingNetworkOptions);
    }

    handleValueChange(e) {
        console.log("handleValueChange=====", e.target.name, e.target.value, parseInt(e.target.value) === 100);
        let studioSettings = this.state.studioSettings;
        if (e.target.name === "physicsEnabled") {
            console.log("====e.target.value === \"on\"", e.target.checked === "on")
            console.log("====e.target.value === e.target.value", e.target.checked, typeof e.target.checked)
            studioSettings.physics.enabled = e.target.checked;
            this.updateStateData(studioSettings)
        } else if (e.target.name === "gravitationalConstant") {
            studioSettings.physics[studioSettings.physics.solver].gravitationalConstant = parseFloat(e.target.value);
            this.updateStateData(studioSettings)
        } else if (e.target.name === "springLength") {
            studioSettings.physics[studioSettings.physics.solver].springLength = parseFloat(e.target.value);
            this.updateStateData(studioSettings)
        } else if (e.target.name === "springConstant") {
            studioSettings.physics[studioSettings.physics.solver].springConstant = parseFloat(e.target.value);
            this.updateStateData(studioSettings)
        } else if (e.target.name === "solverName") {
            studioSettings.physics.solver = e.target.value;
            this.updateStateData(studioSettings)
        }
    }

    render() {
        console.log("this.state.studioSettings", this.state.studioSettings);
        return (
            <Form>
                <div
                    style={{"overflowY": "scroll", "maxHeight": "calc(100vh - 215px)"}}>
                    <h6>Vertex display settings</h6>
                    <hr/>
                    <Form.Group className={""}>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            name={"physicsEnabled"}
                            label="Enable physics"
                            onChange={this.handleValueChange.bind(this)}
                            defaultChecked={this.state.studioSettings.physics.enabled}
                        />
                    </Form.Group>


                    {this.state.studioSettings.physics && this.state.studioSettings.physics.enabled
                        ? <div>
                            <Row className={"mr-0"}>
                                <Col md={"6"}>
                                    <Form.Group controlId="type"
                                                className={"pr-2"}>
                                        <Form.Label>Physics solvers</Form.Label>
                                        <Form.Control
                                            name={"solverName"} size={"sm"} as={"select"}
                                            onChange={this.handleValueChange.bind(this)}
                                            defaultValue={this.state.studioSettings.physics.solver}>
                                            {supportedPhysicsSolvers.map((solver, i) => (
                                                <option key={i} value={solver}>
                                                    {solver}
                                                </option>
                                            ))}

                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Form.Group controlId="gravitationalConstant" className={""}>
                                <Form.Label>gravitational
                                    constant <small>({this.state.studioSettings.physics[this.state.studioSettings.physics.solver].gravitationalConstant})</small>
                                </Form.Label>
                                <Form.Control type="range" name={"gravitationalConstant"}
                                              onChange={this.handleValueChange.bind(this)}
                                              min={-2000} max={1000} step={1}
                                              defaultValue={this.state.studioSettings.physics[this.state.studioSettings.physics.solver].gravitationalConstant}
                                />
                            </Form.Group>


                            <Form.Group controlId="springLength" className={""}>
                                <Form.Label>spring length
                                    <small> ({this.state.studioSettings.physics[this.state.studioSettings.physics.solver].springLength})</small>
                                </Form.Label>
                                <Form.Control type="range" name={"springLength"}
                                              onChange={this.handleValueChange.bind(this)}
                                              min={100} max={600} step={1}
                                              defaultValue={this.state.studioSettings.physics[this.state.studioSettings.physics.solver].springLength}
                                />
                            </Form.Group>


                            <Form.Group controlId="springConstant" className={""}>
                                <Form.Label>spring constant
                                    <small> ({this.state.studioSettings.physics[this.state.studioSettings.physics.solver].springConstant})</small>
                                </Form.Label>
                                <Form.Control type="range" name={"springConstant"}
                                              onChange={this.handleValueChange.bind(this)}
                                              min={0} max={1} step={0.01}
                                              defaultValue={this.state.studioSettings.physics[this.state.studioSettings.physics.solver].springConstant}
                                />
                            </Form.Group>


                        </div>
                        : <React.Fragment/>
                    }
                </div>
                <div className={"mt-3"}>
                    <Button variant="outline-success" size={"sm"}
                            className={"pt-0 pb-0 pl-2 pr-2"}
                            onClick={this.updateSettings.bind(this)}>Update</Button>

                    <Button variant="outline-secondary" size={"sm"}
                            className={"pt-0 pb-0 pl-2 pr-2 ml-2"}
                            onClick={() => this.props.onClose()}>close</Button>

                    <Button variant="outline-secondary" size={"sm"}
                            className={"pt-0 pb-0 pl-2 pr-2 ml-2 float-right"}
                            onClick={() => this.loadDefaultSettings()}>load defaults</Button>

                </div>
            </Form>
        )
    }
}
