import React from "react";
import "./selected-data.scss";
import PropTypes from "prop-types";
import {renderPropertyData} from "../interface/utils";
import {RENDERING_CONFIG} from "../../settings";
// import NodeMenu from "../canvas/graph/node-menu";

export default class SelectedData extends React.Component {

    static defaultProps = {
        selectedData: null,
        onClose: () => console.error("onFlyOutSelectedDataClose not implemented"),
        getFocusedNodes: () => console.log("getFocusedNodes"),
        setFocusedNodes: (nodes) => console.error("setFocusedNodes not set", nodes),

    }

    static propTypes = {
        selectedData: PropTypes.object,
        getFocusedNodes: PropTypes.func,
        setFocusedNodes: PropTypes.func,

        getNetwork: PropTypes.func,
        canvasUtils: PropTypes.object
    }

    getCleanedData() {
        // removes position attributes etc.
        let data = Object.assign({}, this.props.selectedData);
        const network = this.props.getNetwork();
        data.inVElement = network.body.data.nodes.get(data.inV);
        data.outVElement = network.body.data.nodes.get(data.outV);
        return data;
    }

    render() {
        let cleanedData = this.getCleanedData();
        let nodeLabelsColoring = Object.assign({}, JSON.parse(localStorage.getItem(RENDERING_CONFIG.LOCAL_STORAGE_KEY)));
        let linkLabelsColoring = Object.assign({}, JSON.parse(localStorage.getItem('linkLabels')));
        let selectedDataColorSchema = {};

        if (cleanedData.type === "Vertex") {
            selectedDataColorSchema = nodeLabelsColoring[cleanedData.label];
        } else if (cleanedData.type === "Edge") {
            selectedDataColorSchema = linkLabelsColoring[cleanedData.label];
        }
        if (!selectedDataColorSchema) {
            selectedDataColorSchema = {bgColor: "#7d8296"};
        }

            console.log("selectedDataColorSchema", selectedDataColorSchema);
            // console.log("selectedDataColorSchema", selectedDataColorSchema);

        return (
            <div>

                {
                    cleanedData.outV && cleanedData.inV
                        ? <div className="SelectedDataList mainDetails">
                            {
                                cleanedData.outV
                                    ? <div className={'singleProperty dark'} key={cleanedData.outV}>
                                        <div className={"propertyData"}>
                                            <strong className={"propertyKey"}>source:</strong>
                                            <span
                                                style={{"color": this.props.canvasUtils.getElementColor(cleanedData.outVLabel)}}>
                                          &nbsp;{cleanedData.outV}
                                    </span>
                                        </div>
                                    </div>
                                    : <span></span>
                            }
                            {
                                cleanedData.inV
                                    ? <div className={'singleProperty dark'} key={cleanedData.inV}>
                                        <div className={"propertyData"}>
                                            <strong className={"propertyKey"}>target:</strong>
                                            <span
                                                style={{"color": this.props.canvasUtils.getElementColor(cleanedData.inVLabel)}}>
                                         &nbsp;{cleanedData.inV}
                                    </span>
                                        </div>
                                    </div>
                                    : <span></span>
                            }
                        </div>
                        : <React.Fragment/>
                }

                <div className="SelectedDataList">
                    <div className={'singleProperty darkest'} key={"properties-list"}>
                        <div className={"propertyData"}>
                            <strong className={"propertyKey "}>PROPERTIES</strong>
                        </div>
                    </div>
                    {
                        Object.keys(cleanedData.properties).length === 0
                            ? <div className={'singleProperty'} key={cleanedData.id + "-no-properties-exist"}>
                                <div className={"propertyData"}><span
                                    className={"text-muted"}>No properties exist for this {cleanedData.type}</span>
                                </div>
                            </div>
                            : <span></span>
                    }
                    {
                        Object.keys(cleanedData.properties).map((propKey) => {
                            return (
                                <div className={'singleProperty'} key={cleanedData.id + "-" + propKey}>
                                    <div className={"propertyData"}>
                                        <strong className={"propertyKey"}>{propKey}:</strong>
                                        <div
                                            style={{"marginTop": "5px"}}>{renderPropertyData(propKey, cleanedData.properties[propKey])}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
