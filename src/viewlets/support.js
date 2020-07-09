import React from "react";
import {faBook} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faGitter, faMedium, faTwitter} from "@fortawesome/free-brands-svg-icons";
import "./support.scss";
import GEList from "../ui-components/lists/list";

export default class SupportComponent extends React.Component {


    render() {
        return (
            <div className={"p-10"}>
                <GEList type={"vertical"}>


                    <li>
                        <a target={"_blank"} rel="noopener noreferrer"
                           href="https://github.com/invanalabs/graph-explorer/issues">
                            <h4><FontAwesomeIcon icon={faGithub}/> GitHub</h4>
                            <p>Bugs, Feature Requests on GitHub</p>

                        </a>
                    </li>


                    <li>
                        <a target={"_blank"} rel="noopener noreferrer" href="https://medium.com/invanalabs">
                            <h4><FontAwesomeIcon icon={faMedium}/> Medium</h4>
                            <p>Blogs on latest implementations and more use cases.</p>
                        </a>
                    </li>

                    <li>
                        <a target={"_blank"} rel="noopener noreferrer" href={"https://twitter.com/invanalabs"}>
                            <h4><FontAwesomeIcon icon={faTwitter}/> Twitter</h4>
                            <p>Stay upto date about the releases, updates, use case blogs, </p>
                        </a>
                    </li>
                    <li>
                        <button onClick={() => alert('Its a work in progress')}>
                            <h4><FontAwesomeIcon icon={faBook}/> Documentation [WIP]</h4>
                            <p>Beginner tutorials, usage and developer documentation.</p>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => alert('Its a work in progress')}>
                            <h4><FontAwesomeIcon icon={faGitter}/> Gitter Community [WIP]</h4>
                            <p>Chatroom for Community</p>
                        </button>
                    </li>
                </GEList>

                <p>If you need any support beyond the above,
                    please get in touch with me at <br/><span className={"selected"}>hi[ at ]invana.io</span>
                </p>

            </div>
        )
    }

}
