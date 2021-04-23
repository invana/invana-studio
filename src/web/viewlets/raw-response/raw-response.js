import React from "react";
import PropTypes from 'prop-types';
import "./raw-response.scss";

export default class RawResponsesCanvas extends React.Component {

    static defaultProps = {
        response: {}
    }

    static propTypes = {
        response: PropTypes.object

    }

    state = {
        rjv_component: false
    }

    UNSAFE_componentWillMount() {

        console.log("====raw responses", this.props.response);
        let data = {}

        data = this.props.response.result;

        if (data !== null) {


            const TIMEOUT = 10 // wait 10 ms
            setTimeout(() => {
                this.setState({
                    rjv_component: <pre>{JSON.stringify(data, null, 2)}</pre>
                })
            }, TIMEOUT)
        } else {
            this.setState({
                rjv_component: <p>Response is null</p>
            })
        }
    }

    render() {
        return <div className={"rawResponseCanvas"}>
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