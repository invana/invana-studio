import React from "react";
import {faExternalLinkSquareAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./learn.scss";
import {q1CreateData, q3, q4} from "./learn-queries";
import GEList from "../ui-components/lists/list";

export default class LearnComponent extends React.Component {


    render() {
        return (
            <div className={"p-10"}>
                <p>Learn how to use gremlin queries to create a simple graph.
                    I'll illustrate simple data story of me and the project using
                    Graph databases for a starter.</p>
                <GEList type={"vertical"}>
                    <li>
                        <button onClick={() => this.props.addQueryToConsole(q1CreateData)}>
                            1. Add a `Person` and `GitHubProject` nodes</button>
                    </li>
                    <li>
                        <button onClick={() => this.props.addQueryToConsole(q3)}>
                            2. Update properties of the Node</button>
                    </li>
                    <li>
                        <button onClick={() => this.props.addQueryToConsole(q4)}>
                            3. Add a relation between both the nodes.</button>
                    </li>


                </GEList>
                <p>Awesome! <u><button onClick={() => this.props.onClose()}> Close this tour </button></u> and start exploring
                    your graph data.
                </p>
                <h3 style={{"marginTop": "30px"}}>More Resources</h3>
                <GEList type={"vertical"}>
                    <li>
                        <a target={"_blank"} rel="noopener noreferrer"
                           href="https://medium.com/invanalabs/crud-cheatsheet-to-apache-tinkerpop-gremlin-393540cd46ae?source=collection_home---4------1-----------------------">
                            1. CRUD CheatSheet to Apache TinkerPop Gremlin. <FontAwesomeIcon className={"small"}
                                                                                             icon={faExternalLinkSquareAlt}/>
                        </a>
                    </li>
                    <li>
                        <a target={"_blank"} rel="noopener noreferrer"  href="https://tinkerpop.apache.org/docs/current/reference/">
                            2. Apache Tinkerpop Documentation <FontAwesomeIcon className={"small"}
                                                                               icon={faExternalLinkSquareAlt}/>
                        </a>
                    </li>
                </GEList>
            </div>
        )
    }

}
