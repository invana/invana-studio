import React from "react";
import {Nav} from "react-bootstrap";

export default class LabelMenu extends React.Component {


    highlightMenu(viewType) {
        return this.props.match.params.viewType === viewType ? "active heading" : "heading";
    }

    render() {
        const urlPrefix = "/data/" + this.props.match.params.labelType
            + "/" + this.props.match.params.labelName;
        return (
            <React.Fragment>
                <Nav.Item>
                    <Nav.Link className={this.highlightMenu("entries")} href={urlPrefix + "/entries"}>Entries</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={this.highlightMenu("schema")} href={urlPrefix + "/schema"}>Schema</Nav.Link>
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
                    <Nav.Link className={this.highlightMenu("settings")}
                              href={urlPrefix + "/settings"}>Settings</Nav.Link>
                </Nav.Item>
            </React.Fragment>
        )
    }

}
