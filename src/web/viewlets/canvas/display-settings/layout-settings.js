import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import {STUDIO_CONNECT_CONSTANTS} from "../../../../settings/constants";
import {setDataToLocalStorage} from "../../../../utils/localStorage";
import {existingNetworkOptions, getAbsoluteData} from "../canvas-utils";
import defaultNetworkOptions from "../../../../settings/networkOptions";


export default class LayoutSettings extends React.Component {

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
        console.log("========updateStateData.layout", JSON.stringify(studioSettings.layout));
        if (callback) {
            this.setState({studioSettings: studioSettings}, callback());
        } else {
            this.setState({studioSettings: studioSettings});
        }
    }

    updateSettings() {
        existingNetworkOptions.layout = this.state.studioSettings.layout;
        setDataToLocalStorage(STUDIO_CONNECT_CONSTANTS.DISPLAY_SETTINGS, existingNetworkOptions);
        // eslint-disable-next-line react/prop-types
        this.props.startRenderingGraph(existingNetworkOptions);
    }


    loadDefaultSettings() {
        existingNetworkOptions.layout = getAbsoluteData(defaultNetworkOptions.layout);
        this.updateStateData(existingNetworkOptions, this.updateSettings.bind(this));
    }

    handleValueChange(e) {
        console.log("handleValueChange=====", e.target.name, e.target.value, parseInt(e.target.value) === 100);
        let studioSettings = this.state.studioSettings;
        if (e.target.name === "enableHierarchical") {
            console.log("====e.target.value === \"on\"", e.target.checked === "on")
            console.log("====e.target.value === e.target.value", e.target.checked, typeof e.target.checked)
            studioSettings.layout.hierarchical.enabled = e.target.checked;
            this.updateStateData(studioSettings);
        } else if (e.target.name === "direction") {
            studioSettings.layout.hierarchical.direction = e.target.value;
            this.updateStateData(studioSettings);
        } else if (e.target.name === "nodeSpacing") {
            studioSettings.layout.hierarchical.nodeSpacing = parseInt(e.target.value);
            this.updateStateData(studioSettings);
        } else if (e.target.name === "randomSeed") {
            studioSettings.layout.randomSeed = parseInt(e.target.value);
            this.updateStateData(studioSettings);
        } else if (e.target.name === "length") {
            studioSettings.edges.length = (parseInt(e.target.value) === 100) ? "undefined" : parseInt(e.target.value);
            this.updateStateData(studioSettings);
        }
    }

    render() {
        console.log("this.state.studioSettings edges", this.state.studioSettings);
        return (
            <Form>
                <div
                    style={{"overflowY": "scroll", "maxHeight": "calc(100vh - 215px)"}}>
                    <h6>Layout settings</h6>
                    <hr/>

                    <Form.Group controlId="randomSeed" className={""}>
                        <Form.Label>random
                            seed <small>({this.state.studioSettings.layout.randomSeed})</small></Form.Label>
                        <Form.Control type="range" name={"randomSeed"}
                                      onChange={this.handleValueChange.bind(this)}
                                      min={0} max={2000} step={1}
                                      defaultValue={this.state.studioSettings.layout.randomSeed}
                                      value={this.state.studioSettings.layout.randomSeed}
                        />
                    </Form.Group>


                    <Form.Group className={""}>
                        <Form.Check
                            type="switch"
                            id="custom-switch-3"
                            name={"enableHierarchical"}
                            label="Enable hierarchical"
                            onChange={this.handleValueChange.bind(this)}
                            defaultChecked={this.state.studioSettings.layout.hierarchical.enabled}
                            value={this.state.studioSettings.layout.hierarchical.enabled}
                        />
                    </Form.Group>
                    {
                        this.state.studioSettings.layout.hierarchical.enabled
                            ? <div>
                                <Row className={"mr-0"}>
                                    <Col size={"6"}>
                                        <Form.Group controlId="type"
                                                    className={" pr-2"}>
                                            <Form.Label>direction</Form.Label>
                                            <Form.Control
                                                name={"direction"} size={"sm"} as={"select"}
                                                onChange={this.handleValueChange.bind(this)}
                                                defaultValue={this.state.studioSettings.layout.hierarchical.direction}
                                                value={this.state.studioSettings.layout.hierarchical.direction}
                                            >
                                                <option value="UD">UD</option>
                                                <option value="DU">DU</option>
                                                <option value="LR">LR</option>
                                                <option value="RL">RL</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col size={"6"}>
                                        <Form.Group controlId="nodeSpacing" className={""}>
                                            <Form.Label>node
                                                spacing <small>({this.state.studioSettings.layout.hierarchical.nodeSpacing})</small></Form.Label>
                                            <Form.Control type="range" name={"nodeSpacing"}
                                                          onChange={this.handleValueChange.bind(this)}
                                                          min={50} max={1000} step={1}
                                                          defaultValue={this.state.studioSettings.layout.hierarchical.nodeSpacing}
                                                          value={this.state.studioSettings.layout.hierarchical.nodeSpacing}
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>


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
                <div className={"mt-3"}>
                    <p className={"small text-muted"}>
                       <strong>Note:</strong> Refer <a target={"_blank"} rel={"noreferrer"}
                                 href="https://visjs.github.io/vis-network/docs/network/layout.html">
                        this link</a> for description of the settings.
                    </p>
                </div>
            </Form>
        )
    }
}
