import React from "react";

export class PropertiesCanvas extends React.Component {


    getCleanedData() {
        // removes position attributes etc.
        let data = Object.assign({}, this.props.properties);

        if (data.type) {


            delete data.x;
            delete data.y;
            delete data.vy;
            delete data.vx;
            delete data.fx;
            delete data.fy;
            delete data.index;
            delete data.source;
            delete data.target;
            delete data.outV;
            delete data.inV;
            delete data.inVLabel;
            delete data.OutVLabel;


            let cleanedData = {};
            cleanedData.label = data.label;
            cleanedData.type = data.type.replace("g:", "");
            cleanedData.id = data.id;

            // // delete the label and id from actual data
            // delete data.id;
            // delete data.label;

            cleanedData.properties = {};

            Object.keys(data).forEach(function (propKey) {
                if (propKey !== "id" || propKey !== "label" || propKey !== "type") {
                    cleanedData.properties[propKey] = data[propKey];
                }
            })

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
                                <div className='singleProperty'>
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
