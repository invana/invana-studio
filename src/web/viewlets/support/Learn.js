import React from "react";
import {faExternalLinkSquareAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {q1CreateData, q3, q4} from "../learn-queries";
import PropTypes from "prop-types";
import {ListGroup} from "react-bootstrap";

export default class Learn extends React.Component {


    static defaultProps = {
        startNewQueryInConsole : () => console.error("startNewQueryInConsole not implemented"),
        onClose : () => console.error("onClose not implemented")
    }
    static propTypes = {
        onClose: PropTypes.func,
        startNewQueryInConsole: PropTypes.func
    };


    render() {
        return (
            <div className={"p-10"}>
                <p>Learn how to use gremlin queries to create a simple graph.
                    I will illustrate simple data story of me and the project using
                    Graph databases for a starter.</p>
                <ListGroup type={"vertical"}>
                    <ListGroup.Item>
                        <button onClick={() => this.props.startNewQueryInConsole(q1CreateData)}>
                            1. Add a <strong>Person</strong> and <strong>GitHubProject</strong> nodes</button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <button onClick={() => this.props.startNewQueryInConsole(q3)}>
                            2. Update properties of the Node</button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <button onClick={() => this.props.startNewQueryInConsole(q4)}>
                            3. Add a relation between both the nodes.</button>
                    </ListGroup.Item>


                </ListGroup>
                <p>Awesome! <button onClick={() => this.props.onClose()}><u> Close this tour </u></button> and start exploring
                    your graph data.
                </p>
                <h3 style={{"marginTop": "30px"}}>More Resources</h3>
                <ListGroup type={"vertical"}>
                    <ListGroup.Item>
                        <a target={"_blank"} rel="noopener noreferrer"
                           href="https://medium.com/invanalabs/crud-cheatsheet-to-apache-tinkerpop-gremlin-393540cd46ae?source=collection_home---4------1-----------------------">
                            1. CRUD CheatSheet to Apache TinkerPop Gremlin. <FontAwesomeIcon className={"small"}
                                                                                             icon={faExternalLinkSquareAlt}/>
                        </a>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <a target={"_blank"} rel="noopener noreferrer"  href="https://tinkerpop.apache.org/docs/current/reference/">
                            2. Apache Tinkerpop Documentation <FontAwesomeIcon className={"small"}
                                                                               icon={faExternalLinkSquareAlt}/>
                        </a>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        )
    }

}
