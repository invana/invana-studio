import React from "react";
import FlyOutUI from "../ui/flyout";
import {VERSION} from "../../config";

export default class FounderNote extends React.Component {

    // static defaultProps = {
    //     onClose: console.error("onClose prop not set for <FounderNote> component")
    // }

    render() {
        return (
            <FlyOutUI title={"A note from author"}
                      poistion={"right"}
                      display={"block"}
                      size={this.props.size} onClose={this.props.onClose}>
                <div className={''}>

                    <p>Hi there! </p>
                    <p>Introducing Graph Explorer ({VERSION}) - a data visualisation tool and more for the gremlin
                        supported
                        graph databases.</p>
                    <p>In the words of General Patton, “If a man does his best, what else is there!”, so I
                        believe there is always a next best thing. In the spirit of every `new technology`
                        that disrupts the way Humans solves the problems.
                        This project is yet an attempt to gather the best of the tech
                        from graph computing and
                        data visualisations, to give Innovators a great way to find
                        problems and the solutions with the help of data.
                    </p>
                    <p>
                        Also, I'm really excited about the potential of Graph Databases -
                        they establish connections between the data
                        during the write operations, giving faster read time abilities for
                        handling complex queries like never before.
                    </p>
                    <p>Please feel free to contribute your ideas or code.</p>
                    <p>Best <br/>
                        Ravi Raja Merugu <a target={"_blank"}
                                            href="https://www.linkedin.com/in/rrmerugu/">(linkedin.com/in/rrmerugu/)</a>
                    </p>

                    <p>
                        <a className={"selected"} onClick={() => this.props.setRightFlyOut("learn")}>
                            <u>Build your first Graph &rarr;</u>
                        </a>
                        <span style={{"marginLeft": "5px", "marginRight": "5px"}}>|</span>


                        <a onClick={() => this.props.setRightFlyOut("support")}>
                            check support
                        </a>

                        <span style={{"marginLeft": "5px", "marginRight": "5px"}}>|</span>
                        <a onClick={() => this.props.onClose()}>
                            close
                        </a>
                    </p>



                </div>
            </FlyOutUI>
        )
    }
}
