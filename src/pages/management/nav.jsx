import React from "react";
import "./management.css";

export default class ManagementNav extends React.Component {

    render() {
        return (
            <ul className={"nav"}>
                <li><a href="/management/nodes">Nodes</a></li>
                <li><a href="/management/links">Links</a></li>
                <li><a href="/management/indexes">Indexes</a></li>
                <li><a href="/management/settings">Settings</a></li>
            </ul>
        );
    }


}

