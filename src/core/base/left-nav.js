import MainLeftNavBase from "../ui/structure/left";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBug, faCog, faHistory, faLifeRing, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import HistoryFlyOut from "../components/history";
import SettingsFlyOut from "../ui/settings";


export default class LeftNav extends React.Component {


    static defaultProps = {
        leftFlyOutName: null,
        onLeftFlyOutClose: () => console.error("onLeftFlyOutClose prop not added to LeftNav"),
        setCenterModal: () => console.error("setCenterModal prop not added to LeftNav")
    }

    render() {
        return (
            <MainLeftNavBase>
                <ul className={"vertical"}>
                    <li>
                        <a onClick={() => this.props.setLeftFlyOut("history")} title={"Query History"}>

                            <FontAwesomeIcon icon={faHistory}/>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => this.props.setLeftFlyOut("settings")} title={"Settings"}>
                            <FontAwesomeIcon icon={faCog}/>
                        </a>
                    </li>
                </ul>
                <ul className={"bottom vertical"}>
                    <li>
                        <a href="/about" title={"Support/Documentation"}>
                            <FontAwesomeIcon icon={faLifeRing}/>
                        </a>
                    </li>
                    <li>
                        <a
                            target={"_new"} title={"Support / Report Issues"}
                            href="https://github.com/invanalabs/graph-explorer/issues">
                            <FontAwesomeIcon icon={faBug}/>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => this.props.setCenterModal("switch-server")} title={"Switch Server"}>
                            <FontAwesomeIcon icon={faSignInAlt}/>
                        </a>
                    </li>
                </ul>

                {
                    (this.props.leftFlyOutName === "history") ?
                        <HistoryFlyOut onClose={this.props.onLeftFlyOutClose}/>
                        : <span></span>
                }

                {
                    (this.props.leftFlyOutName === "settings") ?
                        <SettingsFlyOut onClose={this.props.onLeftFlyOutClose}/>
                        : <span></span>
                }

            </MainLeftNavBase>
        )
    }


}
