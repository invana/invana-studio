import React from "react";
import "./loading.scss";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

export default class LoadingDiv extends React.Component {

    timer = null;
    static propTypes = {
        statusMessage: PropTypes.string,
        stopRenderingGraph: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            elapsedTime: 0
        }
    }

    updateCounter() {
        this.setState({elapsedTime: this.state.elapsedTime + 1});
    }

    componentDidMount() {
        // this.setState({elapsedTime: 0})
        this.timer = setInterval(this.updateCounter.bind(this), 1000)
    }


    componentWillUnmount() {
        clearInterval(this.timer);
    }


    render() {
        return (
            <div className={"loadingDiv  text-center"}>
                <h4>
                    <FontAwesomeIcon className={"fa-spin mr-2"} icon={faCircleNotch}/>
                    {this.props.statusMessage}</h4>
                {
                    this.state.elapsedTime > 0
                    ?                 <p className={"text-muted"}>{this.state.elapsedTime}s elapsed...</p>
                    : <span></span>
                }

                {
                    this.state.elapsedTime > 5
                        ? <button className={"btn btn-secondary btn-sm"}
                                  onClick={() => this.props.stopRenderingGraph()}>
                            stop rendering graph
                        </button>
                        : <span></span>
                }

            </div>
        )
    }
}
