import MainLeftNavBase from "../ui/structure/left";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBoxes,
    faBug,
    faChalkboard,
    faCog,
    faHistory,
    faLifeRing,
    faSearch,
    faSignInAlt
} from "@fortawesome/free-solid-svg-icons";
import HistoryFlyOut from "../components/history";
import SettingsFlyOut from "../ui/settings";


export default class LeftNav extends React.Component {


    static defaultProps = {
        leftFlyOutName:  null,
        rightFlyOutName:  null,
        setRightFlyOut: () => console.error("setRightFlyOut prop not added to LeftNav"),
        setLeftFlyOut: () => console.error("setLeftFlyOut prop not added to LeftNav"),

    }

    render() {
        return (
            <MainLeftNavBase>
                <ul className={"vertical"}>
                    <li>
                        <a className={this.props.rightFlyOutName === "welcome"? "selected": ""} onClick={() => this.props.setRightFlyOut("welcome")} title={"Welcome Panel"}>
                            <FontAwesomeIcon icon={faChalkboard}/>
                        </a>
                    </li>
                    <li>
                        <a className={this.props.leftFlyOutName === "query-console"? "selected": ""} onClick={() => this.props.setLeftFlyOut("query-console")} title={"Query Console"}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </a>
                    </li>
                    <li>
                        <a className={this.props.leftFlyOutName === "history"? "selected": ""} onClick={() => this.props.setLeftFlyOut("history")} title={"Query History"}>
                            <FontAwesomeIcon icon={faHistory}/>
                        </a>
                    </li>
                    <li>
                        <a className={this.props.leftFlyOutName === "settings"? "selected": ""} onClick={() => this.props.setLeftFlyOut("settings")} title={"Settings"}>
                            <FontAwesomeIcon icon={faCog}/>
                        </a>
                    </li>
                </ul>
                <ul className={"bottom vertical"}>

                    <li>
                        <a
                            target={"_new"} title={"Support / Report Issues"}
                            href="https://github.com/invanalabs/graph-explorer/issues">
                            <FontAwesomeIcon icon={faBug}/>
                        </a>
                    </li>

                </ul>


            </MainLeftNavBase>
        )
    }


}
