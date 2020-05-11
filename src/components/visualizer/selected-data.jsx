import React from "react";

export class SelectedDataCanvas extends React.Component {


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
        let nodeLabelsColoring = JSON.parse(localStorage.getItem('nodeLabels'));
        let linkLabelsColoring = JSON.parse(localStorage.getItem('linkLabels'));
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
            <div id="SelectedDataDiv"
                 style={{display: Object.keys(cleanedData).length > 1 ? 'block' : 'none'}}>
                <div className={"SelectedDataHeading"}>
                    <span className={"itemLabel"} style={{
                        "backgroundColor":
                        selectedDataColorSchema.bgColor
                    }}>
                        {cleanedData.label}
                    </span>
                    {cleanedData.properties.name || cleanedData.id}

                </div>
                <div className="SelectedDataList mainDetails">


                    <div className={'singleProperty'} key={cleanedData.id}>
                        <div className={"propertyData"}>
                            <h6 className={"propertyKey"}>id:</h6>
                            {cleanedData.id}
                        </div>
                    </div>
                    <div className={'singleProperty'} key={cleanedData.type}>
                        <div className={"propertyData"}>
                            <h6 className={"propertyKey"}>type:</h6>
                            {cleanedData.type}
                        </div>
                    </div>
                    <div className={'singleProperty'} key={cleanedData.label}>
                        <div className={"propertyData"}>
                            <h6 className={"propertyKey"}>label:</h6>
                            {cleanedData.label}
                        </div>
                    </div>
                </div>
                <div className="SelectedDataList">
                    <div className={'singleProperty heading'} key={"properties-list"}>
                        <div className={"propertyData"}>
                            <h6 className={"propertyKey "}>PROPERTIES</h6>
                        </div>
                    </div>
                    {
                        Object.keys(cleanedData.properties).map((propKey) => {
                            return (
                                <div className={'singleProperty'} key={cleanedData.id + "-" + propKey}>
                                    <div className={"propertyData"}>
                                        <h6 className={"propertyKey"}>{propKey}:</h6>
                                        {cleanedData.properties[propKey]}
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
