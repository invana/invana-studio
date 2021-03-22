import React from "react";
import "./hoverMenuContainer.scss";
// import LabelHoverOptions from "./label-hover-options";
import PropTypes from "prop-types";

export default class HoverMenuContainer extends React.Component {
    // this will create a container in a position relative to the item selected

    propTypes = {
        hoveredEvent: PropTypes.any,
        hoveredLabelName: PropTypes.string,
        children: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state  = {
            positionLeft: 0 ,
            positionTop: 0,

        }
    }

    updateMenuPosition(){
        this.setState({
            positionLeft: this.props.hoveredEvent.clientX,
            positionTop: this.props.hoveredEvent.clientY -20
        })

    }
    componentDidMount() {
        console.log("hoveredEvent", this.props.hoveredEvent)
        this.updateMenuPosition();
    }
    componentDidUpdate(prevProps) {
        if(this.props.hoveredLabelName !== prevProps.hoveredLabelName){
                    console.log("hoveredEvent", this.props.hoveredEvent)

            this.updateMenuPosition();
        }
    }

    render() {
        return (
            <div className="hoverMenuContainer" style={{"left": this.state.positionLeft, "top": this.state.positionTop}}>
                {this.props.children}
            </div>
        )
    }

}