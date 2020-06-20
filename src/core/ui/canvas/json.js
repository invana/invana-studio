import React from "react";
import ReactJson from 'react-json-view'
import "./json.scss";



export default class JSONCanvas extends React.Component {

    static defaultProps = {
        data: null
    }

    state = {
        rjv_component: false
    }

    componentWillMount() {
        // there's probably a better way than setTimeout for non-blocking rendering
        const TIMEOUT = 10 // wait 10 ms
        setTimeout(() => {
            this.setState({
                rjv_component: <ReactJson theme="monokai" style={{"backgroundColor": "transparent"}} src={this.props.responses} />
            })
        }, TIMEOUT)
    }

    render() {
        return <div className={"jsonCanvas"}>{this.getJsonOrLoader() }         </div>
    }

    getJsonOrLoader() {
        const {rjv_component} = this.state
        if (rjv_component === false) {
            return <div style={{"paddingLeft": "20px"}}>loading...</div>
        } else {
            // component was rendered and stored to this var
            return rjv_component
        }
    }


}
