import RemoteGraphComponent from "../core/graph-component";
// import GraphSONDeSerializer from "../serializers/graphson-v3";
// import {managementVertexLabel} from "../config";

export default class HomeView extends RemoteGraphComponent {


    componentDidMount() {
        super.componentDidMount();
        let _this = this;
        setTimeout(function () {
            _this.makeQuery(_this.requestBuilder.initQuery(), {source: "internal"});
        }, 200)
    }

    processResponse(responses) {
        let _this = this;
        let response = responses[0];
        console.log("processResponse received", response);
        const statusCode = response.getStatusCode();
        if (statusCode >= 200 || statusCode < 300) {
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
