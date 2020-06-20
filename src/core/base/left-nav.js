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
        setCenterModal: () => console.error("setCenterModal prop not added to LeftNav"),
        setLeftFlyOut: () => console.error("setLeftFlyOut prop not added to LeftNav")
    }

    render() {
        return (
            <MainLeftNavBase>
                <ul className={"vertical"}>
                    <li>
                        <a onClick={() => this.props.setCenterModal("welcome")} title={"Welcome Panel"}>
                            <FontAwesomeIcon icon={faChalkboard}/>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => this.props.setLeftFlyOut("query-console")} title={"Query Console"}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </a>
                    </li>
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
