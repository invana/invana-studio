import React from "react";

export class PropertiesCanvas extends React.Component {


    getcleanedProperties() {
        // removes position attributes etc.
        let data = Object.assign({}, this.props.properties);

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
        return data;
    }

    visualiseProperties() {

    }

    render() {
        let cleanedProperties = this.getcleanedProperties();

        return (
            <div id="properties-div"
                 style={{display: Object.keys(cleanedProperties).length > 0 ? 'block' : 'none'}}>
                {JSON.stringify(cleanedProperties)}
            </div>
        )
    }

}
