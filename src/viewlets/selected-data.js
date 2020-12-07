import React from "react";
import "./selected-data.scss";
import PropTypes from "prop-types";
import {renderPropertyData} from "../canvas/canvas-utils";
import NodeMenu from "../canvas/graph/node-menu";

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

    }

    getCleanedData() {
        // removes position attributes etc.
        let data = Object.assign({}, this.props.selectedData);

        if (data.type) {
            let properties = data.properties;
            let cleanedData = {};
            cleanedData.label = data.label;
            cleanedData.type = data.type.replace("g:", "");
            cleanedData.id = data.id;
            cleanedData.properties = properties;
            cleanedData.target = data.target;
            cleanedData.source = data.source;
            return cleanedData;
        } else {
            return {"properties": {}};
        }
    }


    render() {
        let cleanedData = this.getCleanedData();
        let nodeLabelsColoring = Object.assign({}, JSON.parse(localStorage.getItem('nodeLabels')));
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

        console.log("cleanedData", cleanedData)


        return (
            <div>


                {/*<NodeMenu*/}
                {/*    getFocusedNodes={this.props.getFocusedNodes}*/}
                {/*    setFocusedNodes={this.props.setFocusedNodes}*/}
                {/*    connector={this.props.connector}*/}
                {/*    selectedElementData={this.props.selectedElementData}*/}
                {/*    makeQuery={this.props.makeQuery}*/}
                {/*    graphicsEngine={this.graphicsEngine}*/}
                {/*    setDefaultQuery={this.props.setDefaultQuery}*/}
                {/*    setRightContentName={this.props.setRightContentName}*/}
                {/*/>*/}
                {/*<div className={"SelectedDataHeading"}>*/}
                {/*    <span className={"itemLabel"} style={{*/}
                {/*        "backgroundColor":*/}
                {/*        selectedDataColorSchema.bgColor*/}
                {/*    }}>*/}
                {/*        {cleanedData.label}*/}
                {/*    </span>*/}
                {/*    {cleanedData.properties.name || cleanedData.id}*/}

                {/*</div>*/}
                <div className="SelectedDataList mainDetails">


                    {/*<div className={'singleProperty dark'} key={cleanedData.id}>*/}
                    {/*    <div className={"propertyData"}>*/}
                    {/*        <strong className={"propertyKey"}>id:</strong> {cleanedData.id}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={'singleProperty dark'} key={cleanedData.type}>*/}
                    {/*    <div className={"propertyData"}>*/}
                    {/*        <strong className={"propertyKey"}>type:</strong> {cleanedData.type}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={'singleProperty dark'} key={cleanedData.label}>*/}
                    {/*    <div className={"propertyData"}>*/}
                    {/*        <strong className={"propertyKey"}>label:</strong> {cleanedData.label}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {
                        cleanedData.source
                            ? <div className={'singleProperty dark'} key={cleanedData.source.id}>
                                <div className={"propertyData"}>
                                    <strong className={"propertyKey"}>source:</strong>
                                    <span style={{"color": cleanedData.source.meta.shapeOptions.fillColorHex}}>
                                          &nbsp;{cleanedData.source.meta.labelOptions.labelText}
                                    </span>
                                </div>
                            </div>
                            : <span></span>
                    }

                    {
                        cleanedData.target
                            ? <div className={'singleProperty dark'} key={cleanedData.target.id}>
                                <div className={"propertyData"}>
                                    <strong className={"propertyKey"}>target:</strong>
                                    <span style={{"color": cleanedData.target.meta.shapeOptions.fillColorHex}}>
                                         &nbsp;{cleanedData.target.meta.labelOptions.labelText}
                                    </span>
                                </div>
                            </div>
                            : <span></span>
                    }

                </div>
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
