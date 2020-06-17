import React from "react";
import Modal from "../ui/modal";
import {removeItemFromLocalStorage} from "../ui/canvas/graph/utils";
import {gremlinServerUrlKey} from "../../config";

export default class SwitchConnection extends React.Component {

    removeGremlinFromStorage() {
        removeItemFromLocalStorage(gremlinServerUrlKey);
        window.location.reload();
    }

    render() {
        return (
            <Modal title={"Switch Gremlin Server"} size={"md"}>
                <div className={""}>
                    <p>You are using `{this.props.gremlinUrl}` as the gremlin server.</p>
                    <p><a onClick={()=> this.removeGremlinFromStorage()}><u>click here</u></a> to switch to a different server.</p>
                </div>
            </Modal>
        )
    }
}
