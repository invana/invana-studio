import React from "react";
import {ABOUT_TEXT, VERSION, REPO_URL} from "../config";
import PropTypes from "prop-types";

export default class FounderNote extends React.Component {

    static defaultProps = {
        onClose: () => console.error("onClose prop not set for <FounderNote> component"),
        setRightContentName: () => console.error("setRightContentName prop not set for <FounderNote> component"),
        setLeftContentName: () => console.error("setLeftContentName prop not set for <FounderNote> component")
    }


    static propTypes = {
        setRightContentName: PropTypes.func,
        setLeftContentName: PropTypes.func,
        onClose: PropTypes.func
    };

    render() {
        return (

            <div className={'p-10'}>

                <h2>Hello World! </h2>
                <p>In the spirit of
                    every <em>new technology</em> that disrupts the way Humans solves the problems
                    with the help of the data and technology.
                    This project is yet another attempt to gather the best of the tech
                    from graph computing and
                    data visualisations to connect the dots within the data and give insights that you would not have
                    wondered otherwise.
                </p>

                <p>Introducing Graph Explorer ({VERSION}) - {ABOUT_TEXT}</p>

                <p>
                    Also, I am really excited about the potential of Graph Databases -
                    they establish connections between the data
                    during the write operations, giving faster reads handling complex queries in
                    near real-time.
                </p>
                <p>This project is open sourced under <em><u>Apache License 2.0</u></em>&nbsp;
                    license on&nbsp;
                    <a href={REPO_URL} rel="noopener noreferrer" target={"_blank"} className={"selected"}>Github.</a>.
                    Please feel free to star and fork the project.</p>
                <p>Best <br/>
                    Ravi Raja Merugu <a target={"_blank"} rel="noopener noreferrer"
                                        href="https://www.linkedin.com/in/rrmerugu/">(linkedin.com/in/rrmerugu/)</a>
                </p>

                <p>
                    <button className={"selected"} onClick={() => {
                        this.props.setLeftContentName("learn");
                        this.props.setRightContentName(null)
                    }}>
                        <u>Build your first Graph &rarr;</u>
                    </button>
                    <span style={{"marginLeft": "5px", "marginRight": "5px"}}>|</span>


                    <button onClick={() => this.props.setRightContentName("support")}>
                        check support
                    </button>


                </p>
                <p>
                    {/*<span style={{"marginLeft": "5px", "marginRight": "5px"}}>|</span>*/}
                    <button style={{"color": "#666"}} onClick={() => this.props.setRightContentName(null)}>
                        close this
                    </button></p>


            </div>

        )
    }
}
