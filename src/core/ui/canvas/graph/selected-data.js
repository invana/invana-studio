import React from "react";
import "./selected-data.scss";
import FlyOutUI from "../../flyout";

export default class SelectedDataCanvas extends React.Component {

    static defaultProps = {
        selectedData: null,
        onClose: () => console.error("onFlyOutSelectedDataClose not implemented")
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


        return (
            <FlyOutUI position={"right"}
                      onClose={this.props.onClose}
                      title={null}
                      padding={false}
                      display={Object.keys(cleanedData).length > 1 ? 'block' : 'none'}>
                <div className={"SelectedDataHeading"}>
                    <span className={"itemLabel"} style={{
                        "backgroundColor":
                        selectedDataColorSchema.bgColor
                    }}>
                        {cleanedData.label}
                    </span>
                    {cleanedData.properties.name || cleanedData.id}

                </div>
                <div className="SelectedDataList mainDetails" >


                    <div className={'singleProperty dark'} key={cleanedData.id}>
                        <div className={"propertyData"}>
                            <strong className={"propertyKey"}>id:</strong>
                            {cleanedData.id}
                        </div>
                    </div>
                    <div className={'singleProperty dark'} key={cleanedData.type}>
                        <div className={"propertyData"}>
                            <strong className={"propertyKey"}>type:</strong>
                            {cleanedData.type}
                        </div>
                    </div>
                    <div className={'singleProperty dark'} key={cleanedData.label}>
                        <div className={"propertyData"}>
                            <strong className={"propertyKey"}>label:</strong>
                            {cleanedData.label}
                        </div>
                    </div>
                </div>
                <div className="SelectedDataList">
                    <div className={'singleProperty dark'} key={"properties-list"}>
                        <div className={"propertyData"}>
                            <strong className={"propertyKey "}>PROPERTIES</strong>
                        </div>
                    </div>
                    {
                        Object.keys(cleanedData.properties).map((propKey) => {
                            return (
                                <div className={'singleProperty'} key={cleanedData.id + "-" + propKey}>
                                    <div className={"propertyData"}>
                                        <strong className={"propertyKey"}>{propKey}:</strong>
                                        {cleanedData.properties[propKey]}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </FlyOutUI>
        )
    }

}
