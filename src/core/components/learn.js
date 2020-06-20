import React from "react";
import FlyOutUI from "../ui/flyout";
import {faExternalLinkSquareAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./learn.scss";
import {q1CreateData, q2allData, q3, q4, q5} from "./learn-queries";

export default class LearnFlyOut extends React.Component {


    render() {
        return (
            <FlyOutUI title={"Get started with Gremlin"}
                      display={"block"}
                      position={"right"}
                      onClose={this.props.onClose}
            >
                <p>Learn how to use gremlin queries to create a simple graph.
                    I'll illustrate simple data story of me and the project using
                    Graph databases for a starter.</p>
                <ul className={"vertical list"}>
                    <li>
                        <a onClick={() => this.props.addQueryToConsole(q1CreateData)}>
                            1. Add a `Person` and `Organisation` nodes</a>
                    </li>
                    <li>
                        <a onClick={() => this.props.addQueryToConsole(q2allData)}>
                            2. View the nodes</a>
                    </li>
                    <li>
                        <a onClick={() => this.props.addQueryToConsole(q3)}>
                            3. Update `Person` properties</a>
                    </li>
                    <li>
                        <a onClick={() => this.props.addQueryToConsole(q4)}>
                            4. Add a relations between both the nodes.</a>
                    </li>
                    <li>
                        <a onClick={() => this.props.addQueryToConsole(q5)}>
                            5. View all the connections between the nodes.
                        </a>
                    </li>
                    <li>
                        <a onClick={() => this.props.onClose()}>
                            6. Close this and explore data
                        </a>
                    </li>

                </ul>
                <h3 style={{"marginTop": "30px"}}>More Resources</h3>
                <ul className={"vertical list fs-14"}>
                    <li>
                        <a target={"_blank"}
                           href="https://medium.com/invanalabs/crud-cheatsheet-to-apache-tinkerpop-gremlin-393540cd46ae?source=collection_home---4------1-----------------------">
                            1. CRUD CheatSheet to Apache TinkerPop Gremlin. <FontAwesomeIcon className={"small"}
                                                                                             icon={faExternalLinkSquareAlt}/>
                        </a>
                    </li>
                    <li>
                        <a target={"_blank"} href="https://tinkerpop.apache.org/docs/current/reference/">
                            2. Apache Tinkerpop Documentation <FontAwesomeIcon className={"small"}
                                                                               icon={faExternalLinkSquareAlt}/>
                        </a>
                    </li>
                </ul>
            </FlyOutUI>
        )
    }

}
