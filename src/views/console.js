import GremlinConnectorComponent, {StatusMessageComponent} from "../core/gremlin-connector";
import React from "react";
import QueryInputForm from "../core/ui/form/query-forms";
import JSONCanvas from "../core/ui/canvas/json";

export default class ConsoleView extends GremlinConnectorComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        super.componentDidMount();
        let _this = this;
        setTimeout(function () {
            _this.makeQuery("g.V().toList()");
        }, 200);
    }

    processResponse(responses) {
        this.setState({
            data: JSON.stringify(responses, null, 4)
        })
    }

    submitQuery(query) {
        this.makeQuery(query);
    }

    render() {
        return (
            <div className={"consoleView"}>
                <QueryInputForm queryOnSubmitHandler={this.submitQuery.bind(this)}/>
                <StatusMessageComponent
                    statusMessage={this.state.statusMessage}
                    isConnected2Gremlin={this.state.isConnected2Gremlin}
                />
                <JSONCanvas data={this.state.data}/>
                {this.state.isQuerying}
            </div>
        )
    }
}
