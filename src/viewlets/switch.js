import React from "react";
import Modal from "../ui-components/modal/modal";
import {askToSwitchGremlinServer} from "../core/utils";
import PropTypes from "prop-types";

export default class SwitchConnection extends React.Component {

    static defaultProps = {
        onClose: () => console.error("onClose prop not set for  <SwitchConnection> component"),
        gremlinUrl: null
    }

    propTypes = {
        onClose: PropTypes.func,
        gremlinUrl: PropTypes.string,
    };

    render() {
        return (
            <Modal title={"Switch Gremlin Server"} size={"md"} onClose={this.props.onClose}>
                <div className={""}>
                    <p>You are using `{this.props.gremlinUrl}` as the gremlin server.</p>
                    <p><a onClick={() => askToSwitchGremlinServer()}><u>click here</u></a> to logout and switch to a
                        different server.</p>
                </div>
            </Modal>
        )
    }
}
