import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop, faWindowClose} from "@fortawesome/free-solid-svg-icons";


export default class ResponseViewer extends React.Component {
    static propTypes = {
        onClose: PropTypes.func,
        responseData: PropTypes.object
    }

    render() {
        return (
            <div>
                <Card className={"p-10 border-0"}>
                    <Card.Header><FontAwesomeIcon icon={faDesktop}/> Response Viewer
                        <button type="button" onClick={() => this.props.onClose()}
                                className={"btn btn-link p-0 border-0 fa-pull-right"}><FontAwesomeIcon
                            icon={faWindowClose}/></button>

                    </Card.Header>
                    <Card.Body>
                        <pre>{JSON.stringify(this.props.responseData, null, 4)}
                        </pre>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}