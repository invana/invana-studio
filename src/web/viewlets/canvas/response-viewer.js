import React from "react";
import {Button, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default class ResponseViewer extends React.Component {

    static propTypes = {
        lastResponse: PropTypes.object,
        lastResponseElapsedTime: PropTypes.number,
        lastResponseStatusCode: PropTypes.number,
        onClose: PropTypes.func
    }

    render() {
        return (
            <React.Fragment>
                <code>
                                    <pre className={"p-3 bg-light border mb-0"}
                                         style={{
                                             "maxHeight": "calc(100vh - 200px)",
                                             "maxWidth": "calc(100vw - 100px)",
                                             "minWidth": "720px"
                                         }}
                                    >{JSON.stringify(this.props.lastResponse, null, 2)}</pre>
                </code>
                <div className="row mt-2">
                    <div className="col col-9">

                        <Nav className="">

                            <Nav.Item className={"mr-3 "}>
                                Took {
                                this.props.lastResponseElapsedTime > 0
                                    ?
                                    <React.Fragment>{this.props.lastResponseElapsedTime} seconds</React.Fragment>
                                    : <React.Fragment>less than a second</React.Fragment>
                            }

                            </Nav.Item>
                            <Nav.Item className={"mr-3 "}>
                                                   <span style={{
                                                       'color': ` ${this.props.lastResponseStatusCode === 200 ? 'green' : 'red'}`,
                                                       "fontWeight": "bold"
                                                   }}>

                                                {this.props.lastResponseStatusCode} response</span>
                            </Nav.Item>
                            <Nav.Item className={"mr-3 "}>
                                <Button variant={"link"}
                                        className={"p-0"}
                                        onClick={() => this.props.onClose()}>
                                    <FontAwesomeIcon icon={faWindowClose}/>
                                </Button>
                            </Nav.Item>

                        </Nav>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}
