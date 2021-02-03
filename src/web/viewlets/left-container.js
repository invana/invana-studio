import React from "react";
import PropTypes from "prop-types";
import "./left-container.scss";
import {Button, Modal} from "react-bootstrap";

export default class LeftContainer extends React.Component {

    static propTypes = {
        setLeftContentName: PropTypes.func,
        title: PropTypes.string,
    }

    render() {
        return (
            <div className={"leftContainer"}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>

                    {/*<Modal.Footer>*/}
                    {/*    <Button variant="secondary">Close</Button>*/}
                    {/*    <Button variant="primary">Save changes</Button>*/}
                    {/*</Modal.Footer>*/}
                </Modal.Dialog>
            </div>
        )
    }
}
