import React from "react";
import {Button, Card} from "react-bootstrap";
import packageJson from '../../../../package.json';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkSquareAlt} from "@fortawesome/free-solid-svg-icons";
import {faPiedPiper} from "@fortawesome/free-brands-svg-icons";

export default class Welcome extends React.Component {

    render() {
        return (
            <Card className={"ml-4"} style={{width: '600px', "borderRadius": 0, "top": "140px"}}>
                <Card.Body style={{"padding": "3rem 3rem 2rem 3rem"}}>

                    <FontAwesomeIcon icon={faPiedPiper} size={"5x"}/>
                    <Card.Title style={{"fontSize": "1.8rem"}}>Invana Studio
                        <small style={{"fontSize": "1rem"}}
                               className={"ml-2"}>v{packageJson.version}</small></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Open source Graph Analytics Platform</Card.Subtitle>
                    <hr/>
                    {/*<Card.Text>*/}
                    {/*    Some quick example text to build on the card title and make up the bulk of*/}
                    {/*    the card's content.*/}
                    {/*</Card.Text>*/}
                    <Button variant={"outline-primary"} size={"sm"} onClick={()=> this.props.setWelcome(false)}>
                        Start Exploring</Button>
                    <a className={"btn btn-outline-secondary btn-sm ml-2"}
                       href={"https://docs.invana.io"} target={"_new"}>
                        Documentation <FontAwesomeIcon icon={faExternalLinkSquareAlt}/>
                    </a>
                    {/*<Card.Link href="https://invana.io" target={"_new"}>Why Invana</Card.Link>*/}
                    {/*<Card.Link href="https://docs.invana.io" target={"_new"}>documentation</Card.Link>*/}
                </Card.Body>
            </Card>
        )
    }

}
