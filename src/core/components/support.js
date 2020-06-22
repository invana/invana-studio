import React from "react";
import FlyOutUI from "../ui/flyout";
import {ABOUT_TEXT, VERSION} from "../../config";
import {faBook} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faGitter, faMedium, faTwitter} from "@fortawesome/free-brands-svg-icons";
import "./support.scss";

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
                        <a href={"https://twitter.com/invanalabs"}>
                            <h4><FontAwesomeIcon icon={faTwitter}/> Twitter</h4>
                            <p>Stay upto date about the releases, updates, use case blogs, </p>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => alert('Its a work in progress')}>
                            <h4><FontAwesomeIcon icon={faBook}/> Documentation [WIP]</h4>
                            <p>Beginner tutorials, usage and developer documentation.</p>
                        </a>
                    </li>
                    <li>
                        <a target={"_blank"} href="https://medium.com/invanalabs">
                            <h4><FontAwesomeIcon icon={faMedium}/> Medium</h4>
                            <p>Blogs on latest implementations and more use cases.</p>
                        </a>
                    </li>

                    <li>
                        <a target={"_blank"} href="https://github.com/invanalabs/graph-explorer/issues">
                            <h4><FontAwesomeIcon icon={faGithub}/> GitHub</h4>
                            <p>Bugs, Feature Requests on GitHub</p>

                        </a>
                    </li>
                    <li>
                        <a onClick={() => alert('Its a work in progress')}>
                            <h4><FontAwesomeIcon icon={faGitter}/> Gitter Community [WIP]</h4>
                            <p>Chatroom for Community</p>
                        </a>
                    </li>


                </ul>

                <p>If you need any support beyond the above,
                    please get in touch with me at <span className={"selected"}>hi[ a ]invana.io</span>
                </p>

            </FlyOutUI>
        )
    }

}
