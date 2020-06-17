import React from "react";
import Modal from "../core/ui/modal";
import {setDataToLocalStorage} from "../core/utils";
import {gremlinServerUrlKey} from "../config";

export default class ConnectView extends React.Component {

    formSubmit(e) {
        e.preventDefault();
        setDataToLocalStorage(gremlinServerUrlKey,  e.target.gremlinUrl.value);
        window.location.href = "/";
    }


    render() {

        return (
            <div>
                <Modal title={'Connect to Gremlin Server'} size={"md"}>

                    <form action="" onSubmit={this.formSubmit.bind(this)}>
                        <input name={"gremlinUrl"} type="text"/>
                        <button type={"submit"}>Update</button>
                    </form>
                </Modal>
            </div>
        )
    }
}
