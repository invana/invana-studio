import React from "react";

export class PropertiesCanvas extends React.Component {


    getCleanedData() {
        // removes position attributes etc.
        let data = Object.assign({}, this.props.properties);

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

        return (
            <div id="properties-div"
                 style={{display: Object.keys(cleanedData).length > 1 ? 'block' : 'none'}}>
                <h5 className={"propertyHeading"}> {cleanedData.type}::{cleanedData.label}::{cleanedData.id}</h5>
                <div className="propertiesList">
                    {
                        Object.keys(cleanedData.properties).map((propKey) => {
                            return (
                                <div className={'singleProperty'} key={cleanedData.id + "-" +propKey}>
                                    <div className={"propertyData"}>
                                        <h6 className={"propertyKey"}>{propKey}</h6> :
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
