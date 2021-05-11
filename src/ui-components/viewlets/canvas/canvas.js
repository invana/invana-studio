import React from "react";
import CanvasConsoleOptions from "./canvas-console-options";
import PropTypes from "prop-types";
import CanvasQueryConsole from "./canvas-query-console";


export default class Canvas extends React.Component {


    static propTypes = {
        showCommandConsole: PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.state = {
            showQueryConsole: false,
            showQueryHistory: false
        }

    }

    showQueryConsole() {
        this.setState({
            showQueryConsole: true,
            showQueryHistory: true,
        })
    }

    render() {
        return (
            <div className="d-flex  flex-column" style={{"height": "100%"}}>
                <div className="" style={{"height": "calc(100% - 24px)"}}>
                    {
                        this.props.showCommandConsole
                            ? <CanvasConsoleOptions showQueryConsole={this.showQueryConsole.bind(this)}/>
                            : <React.Fragment/>
                    }
                    {
                        this.props.showCommandConsole && this.state.showQueryConsole
                            ? <CanvasQueryConsole showHistory={true}/>
                            : <React.Fragment/>
                    }
                </div>
                <div style={{"height": "24px"}} className={"pl-2 pr-2 border-top"}>Footer comes here</div>
                {/*<div className="p-2 bd-highlight">Flex item</div>*/}
            </div>
        );
    }
}
