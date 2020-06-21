import React from "react";
import FlyOutUI from "../ui/flyout";
import {faBook, faObjectGroup, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faGitter, faMedium} from "@fortawesome/free-brands-svg-icons";

export default class SupportFlyout extends React.Component {


    render() {
        return (
            <FlyOutUI title={"Support"}
                      display={"block"}
                      position={"right"}
                      onClose={this.props.onClose}
            >


                <ul className={"vertical list"}>

                    <li>
                        <a onClick={() => alert('Its a work in progress')}>
                            <FontAwesomeIcon icon={faBook}/> End-User Documentation [WIP]</a>
                    </li>
                    <li>
                        <a target={"_blank"} href="https://medium.com/invanalabs">
                            <FontAwesomeIcon icon={faMedium}/> More Use case blogs on Medium[WIP]</a>
                    </li>

                    <li>
                        <a target={"_blank"} href="https://github.com/invanalabs/graph-explorer/issues">
                            <FontAwesomeIcon icon={faGithub}/> Bugs, Feature Requests on GitHub
                        </a>
                    </li>
                    <li>
                        <a onClick={() => alert('Its a work in progress')}>
                            <FontAwesomeIcon icon={faGitter}/> Gitter Community [WIP]</a>
                    </li>
                    <li>
                        <a onClick={() => alert('Its a work in progress')}>
                            <FontAwesomeIcon icon={faBook}/> Developer Documentation [WIP]</a>
                    </li>

                </ul>

                <p>If you need any support beyond these, please get in touch with me at ravi[ a ]invana.io.</p>

            </FlyOutUI>
        )
    }

}
