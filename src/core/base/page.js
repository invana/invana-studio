/*
To create new pages with full header, left nav etc ui components
 */
import React from "react";
import ComponentBase from "./base";
import Header from "./header";
import QueryInputForm from "../ui/form/query-forms";
import LeftNav from "./left-nav";
import SecondaryHeader from "./secondary-header";
import GremlinHeadlessComponent from "./gremlin";
import LearnFlyOut from "../components/learn";
import SecondaryHeaderBase from "../ui/structure/top-secondary";

export default class PageComponentBase extends GremlinHeadlessComponent {

    constructor(props) {
        super(props);
        this.state = {
            canvasQuery: null,
            canvasType: "graph",

            leftFlyOutName: null,
            rightFlyOutName: null,
            centerModalName: "welcome"
        }
    }


    setLeftFlyOut(leftFlyOutName) {
        this.setState({
            leftFlyOutName: leftFlyOutName
        })
    }

    setRightFlyOut(leftFlyOutName) {
        this.setState({
            rightFlyOutName: leftFlyOutName
        })
    }

    onLeftFlyOutClose() {
        this.setState({
            leftFlyOutName: null
        })
    }

    onRightFlyOutClose() {
        this.setState({
            rightFlyOutName: null
        })
    }

    onCenterModalClose() {
        this.setState({
            centerModalName: null
        })
    }

    setCenterModal(modalName) {
        this.setState({
            centerModalName: modalName
        })
    }

    render() {
        const superRender = super.render();
        return (
            <div>
                <Header canvasQuery={this.props.canvasQuery} onQuerySubmit={this.props.onQuerySubmit}/>

                <LeftNav leftFlyOutName={this.state.leftFlyOutName}
                         onLeftFlyOutClose={this.onLeftFlyOutClose.bind(this)}
                         setLeftFlyOut={this.setLeftFlyOut.bind(this)}
                         setCenterModal={this.setCenterModal.bind(this)}
                />
                <SecondaryHeader canvasQuery={this.state.canvasQuery}
                                 onRightFlyOutClose={this.onRightFlyOutClose.bind(this)}
                                 setRightFlyOut={this.setRightFlyOut.bind(this)}/>

                {superRender}

                {
                    (this.state.rightFlyOutName === "learn") ?
                        <LearnFlyOut
                            onClose={this.onRightFlyOutClose.bind(this)}/>
                        : <span></span>
                }
            </div>
        )
    }
}
