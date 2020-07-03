import React from "react";
import ReactJson from 'react-json-view'
import "./raw-responses.scss";


export default class RawResponsesCanvas extends React.Component {

    static defaultProps = {
        data: null
    }

    state = {
        rjv_component: false
    }

    componentWillMount() {

        console.log("====raw responses", this.props.responses);
        let data = {}
        if (this.props.responses.length > 0) {
            data = this.props.responses[this.props.responses.length - 1].result.data;
        }
        if (data !== null) {


            const TIMEOUT = 10 // wait 10 ms
            setTimeout(() => {
                this.setState({
                    rjv_component: <ReactJson className={"p-10"} theme="monokai"
                                              style={{"backgroundColor": "transparent"}}
                                              src={data}/>
                })
            }, TIMEOUT)
        } else {
             this.setState({
                    rjv_component: <p>Response is null</p>
                })
        }
    }

    render() {
        return <div className={"rawResponseCanvas p-10"}>
            <h4>Raw Response(from last Query only)</h4>
            {this.getJsonOrLoader()}
        </div>
    }

    getJsonOrLoader() {
        const {rjv_component} = this.state
        if (rjv_component === false) {
            return <div className={"loading-text"}>loading...</div>
        } else {
            // component was rendered and stored to this var
            return rjv_component
        }
    }


}
