import React from "react";
import "./panel.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faWindowClose,
    faWindowRestore
} from "@fortawesome/free-solid-svg-icons";
import GEList from "../lists/list";
import PropTypes from "prop-types";

export default class GEPanel extends React.Component {
    static defaultProps = {
        title: null,
        onClickToggle: () => console.error("onClickToggle prop not added to GUIPanel"),
        onClickClose: () => console.error("onCickClose prop not added to GUIPanel"),
        showCloseBtn: true,
        showToggleBtn: true,
        headerStyle: null
    };

    static propTypes = {
        title: PropTypes.string,
        showToggleBtn: PropTypes.bool,
        showCloseBtn: PropTypes.bool,
        onClickClose: PropTypes.func,
        onClickToggle: PropTypes.func,
        children: PropTypes.any,
        headerStyle: PropTypes.object
    }

    render() {
        return (
            <div className={"ge-panel"}>
                <div className={"ge-panel-header"} style={this.props.headerStyle}>
                    <h4>{this.props.title}</h4>
                    <div className={"ge-panel-options"}>
                        <GEList>
                            {this.props.showToggleBtn ? (
                                <li>
                                    <button style={this.props.headerStyle} onClick={() => this.props.onClickToggle()}>
                                        <FontAwesomeIcon icon={faWindowRestore}/>
                                    </button>
                                </li>
                            ) : (
                                <span/>
                            )}
                            {this.props.showCloseBtn ? (
                                <li>
                                    <button style={this.props.headerStyle} onClick={() => this.props.onClickClose()}>
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
