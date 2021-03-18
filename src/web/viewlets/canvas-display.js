import React from "react";
import {Card} from "react-bootstrap";
import {faDesktop} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default class CanvasDisplay extends React.Component {


    render() {
        return (
            <Card className={"p-10 border-0"}>
                <Card.Body>
                    <h6 className={"border-bottom pb-1"}><FontAwesomeIcon icon={faDesktop}/> Graph Display Settings</h6>


                </Card.Body>
            </Card>
        )
    }
}