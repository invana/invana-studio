import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import {STUDIO_CONNECT_CONSTANTS} from "../../../../settings/constants";
import {setDataToLocalStorage} from "../../../../utils/localStorage";
import {existingNetworkOptions, getAbsoluteData} from "../canvas-utils";
import defaultNetworkOptions from "../../../../settings/networkOptions";


export default class EdgeDisplaySettings extends React.Component {

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


    updateStateData(studioSettings, callback) {
        console.log("========updateStateData", JSON.stringify(studioSettings.edges));
        if (callback) {
            this.setState({studioSettings: studioSettings}, callback());
        } else {
            this.setState({studioSettings: studioSettings});
        }
    }

    updateSettings() {
        existingNetworkOptions.edges = this.state.studioSettings.edges;
        setDataToLocalStorage(STUDIO_CONNECT_CONSTANTS.DISPLAY_SETTINGS, existingNetworkOptions);
        // eslint-disable-next-line react/prop-types
        this.props.startRenderingGraph(existingNetworkOptions);
    }

    loadDefaultEdgeSettings() {
        existingNetworkOptions.edges = getAbsoluteData(defaultNetworkOptions.edges);
        this.updateStateData(existingNetworkOptions, this.updateSettings.bind(this));
    }

    handleValueChange(e) {
        console.log("handleValueChange=====", e.target.name, e.target.value, parseInt(e.target.value) === 100);
        let studioSettings = this.state.studioSettings;
        if (e.target.name === "smoothEnabled") {
            console.log("====e.target.value === \"on\"", e.target.checked === "on")
            console.log("====e.target.value === e.target.value", e.target.checked, typeof e.target.checked)
            studioSettings.edges.smooth.enabled = e.target.checked;
            this.updateStateData(studioSettings);
        } else if (e.target.name === "type") {
            studioSettings.edges.smooth.type = e.target.value;
            this.updateStateData(studioSettings);
        } else if (e.target.name === "forceDirection") {
            studioSettings.edges.smooth.forceDirection = e.target.value;
            this.updateStateData(studioSettings);
        } else if (e.target.name === "roundness") {
            studioSettings.edges.smooth.roundness = parseFloat(e.target.value);
            this.updateStateData(studioSettings);
        } else if (e.target.name === "length") {
            studioSettings.edges.length = (parseInt(e.target.value) === 100) ? "undefined" : parseInt(e.target.value);
            this.updateStateData(studioSettings);
        }
    }

    render() {
        console.log("this.state.studioSettings edges", this.state.studioSettings.edges);
        return (
            <Form>
                <div
                    style={{"overflowY": "scroll", "maxHeight": "calc(100vh - 215px)"}}>
                    <h6>Edges settings</h6>
                    <hr/>
                    <Form.Group className={""}>
                        <Form.Check
                            type="switch"
                            id="custom-switch-2"
                            name={"smoothEnabled"}
                            label="Enable smooth edges"
                            onChange={this.handleValueChange.bind(this)}
                            defaultChecked={this.state.studioSettings.edges.smooth.enabled}
                            checked={this.state.studioSettings.edges.smooth.enabled}
                        />
                    </Form.Group>
                    {
                        this.state.studioSettings.edges.smooth && this.state.studioSettings.edges.smooth.enabled
                            ? <div>
                                <Row className={"mr-0"}>
                                    <Col size={"6"}>
                                        <Form.Group controlId="type"
                                                    className={" pr-2"}>
                                            <Form.Label>type</Form.Label>
                                            <Form.Control
                                                name={"type"} size={"sm"} as={"select"}
                                                onChange={this.handleValueChange.bind(this)}
                                                defaultValue={this.state.studioSettings.edges.smooth.type}
                                                value={this.state.studioSettings.edges.smooth.type}
                                            >
                                                <option value="dynamic">dynamic</option>
                                                <option value="continuous">continuous
                                                </option>
                                                <option value="discrete">discrete</option>
                                                <option
                                                    value="diagonalCross">diagonalCross
                                                </option>
                                                <option
                                                    value="straightCross">straightCross
                                                </option>
                                                <option value="horizontal">horizontal
                                                </option>
                                                <option value="vertical">vertical</option>
                                                <option value="curvedCW">curvedCW</option>
                                                <option value="curvedCCW">curvedCCW</option>
                                                <option value="cubicBezier">cubicBezier
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col size={"6"}>
                                        <Form.Group controlId="forceDirection"
                                                    className={""}>
                                            <Form.Label>forceDirection</Form.Label>
                                            <Form.Control
                                                name={"forceDirection"} size={"sm"}
                                                as={"select"}
                                                defaultValue={this.state.studioSettings.edges.smooth.forceDirection}
                                                value={this.state.studioSettings.edges.smooth.forceDirection}
                                                onChange={this.handleValueChange.bind(this)}
                                                // defaultValue={this.getValueFromDataOrGetDefault("elementShape")}
                                            >
                                                <option value="horizontal">horizontal
                                                </option>
                                                <option value="vertical">vertical</option>
                                                <option value="none">none</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Form.Group controlId="roundness" className={""}>
                                    <Form.Label>roundness <small>({this.state.studioSettings.edges.smooth.roundness})</small></Form.Label>
                                    <Form.Control type="range" name={"roundness"}
                                                  onChange={this.handleValueChange.bind(this)}
                                                  min={0} max={1} step={0.05}
                                                  defaultValue={this.state.studioSettings.edges.smooth.roundness}
                                                  value={this.state.studioSettings.edges.smooth.roundness}
                                    />
                                </Form.Group>
                                <Form.Group controlId="length">
                                    <Form.Label>length <small>({this.state.studioSettings.edges.length})</small></Form.Label>
                                    <Form.Control type="range" name={"length"}
                                                  onChange={this.handleValueChange.bind(this)}
                                                  min={100} max={1000} step={1}
                                                  defaultValue={this.state.studioSettings.edges.length}
                                                  value={this.state.studioSettings.edges.length}
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
                            onClick={() => this.loadDefaultEdgeSettings()}>load defaults</Button>

                </div>
                <div className={"mt-3"}>
                    <p className={"small text-muted"}>
                        <strong>Note:</strong> Refer <a target={"_blank"} rel={"noreferrer"}
                                                        href="https://visjs.github.io/vis-network/docs/network/edges.html">
                        this link</a> for description of the settings.
                    </p>
                </div>
            </Form>
        )
    }
}
