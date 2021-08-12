import React from "react";
import {Card, Tab, Tabs} from "react-bootstrap";
import {faDesktop} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";
import {STUDIO_CONNECT_CONSTANTS} from "../../../../settings/constants";
import {setDataToLocalStorage} from "../../../../utils/localStorage";
import defaultNetworkOptions from "../../../../settings/networkOptions";
import EdgeDisplaySettings from "./edge-settings";
import PhysicsDisplaySettings from "./physics-settings";
import LayoutSettings from "./layout-settings";

export default class DisplaySettings extends React.Component {

    static propTypes = {
        onClose: PropTypes.func,
        style: PropTypes.object,
        startRenderingGraph: PropTypes.func
    }

    constructor(props) {
        super(props);
        console.log("defaultNetworkOptions", JSON.stringify(defaultNetworkOptions))
        console.log("defaultNetworkOptions", defaultNetworkOptions)
        this.state = {studioSettings: defaultNetworkOptions};
    }


    updateEdgeOptionsInStorage(studioSettings) {
        console.log("updateEdgeOptionsInStorage", studioSettings);

        this.setState({studioSettings: studioSettings});

    }

    updateSettings() {

        setDataToLocalStorage(STUDIO_CONNECT_CONSTANTS.DISPLAY_SETTINGS, {
                physics: this.state.studioSettings.edges.physics,
                smooth: this.state.studioSettings.edges.smooth,
                length: this.state.studioSettings.edges.length
            }
        );
        // eslint-disable-next-line react/prop-types
        this.props.startRenderingGraph(defaultNetworkOptions);

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
                        <Card.Body className={"p-0"}>
                            <div className="row  pl-3 pr-3 pb-3">
                                <div className="col">
                                    <Tabs
                                        defaultActiveKey="physics-settings"
                                        transition={false}
                                        id="display-settings"
                                        className="mb-3 border-bottom"
                                    >

                                        <Tab eventKey="physics-settings" title="Physics settings">
                                            <PhysicsDisplaySettings onClose={this.props.onClose}
                                                                    startRenderingGraph={this.props.startRenderingGraph}/>
                                        </Tab>
                                        <Tab eventKey="layout-settings" title="Layout settings">
                                            <LayoutSettings onClose={this.props.onClose}
                                                            startRenderingGraph={this.props.startRenderingGraph}/>
                                        </Tab>
                                        <Tab eventKey="edge-settings" title="Edge settings">
                                            <EdgeDisplaySettings onClose={this.props.onClose}
                                                                 startRenderingGraph={this.props.startRenderingGraph}/>
                                        </Tab>

                                    </Tabs>
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}
