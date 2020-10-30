import RemoteGraphComponent from "../core/graph-component";
// import GraphSONDeSerializer from "../serializers/graphson-v3";
// import {managementVertexLabel} from "../config";
import {
    managementVertexLabel
} from "../config";
import {setElementColorOptionsToStorageUsingResponse} from "../core/utils";

export default class HomeView extends RemoteGraphComponent {


    componentDidMount() {
        super.componentDidMount();
        let _this = this;
        console.log("=_this.connector.requestBuilder.initQuery()", _this.connector.requestBuilder.initQuery())
        setTimeout(function () {
            _this.makeQuery(_this.connector.requestBuilder.filterVertices(
                managementVertexLabel
            ), {source: "internal"});
        }, 200)
    }

    processResponse(response) {
        let _this = this;
        // let response = this.connector.getLastResponse();
        console.log("processResponse received", response);
        const statusCode = response.getStatusCode();
        if (statusCode >= 200 || statusCode < 300) {
            setElementColorOptionsToStorageUsingResponse(response);

            window.location.href = "/explorer";
        } else {
            _this.setState({
                "errorMessage": JSON.stringify(response,),
                "showErrorMessage": true,
                "statusMessage": "Query Successfully Responded." +
                    " But returned non 200 status[" + response.status.code + "]"
            })
        }
    }

    render() {
        return super.render();
    }

}
