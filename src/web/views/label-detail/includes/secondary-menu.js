import React from "react";
import {Nav} from "react-bootstrap";

export default class LabelMenu extends React.Component {


    render() {
        const urlPrefix = "/label/" + this.props.match.params.labelType
            + "/" + this.props.match.params.labelName;
        return (
            <React.Fragment>
                <Nav.Item>
                    <Nav.Link className={"heading"} href={urlPrefix + "/entries"}>Entries</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={"heading"} href={urlPrefix + "/schema"}>Schema</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={"heading"} href={urlPrefix + "/relationships"}>Relationships</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={"heading"} href={urlPrefix + "/indexes"}>Indexes</Nav.Link>
                </Nav.Item>
                {/*<Nav.Item>*/}
                {/*    <Nav.Link href={urlPrefix + "/stats"}>Stats</Nav.Link>*/}
                {/*</Nav.Item>*/}
                <Nav.Item>
                    <Nav.Link className={"heading"} href={urlPrefix + "/settings"}>Settings</Nav.Link>
                </Nav.Item>
            </React.Fragment>
        )
    }

}
