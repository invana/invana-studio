import React from "react";
import GEPanel from "../ui-components/panels/panel";
import PropTypes from "prop-types";
import "./get-started.scss";

export default class GetStarted extends React.Component {

    // static defaultProps = {
    //     onClose: () => console.error("onClose not implemented")
    // }
    // static propTypes = {
    //     onClose: PropTypes.func,
    // };


    render() {
        return (
            <div className={"get-started-container"}>
                <GEPanel
                    title={"Get started with Graph Explorer"}
                    // onClickClose={() => this.props.onClose(null)}
                    showCloseBtn={false}
                    showToggleBtn={false}
                >
                    <div className={"p-10"}>
                        <p>Get started</p>
                    </div>

                </GEPanel>
            </div>
        )
    }
}