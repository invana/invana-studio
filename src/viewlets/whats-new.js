import React from "react";
import PropTypes from "prop-types";
import GEList from "../ui-components/lists/list";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCube} from "@fortawesome/free-solid-svg-icons";

export default class WhatsNew extends React.Component {

    static defaultProps = {
        onClose: () => console.error("onClose prop not set for <WhatsNew> component"),
        setLeftContentName: () => console.error("setLeftContentName prop not set for <WhatsNew> component")
    }


    static propTypes = {
        setLeftContentName: PropTypes.func,
        onClose: PropTypes.func
    };

    render() {
        return (

            <div className={'p-10'}>
                <GEList type={"vertical"}>
                    <li>
                        <h4 className={"mt-20"}><FontAwesomeIcon icon={faCube}/> Switch Visualisation Canvas</h4>
                        <p>Visualise your data as Graph, Tables & JSON.</p>
                    </li>
                    <li>
                        <h4 className={"mt-20"}><FontAwesomeIcon icon={faCube}/> Browse using HotKeys</h4>
                        <p>Use keyboard shortcuts for a seamless data browsing experience.</p>
                    </li>
                    <li>
                        <h4 className={"mt-20"}><FontAwesomeIcon icon={faCube}/> Gremlin Query Console</h4>
                        <p>Run queries on your graph data using Apache TinkerPop&quot;s Gremlin Query Language.</p>
                    </li>
                    <li>
                        <h4 className={"mt-20"}><FontAwesomeIcon icon={faCube}/> Connect to HTTP or WebSocket</h4>
                        <p>Connect to gremlin server over `http` or `ws` protocols.</p>
                    </li>
                    <li>
                        <h4 className={"mt-20"}><FontAwesomeIcon icon={faCube}/> Secure Connections with Auth</h4>
                        <p>Connect to gremlin server using basic or token based authentication.</p>
                    </li>
                </GEList>
            </div>

        )
    }
}
