import React from "react";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class LabelMenu extends React.Component {


    highlightMenu(viewType) {
        return this.props.match.params.viewType === viewType ? "active nav-link" : "nav-link";
    }

    render() {
        const urlPrefix = "/data/" + this.props.match.params.labelType
            + "/" + this.props.match.params.labelName;
        return (
            <React.Fragment>
                <Nav.Item>
                    <Link className={this.highlightMenu("entries")} to={urlPrefix + "/entries"}>Entries</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className={this.highlightMenu("schema")} to={urlPrefix + "/schema"}>Schema</Link>
                </Nav.Item>
                {/*<Nav.Item>*/}
                {/*    <Nav.Link className={this.highlightMenu("relationships")}*/}
                {/*              href={urlPrefix + "/relationships"}>Relationships</Nav.Link>*/}
                {/*</Nav.Item>*/}
                {/*<Nav.Item>*/}
                {/*    <Nav.Link className={this.highlightMenu("indexes")} href={urlPrefix + "/indexes"}>Indexes</Nav.Link>*/}
                {/*</Nav.Item>*/}
                {/*<Nav.Item>*/}
                {/*    <Nav.Link href={urlPrefix + "/stats"}>Stats</Nav.Link>*/}
                {/*</Nav.Item>*/}
                <Nav.Item>
                    <Link className={this.highlightMenu("settings")}
                              to={urlPrefix + "/settings"}>Settings</Link>
                </Nav.Item>
            </React.Fragment>
        )
    }

}
