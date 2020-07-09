import React from "react";
import "./panel.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faWindowClose,
    faWindowRestore
} from "@fortawesome/free-solid-svg-icons";
import GEList from "../lists/list";

export default class GEPanel extends React.Component {
    static defaultProps = {
        title: null,
        onClickMinimise: () =>
            console.error("onClickMinimise prop not added to GUIPanel"),
        onClickExpand: () =>
            console.error("onClickExpand prop not added to GUIPanel"),
        onClickClose: () => console.error("onCickClose prop not added to GUIPanel"),
        showCloseBtn: true,
        showToggleBtn: true
    };

    render() {
        return (
            <div className={"ge-panel"}>
                <div className={"ge-panel-header"}>
                    <h4>{this.props.title}</h4>
                    <div className={"ge-panel-options"}>
                        <GEList>
                            {this.props.showToggleBtn ? (
                                <li>
                                    <button  onClick={() => this.props.onClickClose()}>
                                        <FontAwesomeIcon icon={faWindowRestore}/>
                                    </button>
                                </li>
                            ) : (
                                <span/>
                            )}
                            {this.props.showCloseBtn ? (
                                <li>
                                    <button  onClick={() => this.props.onClickClose()}>
                                        <FontAwesomeIcon icon={faWindowClose}/>
                                    </button>
                                </li>
                            ) : (
                                <span/>
                            )}
                        </GEList>
                    </div>
                </div>
                <div className={"ge-panel-body"}>{this.props.children}</div>
            </div>
        );
    }
}
