import React from "react";
import FlyOutUI from "../ui/flyout";
import {faExternalLinkSquareAlt, faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default class LearnFlyOut extends React.Component {


    render() {
        return (
            <FlyOutUI title={"Learn about Graph Explorer"}
                      display={"block"}
                      position={"right"}
                      onClose={this.props.onClose}
            >

                <ul>
                    <li>
                        <a target={"_blank"} href="https://medium.com/invanalabs/crud-cheatsheet-to-apache-tinkerpop-gremlin-393540cd46ae?source=collection_home---4------1-----------------------">
                          1. CRUD CheatSheet to Apache TinkerPop Gremlin. <FontAwesomeIcon className={"small"} icon={faExternalLinkSquareAlt} />
                        </a>
                    </li>
                    <li>
                        <a target={"_blank"} href="https://tinkerpop.apache.org/docs/current/reference/">
                            2. Apache Tinkerpop Documentation <FontAwesomeIcon className={"small"} icon={faExternalLinkSquareAlt} />

                        </a>
                    </li>
                </ul>
            </FlyOutUI>
        )
    }

}
